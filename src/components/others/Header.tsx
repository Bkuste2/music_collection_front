import { Text } from "../general/text.tsx";
import { useAuth } from "@/contexts/auth-context.tsx";
import { Button, Dropdown, MenuProps } from "antd";
import { JsxRow } from "@components/layout/jsx-row.tsx";
import { FEATURES } from "@/consts/features.ts";

export const Header = () => {
	const { user, handleLogout } = useAuth();

	const items: MenuProps["items"] = [
		{ key: "1", label: "My Account", disabled: true },
		{ type: "divider" },
		{ key: "2", label: "Change Password" },
		{ key: "3", label: "Logout", onClick: handleLogout },
	];

	if (!user) {
		return null;
	}

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
		</>
	);
};
