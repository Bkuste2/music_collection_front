import { Avatar as AntdAvatar } from "antd";
import React from "react";
import { COLORS } from "@/consts/colors.ts";
import { Icon } from "../general/icon";

type Props = {
	/** This attribute defines the alternative text describing the image */
	alt?: string;
	/** The shape of avatar */
	shape?: "circle" | "square";
	/** The size of the avatar */
	size?: "large" | "small" | number;
	/**    The address of the image for an image avatar or image element */
	src?: string | React.ReactNode;
	/**    Custom icon type for an icon avatar */
	className?: string;
	icon?: React.ReactNode;
};

export const Avatar = ({ icon, ...props }: Props) => {
	return (
		<AntdAvatar
			style={{ background: COLORS.PRIMARY[50], lineHeight: "28px" }}
			{...props}
			icon={icon || <Icon name="LuUser" color={COLORS.PRIMARY[700]} />}
		/>
	);
};
