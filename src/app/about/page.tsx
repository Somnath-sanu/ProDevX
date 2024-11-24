"use client";

import { motion } from "framer-motion";
import { Code2, Rocket, Users, Zap, BookOpen, Award } from "lucide-react";

const features = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "Project Showcase",
    description:
      "Share your coding projects with a global community of developers. Get feedback, recognition, and collaboration opportunities.",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Technical Blogs",
    description:
      "Write and read technical blogs to share knowledge, insights, and experiences with fellow developers.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Developer Community",
    description:
      "Connect with like-minded developers, share ideas, and grow together in a supportive environment.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Modern Tech Stack",
    description:
      "Built with cutting-edge technologies to provide the best development and sharing experience.",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "Career Growth",
    description:
      "Showcase your expertise, build your portfolio, and unlock new career opportunities.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Recognition",
    description:
      "Get recognized for your contributions and establish yourself as an industry expert.",
  },
];

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8 bg-gradient-to-b from-background via-background/95 to-background/90">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Welcome to ProDevX
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your premier platform for showcasing projects, sharing knowledge,
            and connecting with fellow developers in a modern, collaborative
            environment.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-background/60 backdrop-blur-md p-6 rounded-xl border border-border/40 hover:border-border/60 transition-colors"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-500 w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-background/60 backdrop-blur-md p-8 rounded-xl border border-border/40 mb-16"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
            Why Choose ProDevX?
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg mb-4">
              ProDevX is more than just a platform - it&apos;s a thriving
              ecosystem designed for modern developers. We understand the
              challenges of showcasing your work and building a professional
              network in today&apos;s fast-paced tech world.
            </p>
            <p className="text-lg mb-4">
              Our platform provides you with powerful tools and features to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Create stunning project portfolios with rich media support
              </li>
              <li>Write technical blogs with markdown and code highlighting</li>
              <li>Connect with developers who share your interests</li>
              <li>Receive feedback from experienced professionals</li>
              <li>Stay updated with the latest industry trends</li>
              <li>Build your personal brand in the tech community</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">
            Join Our Growing Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you&apos;re a seasoned developer or just starting your
            journey, ProDevX provides the perfect platform to showcase your
            work, learn from others, and grow your career.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
