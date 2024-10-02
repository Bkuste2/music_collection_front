import { Spin as AntdSpin } from "antd";
import React from "react";

type SpinProps = {
	/** Specifies a delay in milliseconds for loading state (prevent flush) (milliseconds) */
	delay?: number;
	/** Whether Spin is visible */
	spinning?: boolean;
	/** The size of Spin */
	size?: "default" | "small" | "large";
	children?: React.ReactNode;
};

export const Spin = (props: SpinProps) => {
	return <AntdSpin {...props} />;
};
