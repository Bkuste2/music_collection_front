import { Input as AntdInput, Form, InputRef } from "antd";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import React, { ChangeEventHandler } from "react";
import { Rule } from "./types.ts";

export type Props = {
	/** If allow to remove input content with clear icon */
	allowClear?: boolean;
	/** The max length */
	maxLength?: number;
	/** The type of input */
	type?: "text" | "password" | "email";
	/** Whether the input is disabled */
	disabled?: boolean;
	/** Label text */
	label?: React.ReactNode;
	/** Field name */
	name: AntdFormItemProps["name"];
	/** Rules for field validation */
	rules?: Rule[];
	placeholder?: string;
	/** The input content value */
	value?: string | ReadonlyArray<string> | number;
	/** Callback when user input */
	onChange?: ChangeEventHandler<HTMLInputElement>;
	/** Whether can paste in the field */
	paste?: boolean;
	className?: string;
};

export const TextField = React.forwardRef(
	({ label, name, rules, ...props }: Props, ref: React.Ref<InputRef>) => {
		return (
			<Form.Item label={label} name={name} rules={rules}>
				<AntdInput size="large" {...props} ref={ref} />
			</Form.Item>
		);
	},
);
