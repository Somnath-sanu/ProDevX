/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { motion } from "framer-motion";
import { Eye, Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { useUserLikedProject } from "@/features/likes/api/use-is-user-liked";
import { MessagesSheet } from "@/features/messages/components/messages-sheet";
import { useDeleteProject } from "../api/use-delete-project";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { toast } from "sonner";

import { useConfirm } from "@/hooks/use-confirm";

interface ProjectCardProps {
  project: {
    _id: Id<"projects">;
    _creationTime?: number;
    title: string;
    description: string;
    images: string[];
    techStack: string[];
    likes: number;
    name: string | undefined;
    image: string | undefined; // userImage
    views: number;
    messages: number;
    authorId?: Id<"users">;
    githubLink: string;
    liveLink: string;
  };
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { data: isLikedByUser, isLoading: isLikeLoading } = useUserLikedProject(
    { projectId: project._id }
  );

  const { data: currentUser } = useCurrentUser();
  const { mutate: deleteProject, isPending } = useDeleteProject();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this project?",
    "This action cannot be undone"
  );

  const handleDelete = async (e: React.MouseEvent, isAdmin: boolean) => {
    e.preventDefault();

    const ok = await confirm();
    if (!ok) return;

    await deleteProject(
      { projectId: project._id, isAdmin },
      {
        onSuccess: () => {
          toast.success("Project deleted successfully");
        },
        onError: (error) => {
          toast.error("Failed to delete project");
          console.error(error);
        },
      }
    );
  };

  return (
    <>
      <ConfirmDialog />
      <motion.div
        className="group relative rounded-lg bg-card p-4 transition-colors hover:bg-accent shadow-sm border h-fit flex flex-col"
        whileHover={{ y: -2 }}
      >
        {(currentUser?._id === project.authorId ||
          currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive hover:text-destructive-foreground max-sm:opacity-100"
            onClick={(e) => {
              handleDelete(
                e,
                currentUser?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
              );
            }}
          >
            <Trash2 className="size-4" />
          </Button>
        )}

        <Link
          href={`/projects/${project._id}`}
          className="flex-1 flex flex-col"
        >
          <div className="relative aspect-video overflow-hidden rounded-md">
            <Image
              src={project.images[0] || "/pro.png"}
              alt={project.title}
              fill
              className="object-contain transition-transform group-hover:scale-105"
            />
          </div>
          <div className="mt-4 flex-1 whitespace-pre-line">
            <h3 className="text-xl font-semibold line-clamp-1 whitespace-pre-line">
              {project.title}
            </h3>
            <div className="mt-2 h-20 overflow-hidden line-clamp-3  whitespace-pre-line mx-auto truncate max-w-lg w-full  break-all">
              <div
                className="prose prose-sm dark:prose-invert truncate"
                dangerouslySetInnerHTML={{
                  __html: project.description,
                }}
              />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <UserAvatar
                  name={project.name || "Anonymous"}
                  image={project.image}
                  className="size-6"
                />
                <span className="text-sm text-muted-foreground">
                  {project.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-x-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
                  <Eye className="size-4 text-white shrink-0" />
                  <span className="text-sm text-white">
                    {formatNumber(project.views) || 0}
                  </span>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart
                    className={cn(
                      "size-8 text-red-500 drop-shadow-sm shrink-0",
                      isLikedByUser && "fill-red-500"
                    )}
                  />
                  <span className="ml-1 tabular-nums">
                    {formatNumber(project.likes) || 0}
                  </span>
                </Button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
                >
                  {tag}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="rounded-full bg-primary/10 px-2 py-1 text-xs text-primary">
                  +{project.techStack.length - 3}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground text-end">
              {formatDate(new Date(project._creationTime!))}
            </p>
          </div>
        </Link>
      </motion.div>
    </>
  );
};
