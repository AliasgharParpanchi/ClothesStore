import { configureStore , combineReducers} from "@reduxjs/toolkit";
import adminReducer from "./adminRedux";
import productReducer from "./productRedux";
import orderReducer from "./orderRedux";
import userReducer from "./userRedux";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootRedux = combineReducers({
    admin: adminReducer,
    product: productReducer,
    order: orderReducer,
    user: userReducer
})
  
const persistedReducer = persistReducer(persistConfig, rootRedux)


export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);