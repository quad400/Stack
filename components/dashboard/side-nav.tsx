"use client";

import { Activity, CreditCard, LayoutIcon, Plus, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { useOrganizationList } from "@clerk/nextjs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import Image from "next/image";
import AccordionRoute from "./accordion-route";
import { useParams } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const SideNav = () => {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const { orgId } = useParams();

  const {onOpen} = useModal()

  const routes = [
    {
      path: `/dashboard/${orgId}`,
      name: "Board",
      Icon: LayoutIcon,
    },
    {
      path: `/dashboard/${orgId}/activity`,
      name: "Activity",
      Icon: Activity,
    },
    {
      path: `/dashboard/${orgId}/settings`,
      name: "Settings",
      Icon: Settings,
    },
    {
      path: `/dashboard/${orgId}/billing`,
      name: "Billing",
      Icon: CreditCard,
    },
  ];
  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between">
        <div className="text-base md:text-lg font-bold text-neutral-900">
          Workspace
        </div>
        <Button variant="ghost" size="icon" onClick={()=> onOpen("createWorkspace")}>
          <Plus className="h-6 w-6 text-neutral-900" />
        </Button>
      </div>

      <div className="mt-4">
        {userMemberships?.data?.map((org) => (
          <Accordion type="single" key={org?.id} collapsible>
            <AccordionItem value={org?.organization?.id}>
              <AccordionTrigger>
                <div className="flex space-x-2 justify-start items-center">
                  <Image
                    src={org?.organization?.imageUrl}
                    alt={org?.organization?.name}
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  {org?.organization.name}
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-2">
                {routes.map((route) => (
                  <AccordionRoute
                    key={route.path}
                    name={route.name}
                    path={route.path}
                    Icon={route.Icon}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default SideNav;
