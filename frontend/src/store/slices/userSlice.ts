import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

type UserState = {
	name: string;
	email: string;
};

const initialState: UserState = {
	name: "",
	email: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.name = action.payload.name;
			state.email = action.payload.email;
		},
		clearUser() {
			return initialState;
		},
	},
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
