import type { Metadata } from "next";
import { Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "ProDevX - Developer Portfolio & Project Showcase Platform",
  description:
    "ProDevX is a modern platform for developers to showcase projects, share knowledge through blogs, and connect with the global developer community. Build your portfolio, gain recognition, and grow your career.",
  keywords: [
    "developer portfolio",
    "project showcase",
    "technical blogs",
    "developer community",
    "coding projects",
    "software development",
    "web development",
    "programming",
    "developer platform",
    "ProDevX",
  ],
  authors: [{ name: "ProDevX Team" }],
  creator: "somnath",
  publisher: "ProDevX",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://prodevx.com",
    siteName: "ProDevX",
    title: "ProDevX - Developer Portfolio & Project Showcase Platform",
    description:
      "Showcase your projects, share knowledge, and connect with developers worldwide. Join ProDevX to build your professional portfolio and grow your career.",
    images: [
      {
        url: "/pro1.png",
        width: 1200,
        height: 630,
        alt: "ProDevX Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProDevX - Developer Portfolio & Project Showcase Platform",
    description:
      "Showcase your projects, share knowledge, and connect with developers worldwide. Join ProDevX to build your professional portfolio and grow your career.",
    images: ["/pro1.png"],
    creator: "@somnath",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  category: "Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${poppins.variable} ${spaceGrotesk.variable} font-sans`}
        >
          <ConvexClientProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Navbar />
              <div className="mx-auto container px-6 max-w-screen">
                {" "}
                <Toaster /> {children}
              </div>
            </ThemeProvider>
          </ConvexClientProvider>
        </body>
      </html>
    </ConvexAuthNextjsServerProvider>
  );
}
