/* eslint-disable @typescript-eslint/no-unused-vars */
import { SignInFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useAuthActions } from "@convex-dev/auth/react";

interface SignUpCardProps {
  setState: (value: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpCardProps) => {
  const [name, setName] = useState(""); // TODO: Regex to not use numbers or special symbols in name
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const { signIn } = useAuthActions();

  const onPasswordSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    setPending(true);

    await signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Something went wrong (try using strong password)");
      })
      .finally(() => {
        setPending(false);
      });
  };

  const onProviderSignUp = async (value: "github" | "google") => {
    setPending(true);
    await signIn(value).finally(() => setPending(false));
  };

  return (
    <>
      <Card className="w-full h-full p-8  rounded-xl shadow-lg">
        <CardHeader className="px-0 pt-0 items-center">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Sign up to start showcasing your projects
          </CardDescription>
        </CardHeader>
        {!!error && (
          <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
            <TriangleAlert className="size-4" />
            <p>{error}</p>
          </div>
        )}
        <CardContent className="space-y-5 px-0 pb-0">
          <div className="flex flex-col gap-y-2.5 justify-center">
            <Button
              className="w-full relative"
              disabled={pending}
              onClick={() => onProviderSignUp("google")}
              variant={"outline"}
              size={"lg"}
            >
              <FcGoogle className="absolute top-2.5 left-2.5 translate-y-1" />
              Continue with Google
            </Button>
            <Button
              className="w-full relative"
              disabled={pending}
              onClick={() => onProviderSignUp("github")}
              variant={"outline"}
              size={"lg"}
            >
              <FaGithub className="absolute top-2.5 left-2.5 translate-y-1" />
              Continue with Github
            </Button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form className="space-y-2.5" onSubmit={onPasswordSignUp}>
            <Input
              disabled={pending}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              type="text"
              required
            />
            <Input
              disabled={pending}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              required
            />
            <Input
              disabled={pending}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              required
            />
            <Input
              disabled={pending}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              type="password"
              required
            />
            <Button type="submit" className="w-full" disabled={pending}>
              Continue
            </Button>
          </form>
          {/* <Separator /> */}
          <div className="flex justify-center items-center gap-x-1">
            <p className="text-xs text-muted-foreground  font-semibold">
              Already have an account?{" "}
              <span
                onClick={() => setState("signIn")}
                className="text-sky-700 hover:underline cursor-pointer"
              >
                Sign in
              </span>
            </p>
          </div>
        </CardContent>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground w-full max-w-lg text-wrap px-2">
        By continuing, you agree to our <strong>Terms of Service</strong> and{" "}
        <strong>Privacy Policy</strong>
      </p>
    </>
  );
};
