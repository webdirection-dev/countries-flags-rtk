import {configureStore, combineReducers} from "@reduxjs/toolkit"
import {themeReducer} from "./features/theme/theme-slice"
import {controlsReducer} from "./features/controls/controls-slice"
import {countriesReducer} from "./features/countries/countries-slice";

import axios from "axios";
import * as api from './config'

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

import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['theme', 'countries'],
}

const rootReducer = combineReducers({
    theme: themeReducer,
    controls: controlsReducer,
    countries: countriesReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,

    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            },
        },

        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),

    devTools: true,
})

export const persistor = persistStore(store)