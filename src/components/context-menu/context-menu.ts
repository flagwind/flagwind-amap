/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import Vue, { CreateElement, VNode } from "vue";
import { component } from "flagwind-web";
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
    private _bufferVue: any;                           // 临时组件（用于获取插槽内容使用）
    private _withCustom: boolean;                      // 内容是否为自定义方式渲染

    /**
     * 在地图的指定位置打开右键菜单。
     * @param  {[number, number] | AMap.LngLat} position
     * @returns void
     */
    public open(position: [number, number] | AMap.LngLat): void
    {
        this.component.open(this.map, position);
    }
    
    /**
     * 关闭右键菜单。
     * @returns void
     */
    public close(): void
    {
        this.component.close();
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

        return new AMap.ContextMenu(options);
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
    
    /**
     * 获取组件支持的事件列表。
     * @override
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return ["open", "close"];
    }
}
