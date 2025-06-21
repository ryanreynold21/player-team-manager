import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

import authReducer from "../slice/authSlice";
import teamsReducer from "../slice/teamsSlice";
import playersReducer from "../slice/playersSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "teams"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  teams: teamsReducer,
  players: playersReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
