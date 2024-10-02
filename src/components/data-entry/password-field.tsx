import { Input as AntdInput, Form } from "antd";
import { FormItemProps as AntdFormItemProps } from "antd/lib/form/FormItem";
import { useCallback } from "react";
import { Icon } from "../general/icon.tsx";
import { Rule } from "./types.ts";

type Props = {
	/** Label text */
	label?: string;
	/** If allow to remove input content with clear icon */
	allowClear?: boolean;
	/** Whether the input is disabled */
	disabled?: boolean;
	/** Field name */
	name: AntdFormItemProps["name"];
	/** Rules for field validation */
	rules?: Rule[];
	className?: string;
};

export const PasswordField = ({ label, name, rules, ...props }: Props) => {
	const handlePasswordToggle = useCallback((visible: boolean) => {
		return visible ? (
			<Icon name="LuEye" color="#636e72" />
		) : (
			<Icon name="LuEyeOff" color="#636e72" />
		);
	}, []);

	return (
		<Form.Item label={label} name={name} rules={rules}>
			<AntdInput.Password
				size="large"
				{...props}
				iconRender={handlePasswordToggle}
			/>
		</Form.Item>
	);
};
