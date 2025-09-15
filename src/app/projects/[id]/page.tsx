"use client";

import { useGetProject } from "@/features/projects/api/use-get-project";
import { useProjectId } from "@/hooks/use-project-id";
import {
  Heart,
  LinkIcon,
  Loader,
  MessageCircle,
  TriangleAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { useUserLikedProject } from "@/features/likes/api/use-is-user-liked";
import { useCreateLike } from "@/features/likes/api/use-liked-project";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { HeartAnimation } from "@/features/projects/components/heart-animation";
import { MessagesSheet } from "@/features/messages/components/messages-sheet";
import { ImageZoom } from "@/features/projects/components/image-zoom";
import { useIncrementViewCount } from "@/features/projects/api/use-view-count";
import { FaGithub } from "react-icons/fa";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ProjectPage = () => {
  const projectId = useProjectId();

  const [showHeartAnimation, setShowHeartAnimation] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { data: project } = useGetProject({
    projectId,
  }); // cannot get called in async component

  const { data: isLikedByUser, isLoading: isLikeLoading } = useUserLikedProject(
    { projectId }
  );

  const { data: user } = useCurrentUser();

  const { mutate, isPending } = useCreateLike();

  const { mutate: incrememtView } = useIncrementViewCount();

  useEffect(() => {
    if (projectId) {
      incrememtView({ projectId });
    }
  }, [projectId, incrememtView]);

  if (!user) {
    return (
      <div className="min-h-screen">
        <main className="container py-20">
          <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <TriangleAlert className="size-8" />
            <span>No Projects found</span>
          </div>
        </main>
      </div>
    );
  }

  const handleLike = async () => {
    if (isLikedByUser) {
      toast.warning("Already liked");
      return;
    }
    await mutate(
      { projectId, actorId: user?._id },
      {
        onSuccess: () => {
          setShowHeartAnimation(true);
          toast.success("Liked");
        },
        onError: () => {
          toast.error("Something went wrong!");
        },
      }
    );
  };

  if (project === undefined) {
    return (
      <div className="min-h-screen">
        <div className="h-screen flex flex-1 flex-col gap-2 items-center justify-center">
          <Loader className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="min-h-screen">
        <main className="container py-20">
          <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
            <TriangleAlert className="size-8" />
            <span>No Projects found</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen container">
        <main className="container py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-8 lg:grid-cols-[2fr,1fr]"
          >
            {/* Main Content */}

            <div className="space-y-8 px-2 sm:px-0">
              <div>
                <h1 className="text-4xl font-bold">{project.title}</h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tag) => (
                    <span
                      key={tag}
                      className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Images */}

              <div className="space-y-4 px-4 sm:px-0">
                <div className="relative aspect-video overflow-hidden rounded-lg shadow-md cursor-pointer">
                  <ImageZoom
                    src={project.images[0]}
                    alt={project.title}
                    className="relative aspect-video overflow-hidden rounded-lg py-4 transition-transform duration-500 hover:scale-110 cursor-zoom-in"
                  />
                </div>
                {/* <h1>Screenshots</h1> */}
                <div className="sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 hidden cursor-pointer ">
                  {project.images.map((image, index) => {
                    if (index === 0) {
                      return;
                    }
                    return (
                      <div
                        key={index}
                        className="relative aspect-video overflow-hidden rounded-lg border transition-transform duration-500 hover:scale-110"
                      >
                        <Image
                          src={image}
                          fill
                          alt={`Screenshot ${index + 1}`}
                          className="relative aspect-video object-contain rounded-lg py-4"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Project Description */}

              <div className="prose prose-gray dark:prose-invert max-w-none whitespace-pre-line">
                <h2 className="text-center">About the Project</h2>
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                  className="whitespace-pre-line"
                />
              </div>
            </div>

            {/* Sidebar */}

            <div className="space-y-6 p-4 sm:p-0 w-full">
              {/* Author Info */}
              <div className="rounded-lg border bg-card p-4">
                <Link
                  href={`/users/${project.userId}`}
                  className="flex items-center gap-x-3"
                >
                  <Avatar>
                    <AvatarImage src={project.image} />
                    <AvatarFallback>
                      {project.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Project Creator
                    </p>
                  </div>
                </Link>
              </div>

              {/* Action Buttons */}

              <div className="rounded-lg p-4 space-y-4 relative sm:p-0">
                <motion.div whileTap={{ scale: 0.95 }}>
                  {showHeartAnimation && (
                    <HeartAnimation
                      onComplete={() => setShowHeartAnimation(false)}
                    />
                  )}
                  <Button className="w-full" size="lg" onClick={handleLike}>
                    {(isLikeLoading || isPending) && (
                      <Loader className="size-4 animate-spin" />
                    )}
                    {(!isLikeLoading || !isPending) && (
                      <>
                        <Heart
                          className={cn(
                            "size-4",
                            isLikedByUser && "fill-red-500"
                          )}
                        />
                        {isLikedByUser ? "Liked" : "Like Project"}
                      </>
                    )}{" "}
                    ({formatNumber(project.likes) || 0})
                  </Button>
                </motion.div>
                <MessagesSheet
                  projectId={projectId}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                >
                  <Button variant="outline" className="w-full" size="lg">
                    <MessageCircle className="mr-2 size-4" />
                    Send Message
                  </Button>
                </MessagesSheet>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" asChild className="">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkIcon className="mr-2 size-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub className="mr-2 size-4" />
                      Source Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default ProjectPage;
