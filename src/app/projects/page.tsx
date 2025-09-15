/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Card } from "@/components/ui/card";
import { useGetFeaturedProject } from "@/features/projects/api/use-get-featured-project";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { FeaturedProject } from "@/features/projects/components/featured-project";

import { ProjectCard } from "@/features/projects/components/project-card";
import { Loader, TriangleAlert } from "lucide-react";
// import { ProjectsFilterPage } from "./filter-project";
// import { useState } from "react";
// import MonthYearFilter from "@/features/projects/components/month-year-filter";

const ProjectsPage = () => {
  // const [dateFilter, setDateFilter] = useState<{
  //   startDate?: string;
  //   endDate?: string;
  // }>({});

  const { data: projects, isLoading: projectsLoading } = useGetProjects({});
  const { data: featuredProject, isLoading: featuredProjectLoading } =
    useGetFeaturedProject({});

  // const onFilterChange = useCallback(
  //   (startDate: Date | null, endDate: Date | null) => {
  //     setDateFilter({
  //       startDate: startDate?.toISOString(), //2024-11-24T11:43:27.982Z
  //       // toString -> Sun Nov 24 2024 18:07:30 GMT+0530 (India Standard Time)
  //       endDate: endDate?.toISOString(),
  //     });
  //   },
  //   []
  // );

  if (projectsLoading || featuredProjectLoading) {
    return (
      <div className="min-h-screen">
        <div className="h-screen flex flex-1 flex-col gap-2 items-center justify-center">
          <Loader className="size-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  if (!projects || !featuredProject) {
    return (
      <div className="min-h-screen">
        <main className="container py-20 flex flex-col gap-y-10">
          {/* <div className="ml-auto pr-4">
            <MonthYearFilter onFilterChange={onFilterChange} />
          </div> */}
          <div className="flex flex-col items-center justify-center overflow-hidden">
            <TriangleAlert className="size-8" />
            <span>No Projects yet!</span>
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen">
        <div className="container py-20">
          <section className="mb-16">
            {featuredProject && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-y-4">
                  {/* <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    Featured Project
                  </h2> */}
                  {/* <MonthYearFilter onFilterChange={onFilterChange} /> */}
                </div>
                <div className="grid gap-6 md:p-0 p-2">
                  <FeaturedProject project={featuredProject} />
                </div>
              </div>
            )}
          </section>

          <section>
            <h2 className="md:text-3xl text-xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project: any, index: number) => (
                <Card
                  key={`project-${project._id}-${index}`}
                  className="px-1.5 md:px-0 border-none shadow-none"
                >
                  <ProjectCard project={project} />
                </Card>
              ))}
            </div>
            {projects.length === 0 && (
              <div className="m-auto w-full flex justify-center items-center">
                <div className="flex flex-col items-center justify-center overflow-hidden">
                  <TriangleAlert className="size-8" />
                  <span>No Projects found</span>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default ProjectsPage;
