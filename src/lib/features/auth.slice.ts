import { IUser } from '@/types/auth.types';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: <IUser | null>null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setUser, logout } = authSlice.actions

export default authSlice.reducer; // EXPORT Slice reducer

