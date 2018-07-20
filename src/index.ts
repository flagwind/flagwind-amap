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
import Ellipse from "./components/ellipse";
import Rectangle from "./components/rectangle";
import Polyline from "./components/polyline";
import BezierCurve from "./components/bezier-curve";
import { ContextMenu, ContextMenuItem } from "./components/context-menu";
import InfoWindow from "./components/info-window";
import ControlBar from "./components/control-bar";

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
    "amap-ellipse": Ellipse,
    "amap-rectangle": Rectangle,
    "amap-polyline": Polyline,
    "amap-bezier-curve": BezierCurve,
    "amap-context-menu": ContextMenu,
    "amap-context-menu-item": ContextMenuItem,
    "amap-info-window": InfoWindow,
    "amap-control-bar": ControlBar
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
