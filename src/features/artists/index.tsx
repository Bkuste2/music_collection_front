import { useQuery } from "@tanstack/react-query";
import { List } from "@components/data-display/list.tsx";
import { Avatar, Button, List as AntdList, Typography } from "antd";
import { artistService } from "@/services/artist.service.ts";
import React from "react";
import { Artist } from "@/types/artist.model.ts";
import { notification } from "@/services/default/notification.ts";

export const Artists: React.FC = () => {
	const { data, isFetched } = useQuery({
		queryKey: ["get-all-artists"],
		queryFn: artistService.getAll,
	});

	return (
		<main className="flex h-[85vh] w-full items-center justify-center">
			<div className="h-2/5 w-1/2">
				{isFetched && (
					<>
						<Typography.Title level={1} className="self-start text-white">
							Artists
						</Typography.Title>
						<div className="h-full overflow-y-auto pr-10">
							<List<Artist>
								data={data}
								renderItem={(item, index) => (
									<AntdList.Item
										actions={[
											<Button
												onClick={() =>
													notification("Just to improve template", "success")
												}
											>
												Details
											</Button>,
										]}
									>
										<AntdList.Item.Meta
											avatar={
												<Avatar
													src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
												/>
											}
											title={<a href="https://ant.design">{item.name}</a>}
											description={item.twitter}
										/>
									</AntdList.Item>
								)}
							/>
						</div>
					</>
				)}
			</div>
		</main>
	);
};
