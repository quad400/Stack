"use client"

import { useModal } from "@/hooks/use-modal-store"
import { Button } from "../ui/button"


const NoWorkspace = () => {

    const {onOpen} = useModal()

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="flex flex-col justify-center items-center mb-6">
            <h1 className="font-semibold text-2xl text-neutral-900">No workspace</h1>
            <p>You don't have any workspace yet. Create one to get started.</p>
        </div>
        <Button onClick={()=> onOpen("createWorkspace")} variant="primary" size="lg">Create Workspace</Button>
    </div>
  )
}

export default NoWorkspace