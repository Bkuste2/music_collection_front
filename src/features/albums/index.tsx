import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { List } from "@components/data-display/list.tsx";
import { Avatar, Button, List as AntdList, Popconfirm, Typography } from "antd";
import React from "react";
import { albumsService } from "@/services/albumsService.ts";
import { Album } from "@/types/album.model.ts";
import { Outlet, useNavigate } from "react-router-dom";
import { notification } from "@/services/default/notification.ts";
import { useAuth } from "@/contexts/auth-context.tsx";

export const Albums: React.FC = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const { data, isFetched } = useQuery<Album[]>({
		queryKey: ["get-all-albums"],
		queryFn: albumsService.getAll,
	});

	const removeMutation = useMutation({
		mutationFn: ({ id }: { id: string }) => albumsService.delete(id),
		onSuccess: () => {
			notification(`Register deleted with success`, "success");
			queryClient.invalidateQueries({ queryKey: ["get-all-albums"] });
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		},
	});

	if (!user) {
		return;
	}

	return (
		<>
			<main className="flex h-[85vh] w-full items-center justify-center">
				<div className="h-2/5 w-1/2">
					{isFetched && data && Array.isArray(data) && (
						<>
							<div className="flex items-center justify-between pr-12">
								<Typography.Title level={1} className="self-start text-white">
									Albums
								</Typography.Title>

								<Button onClick={() => navigate(`/albums/create`)}>+</Button>
							</div>
							<div className="h-full overflow-y-auto pr-10">
								<List<Omit<Album["attributes"], "artist-id"> & { id: string }>
									data={
										data.map(({ id, attributes }) => ({
											id,
											name: attributes.name,
											year: attributes.year,
											artist: attributes.artist,
										})) ?? []
									}
									renderItem={(item, index) => (
										<AntdList.Item
											actions={[
												<Button
													onClick={() => navigate(`/albums/${item.id}/edit`)}
												>
													edit
												</Button>,

												<Popconfirm
													placement="topRight"
													title="Are you sure you want to delete this album?"
													description="This action cannot be undone."
													okText="Yes"
													cancelText="No"
													onConfirm={() =>
														removeMutation.mutate({ id: item.id })
													}
												>
													<Button>remove</Button>
												</Popconfirm>,
											]}
										>
											<AntdList.Item.Meta
												avatar={
													<Avatar
														src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
													/>
												}
												title={item.name}
												description={`${item.artist.name} - ${item.year}`}
											/>
										</AntdList.Item>
									)}
								/>
							</div>
						</>
					)}
				</div>
			</main>
			<Outlet />
		</>
	);
};
