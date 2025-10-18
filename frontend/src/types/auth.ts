import type { posthog } from "../posthog-config";
import type { GetUserProfile } from "./spotify";

export interface AuthState {
	user: GetUserProfile | null;
	posthogInstance: typeof posthog | null;
	logout: () => void;
	setUserProfile: (user: GetUserProfile) => void;
	setPostHogInstance: (posthogInstance: typeof posthog | null) => void;
}
