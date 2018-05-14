/*!
 * Authors:
 *      Evan <skcy@vip.qq.com>
 * 
 * Copyright (C) 2018-present O&M Cloud Inc. All rights reserved. 
 */

/**
 * 表示一个地图LngLat类。
 * @interface
 * @version 1.0.0
 */
export default interface IMapLngLat
{
    /**
     * 经度。
     * @member
     * @returns string
     */
    lng: number;

    /**
     * 纬度。
     * @member
     * @returns string
     */
    lat: number;

    /**
     * 获取经度。
     * @member
     * @returns FunctionConstructor
     */
    getLng?: Function;

    /**
     * 获取纬度。
     * @member
     * @returns FunctionConstructor
     */
    getLat?: Function;
}
