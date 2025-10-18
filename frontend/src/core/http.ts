import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type CreateAxiosDefaults,
} from "axios";
import { toast } from "react-toastify";
import { useAuthStore } from "../stores/AuthStore";
import { goTo } from "../utils/navigate";

export default class HttpClient {
	private instance: AxiosInstance;

	constructor(config?: CreateAxiosDefaults) {
		this.instance = axios.create(config);
		this.setInterceptors();
	}

	private setInterceptors() {
		this.instance.interceptors.request.use((config) => {
			const token = localStorage.getItem("access_token");

			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}

			return config;
		});

		this.instance.interceptors.response.use(
			(response) => response,
			async (error) => {
				if (error.response.data) {
					const msg =
						error.response.data.details[0] || error.response.data.message;
					toast.error(msg, {
						toastId: "global-error",
					});
				}

				if (error.response.status === 401) {
					useAuthStore.getState().logout();
					goTo("/login", { replace: true });
				}

				return Promise.reject(error);
			},
		);
	}

	send<T>(config: AxiosRequestConfig<T>) {
		return this.instance.request(config);
	}
}
