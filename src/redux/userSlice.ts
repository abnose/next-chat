import { createSlice } from "@reduxjs/toolkit"
import type { IUserType } from "@/interfaces"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUserData: null,
        currentUserId: '',
        onLineUsers: []
    },
    reducers: {
        SetCurrentUserData: (state, action) => {
            state.currentUserData = action.payload
        },
        SetCurrentUserId: (state, action) => {
            state.currentUserId = action.payload
        },
        SetOnLineUsers: (state, action) => {
            state.onLineUsers = action.payload
        }
    }
})


export const { SetCurrentUserData, SetCurrentUserId, SetOnLineUsers } = userSlice.actions

export default userSlice

export interface UserState {
    currentUserData: IUserType | null,
    currentUserId: string,
    onLineUsers: string[]
}