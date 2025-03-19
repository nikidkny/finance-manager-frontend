import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./../users/userSlice";
import entryReducer from "./../entries/entrySlice";
import categroyReducer from "./../categories/categorySlice";

export const store = configureStore({
  reducer: {
    category: categroyReducer,
    user: userReducer,
    entry: entryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
