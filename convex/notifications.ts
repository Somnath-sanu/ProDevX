import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createNotification = mutation({
  args: {
    type: v.union(v.literal("message"), v.literal("like")),
    content: v.string(),
    sourceId: v.union(v.id("blogs"), v.id("projects")),
    sourceType: v.union(v.literal("project"), v.literal("blog")),
    actorId: v.id("users"),
    actorName: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const notificationId = await ctx.db.insert("notifications", {
      ...args,
      userId,
      read: false,
    });

    return notificationId;
  },
});

export const markAllAsRead = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error("Unauthorized");
    }

    const notifications = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) =>
        q.eq("userId", userId).eq("read", false)
      )
      .collect();

    await Promise.all(
      notifications.map((notification) =>
        ctx.db.patch(notification._id, { read: true })
      )
    );

    return notifications[0]._id;
  },
});

export const getNotifications = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return [];
    }
    return await ctx.db
      .query("notifications")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getUnreadCount = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      return null;
    }

    const unreadCount = await ctx.db
      .query("notifications")
      .withIndex("by_user_and_read", (q) =>
        q.eq("userId", userId).eq("read", false)
      )
      .collect()
      .then((notifications) => notifications.length);

    return unreadCount;
  },
});
