import { IStoryObject } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

interface IUserProfile {
    userId: string,
    userName: string,
    userImage: string,
}
interface IStoriesArr {
    user_id: string,
    user_name: string,
    user_image: string,
    date: string,

    caption: string,
    story_image: string,
    story_id: string,
}


const initialState = {
    story_list: <IStoryObject[]>[],
    isOpen: false,

    userProfile: <IUserProfile>{},
    stories: <IStoriesArr[]>[],
    currentIndex: <number>0, // or a separate state variable for current story index
    nextUserId: <string | null>null, // for fetching next user stories
    previousUserId: <string | null>null,

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
        populateStories: (state, action: { payload: IStoriesArr[] }) => {
            state.stories = action.payload;
        },

        setCurrentIndex: (state, action: { payload: string }) => {
            state.currentIndex = state.story_list.findIndex((story) => story.user_id === action.payload);
        },
        setNextUserId: (state, action: { payload: string }) => {
            if (state.currentIndex < state.story_list.length - 1) {
                state.nextUserId = state.story_list[state.currentIndex + 1].user_id;
                
                state.currentIndex = state.story_list.findIndex((story) => story.user_id === action.payload);
                console.log('slice ok', state.nextUserId)
            } else {
                state.nextUserId = null;
            }
        },
        setPreviousUserId: (state, action: { payload: string }) => {
            if (state.currentIndex > 0) {
                state.previousUserId = state.story_list[state.currentIndex - 1].user_id;
                state.currentIndex = state.story_list.findIndex((story) => story.user_id === action.payload);

            } else {
                state.previousUserId = null;
            }
        },
    },
})

export const { setStoryList, setCurrentIndex, openStoryModal, closeStoryModal, populateStories, setNextUserId, setPreviousUserId } = storySlice.actions
export default storySlice.reducer;
