import axios, { AxiosRequestConfig } from "axios";
import { ApiError } from "./api-error";
import { omit } from "lodash";
import qs from "qs";

export const request = async <T>({
	headers,
	url,
	params,
	...rest
}: AxiosRequestConfig): Promise<T> => {
	try {
		const response = await axios.request<T>({
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken")}`,
				...(headers || {}),
			},
			url: `${import.meta.env.VITE_API_URL}/${url}`,
			...rest,
			params: {
				...omit(params, "params"),
				...(params as { params?: T })?.params,
			},
			paramsSerializer: (p) => {
				return qs.stringify(p, { arrayFormat: "indices" });
			},
		});
		return response.data;
	} catch (e) {
		const error = e as Error;
		if (axios.isAxiosError(error)) {
			if (
				error.response &&
				error.response.status === 401 &&
				(!!localStorage.getItem("accessToken") ||
					!!sessionStorage.getItem("accessToken"))
			) {
				localStorage.clear();
				sessionStorage.clear();
				window.location.reload();
			}
		}
		throw new ApiError(error);
	}
};
