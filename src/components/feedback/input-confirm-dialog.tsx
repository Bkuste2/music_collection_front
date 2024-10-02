import { useCallback, useState } from "react";
import { TextField } from "../data-entry/text-field.tsx";
import { Button } from "../general/button.tsx";
import { JsxRow } from "../layout/jsx-row";
import { Modal } from "./modal.tsx";

type InputConfirmDialogProps = {
	message: string;
	onCancel: () => void;
	onConfirm: (inputValue: string) => void;
	loading?: boolean;
	title?: string;
};

export const InputConfirmDialog = ({
	message,
	onConfirm,
	onCancel,
	loading = false,
	title,
}: InputConfirmDialogProps) => {
	const [inputValue, setInputValue] = useState("");
	const [isButtonDisabled, setButtonDisabled] = useState(true);

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setInputValue(e.target.value);
			setButtonDisabled(e.target.value !== message);
		},
		[message],
	);

	const handleConfirm = useCallback(() => {
		if (inputValue === message) {
			onConfirm(inputValue);
		}
	}, [inputValue, message, onConfirm]);

	return (
		<Modal
			visible
			title={title || "Tem certeza de que deseja excluir este registro?"}
			onCancel={onCancel}
			footer={
				<JsxRow gap={8}>
					<Button key="cancel" onClick={onCancel} label="Cancelar" />
					<Button
						key="confirm"
						variant="primary"
						onClick={handleConfirm}
						disabled={isButtonDisabled || loading}
						loading={loading}
						label="Confirmar"
					/>
				</JsxRow>
			}
		>
			<TextField
				label={
					<span
						style={{
							userSelect: "none",
						}}
						dangerouslySetInnerHTML={{
							__html: `Por favor, digite <strong>${message}</strong> para confirmar esta ação.`,
						}}
					/>
				}
				name="confirmField"
				value={inputValue}
				onChange={handleInputChange}
				paste={false}
			/>
		</Modal>
	);
};
