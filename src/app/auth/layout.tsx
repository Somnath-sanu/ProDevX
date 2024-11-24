import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication - ProDevX",
  description: "Sign in or create an account to showcase your projects",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <div className="relative min-h-screen flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
