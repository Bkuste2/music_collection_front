import { Tooltip as AntdTooltip, TooltipProps } from "antd";
import React from "react";

type Props = {
	/** The text shown in the tooltip */
	title: React.ReactNode | (() => React.ReactNode);
	/** The position of the tooltip relative to the target,
	 * which can be one of top left right bottom topLeft topRight
	 * bottomLeft bottomRight leftTop leftBottom rightTop rightBottom */
	placement?: TooltipProps["placement"];
	children?: React.ReactNode;
};

export const Tooltip = (props: Props) => {
	return <AntdTooltip {...props} />;
};
