import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isAuthenticated: false,
}

export const counterSlice = createSlice({
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
export const { setUser, logout } = counterSlice.actions

export default counterSlice.reducer; // EXPORT Slice reducer

