import { IFriend } from '@/types/profiles.types';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    friend_list: <IFriend[]>[],
};

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {
        setFriends: (state, action) => {
            state.friend_list = [...action.payload]
        },
        addFriend: (state, action) => {
            state.friend_list.push(action.payload);
        },
        removeFriend: (state, action) => {
            const friend_id = action.payload;
            state.friend_list.filter((friend) => friend.id !== friend_id)
        },
    },
})

export const { setFriends, addFriend, removeFriend } = friendSlice.actions
export default friendSlice.reducer;
