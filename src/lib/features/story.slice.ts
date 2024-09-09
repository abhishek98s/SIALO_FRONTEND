import { IStoryObject } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

interface IUserProfile {
    userId: string,
    userName: string,
    userImage: string,
}

const initialState = {
    story_list: <IStoryObject[]>[],
    isOpen: false,

    nextUserId: <string | null>null,
    currentUserId: <string | null>null,
    previousUserId: <string | null>null,

    userProfile: <IUserProfile>{},
    currentIndex: <number>0, // or a separate state variable for current story index
};

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStoryList: (state, action) => {
            state.story_list = [...action.payload]
        },
        openStoryModal: (state) => {
            state.isOpen = true;
        },
        closeStoryModal: (state) => {
            state.isOpen = false;
            state.nextUserId = null;
            state.currentIndex = 0;
        },
        setCurrentUserId: (state, action: { payload: string }) => {
            state.currentUserId = action.payload;
        },

        setUsersId: (state, action: { payload: string }) => {
            const currentUserIndex = state.story_list.findIndex((story) => story.user_id === action.payload);

            if (currentUserIndex === -1) {
                // Handle the case where the user ID is not found in the story list
                return;
            }

            state.currentUserId = action.payload;

            if (currentUserIndex > 0) {
                state.previousUserId = state.story_list[currentUserIndex - 1].user_id;
            } else {
                state.previousUserId = null;
            }

            if (currentUserIndex < state.story_list.length - 1) {
                state.nextUserId = state.story_list[currentUserIndex + 1].user_id;
            } else {
                state.nextUserId = null;
            }
        },

        setCurrentIndex: (state, action: { payload: string }) => {
            state.currentIndex = state.story_list.findIndex((story) => story.user_id === action.payload);
        },
       
    },
})

export const { setStoryList, setCurrentIndex, openStoryModal, closeStoryModal, setCurrentUserId, setUsersId } = storySlice.actions
export default storySlice.reducer;
