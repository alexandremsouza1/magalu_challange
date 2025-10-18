import type { UserState } from "../../../types/user.types";
import reducer, { clearUser, setUser } from "../userSlice";

describe("userSlice", () => {
	const initialState: UserState = {
		name: "",
		email: "",
		avatarUrl: "",
	};

	const mockUser: UserState = {
		name: "João Silva",
		email: "joao@example.com",
		avatarUrl: "https://example.com/avatar.jpg",
	};

	it("should return the initial state", () => {
		expect(reducer(undefined, { type: "unknown" })).toEqual(initialState);
	});

	it("should handle setUser", () => {
		const nextState = reducer(initialState, setUser(mockUser));

		expect(nextState.name).toBe(mockUser.name);
		expect(nextState.email).toBe(mockUser.email);
		expect(nextState.avatarUrl).toBe(mockUser.avatarUrl);
	});

	it("should handle setUser with partial data", () => {
		const partialUser: UserState = {
			name: "Maria",
			email: "",
			avatarUrl: "",
		};

		const nextState = reducer(initialState, setUser(partialUser));

		expect(nextState.name).toBe("Maria");
		expect(nextState.email).toBe("");
		expect(nextState.avatarUrl).toBe("");
	});

	it("should handle clearUser", () => {
		const stateWithUser = reducer(initialState, setUser(mockUser));

		expect(stateWithUser.name).toBe(mockUser.name);

		const clearedState = reducer(stateWithUser, clearUser());

		expect(clearedState).toEqual(initialState);
		expect(clearedState.name).toBe("");
		expect(clearedState.email).toBe("");
		expect(clearedState.avatarUrl).toBe("");
	});

	it("should update user data when calling setUser multiple times", () => {
		const firstUser: UserState = {
			name: "User 1",
			email: "user1@example.com",
			avatarUrl: "avatar1.jpg",
		};

		const secondUser: UserState = {
			name: "User 2",
			email: "user2@example.com",
			avatarUrl: "avatar2.jpg",
		};

		let state = reducer(initialState, setUser(firstUser));
		expect(state.name).toBe("User 1");

		state = reducer(state, setUser(secondUser));
		expect(state.name).toBe("User 2");
		expect(state.email).toBe("user2@example.com");
		expect(state.avatarUrl).toBe("avatar2.jpg");
	});
});
