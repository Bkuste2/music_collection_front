import React, { useEffect, useMemo } from "react";
import { Route, Routes } from "react-router-dom";
import { Feature, FEATURES } from "./consts/features";
import { useAuth } from "./contexts/auth-context";
import { useLocation } from "./hooks/useLocation.ts";
import { Layout } from "antd";
import { User } from "@/types/user.model.ts";
import { Login } from "@/features/login";
import { Header } from "@components/others/Header.tsx";
import { Register } from "@/features/register";

export const buildRoutes = (
	features: Feature[],
	user: User,
	_parent?: Feature,
): Array<React.ReactNode> => {
	return features.map((feature) => {
		if (feature.children) {
			return (
				<Route
					key={feature.title}
					path={feature.path}
					element={<feature.component />}
				>
					{buildRoutes(feature.children, user, {
						...feature,
					})}
				</Route>
			);
		}
		return (
			<Route
				key={feature.title}
				path={feature.path}
				element={<feature.component />}
			/>
		);
	});
};

export const AppRoutes = () => {
	const { isAuthenticated, user } = useAuth();
	const { feature, pathname } = useLocation();

	const routes = useMemo(() => user && buildRoutes(FEATURES, user), [user]);

	useEffect(() => {
		const pathArray = pathname.split("/");
		if (feature) {
			document.title = `Music Collection - ${feature.title}`;
		} else {
			FEATURES.forEach((feature) => {
				feature.children?.forEach((child) => {
					if (child.path.includes(pathArray[2])) {
						document.title = `Music Collection - ${child.title}`;
					}
				});
			});
		}
	}, [feature, pathname]);

	if (isAuthenticated) {
		return (
			<Layout className="h-full w-full">
				<Layout.Content>
					<Layout.Header className="bg-zinc-900">
						<Header />
					</Layout.Header>
					<Routes>{routes}</Routes>
				</Layout.Content>
			</Layout>
		);
	}

	return (
		<Routes>
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
		</Routes>
	);
};
