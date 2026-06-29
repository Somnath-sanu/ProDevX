"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, Moon, Sparkles, Sun } from "lucide-react";
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
    label: "Create project",
    href: "/projects/new",
  },
  {
    label: "Create blog",
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
    <nav className="fixed left-0 top-0 z-[100] w-full px-4 pt-4 md:px-8 lg:px-12">
      <div className="liquid-glass mx-auto flex h-14 max-w-7xl items-center justify-between rounded-xl px-3 text-white shadow-2xl shadow-black/10 md:px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-lg bg-white text-sm font-semibold text-black">
            PX
          </span>
          <span className="text-xl font-semibold tracking-tight">
            ProDevX
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-white",
                pathname === link.href
                  ? "text-white"
                  : "text-white/65"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="hidden text-white hover:bg-white/10 hover:text-white md:flex"
          >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Notifications />

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
              <Button
                disabled={isLoading}
                className="h-9 rounded-lg bg-white px-5 text-sm font-medium text-black hover:bg-white/90"
              >
                <Sparkles className="mr-2 size-4" />
                Sign In
              </Button>
            </Link>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-20 sm:w-[400px]">
              <SheetHeader className="border-b pb-4">
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
                {!isAuthenticated && (
                  <SheetClose asChild>
                    <Link href="/auth">
                      <Button className="w-full justify-center rounded-lg">
                        Sign In
                      </Button>
                    </Link>
                  </SheetClose>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
