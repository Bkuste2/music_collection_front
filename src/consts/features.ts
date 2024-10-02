import React from "react";
import { Artists } from "@/features/artists";
import { Albums } from "@/features/albums";
import { AlbumForm } from "@/features/albums/components/album-form.tsx";

export type Feature = {
	title: string;
	path: string;
	component: React.FC;
	children?: Feature[];
	hidden?: boolean;
};

export const FEATURES: Feature[] = [
	{
		title: "Artists",
		path: "/",
		component: Artists,
	},
	{
		title: "Albums",
		path: "/albums",
		component: Albums,
		children: [
			{
				title: "Create Album",
				path: "create",
				component: AlbumForm,
			},
			{
				title: "Edit Album",
				path: ":id/edit",
				component: AlbumForm,
			}
		]
	},
];
