import { useAuth } from "@/contexts/auth-context.tsx";
import { useCallback } from "react";
import { Separator } from "@components/layout/separator.tsx";
import { minLength, required } from "@components/data-entry/validators.ts";
import { authService, LoginProps } from "@/services/auth.service.ts";
import { useMutation } from "@tanstack/react-query";
import { FieldsBuilder } from "@components/builder/fields-builder.tsx";
import { Button, Col, Form, Row } from "antd";
import { notification } from "@/services/default/notification.ts";

export const Login = () => {
	const { handleAuthentication } = useAuth();
	const [form] = Form.useForm<LoginProps>();

	const mutation = useMutation({
		mutationFn: authService.login,
		onSuccess: ({ access_token }) => {
			handleAuthentication(access_token);
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		},
	});

	const handleValuesChange = useCallback(
		(values: LoginProps) => {
			form.setFieldsValue(values);
		},
		[form],
	);

	const handleFinish = useCallback((values: LoginProps) => {
		mutation.mutate(values);
	}, []);

	return (
		<main className="flex h-full items-center justify-center">
			<div className="w-1/3">
				<Form
					form={form}
					initialValues={{
						username: "",
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
							disabled={mutation.isPending}
						/>
						<FieldsBuilder
							type="password"
							disabled={mutation.isPending}
							name="password"
							label="Password"
							rules={[required(), minLength({ type: "string", length: 6 })]}
						/>
						<Separator size={10} />

						<Row justify="space-between">
							<Button
								type="text"
								href="/register"
								disabled={mutation.isPending}
							>
								Don't have a registration yet? Register
							</Button>
							<Button
								loading={mutation.isPending}
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
