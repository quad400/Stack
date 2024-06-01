"use client";

import { UserButton as UserButtonClerk } from "@clerk/nextjs";
import { useIsClient } from "usehooks-ts";

const UserButton = () => {
  const client = useIsClient();

  if (!client) return null;

  return (
    <UserButtonClerk
      appearance={{
        elements: {
          avatarBox: "h-[44px] w-[44px]",
        },
      }}
    />
  );
};

export default UserButton;
