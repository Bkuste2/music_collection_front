import { omit } from "lodash";
import { useMemo } from "react";
import {
	Location as DefaultLocation,
	matchPath,
	useLocation as reactUseLocation,
} from "react-router-dom";
import { FEATURES, Feature } from "../consts/features";
import { useAuth } from "../contexts/auth-context";
import { User } from "@/types/user.model.ts";

type LinkedFeature = Omit<
	Feature & { parent?: LinkedFeature },
	"Component" | "path" | "children" | "group" | "icon"
>;

const indexFeatures = (
	features: Feature[],
	user: User,
	path: string[],
	parent?: LinkedFeature,
): { feature: LinkedFeature; path: string }[] => {
	return features.flatMap((feature) => {
		const linkedFeature = omit({ ...feature, parent }, [
			"path",
			"Component",
			"children",
			"group",
			"icon",
		]) as LinkedFeature;

		if (feature.children) {
			return [
				{ feature: linkedFeature, path: feature.path },
				...indexFeatures(
					feature.children,
					user,
					[...path, feature.path],
					linkedFeature,
				),
			];
		}
		return {
			feature: linkedFeature,
			path: [...path, feature.path].join("/"),
		};
	});
};

type Location = DefaultLocation & {
	feature?: LinkedFeature;
};

export const useLocation = (): Location => {
	const location = reactUseLocation();
	const { user } = useAuth();

	const indexedFeature = useMemo(() => {
		if (user) {
			const indexedFeatures = indexFeatures(FEATURES, user, []);
			return indexedFeatures.find((indexedFeature) =>
				matchPath(indexedFeature.path, location.pathname),
			);
		}
		return null;
	}, [location, user]);
	return {
		...location,
		...omit(indexedFeature, "path"),
	};
};
