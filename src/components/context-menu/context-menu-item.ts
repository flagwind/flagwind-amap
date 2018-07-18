/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config, Component } from "flagwind-web";

/**
 * 右键菜单项组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-context-menu-item",
    template: "<span><slot></slot></span>"
})
export default class ContextMenuItem extends Component
{
    private _previousText: string;

    /**
     * 获取或设置菜单项名称。
     * @config {string}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String, required: true})
    public name: string;
    
    /**
     * 获取或设置菜单项排列顺序。
     * @config {number}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public order: number;
    
    /**
     * 当更新组件时调用。
     * @override
     * @returns void
     */
    protected updated(): void
    {
        const parent: any = (<any>this.$parent).container;

        if(parent.component)
        {
            this.bindData();
        }
        else
        {
            parent.$on("initialized", this.bindData);
        }
    }
    
    /**
     * 当销毁组件时调用。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        const currentText = this.$el.innerHTML;
        const contextMenu = (<any>this.$parent).container.component;

        contextMenu.removeItem(currentText, this.onClick);
    }
    
    /**
     * 绑定菜单数据。
     * @returns void
     */
    private bindData(): void
    {
        this.$nextTick(() =>
        {
            const contextMenu = (<any>this.$parent).container.component;
            const previousText = this._previousText;
            const currentText = this.$el.innerHTML;

            if(previousText !== currentText)
            {
                if(previousText)
                {
                    // 移除之前的菜单
                    contextMenu.removeItem(previousText, this.onClick);
                }

                contextMenu.addItem(currentText, this.onClick, this.order);

                this._previousText = currentText;
            }
        });
    }

    /**
     * 当点击菜单项时调用。
     * @returns void
     */
    private onClick(): void
    {
        const parent: any = (<any>this.$parent).container;
        
        parent.$emit("select", { source: parent, name: this.name });
    }
}
