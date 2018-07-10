/*!
 * Authors:
 *      Evan <skcy@vip.qq.com>
 * 
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import Vue, { CreateElement, VNode } from "vue";
import flagwind from "flagwind-core";
import Type = flagwind.Type;
import { component, config } from "flagwind-web";
import Overlay from "../overlay";
import Convert from "common/convert";

/**
 * 组件原生事件。
 * @const
 */
const EVENTS =
[
    "moving",               // 点标记在执行moveTo，moveAlong动画时触发事件
    "moveend",              // 点标记执行moveTo动画结束时触发事件。如组件有拖拽缓动效果，则在缓动结束后触发
    "movealong"             // 点标记执行moveAlong动画一次后触发事件
];

/**
 * 点标记组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-marker"
})
export default class Marker extends Overlay
{
    private _bufferVue: any;                           // 临时组件（用于获取插槽内容使用）

    /**
     * 获取或设置点标记在地图上显示的位置，默认为地图中心点。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array]})
    public position: [number, number];
    
    /**
     * 获取或设置点标记显示位置偏移量，默认值为 [-10, -34]。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array]})
    public offset: [number, number];
    
    /**
     * 获取或设置点标记中显示的图标。
     * @config {string | object}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String, Object]})
    public icon: string | object;
    
    /**
     * 获取或设置点标记显示内容。
     * @config {string | HTMLElement}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String, Object]})
    public content: string | HTMLElement;

    /**
     * 获取或设置鼠标点击时 Marker 是否置顶。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public topWhenClick: boolean;

    /**
     * 获取或设置点标记是否可拖拽移动。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public draggable: boolean;

    /**
     * 获取或设置拖拽点标记时是否开启点标记离开地图的效果。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public raiseOnDrag: boolean;

    /**
     * 获取或设置点标记的旋转角度，广泛用于改变车辆行驶方向。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public angle: number;

    /**
     * 获取或设置是否自动旋转。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public autoRotation: boolean;

    /**
     * 获取或设置点标记的动画效果。
     * @config {string}
     * @default AMAP_ANIMATION_NONE
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public animation: "AMAP_ANIMATION_NONE" | "AMAP_ANIMATION_DROP" | "AMAP_ANIMATION_BOUNCE";
    
    /**
     * 获取或设置点标记阴影。
     * @config {object}
     * @description 动态属性，支持响应式。
     */
    @config({type: Object})
    public shadow: object;
    
    /**
     * 获取或设置鼠标滑过点标记时的提示文字。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public title: string;
    
    /**
     * 获取或设置点标记是否可点击。
     * @config {boolean}
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public clickable: boolean;
    
    /**
     * 获取或设置 Marker 的可点击区域。
     * @description 动态属性，支持响应式。
     * @config {object}
     */
    @config({type: Object})
    public shape: object;
    
    /**
     * 获取或设置文本标注，content 为文本标注的内容，offset 为偏移量。
     * @config {object}
     * @description 动态属性，支持响应式。
     */
    @config({type: Object})
    public label: object;

    /**
     * 以指定的速度，点标记沿指定的路径移动。
     * @param  {Array<[number, number]>} path 路径坐标串。
     * @param  {number} speed 指定速度，单位：千米/小时。
     * @param  {Function} func? 变化曲线函数，缺省为function(k){return k}。
     * @param  {boolean} circlable? 是否循环执行动画，默认为false。
     * @returns void
     */
    public moveAlong(path: Array<[number, number]>, speed: number, func?: Function, circlable?: boolean): void
    {
        const paths = path.map((item: [number, number]) => Convert.toLngLat(item));

        this.component.moveAlong(paths, speed, func, circlable);
    }

    /**
     * 以给定速度移动点标记到指定位置。
     * @param  {LngLat | [number, number]} lnglat 指定位置
     * @param  {number} speed 指定速度，单位：千米/小时。
     * @param  {Function} func? 变化曲线函数，缺省为function(k){return k}。
     * @returns void
     */
    public moveTo(lnglat: [number, number], speed: number, func?: Function): void
    {
        const path = Convert.toLngLat(lnglat);

        this.component.moveTo(path, speed, func);
    }

    /**
     * 暂停点标记的动画效果。
     * @returns void
     */
    public pauseMove(): void
    {
        this.component.pauseMove();
    }
    
    /**
     * 重新开始点标记的动画效果。
     * @returns void
     */
    public resumeMove(): void
    {
        this.component.resumeMove();
    }
    
    /**
     * 点标记停止动画。
     * @returns void
     */
    public stopMove(): void
    {
        this.component.stopMove();
    }

    /**
     * 获取组件支持的事件列表。
     * @override
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return [...EVENTS, ...super.getComponentEvents()];
    }
    
    /**
     * 获取配置属性转换程序列表。
     * @description 当配置属性赋值时调用的函数，用于转换数据类型。
     * @override
     * @returns object
     */
    protected getOptionConverters(): object
    {
        const converters =
        {
            icon(options: any): string | AMap.Icon
            {
                return Type.isString(options) ? options : Convert.toIcon(options);
            },

            shadow(options: object): AMap.Icon
            {
                return Convert.toIcon(options);
            },

            shape(options: object): AMap.MarkerShape
            {
                return new AMap.MarkerShape(options);
            },
            
            label(options: any): object
            {
                const { content = "", offset = [0, 0] } = options;

                return {
                    content,
                    offset: Convert.toPixel(offset)
                };
            }
        };

        return converters;
    }
    
    /**
     * 当创建组件时调用的钩子方法。
     * @override。
     * @returns void
     */
    protected created(): void
    {
        const slots = this.$slots.default || [];

        if(slots.length)
        {
            this._bufferVue = new Vue
            ({
                props:
                {
                    nodes:
                    {
                        type: [Array, Object]
                    }
                },
                
                render(createElement: CreateElement): VNode
                {
                    const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes];

                    return createElement("div", { ref: "content", staticClass: "amap-marker-content-inner" }, nodes);
                }
            }).$mount();
        }
    }

    /**
     * 当渲染组件时调用的钩子方法。
     * @override
     * @returns VNode
     */
    protected render(createElement: CreateElement): VNode
    {
        const slots = this.$slots.default || [];

        if(slots.length)
        {
            this._bufferVue.nodes = slots;
        }

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
     * 根据配置项初始化组件。
     * @override
     * @param  {any} options
     * @returns any
     */
    protected initialize(options: any): any
    {
        if(this._bufferVue)
        {
            options.content = this._bufferVue.$refs.content;
        }

        return new AMap.Marker(options);
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        if(this._bufferVue)
        {
            this._bufferVue.$destroy();
        }

        super.destroyed();
    }
}
