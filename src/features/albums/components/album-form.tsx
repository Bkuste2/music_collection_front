import { useAuth } from "@/contexts/auth-context.tsx";
import { albumsService, CreateDTO } from "@/services/albumsService.ts";
import { artistService } from "@/services/artist.service.ts";
import { notification } from "@/services/default/notification.ts";
import { FieldsBuilder } from "@components/builder/fields-builder.tsx";
import { minLength, required } from "@components/data-entry/validators.ts";
import { Drawer } from "@components/feedback/drawer.tsx";
import { Separator } from "@components/layout/separator.tsx";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form } from "antd";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const AlbumForm = () => {
	const { id } = useParams();
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [form] = Form.useForm<CreateDTO>();

	const handleSuccess = useCallback(() => {
		navigate(-1);
		notification(`Register ${!!id ? "edited" : "created"} with success`, "success")
		queryClient.invalidateQueries({ queryKey: ["get-all-albums"] });
	}, []);

	const createMutation = useMutation({
		mutationFn: albumsService.create,
		onSuccess: () => {
			handleSuccess()
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		}
	});

	const editMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: Partial<CreateDTO> }) =>
			albumsService.update(id, data),
		onSuccess: () => {
			handleSuccess()
		},
		onError: (error: any) => {
			const errorData = error?.response?.data?.errors?.[0]?.id;
			notification(errorData[1][0], "error");
		}
	});

	const getArtists = useQuery({
		queryFn: artistService.getAll,
		queryKey: ["get-artists"]
	});

	const handleValuesChange = useCallback(
		(values: CreateDTO) => {
			form.setFieldsValue(values);
		},
		[form]
	);

	const getAlbumById = useQuery({
		queryFn: () => albumsService.getById(id as string),
		queryKey: ["get-album"]
	});

	const handleFinish = useCallback(
		(values: CreateDTO) => {
			try {
				if (!!id && user && user.id) {
					editMutation.mutate({ id, data: { ...values, user_id: user.id } });
				} else {
					createMutation.mutate({ ...values, user_id: user?.id as string });
				}
			} catch (e) {
				console.log(e);
				notification("Error", "error");
			}
		},
		[id, user, editMutation, createMutation]
	);

	useEffect(() => {
		if (!!id) {
			getAlbumById.refetch().then(({ data, isFetched }) => {
				if (isFetched && data) {

					const responseData = data.data;
					form.setFieldsValue({
						artist_id: responseData.data.attributes["artist-id"],
						user_id: user?.id,
						year: responseData.data.attributes.year,
						name: responseData.data.attributes.name
					});
				}
			});
		}
	}, [id, user, form]);
	return (
		<Drawer
			overtitle="Album"
			title={!!id ? "Edit" : "Create"}
			onClose={() => {
				navigate(-1);
			}}
			loading={getArtists.isFetching}
			className="!text-white"
		>
			<Form
				form={form}
				initialValues={{
					name: "",
					artist_id: "",
					year: new Date().getFullYear()
				}}
				onValuesChange={handleValuesChange}
				onFinish={handleFinish}
				layout="vertical"
			>
				<Col className="flex flex-col justify-end">
					<FieldsBuilder
						label="Name"
						name="name"
						type="text"
						size={24}
						rules={[required(), minLength({ type: "string", length: 3 })]}
						disabled={createMutation.isPending || editMutation.isPending}
					/>
					<FieldsBuilder
						label="Artist"
						name="artist_id"
						type="select"
						options={getArtists.data?.map((artist) => ({
							label: artist.name,
							value: artist.id
						}))}
						size={24}
						rules={[required({ type: "number" })]}
						disabled={createMutation.isPending || editMutation.isPending}
					/>
					<FieldsBuilder
						label="Year"
						name="year"
						type="number"
						disabled={createMutation.isPending || editMutation.isPending}
						rules={[
							required({ type: "number" }),
							minLength({ type: "string", length: 4 })
						]}
					/>
					<Separator size={10} />

					<Button
						loading={createMutation.isPending || editMutation.isPending}
						size={"large"}
						htmlType="submit"
						className="self-end"
					>
						Submit
					</Button>
				</Col>
			</Form>
		</Drawer>
	);
};
