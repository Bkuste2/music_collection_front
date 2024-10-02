import { useQuery } from "@tanstack/react-query";
import { List as AntdList, Avatar, Button, Typography } from "antd";
import { artistService } from "@/services/artist.service.ts";
import React from "react";
import { Artist } from "@/types/artist.model.ts";
import { notification } from "@/services/default/notification.ts";

export const Artists: React.FC = () => {
	const { data, isFetched } = useQuery<Artist[]>({
		queryKey: ["get-all-artists"],
		queryFn: artistService.getAll,
	});

	return (
		<main className="flex h-[85vh] w-full items-center justify-center">
			<div className="h-2/5 w-1/2">
				{isFetched ? (
					data && data.length > 0 ? (
						<>
							<Typography.Title level={1} className="self-start text-white">
								Artists
							</Typography.Title>
							<div className="h-full overflow-y-auto pr-10">
								<AntdList<Artist>
									dataSource={data}
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
					) : (
						<Typography.Paragraph className="text-white">No artists found.</Typography.Paragraph>
					)
				) : (
					<Typography.Paragraph className="text-white">Loading...</Typography.Paragraph>
				)}
			</div>
		</main>
	);
};
