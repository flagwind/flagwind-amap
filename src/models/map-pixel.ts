/*!
 * Authors:
 *      Evan <skcy@vip.qq.com>
 * 
 * Copyright (C) 2018-present O&M Cloud Inc. All rights reserved. 
 */

/**
 * 表示一个地图Pixel类。
 * 像素坐标，确定地图上的一个像素点。
 * @interface
 * @version 1.0.0
 */
export default interface IMapPixel
{
    /**
     * 经度。
     * @member
     * @returns string
     */
    x: number;

    /**
     * 纬度。
     * @member
     * @returns string
     */
    y: number;
}
