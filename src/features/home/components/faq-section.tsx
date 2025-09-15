"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is this platform for?",
    answer:
      "This platform is designed for developers to showcase their projects, share knowledge through blogs, and connect with the developer community. It's a space where you can build your portfolio and engage with other developers.",
  },
  {
    question: "How can I share my projects?",
    answer:
      "After signing up, you can easily create project entries with descriptions, images, and links to your repositories. You can also add tags and categorize your projects for better visibility.",
  },
  {
    question: "Can I write technical blogs?",
    answer:
      "Yes! You can write and publish technical blogs about your experiences, tutorials, or any tech-related topics. The platform supports rich text formatting and code snippets.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Yes, the platform is completely free to use. You can create unlimited projects and blog posts, and engage with the community without any cost.",
  },
  {
    question: "How can I get more visibility for my work?",
    answer:
      "Engage with the community by sharing quality content, commenting on others' work, and maintaining an active profile. You can also share your projects and blogs on social media directly from the platform.",
  },
];

export const FaqSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-blue-950/10 to-background" id="faq">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 h-full">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about our platform
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
