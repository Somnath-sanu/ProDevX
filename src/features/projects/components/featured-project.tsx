/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/user-avatar";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  HeartIcon,
  MessageSquare,
  Share2,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Id } from "../../../../convex/_generated/dataModel";
import { cn, formatDate, formatNumber } from "@/lib/utils";
import { useUserLikedProject } from "@/features/likes/api/use-is-user-liked";
import { MessagesSheet } from "@/features/messages/components/messages-sheet";
import { toast } from "sonner";

interface FeaturedProjectProps {
  project: {
    _id: Id<"projects">;
    title: string;
    description: string;
    images: string[];
    techStack: string[];
    likes: number;
    name: string;
    image: string; // userImage
    views: number;
    messages: number;
    _creationTime: number;
  };
}

export const FeaturedProject = ({ project }: FeaturedProjectProps) => {
  const { data: isLikedByUser, isLoading: isLikeLoading } = useUserLikedProject(
    { projectId: project._id }
  );

  const handleCopy = () => {
    const inviteLink = `${window.location.origin}/projects/${project._id}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      toast.success("Project link copied to clipboard");
    });
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 shadow-xl">
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="absolute right-4 top-4 flex items-center space-x-2 rounded-full bg-gradient-to-r from-indigo-500 to-primary px-4 py-2 shadow-lg shrink-0 z-10"
      >
        <Trophy className="h-4 w-4 text-primary-foreground" />
        <span className="text-sm font-medium text-primary-foreground">
          Featured Project
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image
            src={project.images[0] || "/pro.png"}
            alt={project.title}
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-3">
            <div className="flex items-center gap-x-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
              <Eye className="size-4 text-white shrink-0" />
              <span className="text-sm text-white">
                {formatNumber(project.views) || 0}
              </span>
            </div>
            <div className="flex items-center gap-x-2 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm">
              <MessageSquare className="size-4 text-white shrink-0" />
              <span className="text-sm text-white">
                {formatNumber(project.messages) || 0}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-y-6">
          <div>
            <motion.h3
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent truncate whitespace-pre-line"
            >
              {project.title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-muted-foreground leading-relaxed break-all line-clamp-3 max-w-xl whitespace-pre-line truncate mx-auto"
            >
              <div
                className="prose prose-sm dark:prose-invert whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: project.description }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {project.techStack.map((tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20 transition-colors cursor-pointer shrink-0"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center justify-between border-t pt-6"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <UserAvatar
                  name={project.name}
                  image={project.image}
                  className="ring-2"
                />
                {/* <img
                  src={"/trophy2.png"}
                  alt="winner"
                  className="absolute -bottom-3 -right-2 size-6 object-contain drop-shadow-md"
                /> */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: 1,
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                  className="absolute -bottom-3 -right-2 pointer-events-none"
                >
                  <motion.img
                    src={"/trophy2.png"}
                    alt="winner"
                    className="size-6 object-contain drop-shadow-md"
                    animate={{
                      rotate: [-5, 5, -5],
                      y: [-1, 1, -1],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>
              <div className="hidden md:block">
                <p className="font-medium">{project.name}</p>
                <p className="text-sm text-muted-foreground font-serif">
                  Project Creator
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <Button variant="ghost" className="cursor-auto">
                <HeartIcon
                  className={cn(
                    "size-8  shrink-0 text-red-500 drop-shadow-md",
                    isLikedByUser && "fill-red-500"
                  )}
                />
                <span className="text-primary tabular-nums ">
                  {formatNumber(project.likes) || 0}
                </span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-primary/10"
                onClick={handleCopy}
              >
                <Share2 className="h-5 w-5 text-primary shrink-0" />
              </Button>
              <Link href={`/projects/${project._id}`}>
                <Button className="shadow-lg hover:shadow-xl transition-shadow">
                  View Project
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-end mt-2 pt-4">
        {formatDate(new Date(project._creationTime!))}
      </p>
    </div>
  );
};
