import { IFriend } from '@/types/profiles.types';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search_users_list: <IFriend[]>[],
};

export const searchUserSlice = createSlice({
    name: 'search_user',
    initialState,
    reducers: {
        setSearchUser: (state, action) => {
            state.search_users_list = [...action.payload]
        },
        addSearchUser: (state, action) => {
            state.search_users_list.push(action.payload);
        },
        removeSearchUser: (state, action) => {
            const search_user_id = action.payload;
            state.search_users_list.filter((search_user) => search_user.id !== search_user_id)
        },
    },
})

export const { setSearchUser, addSearchUser, removeSearchUser } = searchUserSlice.actions
export default searchUserSlice.reducer;
