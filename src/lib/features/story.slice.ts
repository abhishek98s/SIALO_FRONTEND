import { IStory } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    story_list: <IStory[]>[],
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
        removeStory: (state, action) => {
            const story_id = action.payload;
            state.story_list.filter((story) => story.id !== story_id)
        },
    },
})

export const { setStory, addStory, removeStory } = storySlice.actions
export default storySlice.reducer;
