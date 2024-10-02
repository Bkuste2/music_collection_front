import { message as antMessage } from "antd";

export const notification = (
	message: string,
	type: "error" | "success" | "info",
	options?: { duration: number },
) => {
	antMessage[type]({
		content: message,
		duration: options?.duration,
		type,
	});
};
