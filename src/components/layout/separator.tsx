import { Block } from "jsxstyle";

type Props = {
	/** The space size */
	size: "small" | "medium" | "large" | number;
};

export const Separator = ({ size }: Props) => {
	return (
		<Block
			flexShrink={0}
			width={{ small: 8, medium: 16, large: 24 }[size] || size}
			height={{ small: 8, medium: 16, large: 24 }[size] || size}
		/>
	);
};
