/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useUserId } from "@/hooks/use-user-id";
import { useUserDetails } from "@/features/user/api/use-user-details";
import { useUserProjectDetails } from "@/features/user/api/use-user-projects";
import {
  XCircle,
  MessageSquare,
  Eye,
  Heart,
  Loader,
  TriangleAlert,
} from "lucide-react";
import { motion } from "framer-motion";
import { UserAvatar } from "@/components/user-avatar";

import { formatNumber } from "@/lib/utils";

import { ProjectSection } from "./project-section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserBlogDetails } from "@/features/user/api/use-user-blogs";
import { BlogSection } from "./blog-section";
import { TfiWrite } from "react-icons/tfi";

const UserProfilePage = () => {
  const userId = useUserId();
  const { data: user, isLoading: userLoading } = useUserDetails({ userId });
  const { data: projects, isLoading: projectsLoading } = useUserProjectDetails({
    userId,
  });

  const { data: blogs, isLoading: blogLoading } = useUserBlogDetails({
    userId,
  });

  console.log(blogs);

  if (userLoading || projectsLoading || blogLoading) {
    return (
      <div className="min-h-screen">
        <div className="h-screen flex flex-1 flex-col gap-2 items-center justify-center">
          <Loader className="size-8 animate-spin" />
          <p className="text-xs">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        <main className="flex-1">
          <div className="flex h-[50vh] flex-col items-center justify-center gap-2">
            <XCircle className="size-5" />
            <p className="text-sm">User not found!</p>
          </div>
        </main>
      </div>
    );
  }

  const projectLikes =
    projects?.reduce((sum, project) => sum + (project.likes || 0), 0) || 0;
  const blogLikes =
    blogs?.reduce((sum, blog) => sum + (blog.likes || 0), 0) || 0;
  const totalLikes = projectLikes + blogLikes;
  const totalViews =
    projects?.reduce((sum, project) => sum + (project.views || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      <main className="container mx-auto px-4 py-8 ">
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
          {/* Left column - User Profile Card (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="relative overflow-hidden rounded-xl border bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8 shadow-xl"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse" />
                <div className="flex flex-col items-center text-center space-y-6">
                  {/* Avatar with glow effect */}
                  <motion.div className="relative">
                    <UserAvatar
                      name={user.name || "Anonymous"}
                      image={user.image}
                      className="size-32 ring-4 ring-primary/20"
                    />
                    <motion.div
                      className="absolute -bottom-2 -right-2 size-8 bg-primary/20 rounded-full blur-xl"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>

                  <div className="space-y-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                      {user.name}
                    </h1>
                    <p className="text-muted-foreground font-medium">
                      Project Creator
                    </p>

                    {/* Stats in a vertical layout */}
                    <div className="flex flex-col space-y-3 w-full min-w-[250px]">
                      <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15">
                        <span className="text-sm font-medium">Total Likes</span>
                        <div className="flex items-center gap-2 min-w-[60px] justify-end">
                          <Heart className="size-4 shrink-0" />
                          <span className="font-bold tabular-nums">
                            {formatNumber(totalLikes)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15">
                        <span className="text-sm font-medium">Total Views</span>
                        <div className="flex items-center gap-2 min-w-[60px] justify-end">
                          <Eye className="size-4 shrink-0" />
                          <span className="font-bold tabular-nums">
                            {formatNumber(totalViews)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15">
                        <span className="text-sm font-medium">Projects</span>
                        <div className="flex items-center gap-2 min-w-[60px] justify-end">
                          <MessageSquare className="size-4 shrink-0" />
                          <span className="font-bold tabular-nums">
                            {formatNumber(projects?.length || 0)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3 transition-colors hover:bg-primary/15">
                        <span className="text-sm font-medium">Blogs</span>
                        <div className="flex items-center gap-2 min-w-[60px] justify-end">
                          <TfiWrite className="size-4 shrink-0" />
                          <span className="font-bold tabular-nums">
                            {formatNumber(blogs?.length || 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right column - Projects Grid */}
          <Tabs defaultValue="projects" className="lg:col-span-8">
            <TabsList className="w-full h-9 py-2">
              <TabsTrigger value="projects" className="flex-1">
                Projects
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex-1">
                Blogs
              </TabsTrigger>
            </TabsList>
            <TabsContent value="projects">
              <ProjectSection projects={projects} />
            </TabsContent>
            <TabsContent value="blogs">
              <BlogSection blogs={blogs} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
