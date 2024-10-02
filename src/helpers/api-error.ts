import { get } from "lodash";

export class ApiError extends Error {
	constructor(error: unknown) {
		super();

		this.message = get(error, "response.data.message", "Unexpected Error");
		this.name = get(error, "response.data.error", "unexpected_error");

		if (typeof Error.captureStackTrace === "function") {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
