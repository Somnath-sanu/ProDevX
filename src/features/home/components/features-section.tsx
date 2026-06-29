"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  FileText,
  Heart,
  ImagePlus,
  MessageSquare,
  Rocket,
} from "lucide-react";
import Link from "next/link";

const workflows = [
  {
    title: "Ship a project page that feels finished",
    description:
      "Add screenshots, repository links, live demos, stack details, and the context hiring teams actually want to understand.",
    icon: Rocket,
    href: "/projects/new",
  },
  {
    title: "Turn your process into a readable build log",
    description:
      "Publish blogs about decisions, tradeoffs, bugs, milestones, and the path from rough idea to working product.",
    icon: FileText,
    href: "/blogs/create",
  },
  {
    title: "Get signal from the developer community",
    description:
      "Likes, comments, views, and profile pages help good work travel beyond one pinned repository.",
    icon: Heart,
    href: "/projects",
  },
];

const details = [
  {
    label: "Visual case studies",
    text: "Project galleries keep your work easy to scan and simple to share.",
    icon: ImagePlus,
  },
  {
    label: "Journey-first writing",
    text: "Blogs are built for the story behind the implementation.",
    icon: MessageSquare,
  },
  {
    label: "Performance signals",
    text: "Engagement metrics show what resonates with readers and peers.",
    icon: BarChart3,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-[#f7f7f2] px-6 py-24 text-zinc-950 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 border-b border-zinc-950/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-zinc-500">
              The portfolio layer
            </p>
            <h2 className="mt-4 max-w-xl text-4xl font-medium tracking-tight md:text-5xl">
              Designed for developers who build more than a resume.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-zinc-600 lg:justify-self-end">
            ProDevX connects the finished artifact with the journey behind it:
            what you built, why it matters, what you learned, and how others can
            engage with it.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {workflows.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
              >
                <Link
                  href={feature.href}
                  className="group flex h-full min-h-[320px] flex-col justify-between rounded-lg border border-zinc-950/10 bg-white p-6 transition hover:-translate-y-1 hover:border-zinc-950/25 hover:shadow-2xl hover:shadow-zinc-950/10"
                >
                  <div className="flex size-12 items-center justify-center rounded-lg bg-zinc-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="max-w-sm text-2xl font-medium tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="mt-4 leading-7 text-zinc-600">
                      {feature.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-zinc-950/60 transition group-hover:text-zinc-950">
                    Open workflow
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <div
                key={detail.label}
                className="flex gap-4 rounded-lg border border-zinc-950/10 bg-zinc-950 p-5 text-white"
              >
                <Icon className="mt-1 size-5 shrink-0 text-emerald-300" />
                <div>
                  <h3 className="font-medium">{detail.label}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/62">
                    {detail.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
