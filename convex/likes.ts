import { getAuthUserId } from "@convex-dev/auth/server";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const isLikedByCurrentUser = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const likedByUsers = await ctx.db
      .query("likes")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .unique();

    if (!likedByUsers) {
      return false;
    }

    const isLiked = likedByUsers.likedBy.some((id) => id === userId);

    return isLiked;
  },
});

export const likedProject = mutation({
  args: {
    projectId: v.id("projects"),
    actorId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const project = await ctx.db.get(args.projectId);

    if (!project) {
      throw new Error("Project not found!");
    }

    const isLikeExist = await ctx.db
      .query("likes")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .unique();

    if (!isLikeExist) {
      const likeId = await ctx.db.insert("likes", {
        creatorId: project.authorId,
        projectId: project._id,
        likedBy: [userId],
      });

      await ctx.db.patch(project._id, {
        likes: 1,
      });

      return likeId;
    }

    const isUserExist = isLikeExist.likedBy.find((id) => id === userId);

    if (isUserExist) {
      throw new Error("Already liked");
    }

    await ctx.db.patch(isLikeExist._id, {
      likedBy: [...isLikeExist.likedBy, userId],
    });

    await ctx.db.patch(project._id, {
      likes: [...isLikeExist.likedBy, userId].length,
    });

    const user = await ctx.db.get(args.actorId);

    if (!user) {
      throw new Error("Unauthorized");
    }

    if (project.authorId !== userId) {
      await ctx.db.insert("notifications", {
        userId: project.authorId,
        type: "like",
        content: `liked your project ${project.title}`,
        read: false,
        sourceId: project._id,
        sourceType: "project",
        actorId: args.actorId,
        actorName: user.name!,
      });
    }

    return isLikeExist._id;
  },
});
