import { IFeed } from '@/types/home.types.';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    feed_list: <IFeed[]>[],
};

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setFeed: (state, action) => {
            state.feed_list = [...state.feed_list, ...action.payload]
        },
        deleteFeedById: (state, action) => {
            state.feed_list.filter(feed => feed.id !== action.payload)
        },
        addComment: (state, action) => {
            const { feed_id, comment_obj } = action.payload;
            const feed_index = state.feed_list.findIndex((feed) => feed.id === feed_id);

            if (!feed_index) return;

            state.feed_list[feed_index].comments.push(comment_obj);
        },
    },
})

export const { setFeed, deleteFeedById } = feedSlice.actions
export default feedSlice.reducer;
