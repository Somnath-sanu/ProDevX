"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { FaGithub, FaTwitter } from "react-icons/fa";

const navigation = {
  product: [
    { name: "Features", href: "#" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "#faq" },
  ],
  social: [
    {
      name: "GitHub",
      href: "https://github.com/Somnath-sanu",
      icon: FaGithub,
    },
    {
      name: "X",
      href: "https://x.com/sanu7326_mishra",
      icon: FaTwitter,
    },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          className="flex items-center max-w-4xl mx-auto"
          aria-label="Footer"
        >
          <div className="space-y-4 flex flex-col items-start justify-center">
            <div className="text-sm font-semibold leading-6 text-foreground">
              Product
            </div>
            <div className="flex items-center justify-center gap-4">
              {navigation.product.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors flex"
                  >
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} ProDevX. All rights reserved.
            </p>
            <div className="flex gap-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.name}
                    asChild
                    variant="ghost"
                    size="icon"
                    className="hover:text-foreground text-muted-foreground"
                  >
                    <Link href={item.href} target="_blank">
                      <Icon className="size-5" aria-hidden="true" />
                      <span className="sr-only">{item.name}</span>
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
