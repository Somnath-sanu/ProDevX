import { Id } from "../../../convex/_generated/dataModel";

export interface Blog {
  _id: Id<"blogs">;
  _creationTime: number;
  title: string;
  content: string;
  imageUrl?: string;
  authorId: Id<"users">;
  likes: number;
  comments: BlogComment[];
  author: {
    name?: string;
    image?: string;
  };
}

export interface BlogComment {
  content: string;
  authorId: Id<"users">;
  authorName: string;
  authorImage?: string | undefined;
  createdAt: number;
}
