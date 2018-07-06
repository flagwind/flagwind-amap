/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

/// <reference path="./typings/index.d.ts" />

// 地图加载器
import MapLoader from "./common/loader";

// 组件
import AMap from "./components/map";
import Marker from "./components/marker";
import ElasticMarker from "./components/elastic-marker";
import Polygon from "./components/polygon";

const components =
{
    "amap": AMap,
    "amap-marker": Marker,
    "amap-elastic-marker": ElasticMarker,
    "amap-polygon": Polygon
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
