import { getWorkspaces } from "@/lib/actions/workspace-actions";
import SideNavHeader from "./side-nav-header";
import SidenavItems from "./side-nav-items";
import { ScrollArea } from "../ui/scroll-area";
import { IWorkspace } from "@/lib/interfaces/workspace-interface";

const SideNav = async () => {
  const workspaces = await getWorkspaces();

  if (!workspaces) {
    return [];
  }

  return (
    <ScrollArea>
      <div className="w-full h-full">
        <SideNavHeader />

        <div className="mt-4 w-full">
          {workspaces.map((workspace: IWorkspace) => (
            <SidenavItems
              key={workspace._id}
              name={workspace.name}
              imageUri={workspace.imageUri}
              storageKey="desktopMode"
              workspaceId={JSON.parse(JSON.stringify(workspace?._id))}
            />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
};

export default SideNav;
