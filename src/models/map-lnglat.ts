/*!
 * Authors:
 *      Evan <skcy@vip.qq.com>
 * 
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

/**
 * 表示一个地图经纬度坐标，用于确定地图上的一个点。
 * @interface
 * @version 1.0.0
 */
export default interface IMapLngLat
{
    new(lng: number, lat: number): any;
    
    /**
     * 获取经度值。
     * @returns number
     */
    getLng(): number;
    
    /**
     * 获取纬度值。
     * @returns number
     */
    getLat(): number;
    
    /**
     * 判断当前坐标对象与传入坐标对象是否相等。
     * @param  {IMapLngLat} lnglat
     * @returns boolean
     */
    equals(lnglat: IMapLngLat): boolean;
    
    /**
     * LngLat 对象以字符串的形式返回。
     * @returns string
     */
    toString(): string;
}
