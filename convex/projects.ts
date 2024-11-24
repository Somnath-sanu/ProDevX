import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createProject = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    techStack: v.array(v.string()),
    liveLink: v.string(),
    githubLink: v.string(),
    images: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const projectId = await ctx.db.insert("projects", {
      ...args,
      authorId: userId,
      likes: 0,
      views: 0,
      messages: 0,
    });

    return projectId;
  },
});

export const getProject = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      return null;
    }

    const user = await ctx.db.get(project.authorId);

    if (!user) {
      return null;
    }

    return {
      ...project,
      name: user?.name,
      image: user?.image,
      userId: user?._id,
    };
  },
});

export const getProjects = query({
  args: {
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const projects = await ctx.db.query("projects").order("desc").collect();

    let filteredProjects = projects;

    if (args.startDate && args.endDate) {
      const startDate = new Date(args.startDate);
      const endDate = new Date(args.endDate);

      filteredProjects = projects.filter((project) => {
        const projectDate = new Date(project._creationTime);
        return projectDate >= startDate && projectDate <= endDate;
      });
    }

    const projectsWithUser = await Promise.all(
      filteredProjects.map(async (project) => {
        const user = await ctx.db.get(project.authorId);
        return {
          ...project,

          name: user?.name,
          image: user?.image,
          userId: user?._id,
        };
      })
    );

    return projectsWithUser;
  },
});

export const getFeaturedProject = query({
  args: {
    startDate: v.optional(v.string()),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    let project;

    if (!args.startDate && !args.endDate) {
      // When no date filter, simply get the most liked project
      project = await ctx.db
        .query("projects")
        .withIndex("by_likes")
        .order("desc")
        .first();
    }

    if (args.startDate && args.endDate) {
      const startTimestamp = new Date(args.startDate).getTime();
      const endTimestamp = new Date(args.endDate).getTime();

      // Get all projects in the date range
      const projects = await ctx.db
        .query("projects")
        .withIndex("by_creation_time", (q) =>
          q
            .gte("_creationTime", startTimestamp)
            .lte("_creationTime", endTimestamp)
        )
        .collect();

      // Sort by likes in descending order (most likes first)
      project = projects.sort((a, b) => (b.likes || 0) - (a.likes || 0))[0];
    }

    if (!project) {
      return null;
    }

    const user = await ctx.db.get(project.authorId);

    return {
      ...project,
      name: user?.name,
      image: user?.image,
      userId: user?._id,
    };
  },
});

export const updateViewCount = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found!");
    }
    await ctx.db.patch(args.projectId, {
      views: (project.views ?? 0) + 1,
    });

    return project._id;
  },
});

/**
 * Race Condition: If multiple users view the   project simultaneously, some view counts might be lost due to concurrent updates.
 * 
 * Convex's mutation system ensures atomic updates
    Even with concurrent views, each increment will be processed correctly
 */
