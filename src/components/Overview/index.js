/*
 * @CreatDate: 2021-02-02 16:29:09
 * @Describe: 组件概览树形组件
 */

import "./index.less";
import { useRef, useState } from "react";
import { hierarchy } from "d3-hierarchy";
import {
	RELATION_WIDTH, COMPONENT_HEIGHT, COMPONENT_SPACE_VERTICAL,
	COMPONENT_SPACE_HORIZONTAL, COMPONENT_MARGIN, NODE_TYPE_IMG,
	NODE_TYPE_COLOR, ROOT_WIDTH
} from "./constants";
import Link from "./Link";
import { reBytesStr } from "./utils";
import { get } from "lodash";

export default props => {
	const { value = {}, secondFloor = [], getChild, onChange, onClick } = props;
	const [historyMap, setHistoryMap] = useState({});

	// 缓存操作
	const setCache = (k, value) => {
		let obj = {};
		obj[k] = value;
		setHistoryMap({
			...historyMap,
			...obj
		});
	};
	const getCache = (k) => {
		return historyMap[k] || null;
	};

	// 收起
	const packUp = (data) => {
		// console.log(data);
		let valueTemp = { ...value };
		const path = data.path.slice(0, data.path.length - 1);
		let currentNode = get(valueTemp, path);
		setCache(path, currentNode.children);
		delete currentNode.children;
		onChange && onChange(valueTemp);
	};

	// 展开
	const openUp = (data) => {
		const path = data.path;
		const val = getCache(path);
		if (val) {
			let valueTemp = { ...value };
			let currentNode = get(valueTemp, path);
			currentNode.children = val;
			onChange && onChange(valueTemp);
		} else if (data.nodeRoot) {
			let valueTemp = { ...value };
			let currentNode = get(valueTemp, path);
			const obj = secondFloor.find(k => k.id === data.id);
			if (obj && obj?.children?.length > 0) {
				currentNode.children = obj.children;
				setCache(path, currentNode.children);
			} else {
				currentNode.noChild = true;
			}
			onChange && onChange(valueTemp);
		} else {
			getChild(data);
		}
	};

	// dom 渲染
	const createFields = (nodes) => {
		const result = [];
		nodes.forEach((node, nindex) => {
			const { data, x, y, parent } = node;
			const { type, index, parentPath, key, color, nodeRoot } = data || {};
			// 根节点
			if (!parent) {
				const style = {
					width: ROOT_WIDTH,
					minWidth: RELATION_WIDTH,
					position: "absolute",
					left: y - (ROOT_WIDTH - RELATION_WIDTH),
					top: x + COMPONENT_MARGIN / 2 - 12
				};
				result.push(
					<div
						key={getHierarchyId(key, "root")}
						style={style}
						className="root"
						title={value?.name}
					>
						<span className="text-ellipsis2">{value?.name}</span>
					</div>
				);
			} else {
				let ele = null;
				let className = "";
				let top = x + COMPONENT_MARGIN / 2;
				if (parentPath?.length === 1) {
					className = "node";
				} else {
					className = "child-node";
					top = top - 9;
				}
				let style = {
					left: y,
					top: top,
					position: "absolute",
					cursor: (className === "child-node" && onClick) ? "pointer" : "initial"
				};
				if (color && !nodeRoot) {
					style.borderColor = color;
				}
				if (type === "relation") {
					let str = reBytesStr(data.name, 12);
					if (str.length < data?.name?.length) {
						str += "...";
					}
					ele = (
						<div
							className={`${className} relation-node`}
							style={style}
							key={getHierarchyId(key, "relation")}
						>
							{
								parentPath?.length === 1
									? <>
										<img className="img1" src={NODE_TYPE_IMG[data.nodeType]} />
										<span className="s1" title={data.name}>{data.name}</span>
									</>
									: <>
										<img className="img1" src={NODE_TYPE_IMG[data.nodeType]} />
										<span className="s2" title={data.name} onClick={() => itemClick(data)}>{str}</span>
									</>
							}
							<span className="u-minus" onClick={() => {
								packUp(data);
							}}>-</span>
						</div>
					);
				} else if (type === "leaf") {
					ele = (
						<div
							className={className}
							style={style}
							key={getHierarchyId(key, "relation")}
						>
							{
								parentPath?.length === 1
									? <>
										<img className="img1" src={NODE_TYPE_IMG[data.nodeType]} />
										<span className="s1" title={data.name}>{data.name}</span>
									</>
									: <>
										<img className="img1" src={NODE_TYPE_IMG[data.nodeType]} />
										<span className="s2" title={data.name} onClick={() => itemClick(data)}>{data.name}</span>
									</>
							}
							{
								!data?.noChild &&
								(data?.nodeType !== 10 || data?.nodeRoot) &&
								<span className="u-plus" onClick={() => {
									openUp(data);
								}}>+</span>
							}
						</div>
					);
				}
				result.push(ele);
			}
		});
		return result;
	};

	// 点击节点事件
	const itemClick = (data) => {
		if (onClick) {
			onClick(data);
		}
	};

	// key的默认值
	const keyDefault = useRef(0);

	// 获取id
	const getHierarchyId = (...args) => {
		for (var _len = args.length, ids = new Array(_len), _key = 0; _key < _len; _key++) {
			ids[_key] = args[_key];
		}
		return ids.join(".");
	};

	// 设置唯一性
	const getUniqKey = (key, keyMap) => {
		if (key in keyMap) {
			const k = key + 1;
			return getUniqKey(k, keyMap);
		}
		return key;
	};

	// 设置key
	const setKey = (data, keyMap) => {
		const createKey = (v) => {
			if (!(v && v.key)) {
				v.key = getUniqKey(keyDefault.current, keyMap);
			}
			keyMap[v.key] = 1;
			if (v && v.children && v.children.length) {
				setKey(v.children, keyMap);
			}
		};
		if (Array.isArray(data)) {
			data.forEach((v, i) => {
				v.index = i;
				createKey(v);
			});
		} else {
			if (data) {
				data.index = 0;
				createKey(data);
			}
		}
	};

	// 格式化节点树
	const addDropAreaAndOperation = (children, parentPath, level, parentColor = "") => {
		if (!children) {
			children = [];
		}
		let result = [];
		if (children.length) {
			children.forEach((child, index) => {
				const path = [].concat(parentPath, [index]);
				const { key } = child || {};
				let color = parentColor;
				if (child.nodeRoot && child?.children?.length > 0) {
					color = NODE_TYPE_COLOR[child.nodeType];
				}
				const node = Object.assign({}, child, {
					type: "leaf",
					key,
					index,
					parentPath,
					path,
					color
				});
				if (child.children) {
					node.type = "relation";
					node.children = addDropAreaAndOperation(child.children, path.concat(["children"]), level + 1, color);
					path.push("relation");
				}
				result.push(node);
			});
		}
		return result;
	};

	// 计算坐标定位
	const buildNodes = (root) => {
		let [leafCount, height] = [0, 0];
		const nodes = root.eachAfter(function (d) {
			d.y = d.depth * (RELATION_WIDTH + COMPONENT_SPACE_HORIZONTAL) + 30;
			if (d.data.type !== "relation") {
				d.x = leafCount * (COMPONENT_HEIGHT + COMPONENT_SPACE_VERTICAL);
				leafCount += 1;
			} else {
				d.x = d.children && d.children.length ? (d.children[0].x + d.children[d.children.length - 1].x) / 2 : 0;
				if (!d.parent && d.children) {
					height = d.children[d.children.length - 1].x + COMPONENT_HEIGHT;
				}
			}
		});
		return {
			nodes: nodes,
			height: height
		};
	};

	// 设置key
	const valueTemp = JSON.parse(JSON.stringify(value));
	const finalValue = Object.assign({
		type: "relation",
		path: ["relation"]
	}, setKey(valueTemp, {}));
	finalValue.children = addDropAreaAndOperation(valueTemp.children, ["children"]);

	const hierarchyData = hierarchy(finalValue);
	const { nodes, height } = buildNodes(hierarchyData);
	const flattenNodes = nodes.descendants();
	const flattenLinks = nodes.links();

	return (
		<div className="lb-overview">
			<div
				className="lb-rule-tree-content"
				style={{
					position: "relative",
					height: height + 200 + "px",
					width: (hierarchyData?.height * 160 + 300) + "px"
				}}
			>
				{createFields(flattenNodes)}
				{
					flattenLinks.map((link, linkIndex) => {
						const { source, target } = link;
						const sourceKey = source.data.key;
						const targetKey = target.data.key;
						let x;

						if (!source.parent) {
							x = source.y + RELATION_WIDTH;
						} else {
							x = source.y + RELATION_WIDTH;
						};
						return (
							<div
								key={getHierarchyId(sourceKey, targetKey)}
								data-key={getHierarchyId(sourceKey, targetKey)}
							>
								<Link
									root={!source.parent}
									color={source?.data?.color}
									source={{
										x: x,
										y: source.x
									}}
									target={{
										x: target.y,
										y: target.x
									}}
								/>
							</div>
						);
					})
				}
			</div>
		</div>
	);
};
