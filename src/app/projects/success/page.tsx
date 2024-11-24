"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function SuccessPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    // Create confetti effect
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    const colors = ["#00ff00", "#ff0000", "#0000ff", "#ffff00", "#00ffff"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Auto-redirect after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/projects");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
      <div className="text-center space-y-8 p-8 max-w-2xl mx-auto relative">
        {/* Floating balloons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ y: 100, opacity: 0 }}
              animate={{
                y: [-20, 20],
                opacity: 1,
                x: Math.sin(i) * 20,
              }}
              transition={{
                y: {
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                },
                opacity: { duration: 0.4 },
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + Math.sin(i) * 20}%`,
              }}
            >
              <div
                className="w-8 h-8 rounded-full"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${
                    ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEEAD"][i]
                  }, #00000050)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Success icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="mx-auto w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center"
        >
          <svg
            className="w-12 h-12 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </motion.div>

        {/* Success message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-primary">
            Project Submitted Successfully! 🎉
          </h1>
          <p className="text-muted-foreground text-lg">
            Congratulations! Your amazing project has been successfully submitted.
            We can&#39;t wait to see it shine!
          </p>
        </motion.div>

        {/* Auto-redirect message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground"
        >
          You will be redirected to the projects page in 5 seconds...
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center gap-4"
        >
          <Link href="/projects">
            <Button variant="outline">View All Projects</Button>
          </Link>
          <Link href="/projects/new">
            <Button>Submit Another Project</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
