"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const faqs = [
  {
    question: "What should I publish on ProDevX?",
    answer:
      "Publish complete projects, experiments, learning builds, open-source tools, and blogs that explain your decisions. The platform works best when the project page shows the result and the blog explains the journey.",
  },
  {
    question: "Can I use it as my developer portfolio?",
    answer:
      "Yes. Your profile collects projects and blogs in one place, so visitors can understand your technical range, writing style, and consistency without jumping between scattered links.",
  },
  {
    question: "Do blogs support technical storytelling?",
    answer:
      "Yes. Blogs are meant for implementation notes, tutorials, launch retrospectives, debugging stories, and the small decisions that make a project credible.",
  },
  {
    question: "How does community interaction work?",
    answer:
      "Developers can discover posts, like projects and blogs, leave comments, and follow the work back to the creator profile. The goal is useful feedback and better visibility.",
  },
  {
    question: "Is the platform free?",
    answer:
      "Yes. You can create projects, write blogs, and use your profile as a public portfolio without a paid plan.",
  },
];

const promises = [
  "Project pages for proof of work",
  "Blogs for the build journey",
  "Profiles that connect both sides",
];

export const FaqSection = () => {
  return (
    <section
      className="bg-zinc-950 px-6 py-24 text-white md:px-12 lg:px-16"
      id="faq"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-white/40">
            Questions
          </p>
          <h2 className="mt-4 max-w-lg text-4xl font-medium tracking-tight md:text-5xl">
            A cleaner way to make your work understandable.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
            ProDevX is built around the way developers actually grow: by
            shipping, explaining, getting feedback, and making the next version
            sharper.
          </p>

          <div className="mt-10 space-y-4">
            {promises.map((promise) => (
              <div key={promise} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-emerald-300" />
                <span className="text-white/78">{promise}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="liquid-glass rounded-xl border border-white/10 p-4 md:p-6"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-white hover:text-emerald-200 hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-7 text-white/62 md:text-base">
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
