import { Space as AntdSpace } from "antd";
import React from "react";

type SpaceSize = "small" | "middle" | "large" | undefined | number;

type Props = {
	/** The space size */
	size?: SpaceSize | [SpaceSize, SpaceSize];
	/** The space direction */
	direction?: "horizontal" | "vertical";
	/** Align items */
	align?: "start" | "end" | "center" | "baseline";
	/** Justify content */
	justify?: "start" | "end" | "center";
	/** Set split */
	split?: React.ReactNode;
	/** Auto wrap line, when horizontal effective */
	wrap?: boolean;
	children?: React.ReactNode;
	className?: string;
};

export const Space = ({ justify, ...props }: Props) => {
	return (
		<AntdSpace {...props} style={{ width: "100%", justifyContent: justify }} />
	);
};
