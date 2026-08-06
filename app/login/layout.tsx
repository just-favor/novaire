import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In \u2014 NOVAIRE",
  description: "Sign in to your NOVAIRE account.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
