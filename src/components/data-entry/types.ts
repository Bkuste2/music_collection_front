import { Rule as AntdRule } from "antd/es/form";

export type Rule = AntdRule;

export type RuleMap = {
	[key: string]: Rule[];
};
