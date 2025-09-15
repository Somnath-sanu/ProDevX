"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Notifications } from "@/features/notifications/components/notifications";
import { useCurrentUser } from "@/features/user/api/use-current-user";
import { UserAvatar } from "./user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const links = [
  {
    label: "Projects",
    href: "/projects",
  },
  {
    label: "Blogs",
    href: "/blogs",
  },

  {
    label: "New Project",
    href: "/projects/new",
  },
  {
    label: "New Blog",
    href: "/blogs/create",
  },
  {
    label: "About Us",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const Navbar = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const { data: user } = useCurrentUser();

  return (
    <nav className="fixed w-full border-b border-border/40 bg-background/60 backdrop-blur-md supports-[backdrop-filter]:bg-background/40 z-[100]">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg transform rotate-45"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
              P
            </div>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            ProDevX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === link.href
                  ? "text-foreground font-semibold"
                  : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden md:flex"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Notifications />

          {/* Sign In Button (Desktop) */}
          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <UserAvatar
                    name={user?.name || "Anonymous"}
                    image={user?.image}
                    className="border-none outline-none"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  align="start"
                  sideOffset={20}
                  className="w-30 mr-2 sm:mr-0"
                >
                  <DropdownMenuItem
                    onClick={() => router.push(`/users/${user?._id}`)}
                    className="cursor-pointer font-semibold"
                  >
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => await signOut()}
                    disabled={isLoading}
                    className="cursor-pointer text-destructive focus:text-destructive font-semibold"
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/auth" className="hidden md:block">
              <Button variant="default" disabled={isLoading}>
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[400px] pt-20">
              <SheetHeader className="border-b">
                <SheetTitle className="p-2">Menu</SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-4 mt-4">
                {links.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-sm transition-colors hover:text-foreground/80 py-2",
                        pathname === link.href
                          ? "text-foreground font-semibold"
                          : "text-foreground/60"
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}

                <hr className="my-4" />
                <SheetClose>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                    className="justify-start px-2"
                  >
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="ml-2">
                      {theme === "light" ? "Light mode" : "Dark mode"}
                    </span>
                  </Button>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
