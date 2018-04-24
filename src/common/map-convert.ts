/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const window: any = global;

/**
 * 常用地图转换辅助类。
 * @class
 * @version 1.0.0
 */
export default class MapConvert
{
    public static toPixel(value: [number, number])
    {
        return new window.AMap.Pixel(value[0], value[1]);
    }
}
