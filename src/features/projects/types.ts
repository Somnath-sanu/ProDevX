import { Id } from "../../../convex/_generated/dataModel";

export interface ProjectDataInterface {
  authorId: Id<"users">;
  description: string;
  githubLink: string;
  image: string;
  images: string[];
  likes: number;
  liveLink: string;
  messages: number;
  name: string;
  techStack: string[];
  title: string;
  userId: Id<"users">;
  views: number;
  _creationTime: number;
  _id: Id<"projects">;
}
