import { useAuth } from "@/contexts/auth-context.tsx";
import { useCallback } from "react";
import { Separator } from "@components/layout/separator.tsx";
import { minLength, required } from "@components/data-entry/validators.ts";
import { authService } from "@/services/auth.service.ts";
import { useMutation } from "@tanstack/react-query";
import { FieldsBuilder } from "@components/builder/fields-builder.tsx";
import { Button, Col, Form, Row } from "antd";
import { notification } from "@/services/default/notification.ts";
import { RegisterProps, userService } from "@/services/user.service.ts";

export const Register = () => {
	const { handleAuthentication } = useAuth();
	const [form] = Form.useForm<RegisterProps>();

	const loginMutation = useMutation({
		mutationFn: authService.login,
		onSuccess: ({ access_token }) => {
			handleAuthentication(access_token);
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		},
	});

	const registerMutation = useMutation({
		mutationFn: (data: RegisterProps) => userService.create(data),
		onSuccess: ({ id, attributes }) => {
			console.log(id, attributes);
			notification("User created successfully", "success");
			loginMutation.mutate({
				username: form.getFieldValue("username"),
				password: form.getFieldValue("password"),
			});
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		},
	});

	const handleValuesChange = useCallback(
		(values: RegisterProps) => {
			form.setFieldsValue(values);
		},
		[form],
	);

	const handleFinish = useCallback((values: RegisterProps) => {
		registerMutation.mutate(values);
	}, []);

	return (
		<main className="flex h-full items-center justify-center">
			<div className="w-1/3">
				<Form
					form={form}
					initialValues={{
						username: "",
						full_name: "",
						password: "",
					}}
					onValuesChange={handleValuesChange}
					onFinish={handleFinish}
					layout="vertical"
				>
					<Col>
						<FieldsBuilder
							label="Username"
							name="username"
							type="text"
							size={24}
							rules={[required(), minLength({ type: "string", length: 3 })]}
							disabled={loginMutation.isPending}
						/>
						<FieldsBuilder
							label="Full Name"
							name="full_name"
							type="text"
							size={24}
							rules={[required(), minLength({ type: "string", length: 6 })]}
							disabled={loginMutation.isPending}
						/>
						<FieldsBuilder
							type="password"
							disabled={loginMutation.isPending}
							name="password"
							label="Password"
							size={24}
							rules={[required(), minLength({ type: "string", length: 6 })]}
						/>
						<Separator size={10} />

						<Row justify="space-between">
							<Button
								type="text"
								href="/login"
								disabled={loginMutation.isPending}
							>
								Already have a registration? Login
							</Button>
							<Button
								loading={loginMutation.isPending}
								size={"large"}
								htmlType="submit"
								className="self-end"
							>
								Submit
							</Button>
						</Row>
					</Col>
				</Form>
			</div>
		</main>
	);
};
