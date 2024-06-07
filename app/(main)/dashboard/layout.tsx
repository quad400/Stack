import { ReactNode } from "react";
import MainNav from "../../../components/dashboard/main-nav";
import { auth } from "@clerk/nextjs/server";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  // const {} = await

  return (
    <main className="flex flex-col h-full w-full">
      <nav>
        <MainNav />
      </nav>

      <div className="h-full w-full">{children}</div>
    </main>
  );
};

export default DashboardLayout;
