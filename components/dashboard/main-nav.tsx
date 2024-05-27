import Image from "next/image";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

const MainNav = () => {
  return (
    <nav className="flex justify-between items-center px-3 md:px-6 py-1.5 md:py-3 shadow-md">
      <div className="flex justify-start items-center">
        <Image src="/logo.png" alt="Logo" height={50} width={50} />
        <div className="text-lg text-neutral-900 hidden md:block tracking-tighter md:text-2xl font-bold ml-1">
          Stack
        </div>
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
        <OrganizationSwitcher hidePersonal />

        <UserButton />
      </div>
    </nav>
  );
};

export default MainNav;
