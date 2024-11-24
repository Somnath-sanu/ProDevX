import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    images: v.array(v.string()),
    techStack: v.array(v.string()),
    liveLink: v.string(),
    githubLink: v.string(),
    authorId: v.id("users"),
    likes: v.number(),
    views: v.number(),
    messages: v.number(),
  })
    .index("by_author", ["authorId"])
    .index("by_likes", ["likes"]),
  likes: defineTable({
    projectId: v.id("projects"),
    creatorId: v.id("users"),
    likedBy: v.array(v.id("users")),
  })
    .index("by_likedBy", ["likedBy"])
    .index("by_projectId", ["projectId"]),
  messages: defineTable({
    projectId: v.id("projects"),
    userId: v.id("users"),
    message: v.string(),
  })
    .index("by_userId", ["userId"])
    .index("by_projectId", ["projectId"])
    .index("by_userId_projectId", ["userId", "projectId"]),
  blogs: defineTable({
    title: v.string(),
    content: v.string(),
    imageUrl: v.optional(v.string()),
    authorId: v.id("users"),
    likes: v.number(),
    comments: v.array(
      v.object({
        content: v.string(),
        authorId: v.id("users"),
        authorName: v.string(),
        authorImage: v.optional(v.string()),
        createdAt: v.number(),
      })
    ),
  }).index("by_author", ["authorId"]),
  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("message"), v.literal("like")),
    content: v.string(),
    read: v.boolean(),

    sourceId: v.union(v.id("blogs"), v.id("projects")), // ID of the project or blog that triggered the notification
    sourceType: v.union(v.literal("project"), v.literal("blog")),
    actorId: v.id("users"), // ID of the user who triggered the notification
    actorName: v.string(),
    messageId: v.optional(v.id("messages")),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_read", ["userId", "read"])
    .index("by_source_id", ["sourceId"])
    .index("by_message_id", ["messageId"]),
});

export default schema;
