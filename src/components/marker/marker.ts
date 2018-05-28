/*!
 * Authors:
 *      Evan <skcy@vip.qq.com>
 * 
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Component from "../component";
import events from "config/events";
import MapConvert from "common/map-convert";
import { IMapLngLat, IMapPixel } from "models";

const window: any = global;

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS =
[
    "click",                // 鼠标左键单击事件
    "dblclick",             // 鼠标左键双击事件
    "rightclick",           // 鼠标右键单击事件
    "moving",               // 点标记在执行moveTo，moveAlong动画时触发事件
    "moveend",              // 点标记执行moveTo动画结束时触发事件。如地图有拖拽缓动效果，则在缓动结束后触发
    "movealong",            // 点标记执行moveAlong动画一次后触发事件
    "mousemove",            // 鼠标在地图上移动时触发
    "mouseover",            // 鼠标移入地图容器内时触发
    "mouseout",             // 鼠标移出地图容器时触发
    "mouseup",              // 鼠标在地图上单击抬起时触发
    "mousedown",            // 鼠标在地图上单击按下时触发
    "dragstart",            // 开始拖拽地图时触发
    "dragging",             // 拖拽地图过程中触发
    "dragend",              // 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
    "touchstart",           // 触摸开始时触发事件，仅适用移动设备
    "touchmove",            // 触摸移动进行中时触发事件，仅适用移动设备
    "touchend"              // 触摸停止时触发，仅适用移动设备
];

/**
 * 路径定义。
 * @private
 * @const
 */
const PATHS =
{
    simple: "overlay/SimpleMarker",
    awesome: "overlay/AwesomeMarker",
    svg: "overlay/SvgMarker"
};

/**
 * 高德地图marker组件。
 * @class
 * @version 1.0.0
 */
@component({ name: "fw-amap-marker" })
export default class Marker extends Component
{
    protected withSlots: boolean = false;            // 是否以自定义插槽的方式进行渲染

    /**
     * 标记类型，可选值为 "default"、"simple"、"awesome"、"svg"。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default default
     * @returns String
     */
    @config({type: String, default: "default"})
    public type: "default" | "simple" | "awesome" | "svg";
    
    /**
     * 点标记在地图上显示的位置，默认为地图中心点。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns IMapLngLat
     */
    @config({type: [Object, Array]})
    public position: IMapLngLat | [number, number];

    /**
     * 点标记在地图上显示的位置，默认为地图中心点。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns IMapPixel
     */
    @config({type: Object})
    public offset: IMapPixel;
    
    /**
     * 需在点标记中显示的图标。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns string
     */
    @config({type: String, default: require("../../assets/n_64.png")})
    public icon: string;
    
    /**
     * 点标记显示内容。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns IMapPixel
     */
    @config({type: Object})
    public content: IMapPixel;

    /**
     * 鼠标点击时marker是否置顶。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({type: Boolean})
    public topWhenClick: boolean;

    /**
     * 是否将覆盖物的鼠标或touch等事件冒泡到地图上 。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({type: Boolean})
    public bubble: boolean;

    /**
     * 设置点标记是否可拖拽移动。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({type: Boolean})
    public draggable: boolean;

    /**
     * 设置拖拽点标记时是否开启点标记离开地图的效果。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default false
     * @returns boolean
     */
    @config({type: Boolean})
    public raiseOnDrag: boolean;

    /**
     * 指定鼠标悬停时的鼠标样式。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns string
     */
    @config({type: String})
    public cursor: string;

    /**
     * 点标记是否可见。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns boolean
     */
    @config({type: Boolean})
    public visible: boolean;

    /**
     * 点标记的叠加顺序。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default 100
     * @returns number
     */
    @config({type: Number})
    public zIndex: number;

    /**
     * 点标记的旋转角度，广泛用于改变车辆行驶方向。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns number
     */
    @config({type: Number})
    public angle: number;

    /**
     * 是否自动旋转。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns number
     */
    @config({type: Number})
    public autoRotation: number;

    /**
     * 点标记的动画效果。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default AMAP_ANIMATION_NONE
     * @returns string
     */
    @config({type: String})
    public animation: "AMAP_ANIMATION_NONE" | "AMAP_ANIMATION_NONE" | "AMAP_ANIMATION_DROP" | "AMAP_ANIMATION_BOUNCE";
    
    /**
     * 点标记阴影。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns string
     */
    @config({type: String})
    public shadow: string;
    
    /**
     * 鼠标滑过点标记时的文字提示。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns string
     */
    @config({type: String})
    public title: string;
    
    /**
     * 点标记是否可点击。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns boolean
     */
    @config({type: Boolean})
    public clickable: boolean;
    
    /**
     * 设置Marker的可点击区域。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns boolean
     */
    @config({type: Boolean})
    public shape: boolean;
    
    /**
     * 用户自定义属性。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns any
     */
    @config()
    public extData: any;
    
    /**
     * 添加文本标注，content为文本标注的内容，offset为偏移量。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns any {content, offset}
     */
    @config({type: Object})
    public label: any;
    
    public constructor()
    {
        super(EVENTS);
    }

    /**
     * 当组件开始渲染时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected render(createElement: Function): void
    {
        const slots = this.$slots.default || [];

        this.withSlots = !!slots.length;

        if (this.withSlots)
        {
            return createElement("div", slots);
        }

        return null;
    }

    /**
     * 当创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 调用基类方法
        super.mounted();
    }

    /**
     * 根据指定配置项初始化组件。
     * @protected
     * @override
     * @param  {object} options
     * @returns void
     */
    protected initialize(options: any): any
    {
        // const AMap = window.AMap;
        // const AMapUI = window.AMapUI;
        const type = this.type;

        switch(type)
        {
            case "simple":
            case "awesome":
            case "svg":
            {
                const path = PATHS[type];

                return new Promise<any>((resolve, reject) =>
                {
                    // tslint:disable-next-line:variable-name
                    window.AMapUI.loadUI([path], function(Marker: any)
                    {
                        const marker = new Marker(options);

                        resolve(marker);
                    });
                });
            }
            default:
            {
                if(this.withSlots)
                {
                    options.content = this.$el;
                }
                
                return new window.AMap.Marker(options);
            }
        }
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        if(this.amapComponent)
        {
            this.amap.remove(this.amapComponent);
        }
    }
}
