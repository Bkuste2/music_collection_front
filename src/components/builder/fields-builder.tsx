import { useCallback, useEffect } from "react";

import { Form, FormInstance, SelectProps as AntdSelectProps } from "antd";
import { NumberField } from "../data-entry/number-field.tsx";
import { Select } from "../data-entry/select.tsx";
import { TextField } from "../data-entry/text-field.tsx";
import { Rule } from "../data-entry/types.ts";
import { PasswordField } from "../data-entry/password-field.tsx";
import { Column } from "@components/layout/column.tsx";

export type FieldsProps = {
	/** Label text */
	label?: string;
	/** Field name */
	name: string;
	/** The field to be shown */
	type: "text" | "password" | "select" | "number";
	/** on change event. Only set when not using inside a form */
	onChange?: (value: unknown, form: FormInstance) => void;
	/** query filters to fetch data. */
	query?: { [key: string]: unknown };
	/** Whether disabled field */
	disabled?: boolean;
	/** Show Search to Select Field */
	showSearch?: boolean;
	/** size of the field */
	size?:
		| number
		| {
				[key in "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl"]?:
					| string
					| number;
		  };
	/** Rules for field validation */
	rules?: Rule[];
	/** The placeholder of input */
	placeholder?: string;
	/** Set mode of Select */
	mode?: AntdSelectProps["mode"];
	/** Option Filter Prop to Search At Select  */
	optionFilterProp?: AntdSelectProps["optionFilterProp"];
	/** Select options. Will get better perf than jsx definition */
	options?: AntdSelectProps["options"];
	/** Value and Label to be shown as options of the select */
	resultTransformer?: { label: string; value: string };
	/** the type of file accepted when the field is file */
	accept?: "image" | "audio" | "pdf" | "svg";
	/** the min accepted value of number input */
	min?: number;
	/** the max accepted value of number input */
	max?: number;
	url?: string;
	/** The Select default value */
	initialValue?: AntdSelectProps["defaultValue"];
	allowClear?: boolean;
	returnMaskedValue?: boolean;
	form?: FormInstance;
};

export const FieldsBuilder = ({
	size,
	options,
	mode,
	initialValue,
	allowClear = true,
	min,
	accept = "image",
	max,
	url,
	resultTransformer = { label: "name", value: "id" },
	form,
	...props
}: FieldsProps) => {
	const formInstance = Form.useFormInstance();
	const handleChange = useCallback(() => {
		const { name, onChange } = props;
		if (onChange && form) {
			onChange(form.getFieldValue(name), form);
		}
		if (onChange && formInstance) {
			onChange(formInstance.getFieldValue(name), formInstance);
		}
	}, [props.onChange, props.name, form, formInstance]);
	useEffect(() => {
		if (initialValue) {
			if (form) {
				form.setFieldValue(props.name, initialValue);
			} else {
				formInstance.setFieldValue(props.name, initialValue);
			}
		}
	}, [props.name, initialValue, form, formInstance]);
	return (
		<Column
			{...(typeof size === "number"
				? {
						span: size,
					}
				: size)}
		>
			{
				{
					text: <TextField {...props} type="text" onChange={handleChange} />,
					select: (
						<Select
							{...props}
							mode={mode}
							options={options}
							initialValue={initialValue}
							onChange={handleChange}
							allowClear={allowClear}
						/>
					),
					number: <NumberField {...props} min={min} max={max} />,
					password: <PasswordField {...props} />,
				}[props.type]
			}
		</Column>
	);
};
