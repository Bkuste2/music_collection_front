interface Album {
	id: number;
	name: string;
	year: number;
	artist_id: number;
	user_id: number;
	created_at: string;
	updated_at: string;
}

interface UserAttributes {
	role: "user" | "admin";
	"full-name": string;
	username: string;
	password: string;
	albums: Album[];
	"created-at": string;
	"updated-at": string;
}

export interface User {
	id: string;
	type: "users";
	attributes: UserAttributes;
}
