import { createSlice } from "@reduxjs/toolkit"
import type { IUserType } from "@/interfaces"
const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUserData: null,
        currentUserId: ''
    },
    reducers: {
        SetCurrentUserData: (state, action) => {
            state.currentUserData = action.payload
        },
        SetCurrentUserId: (state, action) => {
            state.currentUserId = action.payload
        }
    }
})


export const { SetCurrentUserData, SetCurrentUserId } = userSlice.actions

export default userSlice

export interface UserState {
    currentUserData: IUserType | null,
    currentUserId: string
}