export type Album = {
	id: string;
	type: "albums";
	attributes: {
		name: string;
		year: number;
		"artist-id": number;
		artist: {
			id: string;
			twitter: string;
			name: string;
		};
	};
};
