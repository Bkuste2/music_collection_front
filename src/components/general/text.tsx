import { Typography } from "antd";
import { CSSProperties, useMemo } from "react";
import { COLORS, Colors } from "@/consts/colors.ts";

export type Props = {
	/** The content text */
	label: string;
	/** Set the font size */
	size?: "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl" | "xxxl";
	/* Set the text type */
	type?: "secondary" | "success" | "warning" | "danger" | undefined;
	/** Set the text color */
	color?: CSSProperties["color"] | Colors;
	weight?: "medium" | "semibold" | "bold";
	/** Text horizontal alignment */
	align?: "left" | "center" | "right";
	/* Underlined style */
	underline?: boolean;
	className?: string;
};

export const Text = ({
	label,
	color,
	weight,
	size = "sm",
	align,
	...props
}: Props) => {
	const style = useMemo(() => {
		return {
			fontSize: {
				xxs: 8,
				xs: 10,
				sm: 12,
				md: 14,
				lg: 16,
				xl: 18,
				xxl: 20,
				xxxl: 24,
			}[size],
			...(weight && {
				fontWeight: { medium: 500, semibold: 600, bold: 700 }[weight],
			}),
			...(align && {
				textAlign: align,
			}),
			color: COLORS[color as Colors]?.[500] ?? color ?? COLORS.GREY[900],
		};
	}, [size, weight, align, color]);

	return (
		<Typography.Text {...props} style={style}>
			{label}
		</Typography.Text>
	);
};
