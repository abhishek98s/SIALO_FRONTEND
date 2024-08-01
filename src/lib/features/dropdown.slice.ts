import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    openDropdowns: <string[]>[],
};

export const dropdownSlice = createSlice({
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

export const { openDropdown, closeDropdown, toggleDropdown } = dropdownSlice.actions
export default dropdownSlice.reducer;
