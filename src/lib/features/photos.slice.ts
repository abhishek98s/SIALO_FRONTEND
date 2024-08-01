import { IUserPhoto } from '@/types/profiles.types';
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user_photos_list: <IUserPhoto[]>[],
};

export const photoSlice = createSlice({
    name: 'photo',
    initialState,
    reducers: {
        setUserPhotos: (state, action) => {
            state.user_photos_list = [...action.payload]
        },
        addPhoto: (state, action) => {
            state.user_photos_list.push(action.payload);
        },
        removePhoto: (state, action) => {
            const photo_id = action.payload;
            state.user_photos_list.filter((photo) => photo.id !== photo_id)
        },
    },
})

export const { setUserPhotos, addPhoto, removePhoto } = photoSlice.actions
export default photoSlice.reducer;
