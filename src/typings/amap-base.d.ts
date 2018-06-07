/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMap
{
    /**
     * 像素坐标，确定地图上的一个像素点。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/core#Pixel
     */
    class Pixel
    {
        /**
         * 构造一个像素坐标对象。
         * @constructor
         * @param  {number} x
         * @param  {number} y
         */
        constructor(x: number, y: number);
        
        /**
         * 获得X方向像素坐标。
         * @returns number
         */
        getX(): number;
        
        /**
         * 获得Y方向像素坐标。
         * @returns number
         */
        getY(): number;
        
        /**
         * 当前像素坐标与传入像素坐标是否相等。
         * @param  {Pixel} point
         * @returns boolean
         */
        equals(point: Pixel): boolean;
        
        /**
         * 以字符串形式返回像素坐标对象。
         * @returns string
         */
        toString(): string;
    }

    /**
     * 地物对象的像素尺寸。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/core#Size
     */
    class Size
    {
        /**
         * 构造尺寸对象。
         * @constructor
         * @param  {number} width 宽度，单位：像素。
         * @param  {number} height 高度，单位：像素。
         */
        constructor(width: number, height: number);
        
        /**
         * 获取宽度值。
         * @returns number
         */
        getWidth(): number;
        
        /**
         * 获取高度值。
         * @returns number
         */
        getHeight(): number;
        
        /**
         * 以字符串形式返回尺寸大小对象。
         * @description 自 v1.2 新增
         * @returns string
         */
        toString(): string;
    }

    /**
     * 经纬度坐标，确定地图上的一个点。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/core#LngLat
     */
    class LngLat
    {
        /**
         * 构造一个地理坐标对象，lng、lat 分别代表经度、纬度值。
         * @constructor
         * @param  {number} lng
         * @param  {number} lat
         */
        constructor(lng: number, lat: number);
        
        /**
         * 当前经纬度坐标值经度移动w，纬度移动s，得到新的坐标。
         * 经度向右移为正值，纬度向上移为正值，单位为米。
         * @description 自 v1.2 新增
         * @param  {number} w
         * @param  {number} s
         * @returns LngLat
         */
        offset(w: number, s: number): LngLat;
        
        /**
         * 当前经纬度和传入经纬度或者经纬度数组连线之间的地面距离，单位为米。
         * @param  {LngLat|[number, number]}
         * @returns number
         */
        distance(lnglat: LngLat | [number, number]): number;
        
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
         * @param  {LngLat | [number, number]} lnglat
         * @returns boolean
         */
        equals(lnglat: LngLat | [number, number]): boolean;
        
        /**
         * LngLat对象以字符串的形式返回。
         * @returns string
         */
        toString(): string;
    }
    
    /**
     * 地物对象的经纬度矩形范围。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/core#Bounds
     */
    class Bounds
    {
        /**
         * 矩形范围的构造函数。
         * 参数southWest、northEast分别代表地物对象西南角经纬度和东北角经纬度值。
         * @param  {LngLat | [number, number]} southWest
         * @param  {LngLat | [number, number]} northEast
         */
        constructor(southWest: LngLat | [number, number], northEast: LngLat | [number, number]);
        
        /**
         * 指定点坐标是否在矩形范围内。
         * @param  {LngLat | [number, number]} point
         * @returns boolean
         */
        contains(point: LngLat | [number, number]): boolean;
        
        /**
         * 获取当前Bounds的中心点经纬度坐标。
         * @returns LngLat | [number, number]
         */
        getCenter(): LngLat | [number, number];
        
        /**
         * 获取西南角坐标。
         * @returns LngLat | [number, number]
         */
        getSouthWest(): LngLat | [number, number];
        
        /**
         * 获取东北角坐标。
         * @returns LngLat | [number, number]
         */
        getNorthEast(): LngLat | [number, number];
        
        /**
         * 以字符串形式返回地物对象的矩形范围。
         * @returns string
         */
        toString(): string;
    }
}