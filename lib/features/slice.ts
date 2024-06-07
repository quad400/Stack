import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    workspaces: [],
    user: null,
}

const slice = createSlice({
    name: "slicers",
    initialState,
    reducers: {
        setWorkspaces(state, action) {
            state.workspaces = action.payload;
        },
        setUser(state, action) {
            state.user = action.payload;
        },
    }
})

export const { setWorkspaces, setUser } = slice.actions

export default slice.reducer
