"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();
  const { isLoaded, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!isLoaded) {
    return null;
  } else if (isLoaded === true && userMemberships?.data.length === 0) {
    router.push(`/org-select`);
    console.log("No organizations found");
  } else {
    router.push(`/dashboard/${userMemberships?.data[0]?.organization.id}`);
    console.log("Redirecting to first organization");
  }
};

export default DashboardPage;
