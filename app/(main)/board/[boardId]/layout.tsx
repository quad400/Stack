import MainNav from "@/components/dashboard/main-nav";
import { ReactNode } from "react";

const BoardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col h-full w-full">
      <nav>
        <MainNav />
      </nav>

      <div className="h-full w-full">{children}</div>
    </main>
  );
};

export default BoardLayout;
