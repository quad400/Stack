"use client";

import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "../components/ui/button";
import { Boxes } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function MainPage() {
  const { userId } = useAuth();

  if (userId) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex flex-col h-full w-full bg-neutral-200">
      <nav className="bg-neutral-50 shadow-sm flex justify-between items-center py-2 md:py-3 px-6 md:px-10 backdrop-blur-lg">
        <div className="flex justify-start items-center">
          <Image src="/logo.png" alt="Logo" height={50} width={50} />
          <div className="text-lg text-neutral-900 tracking-tighter md:text-2xl font-bold ml-2">
            Stack
          </div>
        </div>
        <div className="flex justify-end items-center">
          <SignInButton>
            <Button className="mr-2" variant="ghost">
              Login
            </Button>
          </SignInButton>
          <SignInButton>
            <Button variant="primary">Get Stack for free</Button>
          </SignInButton>
        </div>
      </nav>

      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="flex justify-center gap-5 items-center bg-indigo-100 rounded-xl py-2 px-4">
          <Boxes className="h-6 w-6 text-indigo-800" />
          <div className="text-base uppercase font-bold text-indigo-800">
            Worldclass Task Tracking App
          </div>
        </div>
        <div className="text-3xl md:text-5xl tracking-tighter font-bold text-neutral-900 mt-4">
          Stack helps teams move
        </div>
        <div className="text-3xl px-4 py-2 rounded-2xl mt-2 bg-gradient-to-tr from-indigo-600 to-pink-700 md:text-5xl tracking-tighter font-bold text-neutral-100">
          Work Forward
        </div>
        <div className="text-neutral-500 text-lg w-1/2 text-center mt-4 font-medium tracking-tighter">
          Collaborate, manage projects, and reach new productivity peaks. From
          high rises to the home office, the way your team works is
          unique—accomplish it all with Stack.
        </div>
        <div className="flex justify-center mt-4">
          <SignInButton>
            <Button variant="primary" size="lg">
              Get Stack for free
            </Button>
          </SignInButton>
        </div>
      </div>
      <footer className="bg-neutral-50 shadow-sm flex w-full justify-between items-center py-2 md:py-3 px-6 md:px-10 backdrop-blur-lg">
        <div className="flex justify-start items-center">
          <Image src="/logo.png" alt="Logo" height={50} width={50} />
          <div className="text-lg text-neutral-900 tracking-tighter md:text-2xl font-bold ml-2">
            Stack
          </div>
        </div>
        <div className="flex justify-end items-center">
          <Button className="mr-5" variant="ghost">
            Privacy Policy
          </Button>
          <Button variant="ghost">Terms of Service</Button>
        </div>
      </footer>
    </main>
  );
}
