/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { CreateElement, VNode } from "vue";
import { component, config } from "flagwind-web";
import Convert from "common/convert";
import EditableOverlay from "../editable-overlay";

/**
 * 多边形组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-polygon"
})
export default class Polygon extends EditableOverlay
{
    /**
     * 获取或设置多边形轮廓线的节点坐标数组。
     * @config {Array<[number, number]> | Array<Array<[number, number]>>}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public path: Array<[number, number]> | Array<Array<[number, number]>>;
    
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
     * 获取或设置线条样式，实线：solid、虚线：dashed。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public strokeStyle: string;

    /**
     * 获取或设置圆形填充颜色,使用16进制颜色代码赋值。
     * @config {string}
     * @default #006600
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public fillColor: string;

    /**
     * 获取或设置圆形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
     * @config {number}
     * @default 0.9
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public fillOpacity: number;

    /**
     * 获取或设置设置多边形否可拖拽移动，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public draggable: boolean;

    /**
     * 获取或设置勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效，此属性在ie9+浏览器有效 取值： 
     * 实线：[0,0,0] 
     * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
     * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
     * @config {Array<number>}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public strokeDasharray: Array<number>;

    /**
     * 获取或设置设置多边形否可编辑，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public editable: boolean;
    
    /**
     * 获取多边形轮廓线节点数组。
     * @returns Array<[number, number]>
     */
    public getPath(): Array<[number, number]>
    {
        return this.component.getPath().map(Convert.toLngLatArray);
    }
    
    /**
     * 获取当前多边形的矩形范围对象。
     * @returns AMap.Bounds
     */
    public getBounds(): AMap.Bounds
    {
        return this.component.getBounds();
    }
    
    /**
     * 获取多边形的面积（单位：平方米）。
     * @returns number
     */
    public getArea(): number
    {
        return this.component.getArea();
    }
    
    /**
     * 判断指定点坐标是否在多边形范围内。
     * @param  {AMap.LngLat|[number, number]} point
     * @returns boolean
     */
    public contains(point: AMap.LngLat | [number, number]): boolean
    {
        return this.component.contains(point);
    }
    
    /**
     * 当渲染组件时调用的钩子方法。
     * @override
     * @returns VNode
     */
    protected render(createElement: CreateElement): VNode
    {
        return null;
    }

    /**
     * 当装载组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 调用基类方法
        super.mounted();
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        super.destroyed();
    }

    /**
     * 根据配置项初始化组件。
     * @override
     * @param  {any} options
     * @returns Promise<AMap.Polygon>
     */
    protected async initialize(options: any): Promise<AMap.Polygon>
    {
        return new Promise<AMap.Polygon>((resolve, reject) =>
        {
            const polygon = new AMap.Polygon(options);
            
            AMap.plugin(["AMap.PolyEditor", "AMap.MouseTool"], () =>
            {
                this.editor = new AMap.PolyEditor(this.map, polygon);

                resolve(polygon);
            });
        });
    }
}
