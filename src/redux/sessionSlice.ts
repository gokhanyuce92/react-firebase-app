import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
    uid: string;
    email?: string | null;
    displayName?: string | null;
}

interface SessionState {
    isLoggedIn: boolean;
    user: User | null;
}

function getUserFromLocalStorage(): User | null {
    try {
        const userStr = localStorage.getItem("user");
        if (!userStr) return null;
        return JSON.parse(userStr);
    } catch {
        return null;
    }
}

const initialState: SessionState = {
    isLoggedIn: !!getUserFromLocalStorage(),
    user: getUserFromLocalStorage(),
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        logOut: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("user");
        },
    },
});

export const { logIn, logOut } = sessionSlice.actions;
export default sessionSlice.reducer;
