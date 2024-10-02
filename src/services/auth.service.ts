import { api } from "@/assets/configs/axios.ts";
import { User } from "@/types/user.model";

export type LoginProps = {
	username: string;
	password: string;
};

class AuthService {
	async login(data: LoginProps): Promise<{ access_token: string }> {
		const response = await api.post("/auth/login", data);
		return response.data;
	}

	async profile(): Promise<User> {
		const response = await api("/auth/profile");
		const user = response.data.data;
		return user;
	}
}

export const authService = new AuthService();
