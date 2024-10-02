import {
	Select as AntdSelect,
	SelectProps as AntdSelectProps,
	Form,
	FormItemProps,
} from "antd";
import React, { ComponentProps } from "react";
import { Rule } from "./types.ts";

export type Props = {
	/** Show clear button */
	allowClear?: AntdSelectProps["allowClear"];
	/** Whether disabled select */
	disabled?: AntdSelectProps["disabled"];
	/** Set mode of Select */
	mode?: AntdSelectProps["mode"];
	/** Select options. Will get better perf than jsx definition */
	options?: AntdSelectProps["options"];
	/** Whether show search input in single mode */
	showSearch?: boolean;
	/** If true, filter options by input, if function, filter options against it. \
	 * The function will receive two arguments, inputValue and option, if the function returns true, \
	 * the option will be included in the filtered set; Otherwise, it will be excluded */
	filterOption?: AntdSelectProps["filterOption"];
	/** Customize tag render, only applies when mode is set to multiple or tags */
	tagRender?: AntdSelectProps["tagRender"];
	/** Label text */
	label?: React.ReactNode;
	/** Field name */
	name: string;
	/** Which prop value of option will be used for filter if filterOption is true. If options is set, it should be set to label */
	optionFilterProp?: AntdSelectProps["optionFilterProp"];
	/** Called when an option is selected, the params are option's value (or key) and option instance */
	onSelect?: AntdSelectProps["onSelect"];
	/** Callback function that is fired when input changed */
	onSearch?: AntdSelectProps["onSearch"];
	/** Called when an option is deselected, param is the selected option's value. Only called for multiple or tags, effective in multiple or tags mode only */
	onDeselect?: AntdSelectProps["onDeselect"];
	/** Called when click on clear icon */
	onClear?: AntdSelectProps["onClear"];
	/** Called when select an option or input value change */
	onChange?: AntdSelectProps["onChange"];
	/** Rules for field validation */
	rules?: Rule[];
	/** The placeholder of input */
	placeholder?: string;
	/** Indicate loading state */
	loading?: boolean;

	/** The Select default value (not use in forms) */
	defaultValue?: AntdSelectProps["defaultValue"];
	/** The initial value when used in forms */
	initialValue?: FormItemProps["initialValue"];
};

const Formless = ({ ...props }: Omit<Props, "label" | "rules">) => {
	return <AntdSelect size="large" {...props} />;
};

const SelectComponent = ({
	label,
	name,
	rules,
	initialValue,
	...props
}: Props) => {
	return (
		<Form.Item
			label={label}
			name={name}
			rules={rules}
			initialValue={initialValue}
		>
			<AntdSelect size="large" {...props} />
		</Form.Item>
	);
};

type SelectType = React.FC<ComponentProps<typeof SelectComponent>> & {
	Formless: typeof Formless;
};

export const Select = SelectComponent as SelectType;

Select.Formless = Formless;
