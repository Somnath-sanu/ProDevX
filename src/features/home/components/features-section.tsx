"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FileText, GitBranch, Heart, MessageSquare, Share2, Users } from "lucide-react";

const features = [
  {
    title: "Project Showcase",
    description: "Share your projects with beautiful previews and detailed descriptions",
    icon: GitBranch,
  },
  {
    title: "Blog Platform",
    description: "Write and share your knowledge through engaging blog posts",
    icon: FileText,
  },
  {
    title: "Community Interaction",
    description: "Connect with other developers, like and comment on their work",
    icon: Users,
  },
  {
    title: "Social Sharing",
    description: "Easily share your work across various social platforms",
    icon: Share2,
  },
  {
    title: "Engagement Metrics",
    description: "Track likes, views, and interactions on your content",
    icon: Heart,
  },
  {
    title: "Discussions",
    description: "Engage in meaningful discussions through comments",
    icon: MessageSquare,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const FeaturesSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-blue-950/10">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground">
            A complete platform for developers to showcase their work and share their knowledge
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card className="p-6 hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm">
                  <div className="mb-4 inline-block p-3 rounded-lg bg-blue-500/10">
                    <Icon className="size-6 text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
