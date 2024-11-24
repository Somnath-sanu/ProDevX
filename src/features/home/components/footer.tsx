"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const navigation = {
  product: [
    { name: "Features", href: "#" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "FAQ", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Terms", href: "#" },
  ],
  legal: [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "License", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "#",
      icon: FaTwitter,
    },
    {
      name: "GitHub",
      href: "#",
      icon: FaGithub,
    },
    {
      name: "LinkedIn",
      href: "#",
      icon: FaLinkedin,
    },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <nav
          className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 lg:gap-12 max-w-4xl mx-auto"
          aria-label="Footer"
        >
          <div className="space-y-4">
            <div className="text-sm font-semibold leading-6 text-foreground">
              Product
            </div>
            <ul className="space-y-3">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-semibold leading-6 text-foreground">
              Company
            </div>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <div className="text-sm font-semibold leading-6 text-foreground">
              Legal
            </div>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} DevShowcase. All rights
              reserved.
            </p>
            <div className="flex gap-6">
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
                    <Link href={item.href}>
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
