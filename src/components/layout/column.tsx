import { Col as AntdCol } from "antd";
import { ReactNode, Ref, forwardRef } from "react";

type ColSpanType = number | string;

type Props = {
	/** Raster number of cells to occupy, 0 corresponds to display: none */
	span?: ColSpanType;
	/** screen < 576px and also default setting, could be a span value or an object containing above props */
	xs?: ColSpanType;
	/** screen ≥ 576px, could be a span value or an object containing above props */
	sm?: ColSpanType;
	/** screen ≥ 768px, could be a span value or an object containing above props */
	md?: ColSpanType;
	/** screen ≥ 992px, could be a span value or an object containing above props */
	lg?: ColSpanType;
	/** screen ≥ 1200px, could be a span value or an object containing above props */
	xl?: ColSpanType;
	/** screen ≥ 1600px, could be a span value or an object containing above props */
	xxl?: ColSpanType;
	children?: ReactNode;
	/** Add styles by classname */
	className?: string;
};

export const Column = forwardRef((props: Props, ref: Ref<HTMLDivElement>) => {
	return <AntdCol {...props} ref={ref} />;
});
