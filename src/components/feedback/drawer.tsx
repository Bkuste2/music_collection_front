import { Drawer as AntdDrawer, DrawerProps as AntdDrawerProps } from "antd";
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../general/button.tsx";
import { Icon } from "../general/icon.tsx";
import { Text } from "../general/text.tsx";
import { JsxCol } from "../layout/jsx-col";
import { JsxRow } from "../layout/jsx-row";

type DrawerProps = {
	/** Drawer title */
	title: string;
	/** Text that is displayed above the title */
	overtitle?: string;
	children: React.ReactNode;
	/** Disable drawer close */
	disableClose?: boolean;
} & AntdDrawerProps;

export const Drawer = ({ overtitle, title, disableClose, ...props }: DrawerProps) => {
	const navigate = useNavigate();
	const handleClose = useCallback(() => {
		navigate(-1);
	}, [navigate]);

	return (
		<AntdDrawer
			{...props}
			width="25vw"
			closable={false}
			title={
				<JsxRow alignItems="center" gap={8}>
					<Button
						type="outline"
						icon={<Icon name="LuArrowLeft" />}
						onClick={handleClose}
						disabled={disableClose}
					/>
					<JsxCol>
						{overtitle && (
							<Text size="xs" color="white" label={overtitle} />
						)}
						<Text label={title} size="xl" weight="medium" color="white"/>
					</JsxCol>
				</JsxRow>
			}
			open
		/>
	);
};
