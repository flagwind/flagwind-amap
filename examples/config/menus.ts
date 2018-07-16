/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const menus =
[
    {
        title: "概览",
        path: "/intro",
        icon: "pie-graph"
    },
    {
        title: "组件",
        path: "/components",
        icon: "ios-keypad",
        children:
        [
            {
                title: "基础",
                children:
                [
                    {
                        title: "地图",
                        path: "/components/amap",
                        icon: "icon-map"
                    }
                ]
            },
            {
                title: "覆盖物",
                children:
                [
                    {
                        title: "点标记",
                        path: "/components/marker",
                        icon: "icon-marker"
                    },
                    {
                        title: "文本标记",
                        path: "/components/text-marker",
                        icon: "icon-text-marker"
                    },
                    {
                        title: "圆点标记",
                        path: "/components/circle-marker",
                        icon: "icon-circle-marker"
                    },
                    {
                        title: "灵活点标记",
                        path: "/components/elastic-marker",
                        icon: "icon-elastic-marker"
                    },
                    {
                        title: "简单标注",
                        path: "/components/simple-marker",
                        icon: "icon-simple-marker"
                    },
                    {
                        title: "多边形",
                        path: "/components/polygon",
                        icon: "icon-polygon"
                    },
                    {
                        title: "圆形",
                        path: "/components/circle",
                        icon: "icon-circle"
                    },
                    {
                        title: "矩形",
                        path: "/components/rectangle",
                        icon: "icon-rectangle"
                    },
                    {
                        title: "折线",
                        path: "/components/polyline",
                        icon: "icon-polyline"
                    },
                    {
                        title: "贝瑟尔曲线",
                        path: "/components/bezier-curve",
                        icon: "icon-bezier-curve"
                    }
                ]
            }
        ]
    }
];

export default menus;
