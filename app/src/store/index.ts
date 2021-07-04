import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { AuthReducer } from "./reducer/auth";
import { PostReducer } from "./reducer/post";
import { UserPostReducer } from "./reducer/user-posts";

const persistConfig = {
  //...
  key: "keepaway1147++",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: AuthReducer,
  posts: PostReducer,
  user_posts: UserPostReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export type AppState = ReturnType<typeof rootReducer>;
