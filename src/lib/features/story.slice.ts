import { IStoryObject } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

interface IUserProfile {
    userId: string,
    userName: string,
    userImage: string,
}
interface IStoriesArr {
    storyId: string,
    storyImage: string,
    dateInHr: string,
}


const initialState = {
    story_list: <IStoryObject[]>[],
    isOpen: false,

    userProfile: <IUserProfile>{},
    stories: <IStoriesArr[]>[],
    currentIndex: 0, // or a separate state variable for current story index
    nextUserId: <string>'', // for fetching next user stories

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
        },

        populateUserProfile: (state, action: { payload: IUserProfile }) => {
            state.userProfile = action.payload;
        },

        populateStories: (state, action: { payload: IStoriesArr[] }) => {
            state.stories = action.payload;
        },
    },
})

export const { setStory, addStory, openStoryModal, closeStoryModal, populateUserProfile, populateStories } = storySlice.actions
export default storySlice.reducer;
