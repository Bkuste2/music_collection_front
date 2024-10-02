import { Row as AntdRow } from "antd";
import { ReactNode, Ref, forwardRef } from "react";

type Props = {
	/** Vertical alignment */
	align?: "top" | "middle" | "bottom" | "stretch";
	/**
	 * Spacing between grids, could be a number or a object like
	 * { xs: 8, sm: 16, md: 24}. Or you can use array to make horizontal
	 * and vertical spacing work at the same time [horizontal, vertical]
	 */
	gutter?:
		| number
		| [number, number]
		| Partial<Record<"xxl" | "xl" | "lg" | "md" | "sm" | "xs", number>>;
	/** Horizontal arrangement */
	justify?: "start" | "end" | "center" | "space-around" | "space-between";
	/** Auto wrap line */
	wrap?: boolean;
	children?: ReactNode;
};

export const Row = forwardRef(
	(
		{ gutter = { xs: 8, sm: 16, md: 24, lg: 32 }, ...props }: Props,
		ref: Ref<HTMLDivElement>,
	) => {
		return <AntdRow {...props} gutter={gutter} ref={ref} />;
	},
);
