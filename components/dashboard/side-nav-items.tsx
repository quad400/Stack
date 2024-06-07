"use client";

import { Activity, CreditCard, LayoutIcon, Settings } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useIsClient, useLocalStorage } from "usehooks-ts";

interface SideNavItemsProps {
  name: string;
  imageUri: string;
  storageKey: string;
  workspaceId?: string;
}

const routes = [
  {
    path: `/`,
    name: "Board",
    icon: LayoutIcon,
  },
  {
    path: `/activity`,
    name: "Activity",
    icon: Activity,
  },
  {
    path: `/settings`,
    name: "Settings",
    icon: Settings,
  },
  {
    path: `/billing`,
    name: "Billing",
    icon: CreditCard,
  },
];

const SidenavItems = ({
  imageUri,
  name,
  workspaceId,
  storageKey,
}: SideNavItemsProps) => {
  const router = useRouter();
  const params = useParams();

  const [pathname, setPathname] = useState("");

  // const [client, setClient] = useState(false);

  // useEffect(() => {
  //   setClient(true);
  // }, []);

  if (!workspaceId) return null;

  const [expanded, seExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const accordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const handleExpand = (value: string) => {
    seExpanded((prev) => ({
      ...prev,
      [value]: !prev[value],
    }));
  };

  const handleRoute = (id: string, value: string) => {
    const routePath = `/dashboard/${id}/${value}`;
    setPathname(value);
    router.push(routePath);
  };

  const isActive = false;

  const isExpanded = workspaceId === params.workspaceId;

  return (
    <Accordion
      type="multiple"
      defaultValue={accordionValue}
      className="space-y-2"
    >
      <AccordionItem value={workspaceId}>
        <AccordionTrigger
          onClick={() => handleExpand(workspaceId)}
          className={cn("mb-2", isExpanded && "bg-indigo-100/50")}
        >
          <div className="flex space-x-2 justify-start items-center">
            <Image
              src={imageUri}
              alt={name}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div className="text-lg truncate font-semibold">{name}</div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="space-y-2">
          {routes.map(({ icon: Icon, name, path }) => (
            <Button
              key={name}
              variant="ghost"
              onClick={() => handleRoute(workspaceId, path)}
              className={cn(
                "w-full justify-start text-indigo-700 space-x-2 items-center",
                isExpanded && path === `${pathname}` && "bg-indigo-100/50"
              )}
            >
              <Icon
                className={cn(
                  "text-neutral-600 h-6 w-6",
                  isExpanded && path === `${pathname}` && "text-indigo-700"
                )}
              />
              <div
                className={cn(
                  "text-neutral-800 text-sm font-medium",
                  isExpanded && path === `${pathname}` && "text-indigo-700"
                )}
              >
                {name}
              </div>
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SidenavItems;
