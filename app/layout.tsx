import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--dm-sans",
});

export const metadata: Metadata = {
  title: {
    default: "Stack",
    template: `%s | Stack`,
  },
  description: "Worldclass task tracking app",
  icons: [
    {
      url: "/logo.png",
      href: "/logo.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(
            "min-h-screen bg-background dm-sans antialiased",
            dm_sans.className
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}