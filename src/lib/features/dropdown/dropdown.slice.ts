import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openDropdowns: <string[]>[],
};

export const counterSlice = createSlice({
    name: 'dropdown',
    initialState,
    reducers: {
        openDropdown: (state, action) => {
            state.openDropdowns = [];
            state.openDropdowns.push(action.payload);
        },
        closeDropdown: (state) => {
            state.openDropdowns = [];
        },
        toggleDropdown: (state, action) => {
            if (state.openDropdowns.includes(action.payload)) {
                state.openDropdowns = state.openDropdowns.filter((str) => str !== action.payload);
            } else {
                state.openDropdowns = [];
                state.openDropdowns.push(action.payload);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { openDropdown, closeDropdown, toggleDropdown } = counterSlice.actions

export default counterSlice.reducer; // EXPORT Slice reducer
