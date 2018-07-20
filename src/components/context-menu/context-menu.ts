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
 * 右键菜单组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-context-menu"
})
export default class ContextMenu extends Component
{
    private _currentValue: boolean;                    // 当前组件的值
    private _bufferVue: any;                           // 临时组件（用于获取插槽内容使用）
    private _withCustom: boolean;                      // 内容是否为自定义方式渲染
    private _openListener: AMap.EventListener;         // open 事件监听器
    private _closeListener: AMap.EventListener;        // close 事件监听器

    /**
     * 获取或设置右键菜单是否显示。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public value: boolean;

    /**
     * 获取或设置右键菜单的显示位置。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array, Object]})
    public position: [number, number] | AMap.LngLat;
    
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
                container:
                {
                    type: Object,
                    default: () => this
                },

                nodes:
                {
                    type: [Array, Object]
                }
            },
            
            render(createElement: CreateElement): VNode
            {
                const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes];

                return createElement("div", { ref: "content", staticClass: "amap-context-menu-inner" }, nodes);
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
            let i = 0;

            for(let slot of slots)
            {
                if(slot.componentOptions && slot.componentOptions.tag === "amap-context-menu-item")
                {
                    slot.componentOptions.propsData["order"] = i;

                    this._withCustom = false;

                    i++;
                }
            }

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
        options = {};

        if(this._bufferVue && this._withCustom !== false)
        {
            options.content = this._bufferVue.$refs.content;
        }

        const menu = new AMap.ContextMenu(options);

        // 监听菜单的打开/关闭事件，以便更新当前值
        this._openListener = AMap.event.addListener(menu, "open", this.onVisibleChange.bind(this, true));
        this._closeListener = AMap.event.addListener(menu, "close", this.onVisibleChange.bind(this, false));

        return menu;
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
     * @param {boolean} visible
     * @returns void
     */
    private onVisibleChange(visible: boolean): void
    {
        this._currentValue = visible;
        
        this.$emit("input", this._currentValue);
    }
}
