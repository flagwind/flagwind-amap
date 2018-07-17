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
 * 右键菜单。
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

    public open(position: AMap.LngLat): void
    {
        this.component.open(this.map, position);
    }

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
        // const slots = this.$slots.default || [];

        // if(slots.length)
        // {
        //     this._bufferVue = new Vue
        //     ({
        //         props:
        //         {
        //             nodes:
        //             {
        //                 type: [Array, Object]
        //             }
        //         },
                
        //         render(createElement: CreateElement): VNode
        //         {
        //             const nodes = Array.isArray(this.nodes) ? this.nodes : [this.nodes];

        //             return createElement("div", { ref: "content", staticClass: "amap-context-menu-inner" }, nodes);
        //         }
        //     }).$mount();
        // }
    }

    /**
     * 当渲染组件时调用的钩子方法。
     * @override
     * @returns VNode
     */
    protected render(createElement: CreateElement): VNode
    {
        // const slots = this.$slots.default || [];

        // if(slots.length)
        // {
        //     this._bufferVue.nodes = slots;
        // }

        const slots = this.$slots.default || [];

        const withSlots = !!slots.length;

        if (withSlots)
        {
            return createElement("div", slots);
        }

        // if(slots.length)
        // {
        //     this._bufferVue.nodes = slots;
        // }

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
            options.isCustom = true;
        }

        const menu = new AMap.ContextMenu();

        console.log(menu);

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

        super.destroyed();
    }
}
