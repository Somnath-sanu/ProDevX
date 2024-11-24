"use client";

import { motion } from "framer-motion";

const codeSnippet = `function Showcase() {
  const projects = useProjects();
  const blogs = useBlogs();
  
  return (
    <Dashboard>
      <Projects data={projects} />
      <Blogs data={blogs} />
    </Dashboard>
  );
}`;

export const HeroIllustration = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto ">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 blur-3xl" />

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        {/* Code editor mockup */}
        <div className="rounded-lg bg-black/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Editor header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-white/60 ml-2">showcase.tsx</div>
          </div>

          {/* Code content */}
          <div className="p-4">
            <pre className="text-sm">
              <CodeAnimation code={codeSnippet} />
            </pre>
          </div>

          {/* Floating elements */}
          <FloatingElements />
        </div>
      </motion.div>
    </div>
  );
};

const CodeAnimation = ({ code }: { code: string }) => {
  const lines = code.split("\n");

  return (
    <div className="font-mono">
      {lines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="whitespace-pre text-white/90"
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
};

const FloatingElements = () => {
  const elements = [
    { icon: "📱", delay: 0 },
    { icon: "💻", delay: 0.2 },
    { icon: "🚀", delay: 0.4 },
    { icon: "✨", delay: 0.6 },
    { icon: "📊", delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute text-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
            y: [-20, -40, -20],
            x: Math.random() * 100 - 50,
          }}
          transition={{
            duration: 3,
            delay: element.delay,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          {element.icon}
        </motion.div>
      ))}
    </div>
  );
};
