import {
	Form as AntdForm,
	FormInstance as AntdFormInstance,
	FormItemProps as AntdFormItemProps,
	FormProps as AntdFormProps,
	Col as JsxCol,
} from "antd";
import React from "react";
import { Button } from "../general/button.tsx";
import type {
	FormInstance,
	NamePath,
	WatchOptions,
} from "rc-field-form/es/interface";

export type OnFormValuesChange = AntdFormProps["onValuesChange"];
export type OnFormFinish = AntdFormProps["onFinish"];

type Props = {
	/** disable or not browser auto complete */
	autoComplete?: AntdFormProps["autoComplete"];
	/** Set value by Form initialization or reset */
	initialValues?: AntdFormProps["initialValues"];
	/** Trigger after submitting the form and verifying data successfully */
	onFinish?: OnFormFinish;
	/** Trigger when value updated */
	onValuesChange?: OnFormValuesChange;
	/** Form control instance created by Form.useForm(). Automatically created when not provided */
	form?: AntdFormInstance;
	/** The label of the submit button */
	confirmLabel?: string;
	/** When should disable buttons */
	disabled?: boolean;
	/** Set the loading status of confirm button */
	loading?: boolean;
	layout?: AntdFormProps["layout"];
	children?: React.ReactNode;
};

type FormItemProps = {
	/** Custom field update logic. */
	shouldUpdate?: AntdFormItemProps["shouldUpdate"];
	children?: AntdFormItemProps["children"];
};

interface IForm extends React.FC<Props> {
	Item: React.FC<FormItemProps>;
	useForm: typeof AntdForm.useForm;
	useWatch: (dependencies: NamePath, form?: FormInstance | WatchOptions) => any;
	useFormInstance: typeof AntdForm.useFormInstance;
}

export const Form: IForm = ({
	form,
	children,
	layout = "vertical",
	confirmLabel,
	loading,
	...props
}: Props) => {
	const [formInstance] = AntdForm.useForm(form);

	return (
		<AntdForm
			style={{ width: "100%", height: "100%" }}
			form={formInstance}
			{...props}
			layout={layout}
		>
			<JsxCol className="min-h-full w-full pb-4">
				<JsxCol flex={1}>{children}</JsxCol>
				{confirmLabel && (
					<Button
						block
						loading={loading}
						htmlType="submit"
						label={confirmLabel}
					/>
				)}
			</JsxCol>
		</AntdForm>
	);
};

Form.Item = ({ shouldUpdate = true, ...props }: FormItemProps) => {
	return (
		<AntdForm.Item
			{...props}
			noStyle
			shouldUpdate={shouldUpdate}
			validateTrigger={["onChange", "onSubmit"]}
		/>
	);
};

Form.useForm = () => {
	return AntdForm.useForm();
};

Form.useFormInstance = () => {
	return AntdForm.useFormInstance();
};

Form.useWatch = (
	dependencies: any,
	form?: FormInstance<any> | WatchOptions<FormInstance<any>> | undefined,
) => {
	return AntdForm.useWatch(dependencies, form);
};
