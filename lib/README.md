### @tntx/overview-tree 树形概览图

#### 安装
```bash
npm i @tntx/overview-tree
```

#### 如何使用
```jsx
import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom';
import Overview from "@tntx/overview-tree";
import { mockData } from "./mockData";

const Demo = props => {
    const [rootData, setRootData] = useState([]);
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
				setRootData(mockData);
			}
		}, 100);
	};

    return (
        <Overview
            rootName="我是根节点"
            rootData={rootData}
            childData={childData}
            getChild={(d) => {
                getData(d);
            }}
            onClick={(d) => {
                console.log(d);
            }}
        />
    )
};

ReactDOM.render(
    <Demo />,
    document.getElementById('root')
);
```

### API
| 参数 | 说明 | 类型 | 默认值 |
| ------------ | ------------ | ------------ | ------------ |
| rootName | 根节点名称 | String | -- |
| rootData | 根节点数据 | Arrary | -- |
| childData | 子节点数据 | Arrary | -- |
| nodeTypeMap | 节点数据配置 | Object | 往下看 |
| noPlus | 某个节点无扩展 | Number | 10 |
| getChild | 需要请求获取子节点数据回调 | Function | -- |
| onClick | 点击节点回调 | Function | -- |

#### nodeTypeMap 默认可不填，内置数据如下：
```js
{
    1: { name: "决策流", color: "#0FB8FE", img: require("./Base/img/1.svg") },
    2: { name: "策略集", color: "#628FE4", img: require("./Base/img/2.svg") },
    3: { name: "决策工具", color: "#CF6767", img: require("./Base/img/3.svg") },
    4: { name: "三方服务", color: "#CFAB67", img: require("./Base/img/4.svg") },
    5: { name: "模型", color: "#4DA9C9", img: require("./Base/img/5.svg") },
    6: { name: "冠军挑战者", color: "#9367C6", img: require("./Base/img/6.svg") },
    7: { name: "计算公式", color: "#D97B4E", img: require("./Base/img/7.svg") },
    8: { name: "规则", color: "#E8A530", img: require("./Base/img/8.svg") },
    9: { name: "指标", color: "#2B82EC", img: require("./Base/img/9.svg") },
    10: { name: "字段", color: "#6776CF", img: require("./Base/img/10.svg") }
}
```