import { api } from "@/assets/configs/axios.ts";
import { Artist } from "@/types/artist.model.ts";

class ArtistService {
	async getAll(): Promise<Artist[]> {
		const { data } = await api("/artists");
		return data;
	}
}

export const artistService = new ArtistService();
