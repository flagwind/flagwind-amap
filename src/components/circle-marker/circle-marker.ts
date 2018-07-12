/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Marker from "../marker";

/**
 * 圆点标记，不随地图级别变化而发生大小改变。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-circle-marker"
})
export default class CircleMarker extends Marker
{
    /**
     * 获取或设置圆心位置。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public center: [number, number];
    
    /**
     * 获取或设置圆点半径，单位：像素。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public radius: number;

    /**
     * 获取或设置线条颜色，使用16进制颜色代码赋值。
     * @config {string}
     * @default #006600
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public strokeColor: string;

    /**
     * 获取或设置轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
     * @config {number}
     * @default 0.9
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public strokeOpacity: number;
    
    /**
     * 获取或设置轮廓线宽度。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public strokeWeight: number;
   
    /**
     * 获取或设置图形填充颜色,使用16进制颜色代码赋值。
     * @config {string}
     * @default #006600
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public fillColor: string;

    /**
     * 获取或设置图形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
     * @config {number}
     * @default 0.9
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public fillOpacity: number;
    
    /**
     * 根据指定配置项初始化组件。
     * @override
     * @param  {object} options
     * @returns AMap.CircleMarker
     */
    protected initialize(options: object): AMap.CircleMarker
    {
        return new AMap.CircleMarker(options);
    }
}
