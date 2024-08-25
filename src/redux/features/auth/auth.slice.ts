import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../store";
import { TUser } from "../../../interface/user.auth.interface";

interface TAuthState {
    user: null | TUser;
    token: null | string
}

const initialState: TAuthState = {
    user: null,
    token: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.user = user;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
        },
    }
})

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentToken = ((state: RootState) => state.auth.token);
export const useCurrentUser = ((state: RootState) => state.auth.user);