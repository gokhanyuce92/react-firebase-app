import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from "./loadingSlice";
import sessionReducer from "./sessionSlice";

export const store = configureStore({
    reducer: {
        loading: loadingReducer,
        session: sessionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
