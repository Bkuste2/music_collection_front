import { Button as AntdButton, ButtonProps } from "antd";
import React from "react";
import { Tooltip } from "../data-display/tooltip.tsx";

export type Props = Omit<ButtonProps, "type" | "danger"> & {
	/** The text that will be displayed on the button */
	label?: string;
	/** The button style variations */
	type?: "outline" | "fill" | "text";
	/** The button style variations */
	variant?: "primary" | "danger";
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Whether the button is loading */
	loading?: boolean;
	/** The icon that will be displayed inside the button and next to the text */
	icon?: React.ReactNode;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	/** Whether the button type will be the default: button or submit */
	htmlType?: "button" | "submit";
	block?: boolean;
	tooltip?: string;
};

export const Button = ({
	label,
	type = "fill",
	block,
	tooltip,
	...props
}: Props) => {
	const buttonType = {
		outline: "default",
		fill: "primary",
		text: "text",
	}[type] as ButtonProps["type"];

	return tooltip ? (
		<Tooltip title={tooltip}>
			<AntdButton {...props} type={buttonType}>
				{label}
			</AntdButton>
		</Tooltip>
	) : (
		<AntdButton
			{...props}
			type={buttonType}
			danger={props.variant === "danger"}
		>
			{label}
		</AntdButton>
	);
};
