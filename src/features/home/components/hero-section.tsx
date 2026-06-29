"use client";

import { Button } from "@/components/ui/button";
import { useConvexAuth } from "convex/react";
import { ArrowRight, BookOpen, Code2, Github, PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const videoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4";

const metrics = [
  { label: "Project launches", value: "01" },
  { label: "Build journals", value: "02" },
  { label: "Peer discovery", value: "03" },
];

function FadeIn({
  children,
  delay = 0,
  duration = 700,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay);
    return () => window.clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${duration}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedHeading({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);
  const lines = useMemo(() => text.split("\n"), [text]);
  const charDelay = 30;

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <h1
      className="max-w-5xl text-balance text-4xl font-normal leading-[0.92] text-white sm:text-6xl lg:text-7xl xl:text-8xl"
      style={{ letterSpacing: "-0.05em", textShadow: "0 16px 48px #000" }}
    >
      {lines.map((line, lineIndex) => (
        <span key={line} className="block">
          {line.split("").map((char, charIndex) => {
            const delay =
              200 +
              lineIndex * line.length * charDelay +
              charIndex * charDelay;

            return (
              <span
                key={`${line}-${charIndex}`}
                className="inline-block transition-all duration-500 ease-out"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(-18px)",
                  transitionDelay: `${delay}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

export const HeroSection = () => {
  const { isAuthenticated } = useConvexAuth();
  const primaryHref = isAuthenticated ? "/projects/new" : "/auth";

  return (
    <section className="relative -mt-16 min-h-screen overflow-hidden bg-black text-white">
      <video
        className="absolute inset-0 size-full object-cover"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="relative z-10 flex min-h-screen flex-col px-6 pb-10 pt-28 md:px-12 lg:px-16 lg:pb-16">
        <div className="flex flex-1 flex-col justify-end">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:items-end">
            <div>
              <FadeIn delay={450} duration={900} className="mb-5">
                <div className="liquid-glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm text-white/80">
                  <Code2 className="size-4 text-white" />
                  Launch work. Write the story. Get discovered.
                </div>
              </FadeIn>

              <AnimatedHeading text={"Build in public.\nLook portfolio-ready."} />

              <FadeIn delay={900} duration={1000}>
                <p
                  className="mt-6 max-w-2xl text-base leading-7 text-white/78 md:text-lg"
                  style={{ textShadow: "0 10px 32px #000" }}
                >
                  ProDevX gives developers a polished home for projects, build
                  notes, lessons learned, and the credibility that grows from
                  showing the craft behind the work.
                </p>
              </FadeIn>

              <FadeIn
                delay={1200}
                duration={1000}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Button
                  asChild
                  className="h-12 rounded-lg bg-white px-7 text-base font-medium text-black hover:bg-white/90"
                >
                  <Link href={primaryHref}>
                    {isAuthenticated ? "Publish a Project" : "Start Building"}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="liquid-glass h-12 rounded-lg border-white/20 bg-transparent px-7 text-base font-medium text-white hover:bg-white hover:text-black"
                >
                  <Link href="/projects">
                    Explore Projects
                    <Github className="ml-2 size-4" />
                  </Link>
                </Button>
              </FadeIn>
            </div>

            <FadeIn
              delay={1400}
              duration={1000}
              className="flex flex-col gap-4 lg:items-end"
            >
              <div className="liquid-glass w-full max-w-md rounded-xl border border-white/20 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-white/45">
                  Developer loop
                </p>
                <div className="mt-5 grid grid-cols-3 gap-3">
                  {metrics.map((item) => (
                    <div key={item.label}>
                      <p className="text-2xl font-light">{item.value}</p>
                      <p className="mt-2 text-xs leading-5 text-white/60">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="liquid-glass flex w-full max-w-md flex-wrap items-center gap-3 rounded-xl border border-white/20 px-5 py-4 text-lg font-light">
                <PenLine className="size-5" />
                Projects. Blogs. Proof of work.
                <BookOpen className="ml-auto size-5" />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
