import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import dropdownSlice from './features/dropdown.slice';
import authSlice from './features/auth.slice';
import storySlice from './features/story.slice';
import feedSlice from './features/feed.slice';
import friendSlice from './features/friends.slice';
import photoSlice from './features/photos.slice';

const rootReducers = combineReducers({
    dropdown: dropdownSlice,
    auth: authSlice,
    story: storySlice,
    feed: feedSlice,
    friend: friendSlice,
    photo: photoSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ["dropdown", "story", "feed", "friend"],
}

const persistedReducer = persistReducer(persistConfig, rootReducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },

        }),

});

let persistor = persistStore(store)

export { persistor, store };
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
