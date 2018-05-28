/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import IMapConfig from "models/map-config";

/**
 * 地图默认配置项。
 * @config
 * @version 1.0.0
 */
const MAP_CONFIG: IMapConfig =
{
    version: "1.4.5",
    uiVersion: "1.0.11",
    protocol: "https",
    host: "webapi.amap.com/maps",
    lazyload: true,
    plugins: [],
    callback: "onAMapLoaded"
};

export default MAP_CONFIG;
