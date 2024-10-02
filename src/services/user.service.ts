import { api } from "@/assets/configs/axios.ts";
import { User } from "@/types/user.model.ts";

export type RegisterProps = {
	username: string;
	full_name: string;
	password: string;
};

class UserService {
	async create(data: RegisterProps): Promise<User> {
		const response = await api.post("/users", { ...data, role: "user" });
		return response.data.data;
	}

	async update(id: string, data: Partial<RegisterProps>): Promise<User> {
		const response = await api.patch(`/users/${id}`, data);
		return response.data.data;
	}
}

export const userService = new UserService();
