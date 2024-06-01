"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface AccordionRouteProps {
  name: string;
  path: string;
  Icon: any;
}

const AccordionRoute = ({ Icon, name, path }: AccordionRouteProps) => {

    const pathname = usePathname()
    const router = useRouter()

    const isActive = pathname === path
    
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={()=> router.push(path)}
      className={cn("w-full justify-start space-x-2 items-center", isActive && "bg-indigo-100/50")}
    >
      <Icon className={cn("text-neutral-600 h-6 w-6", isActive && "text-indigo-700")}/>
      <div className={cn("text-neutral-800 text-sm font-medium", isActive && "text-indigo-700")}>{name}</div>
    </Button>
  );
};

export default AccordionRoute;
