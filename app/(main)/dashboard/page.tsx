import { redirect } from "next/navigation";

import { getUser } from "@/lib/actions/user-action";
import NoWorkspace from "@/components/dashboard/no-workspace";
import { getWorkspaces } from "@/lib/actions/workspace-actions";

const DashboardPage = async () => {
  const workspaces = await getWorkspaces();

  const user = await getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  if (workspaces.length === 0) {
    return <NoWorkspace />;
  }

  return redirect(`/dashboard/${workspaces[0]._id}`);
};

export default DashboardPage;
