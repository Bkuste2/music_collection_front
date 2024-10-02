import { Form, InputNumber } from "antd";
import React from "react";
import { Rule } from "./types.ts";

type Props = {
	/**    The min value */
	min?: number;
	/** the max value */
	max?: number;
	/** Whether to show +- controls, or set custom arrows icon */
	controls?: boolean;
	/** Label text */
	label?: React.ReactNode;
	/** Field name */
	name: string;
	/**    Rules for field validation */
	rules?: Rule[];
	/** Whether the input is disabled */
	disabled?: boolean;
	/** The input default value  */
	defaultValue?: number;
	/** The placeholder */
	placeholder?: string;
};

export const NumberField = ({
	label,
	name,
	rules,
	defaultValue,
	...props
}: Props) => {
	return (
		<Form.Item label={label} name={name} rules={rules} className="w-full">
			<InputNumber
				size="large"
				{...props}
				className="w-full"
				defaultValue={defaultValue}
			/>
		</Form.Item>
	);
};
