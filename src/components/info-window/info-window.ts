/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import Vue, { CreateElement, VNode } from "vue";
import { component, config } from "flagwind-web";
import Component from "../component";

/**
 * 信息窗体组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-info-window"
})
export default class InfoWindow extends Component
{
    private _currentValue: boolean;                    // 当前组件的值
    private _bufferVue: any;                           // 临时组件（用于获取插槽内容使用）
    private _openListener: AMap.EventListener;         // open 事件监听器
    private _closeListener: AMap.EventListener;        // close 事件监听器

    /**
     * 获取或设置信息窗体是否显示。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public value: boolean;

    /**
     * 获取或设置是否为自定义窗体。
     * 设为true时，信息窗体外框及内容完全按照插槽所设的值添加（默认为false，即在系统默认的信息窗体外框中显示插槽内容）
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public isCustom: boolean;
    
    /**
     * 获取或设置是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public autoMove: boolean;

    /**
     * 获取或设置是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public closeWhenClickMap: boolean;

    /**
     * 获取或设置信息窗体尺寸（isCustom为true时，该属性无效）。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public size: [number, number];

    /**
     * 获取或设置相对于基点的偏移量。
     * 默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量。
     * @config {[number, number]}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Array})
    public offset: [number, number];
    
    /**
     * 获取或设置信息窗体的显示位置。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array, Object]})
    public position: [number, number] | AMap.LngLat;

    /**
     * 获取或设置是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    public showShadow: boolean;
    
    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const self = this;
        const component: AMap.InfoWindow = this.component;

        const handlers =
        {
            position(value: [number, number])
            {
                // 只有当组件为显示状态时才动态更新位置
                if(this.value && value && value.length)
                {
                    component.setPosition(value);
                }
            },

            value(value: boolean)
            {
                if(value === self._currentValue)
                {
                    return;
                }

                if(value === true)
                {
                    // 如果没有给组件设置位置，则取地图的中心点显示
                    component.open(self.map, self.position ? self.position : self.map.getCenter());
                }
                else
                {
                    component.close();
                }
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }

    /**
     * 当创建组件时调用的钩子方法。
     * @override。
     * @returns void
     */
    protected created(): void
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

                return createElement("div", { ref: "content", staticClass: "amap-info-window-inner" }, nodes);
            }
        }).$mount();
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
     * @returns AMap.InfoWindow
     */
    protected initialize(options: any): AMap.InfoWindow
    {
        options.map = null;
        options.position = null;
        options.content = this._bufferVue.$refs.content;

        const window = new AMap.InfoWindow(options);
        
        // 监听窗体的打开/关闭事件，以便更新当前值
        this._openListener = AMap.event.addListener(window, "open", this.onVisibleChange, this);
        this._closeListener = AMap.event.addListener(window, "close", this.onVisibleChange, this);

        return window;
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

        if(this._openListener)
        {
            AMap.event.removeListener(this._openListener);
        }

        if(this._closeListener)
        {
            AMap.event.removeListener(this._closeListener);
        }

        super.destroyed();
    }
    
    /**
     * 获取组件支持的事件列表。
     * @override
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return ["open", "close"];
    }
    
    /**
     * 当显示状态发生改变时调用。
     * @returns void
     */
    private onVisibleChange(): void
    {
        this._currentValue = this.component.getIsOpen();
        
        this.$emit("input", this._currentValue);
    }
}
