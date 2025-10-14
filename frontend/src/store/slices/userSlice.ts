import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "../../types/user.types";

const initialState: UserState = {
	name: "",
	email: "",
	avatarUrl: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.avatarUrl = action.payload.avatarUrl;
		},
		clearUser() {
			return initialState;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
