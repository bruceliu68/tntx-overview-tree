/*
 * @CreatDate: 2021-04-29 14:27:48
 * @Describe: 首页
 */

import { useEffect, useState } from "react";
import Overview from "../Overview";
import { rootData, allData } from "./mockData";
import { cloneDeep } from "lodash";

export default props => {
	const [data, setData] = useState([]);
	const [childData, setChildData] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	const getData = (d) => {
		setTimeout(() => {
			if (d) {
				setChildData([
					{
						name: "字段名称", // 名称
						nodeType: 10, // 类型
						value: "SYSTEM_VB_TEST12", // 标识
						version: "V1", // 版本
						id: "SYSTEM_VB_TEST12_10"
					},
					{
						name: "字段名称ce是长度啊", // 名称
						nodeType: 10, // 类型
						value: "SYSTEM_VB_TEST", // 标识
						version: "V1", // 版本
						id: "SYSTEM_VB_TEST_10"
					}
				]);
			} else {
				setData(cloneDeep(rootData));
			}
		}, 100);
	};

	return (
		<div style={{ width: 1000, height: 800 }}>
			<Overview
				rootName="柳波测试根节点"
				// data={allData}
				rootData={data}
				childData={childData}
				getChild={(d) => {
					getData(d);
				}}
				onClick={(d) => {
					console.log(d);
				}}
				nodeTypeMap={{
					1: { name: "决策流", color: "#0FB8FE", img: require("../Overview/Base/img/1.svg") },
					2: { name: "策略集", color: "#628FE4", img: require("../Overview/Base/img/2.svg") },
					3: { name: "决策工具", color: "#CF6767", img: require("../Overview/Base/img/3.svg") },
					4: { name: "三方服务", color: "#CFAB67", img: require("../Overview/Base/img/4.svg") },
					5: { name: "模型", color: "#4DA9C9", img: require("../Overview/Base/img/5.svg") },
					6: { name: "冠军挑战者", color: "#9367C6", img: require("../Overview/Base/img/6.svg") },
					7: { name: "计算公式", color: "#D97B4E", img: require("../Overview/Base/img/7.svg") },
					8: { name: "规则", color: "#E8A530", img: require("../Overview/Base/img/8.svg") },
					9: { name: "指标", color: "#2B82EC", img: require("../Overview/Base/img/9.svg") },
					10: { name: "字段", color: "#6776CF", img: require("../Overview/Base/img/10.svg") }
				}}
				noPlus={10}
			/>
		</div>
	);
};
