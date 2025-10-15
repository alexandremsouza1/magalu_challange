import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import artistsReducer from "./slices/artistsSlice";
import menuReducer from "./slices/menusSlice";
import userReducer from "./slices/userSlice";
import playlistsReducer from "./slices/playlistSlice";

const rootReducer = combineReducers({
	user: userReducer,
	menu: menuReducer,
	artists: artistsReducer,
	playlists: playlistsReducer,
});

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
