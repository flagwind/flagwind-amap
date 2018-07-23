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
                title: "标注",
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
                    }
                ]
            },
            {
                title: "图形",
                children:
                [
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
                        title: "椭圆",
                        path: "/components/ellipse",
                        icon: "icon-ellipse"
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
            },
            {
                title: "控件",
                children:
                [
                    {
                        title: "右键菜单",
                        path: "/components/context-menu",
                        icon: "icon-context-menu"
                    },
                    {
                        title: "信息窗体",
                        path: "/components/info-window",
                        icon: "icon-info-window"
                    },
                    {
                        title: "控制条",
                        path: "/components/control-bar",
                        icon: "icon-control-bar"
                    },
                    {
                        title: "工具条",
                        path: "/components/tool-bar",
                        icon: "icon-tool-bar"
                    },
                    {
                        title: "地图类型",
                        path: "/components/map-type",
                        icon: "icon-map-type"
                    },
                    {
                        title: "地图鹰眼",
                        path: "/components/over-view",
                        icon: "icon-over-view"
                    },
                    {
                        title: "比例尺",
                        path: "/components/scale",
                        icon: "icon-scale"
                    }
                ]
            }
        ]
    }
];

export default menus;
