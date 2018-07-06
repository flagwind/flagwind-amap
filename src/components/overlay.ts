/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { config } from "flagwind-web";
import Component from "./component";

/**
 * 组件原生事件。
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
 * 覆盖物基类。
 * @class
 * @version 1.0.0
 */
export default abstract class Overlay extends Component
{
    /**
     * 获取或设置覆盖物的叠加顺序。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public zIndex: number;

    /**
     * 获取或设置是否将覆盖物的鼠标或 touch 等事件冒泡到地图上。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public bubble: boolean;
    
    /**
     * 获取或设置鼠标悬停时的鼠标样式。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public cursor: string;

    /**
     * 获取或设置用户自定义数据。
     * @config {string | number | object | Array<any>}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String, Number, Object, Array]})
    public extData: string | number | object | Array<any>;
    
    /**
     * 获取或设置是否显示覆盖物。
     * @config {boolean}
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public visible: boolean;
    
    /**
     * 获取组件支持的事件列表。
     * @override
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return EVENTS;
    }

    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const handlers =
        {
            zIndex(value: number)
            {
                (<any>this).component.setzIndex(value);
            },

            visible(value: boolean)
            {
                if(value === false)
                {
                    (<any>this).component.hide();
                }
                else
                {
                    (<any>this).component.show();
                }
            }
        };

        return handlers;
    }
}
