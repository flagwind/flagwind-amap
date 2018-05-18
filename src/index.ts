/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

// 地图加载器
import MapLoader from "./common/map-loader";

// 组件
import AMap from "./components/amap";
import AMapMarker from "./components/marker";

const components =
{
    "fw-amap": AMap,
    "fw-amap-marker": AMapMarker
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
