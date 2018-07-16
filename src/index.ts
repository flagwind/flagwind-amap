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
import TextMarker from "./components/text-marker";
import CircleMarker from "./components/circle-marker";
import ElasticMarker from "./components/elastic-marker";
import SimpleMarker from "./components/simple-marker";
import Polygon from "./components/polygon";
import Circle from "./components/circle";
import Rectangle from "./components/rectangle";
import Polyline from "./components/polyline";
import BezierCurve from "./components/bezier-curve";

const components =
{
    "amap": AMap,
    "amap-marker": Marker,
    "amap-text-marker": TextMarker,
    "amap-circle-marker": CircleMarker,
    "amap-elastic-marker": ElasticMarker,
    "amap-simple-marker": SimpleMarker,
    "amap-polygon": Polygon,
    "amap-circle": Circle,
    "amap-rectangle": Rectangle,
    "amap-polyline": Polyline,
    "amap-bezier-curve": BezierCurve
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
