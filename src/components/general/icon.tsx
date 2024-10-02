import { useMemo } from "react";
import { IconType } from "react-icons/lib";
import * as LucideIcons from "react-icons/lu";

export type IconName = keyof Omit<
	typeof LucideIcons,
	"default" | "IconProvider"
>;

const getAntdIcon = (icon: IconName): IconType => {
	return LucideIcons[icon];
};

type Props<T> = {
	/** name of the icon */
	name: T;
	/** the color of the icon */
	color?: string;
	className?: string;
	spin?: boolean;
	size?: string | number;
};

export type IconProps = Props<IconName>;

export const Icon = ({ name, color, ...props }: IconProps) => {
	const AntdIcon = useMemo(() => {
		return getAntdIcon(name);
	}, [name]);
	return (
		<AntdIcon
			{...props}
			// style={{
			// 	fontSize: 16,
			// 	...(color && { color }),
			// }}
		/>
	);
};
