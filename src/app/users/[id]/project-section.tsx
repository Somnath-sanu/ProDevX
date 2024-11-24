import { ProjectCard } from "@/features/projects/components/project-card";
import { Id } from "../../../../convex/_generated/dataModel";
import { motion } from "framer-motion";
import { TriangleAlert } from "lucide-react";

interface ProjectSectionProps {
  projects:
    | {
        authorId: Id<"users">;
        description: string;
        githubLink: string;
        image: string | undefined;
        images: string[];
        likes: number;
        liveLink: string;
        messages: number;
        name: string | undefined;
        techStack: string[];
        title: string;
        userId: Id<"users"> | undefined;
        views: number;
        _creationTime: number;
        _id: Id<"projects">;
      }[]
    | undefined
    | null;
}

export const ProjectSection = ({ projects }: ProjectSectionProps) => {
  if (!!!projects) {
    return (
      <div className="min-h-screen">
        <main className="flex-1">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <TriangleAlert className="size-5" />
            <p className="text-sm">No Projects yet!</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          Projects
        </h2>
        <span className="text-sm text-muted-foreground">
          {projects?.length || 0} total projects
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects?.map((project) => (
          <motion.div
            key={project._id}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
      {projects?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects yet</p>
        </div>
      )}
    </div>
  );
};
