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

import authSlice from './features/auth/auth.slice';
import dropdownSlice from './features/dropdown/dropdown.slice';

const rootReducers = combineReducers({
    dropdown: dropdownSlice,
    auth: authSlice,
});

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
    blacklist: ['dropdown'],
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
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
