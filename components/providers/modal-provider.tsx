import CreateBoardModal from "../modals/create-board"
import CreateWorkspaceModal from "../modals/create-workspace"



export const ModalProvider= () => {

    

    return (
        <>
            <CreateWorkspaceModal />
            <CreateBoardModal />
        </>
    )
}