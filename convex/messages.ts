import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createMessage = mutation({
  args: {
    projectId: v.id("projects"),
    message: v.string(),
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

    const newMessage = await ctx.db.insert("messages", {
      userId,
      projectId: args.projectId,
      message: args.message,
    });

    const totalMessages = await ctx.db
      .query("messages")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();

    await ctx.db.patch(args.projectId, {
      messages: totalMessages.length,
    });

    const actor = await ctx.db.get(args.actorId);

    if (actor && userId !== project.authorId) {
      await ctx.db.insert("notifications", {
        userId: project.authorId,
        type: "message",
        content: `messaged on your project ${project.title}`,
        read: false,
        sourceId: project._id,
        sourceType: "project",
        actorId: args.actorId,
        actorName: actor.name!,
        messageId: newMessage,
      });
    }
    return newMessage;
  },
});

export const getMessages = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .order("desc")
      .collect();

    const messagesWithUsers = await Promise.all(
      messages.map(async (message) => {
        const user = await ctx.db.get(message.userId);
        return {
          ...message,
          userName: user?.name,
          userImage: user?.image,
        };
      })
    );

    return messagesWithUsers;
  },
});

export const deleteMessage = mutation({
  args: {
    projectId: v.id("projects"),
    messageId: v.id("messages"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const project = await ctx.db.get(args.projectId);
    if (!project) {
      throw new Error("Project not found!");
    }

    const message = await ctx.db.get(args.messageId);
    if (!message || message.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.messageId);

    const totalMessages = await ctx.db
      .query("messages")
      .withIndex("by_projectId", (q) => q.eq("projectId", args.projectId))
      .collect();

    await ctx.db.patch(args.projectId, {
      messages: totalMessages.length,
    });

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_message_id", (q) => q.eq("messageId", args.messageId))
      .collect();

    await Promise.all(
      notifications.map((notification) => ctx.db.delete(notification._id))
    );

    return project._id;
  },
});
