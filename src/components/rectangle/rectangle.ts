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
 * 矩形组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-rectangle"
})
export default class Rectangle extends EditableOverlay
{
    private _currentValue: any;                         // 组件的当前值
    private _draggingListener: AMap.EventListener;      // dragging 事件监听器
    private _adjustListener: AMap.EventListener;        // adjust 事件监听器
    
    /**
     * 获取或设置值。
     * @config {object}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public value: any;
    
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
     * 获取或设置设置矩形否可拖拽移动，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public draggable: boolean;

    /**
     * 获取或设置设置矩形否可编辑，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public editable: boolean;

    /**
     * 获取矩形范围。
     * @returns Array<[number, number]>
     */
    public getBounds(): Array<[number, number]>
    {
        return Convert.boundsTo(this.component.getBounds());
    }
    
    /**
     * 判断指定点坐标是否在矩形内。
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
        if(this._adjustListener)
        {
            AMap.event.removeListener(this._adjustListener);
        }

        if(this._draggingListener)
        {
            AMap.event.removeListener(this._draggingListener);
        }

        super.destroyed();
    }

    /**
     * 根据配置项初始化组件。
     * @override
     * @async
     * @param  {any} options
     * @returns Promise<AMap.Rectangle>
     */
    protected async initialize(options: any): Promise<AMap.Rectangle>
    {
        return new Promise<AMap.Rectangle>((resolve, reject) =>
        {
            const rectangle = new AMap.Rectangle(options);

            // 监听矩形的拖拽(结束)事件，以便更新当前值
            this._draggingListener = AMap.event.addListener(rectangle, "dragging", this.onBoundsChange, this);
            
            AMap.plugin(["AMap.RectangleEditor"], () =>
            {
                this.editor = new AMap.RectangleEditor(this.map, rectangle);
                
                // 监听编辑器的 adjust 事件，以便更新当前值
                this._adjustListener = AMap.event.addListener(this.editor, "adjust", this.onBoundsChange, this);
                
                resolve(rectangle);
            });
        });
    }

    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const self = this;
        const component = this.component;

        const handlers =
        {
            value(value: any)
            {
                if(!value || value === self._currentValue)
                {
                    return;
                }

                const bounds = Convert.toBounds(value);
                
                // 设置矩形的范围
                component.setBounds(bounds);
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }
    
    /**
     * 当矩形范围发生变动时调用。
     * @param  {any} e
     * @returns void
     */
    private onBoundsChange(): void
    {
        this._currentValue = this.getBounds();
                
        this.$emit("input", this._currentValue);
    }
}
