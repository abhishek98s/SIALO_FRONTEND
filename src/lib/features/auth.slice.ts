import { IUser } from '@/types/auth.types';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: <IUser | null>null,
    token: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
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
export const { setToken, setUser, logout } = authSlice.actions

export default authSlice.reducer; // EXPORT Slice reducer

