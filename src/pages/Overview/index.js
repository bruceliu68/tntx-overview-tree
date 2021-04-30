/*
 * @CreatDate: 2021-04-29 14:09:38
 * @Describe: 树形概览图
 */

import { useEffect, useState } from "react";
import { get } from "lodash";
import Base from "./Base";
import { NODE_TYPE_MAP } from "./Base/constants";

export default props => {
	const { onClick, getData, data: childData, rootName, treeData = [], nodeTypeMap, noPlus } = props;
	const [data, setData] = useState();
	const [secondFloor, setSecondFloor] = useState();
	const [rootHasRender, setRootHasRender] = useState(false);
	const [path, setPath] = useState();

	const typeMap = nodeTypeMap || NODE_TYPE_MAP;

	useEffect(() => {
		if (!rootHasRender && childData?.length > 0 && treeData?.length === 0) { // 初始数据渲染根节点数据
			let arr = [];
			let initArr = [];
			childData.forEach((item, index) => {
				const i = arr.findIndex(k => k.nodeType === item.nodeType);
				if (i >= 0) {
					initArr[i].children.push(item);
				} else {
					arr.push({
						id: index,
						value: index,
						name: typeMap[item.nodeType].name,
						version: "",
						nodeType: item.nodeType,
						nodeRoot: true
					});
					initArr.push({
						id: index,
						value: index,
						name: typeMap[item.nodeType].name,
						version: "",
						nodeType: item.nodeType,
						nodeRoot: true,
						children: [item]
					});
				}
			});
			let obj = {
				name: rootName,
				children: arr
			};
			setData(obj);
			setSecondFloor(initArr);
			setRootHasRender(true);
		} else if (rootHasRender && treeData?.length === 0 && path) { // 渲染子节点数据
			let newData = { ...data };
			let currentNode = get(newData, path);
			if (childData.length > 0) {
				currentNode.children = childData;
			} else {
				currentNode.noChild = true;
			}
			setData(newData);
		}
	}, [childData]);

	useEffect(() => {
		if (treeData?.length > 0) {
			let arr = [];
			let initArr = [];
			treeData.forEach((item, index) => {
				const i = arr.findIndex(k => k.nodeType === item.nodeType);
				if (i >= 0) {
					initArr[i].children.push(item);
				} else {
					arr.push({
						id: index,
						value: index,
						name: typeMap[item.nodeType].name,
						version: "",
						nodeType: item.nodeType,
						nodeRoot: true
					});
					initArr.push({
						id: index,
						value: index,
						name: typeMap[item.nodeType].name,
						version: "",
						nodeType: item.nodeType,
						nodeRoot: true,
						children: [item]
					});
				}
			});
			let obj = {
				name: rootName,
				children: arr
			};
			const newInitArr = parseData(initArr);
			setData(obj);
			setSecondFloor(newInitArr);
		}
	}, [treeData]);

	const parseData = (data) => {
		for (let i = 0; i < data.length; i++) {
			if (!data[i]?.children || data[i]?.children?.length === 0) {
				data[i].children = undefined;
				data[i].noChild = true;
			} else {
				parseData(data[i].children);
			}
		}
		return data;
	};

	return (
		<Base
			noPlus={noPlus}
			nodeTypeMap={nodeTypeMap}
			value={data}
			secondFloor={secondFloor}
			getChild={(d) => {
				if (getData) {
					getData(d);
					setPath(d.path);
				}
			}}
			onChange={(d) => {
				setData({ ...d });
			}}
			onClick={onClick}
		/>
	);
};
