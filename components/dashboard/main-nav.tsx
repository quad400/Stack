import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import UserButton from "./user-button";
import Link from "next/link";
import MobileToggle from "../mobile-toggle";

const MainNav = () => {
  return (
    <nav className="flex justify-between items-center px-3 md:px-6 py-1.5 md:py-3 shadow-md">
      <div className="flex justify-start items-center">
        <MobileToggle />
        <Link
          href="/dashboard"
          className="text-lg text-neutral-900 hidden justify-start items-center md:flex tracking-tighter md:text-2xl font-bold ml-1"
        >
          <Image src="/logo.png" alt="Logo" height={50} width={50} />
          Stack
        </Link>
        <Button variant="primary" className="ml-2 hidden md:block">
          <div className="font-medium text-white text-sm">Create</div>
        </Button>
        <Button
          variant="primary"
          size="icon"
          className="ml-2 flex justify-center items-center md:hidden"
        >
          <Plus className="h-5 w-5 text-white" />
        </Button>
      </div>
      <div className="flex justify-center items-center space-x-3">
        <UserButton />
      </div>
    </nav>
  );
};

export default MainNav;
