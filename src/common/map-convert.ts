/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const window: any = global;
import { IMapLngLat } from "models";

/**
 * 常用地图转换辅助类。
 * @class
 * @version 1.0.0
 */
export default class MapConvert
{
    /**
     * 经纬度转像素
     * @param value 经纬度
     */
    public static toPixel(value: [number, number])
    {
        return new window.AMap.Pixel(value[0], value[1]);
    }

    /**
     * 经纬度转像素
     * @param value 经纬度
     */
    public static toSize(value: [number, number])
    {
        return new window.AMap.Size(value[0], value[1]);
    }

    /**
     * 像素转经纬度
     * @param value 经纬度
     */
    public static pixelTo(value: [number, number])
    {
        return new window.AMap.Size(value[0], value[1]);
    }

    /**
     * 像素转经纬度
     * @param value 经纬度
     */
    public static lngLatTo(value: [number, number] | IMapLngLat) {
        if (!value)
        {
            return;
        }
        if (Array.isArray(value))
        {
            return value.slice();
        }
        return [ value.getLng(), value.getLat() ];
    }
}
