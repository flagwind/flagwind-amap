/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

// 地图加载器
import MapLoader from "common/map-loader";

// 组件
import AMap from "./components/amap";

const components =
{
    "amap": AMap
};

const amap =
{
    installed: false,

    init: MapLoader.init,
    
    // tslint:disable-next-line:variable-name
    install: (Vue: any, opts: any = {}) =>
    {
        if(amap.installed)
        {
            return;
        }

        Object.keys(components).forEach(key =>
        {
            console.log(key);

            // flagwind 组件统一加小写 "fw" 标识
            Vue.component(key, components[key]);
        });

        amap.installed = true;
    }
};

export
{
    MapLoader
};

export default amap;
