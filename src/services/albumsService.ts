import { api } from "@/assets/configs/axios.ts";
import { Album } from "@/types/album.model.ts";

export type CreateDTO = {
	name: string;
	artist_id: string;
	year: number;
	user_id: string;
};

class AlbumService {
	async getAll(): Promise<Album[]> {
		const response = await api("/albums");
		return response.data.data;
	}

	async getById(id: string) {
		return api(`/albums/${id}`);
	}

	async create(data: CreateDTO) {
		return api.post("/albums", data);
	}

	async update(id: string, data: Partial<CreateDTO>) {
		return api.patch(`/albums/${id}`, data);
	}

	async delete(id: string) {
		return api.delete(`/albums/${id}`);
	}
}

export const albumsService = new AlbumService();
