import { List as AntdList } from "antd";
import { ReactNode } from "react";

export type ListProps<T> = {
	/** data for the list */
	data: T[];
	/** function to render the list item */
	renderItem: (item: T, index: number) => ReactNode;
};

export const List = <T,>({ data, renderItem }: ListProps<T>) => (
	<AntdList
		itemLayout="horizontal"
		dataSource={data}
		renderItem={renderItem}
	/>
);
