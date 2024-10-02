import {
	Layout as AntdLayout,
	LayoutProps as AntdLayoutProps,
	SiderProps as AntdSiderProps,
} from "antd";
import React from "react";
import { COLORS } from "../../consts/colors";

const {
	Header: AntdHeader,
	Content: AntdContent,
	Footer: AntdFooter,
	Sider: AntdSider,
} = AntdLayout;

export const LayoutStyles = {
	siderBg: COLORS.PRIMARY[800],

	headerPadding: "0 24px",
	headerHeight: 72,
	headerBg: "#fff",
};

type LayoutProps = {
	children?: React.ReactNode;
} & AntdLayoutProps;

interface SiderProps extends LayoutProps {
	/** Specify the customized trigger, set to null to hide the trigger */
	trigger?: AntdSiderProps["trigger"];
	/** Whether can be collapsed */
	collapsible?: boolean;
	/** Breakpoints of the responsive layout */
	breakpoint?: AntdSiderProps["breakpoint"];
	/** To set the current status */
	collapsed?: boolean;
	/** The callback function, executed by clicking the trigger or activating the responsive layout */
	onCollapse?: AntdSiderProps["onCollapse"];
	width?: number;
}

const Header = (props: LayoutProps) => {
	return <AntdHeader {...props} />;
};

const Content = (props: LayoutProps) => {
	return <AntdContent {...props} />;
};

const Footer = (props: LayoutProps) => {
	return <AntdFooter {...props} />;
};

const Sider = (props: SiderProps) => {
	return <AntdSider {...props} />;
};

interface LayoutInterface extends React.FC<LayoutProps> {
	Header: React.FC<LayoutProps>;
	Content: React.FC<LayoutProps>;
	Footer: React.FC<LayoutProps>;
	Sider: React.FC<SiderProps>;
}

const Layout: LayoutInterface = (props: LayoutProps) => {
	return <AntdLayout {...props} />;
};

Layout.Header = Header;
Layout.Content = Content;
Layout.Footer = Footer;
Layout.Sider = Sider;

export { Layout };
