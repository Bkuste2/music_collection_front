import { Modal as AntdModal, ModalProps } from "antd";
import React from "react";
import { COLORS } from "@/consts/colors.ts";

export const ModalStyle = {
	titleFontSize: 20,
	titleColor: COLORS.PRIMARY["500"],
};

type Props = {
	/** Whether the modal dialog is visible or not */
	visible?: boolean;
	/** Whether the modal dialog is visible or not */
	open?: boolean;
	/** Centered Modal */
	centered?: boolean;
	/** The modal dialog's title */
	title?: React.ReactNode;
	/** Specify a function that will be called when a user clicks mask, close button on top right or Cancel button */
	onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
	/** Specify a function that will be called when a user clicks OK button */
	onOk?: (e: React.MouseEvent<HTMLElement>) => void;
	/** Ok button text */
	okText?: React.ReactNode;
	children?: React.ReactNode;
	footer?: ModalProps["footer"];
	width?: ModalProps["width"];
	closable?: ModalProps["closable"];
};

export const Modal = (props: Props) => {
	return <AntdModal {...props} />;
};
