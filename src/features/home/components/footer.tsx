"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpRight, Github, Twitter } from "lucide-react";
import Link from "next/link";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Blogs", href: "/blogs" },
  { name: "Create project", href: "/projects/new" },
  { name: "FAQ", href: "#faq" },
];

const social = [
  {
    name: "GitHub",
    href: "https://github.com/Somnath-sanu",
    icon: Github,
  },
  {
    name: "X",
    href: "https://x.com/sanu7326_mishra",
    icon: Twitter,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-[#f7f7f2] px-6 py-16 text-zinc-950 md:px-12 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 border-b border-zinc-950/10 pb-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-zinc-950 text-sm font-semibold text-white">
                PX
              </span>
              <span className="text-2xl font-semibold tracking-tight">
                ProDevX
              </span>
            </Link>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-600">
              A polished space for developers to present projects, document the
              build journey, and turn consistent shipping into visible proof.
            </p>
          </div>

          <Button
            asChild
            className="h-12 rounded-lg bg-zinc-950 px-6 text-white hover:bg-zinc-800"
          >
            <Link href="/auth">
              Start your portfolio
              <ArrowUpRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="flex flex-col gap-8 pt-8 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {social.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  asChild
                  variant="outline"
                  size="icon"
                  className="rounded-lg border-zinc-950/10 bg-transparent text-zinc-700 hover:bg-zinc-950 hover:text-white"
                >
                  <Link href={item.href} target="_blank">
                    <Icon className="size-4" aria-hidden="true" />
                    <span className="sr-only">{item.name}</span>
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>

        <p className="mt-8 text-sm text-zinc-500">
          &copy; {new Date().getFullYear()} ProDevX. All rights reserved.
        </p>
        <p className="mt-2 text-sm text-zinc-700">
          Made with ❤️ by{" Somnath 😉"}
        </p>
      </div>
    </footer>
  );
};
