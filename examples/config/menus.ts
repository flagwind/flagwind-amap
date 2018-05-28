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
                        icon: "map"
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
                        icon: "ios-location-outline"
                    }
                ]
            }
        ]
    }
];

export default menus;
