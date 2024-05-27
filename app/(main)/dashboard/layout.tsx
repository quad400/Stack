import { ReactNode } from "react";
import MainNav from "../../../components/dashboard/main-nav";
import { auth } from "@clerk/nextjs/server";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { orgId } = auth();
  // const {} = await

  console.log(orgId)
  return (
    <main>
      <nav>
        <MainNav />
      </nav>

      <div>{children}</div>
    </main>
  );
};

export default DashboardLayout;
