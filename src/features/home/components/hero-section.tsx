/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

import dynamic from "next/dynamic";
import { useConvexAuth } from "convex/react";

const HeroIllustration = dynamic(
  () => import("./hero-illustration").then((mod) => mod.HeroIllustration),
  {
    ssr: false,
  }
);

export const HeroSection = () => {
  const { isAuthenticated } = useConvexAuth();
  return (
    <div className="relative isolate">
      {/* Background gradients */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 text-4xl font-bold tracking-tight text-foreground sm:text-6xl"
          >
            Showcase Your Code,{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
              Share Your Journey
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-muted-foreground"
          >
            A modern platform for developers to showcase their projects, share
            knowledge through blogs, and connect with the global developer
            community.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-10 flex items-center gap-x-6"
          >
            {isAuthenticated ? (
              <Link href={"/projects"}>
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            ) : (
              <Link href={"/auth"}>
                <Button size="lg" className="gap-2">
                  Get Started
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            )}

            <Link href={"/about"}>
              <Button variant="ghost" size="lg" className="gap-2">
                Learn More
                <ExternalLink className="size-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
        >
          <HeroIllustration />
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </motion.div>
    </div>
  );
};
