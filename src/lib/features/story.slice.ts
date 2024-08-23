import { IStoryObject } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

interface IUserProfile {
    userId: string,
    userName: string,
    userImage: string,
}
interface IStoriesArr {
    caption: string,
    story_image: string,
    story_id: string,
    date?: string,
}


const initialState = {
    story_list: <IStoryObject[]>[],
    isOpen: false,

    userProfile: <IUserProfile>{},
    stories: <IStoriesArr[]>[],
    currentIndex: <number>0, // or a separate state variable for current story index
    nextUserId: <string | null>null, // for fetching next user stories

};

export const storySlice = createSlice({
    name: 'story',
    initialState,
    reducers: {
        setStory: (state, action) => {
            state.story_list = [...action.payload]
        },
        addStory: (state, action) => {
            state.story_list.push(action.payload);
        },
        openStoryModal: (state) => {
            state.isOpen = true;
        },
        closeStoryModal: (state) => {
            state.isOpen = false;
            state.nextUserId = null;
            state.currentIndex = 0;
        },

        populateUserProfile: (state, action: { payload: IUserProfile }) => {
            state.userProfile = action.payload;
        },

        populateStories: (state, action: { payload: IStoriesArr[] }) => {
            state.stories = action.payload;
        },

        setCurrentIndex: (state) => {
            state.story_list.findIndex((story) => story.user_id === state.nextUserId)
        },
        setNextUserId: (state, action: { payload: string }) => {
            const currentIndex = state.story_list.findIndex((story) => story.user_id === action.payload);
            if (currentIndex < state.story_list.length - 1) {
                const index = state.story_list[currentIndex + 1].user_id;
                state.nextUserId = index;
            } else {
                state.nextUserId = null;
            }
        },
        clearCurrentIndex: (state) => {
            state.currentIndex = 0;
        },
    },
})

export const { setStory, addStory, openStoryModal, closeStoryModal, populateUserProfile, populateStories, setCurrentIndex, setNextUserId, clearCurrentIndex } = storySlice.actions
export default storySlice.reducer;
