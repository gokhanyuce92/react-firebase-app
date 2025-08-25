import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import sessionReducer from "./sessionSlice";
import todoReducer from "./todoSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        session: sessionReducer,
        todo: todoReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
