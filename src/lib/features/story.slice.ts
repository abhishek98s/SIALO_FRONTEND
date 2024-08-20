import { IStoryObject } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    story_list: <IStoryObject[]>[],
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
    },
})

export const { setStory, addStory } = storySlice.actions
export default storySlice.reducer;
