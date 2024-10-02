import { FEATURES } from "@/consts/features.ts";
import { useAuth } from "@/contexts/auth-context.tsx";
import { notification } from "@/services/default/notification.ts";
import { userService } from "@/services/user.service.ts";
import { JsxRow } from "@components/layout/jsx-row.tsx";
import { useMutation } from "@tanstack/react-query";
import { Button, Col, Dropdown, MenuProps, Modal } from "antd";
import { useCallback, useState } from "react";
import { FieldsBuilder } from "../builder/fields-builder.tsx";
import { minLength, required } from "../data-entry/validators.ts";
import { Text } from "../general/text.tsx";
import { Form } from "../data-entry/form.tsx";

export const Header = () => {
	const { user, handleLogout } = useAuth();
	const [open, setOpen] = useState<boolean>(false);

	const items: MenuProps["items"] = [
		{ key: "1", label: "My Account", disabled: true },
		{ type: "divider" },
		{ key: "2", label: "Change Password", onClick: () => setOpen(true) },
		{ key: "3", label: "Logout", onClick: handleLogout },
	];

	const changePassword = useMutation({
		mutationFn: ({ password }: { password: string }) => userService.update(user?.id as string, { password }),
		onSuccess: () => {
			notification("Password changed with successfull", "success");
			setOpen(false);
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		},
	});

	const [form] = Form.useForm();

	const handleValuesChange = useCallback(
		(values: { password: string }) => {
			form.setFieldsValue(values);
		},
		[form],
	);

	const handleFinish = useCallback(({ password }: { password: string }) => {
		changePassword.mutate({ password });
	}, []);

	return (
		<>
			<JsxRow
				height="100%"
				justifyContent="space-between"
				width="100%"
				alignItems="center"
			>
				<Text weight="bold" label="Music Collection" size="xl" color="white" />
				<div className="flex items-center gap-10">
					<ul className="flex items-center">
						{FEATURES.map((feature) => {
							return (
								<li key={feature.path}>
									<Button href={feature.path} type="text">
										{feature.title}
									</Button>
								</li>
							);
						})}
					</ul>
					<Dropdown menu={{ items }} placement="bottomRight">
						<Button onClick={(e) => e.preventDefault()}>Account</Button>
					</Dropdown>
				</div>
			</JsxRow>
			<Modal
				title="Basic Modal"
				open={open}
				onOk={form.submit}
				onCancel={() => setOpen(false)}
				okButtonProps={{ type: "default", htmlType: "submit" }}
			>
				<Form
					form={form}
					initialValues={{
						password: "",
					}}
					onValuesChange={handleValuesChange}
					onFinish={handleFinish}
					layout="vertical"
				>
					<Col>
						<FieldsBuilder
							label="New Password"
							name="password"
							type="password"
							size={24}
							rules={[required(), minLength({ type: "string", length: 6 })]}
							disabled={changePassword.isPending}
						/>
					</Col>
				</Form>
			</Modal>
		</>
	);
};
