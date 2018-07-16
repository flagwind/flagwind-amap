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
 * 贝瑟尔曲线组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-bezier-curve"
})
export default class BezierCurve extends EditableOverlay
{
    private _currentValue: Array<any>;                      // 组件的当前值
    // private _draggingListener: AMap.EventListener;          // dragging 事件监听器
    private _addnodeistener: AMap.EventListener;            // addnode 事件监听器
    private _adjustListener: AMap.EventListener;            // adjust 事件监听器
    private _removenodeListener: AMap.EventListener;        // removenode 事件监听器
    
    /**
     * 获取或设置贝瑟尔曲线的路径。
     * @config {Array<Array<[number, number]>>}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public value: Array<Array<[number, number]>>;

    /**
     * 获取或设置线条是否带描边。
     * @member {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public isOutline: boolean;

    /**
     * 获取或设置描边的宽度。
     * @config {number}
     * @default 1
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public borderWeight: number;

    /**
     * 获取或设置线条描边颜色，此项仅在isOutline为true时有效。
     * @config {string}
     * @default #000000
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public outlineColor?: string;

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
     * 获取或设置是否延路径显示白色方向箭头。
     * Canvas绘制时有效，建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头（自V1.4.0版本参数效果变更）
     * @member {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public showDir: boolean;

    /**
     * 获取或设置设置贝瑟尔曲线否可拖拽移动，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    // @config({type: Boolean})
    // public draggable: boolean;

    /**
     * 获取或设置设置贝瑟尔曲线否可编辑，默认为false。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public editable: boolean;

    /**
     * 获取或设置编辑状态下自定义编辑控制点的样式，返回字段同 MarkerOptions。
     * @config {Function}
     * @default 静态属性，仅支持初始化配置。
     */
    @config({type: Function})
    public getMarkerOptions: () => AMap.MarkerOptions;

    /**
     * 获取或设置编辑状态下自定义控制线的样式，返回字段同 PolylineOptions。
     * @config {Function}
     * @default 静态属性，仅支持初始化配置。
     */
    @config({type: Function})
    public getCtrlLineOptions: () => AMap.PolylineOptions;
    
    /**
     * 获取贝瑟尔曲线路径的节点数组。
     * @returns Array<Array<[number, number]>>
     */
    public getPath(): Array<Array<[number, number]>>
    {
        const paths = this.component.getPath();
        const result = [];

        for(let routePoint of paths)
        {
            let buffer = [];

            // 控制点在前
            if(routePoint.controlPoints && routePoint.controlPoints.length)
            {
                for(let controlPoint of routePoint.controlPoints)
                {
                    buffer.push(Convert.lngLatTo(controlPoint));
                }
            }

            // 途径点在后
            buffer.push(Convert.lngLatTo(routePoint));

            result.push(buffer);
        }

        return result;
    }
    
    /**
     * 获取当前贝瑟尔曲线的矩形范围对象。
     * @returns Array<[number, number]>
     */
    public getBounds(): Array<[number, number]>
    {
        return Convert.boundsTo(this.component.getBounds());
    }
    
    /**
     * 获取贝瑟尔曲线的总长度。（单位：米）
     * @returns number
     */
    public getLength(): number
    {
        return this.component.getLength();
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
        if(this._addnodeistener)
        {
            AMap.event.removeListener(this._addnodeistener);
        }

        if(this._adjustListener)
        {
            AMap.event.removeListener(this._adjustListener);
        }
        
        if(this._removenodeListener)
        {
            AMap.event.removeListener(this._removenodeListener);
        }

        // if(this._draggingListener)
        // {
        //     AMap.event.removeListener(this._draggingListener);
        // }

        super.destroyed();
    }

    /**
     * 根据配置项初始化组件。
     * @override
     * @param  {any} options
     * @returns Promise<AMap.BezierCurve>
     */
    protected async initialize(options: any): Promise<AMap.BezierCurve>
    {
        return new Promise<AMap.BezierCurve>((resolve, reject) =>
        {
            options.path = options.value;

            const bezierCurve = new AMap.BezierCurve(options);

            // 监听贝瑟尔曲线的拖拽(结束)事件，以便更新当前值
            // this._draggingListener = AMap.event.addListener(bezierCurve, "dragging", this.onPathChange, this);
            
            AMap.plugin(["AMap.BezierCurveEditor"], () =>
            {
                let bezierCurveEditorOptions = null;
                
                // 解析编辑器配置
                if(this.getMarkerOptions || this.getCtrlLineOptions)
                {
                    bezierCurveEditorOptions =
                    {
                        getMarkerOptions: this.getMarkerOptions,

                        getCtrlLineOptions: this.getCtrlLineOptions
                    };
                }
                
                this.editor = new AMap.BezierCurveEditor(this.map, bezierCurve, bezierCurveEditorOptions);
                
                // // 监听编辑器的 addnode、adjust、removenode 事件，以便更新当前值
                this._addnodeistener = AMap.event.addListener(this.editor, "addnode", this.onPathChange, this);
                this._adjustListener = AMap.event.addListener(this.editor, "adjust", this.onPathChange, this);
                this._removenodeListener = AMap.event.addListener(this.editor, "removenode", this.onPathChange, this);
                
                resolve(bezierCurve);
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
                
                // 特意做一个拷贝处理，防止高德篡改源数组
                component.setPath(value.concat());
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }
    
    /**
     * 当路径发生改变时调用。
     * @param  {any} e
     * @returns void
     */
    private onPathChange(e: any): void
    {
        this._currentValue = this.getPath();
        
        this.$emit("input", this._currentValue);
    }
}
