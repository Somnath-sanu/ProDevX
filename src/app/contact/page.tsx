"use client";

import { motion } from "framer-motion";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { useState } from "react";
// import { toast } from "sonner";
import { FaTwitter } from "react-icons/fa";
import Link from "next/link";

const ContactPage = () => {
  // const [formState, setFormState] = useState({
  //   name: "",
  //   email: "",
  //   message: "",
  // });

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   await toast.success("Thanks for approaching us");
  //   setFormState({
  //     name: "",
  //     email: "",
  //     message: "",
  //   });
  // };

  return (
    <div className="min-h-screen pt-20 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-8">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="prose dark:prose-invert"
          >
            <p className="text-lg">
              Have questions or suggestions? We&apos;d love to hear from you.
              Send us a message and we&apos;ll respond as soon as possible.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="space-y-4">
                <p className="flex items-center space-x-2">
                  <span>📍</span>
                  <span>India</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>📧</span>
                  <span>somnath100dbi@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span>
                    <FaTwitter />
                  </span>
                  <Link
                    href={"https://x.com/sanu7326_mishra"}
                    target="_blank"
                    className="text-blue-500 no-underline"
                  >
                    Somnath
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
          {/* 
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <Input
                  id="name"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="bg-background/60 backdrop-blur-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="bg-background/60 backdrop-blur-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="bg-background/60 backdrop-blur-md"
                  rows={6}
                  required
                  minLength={5}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              >
                Send Message
              </Button>
            </form>
          </motion.div> */}
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
