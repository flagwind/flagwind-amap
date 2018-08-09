/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { CreateElement, VNode } from "vue";
import { component, config } from "flagwind-web";
import Component from "components/component";

/**
 * 比例尺插件。位于地图右下角，用户可控制其显示与隐藏。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-scale"
})
export default class Scale extends Component
{
    /**
     * 获取或设置相对于地图容器左上角的偏移量，正数代表向右下偏移。
     * 默认为 AMap.Pixel(10, 10)。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array, Object]})
    public offset: [number, number] | AMap.Pixel;

    /**
     * 获取或设置控件停靠位置。
     * LT:左上角;
     * RT:右上角;
     * LB:左下角;
     * RB:右下角;
     * @config {string}
     * @default "LB"
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public position: string;

    /**
     * 获取或设置控件是否可见。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public visible: boolean;

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
     * 根据指定配置项初始化组件。
     * @async
     * @override
     * @param  {object} options
     * @returns Promise<AMap.Scale>
     */
    protected async initialize(options: object): Promise<AMap.Scale>
    {
        return new Promise<AMap.Scale>((resolve, reject) =>
        {
            AMap.plugin(["AMap.Scale"], () =>
            {
                const scale = new AMap.Scale(options);
                
                // 添加至地图
                this.map.addControl(scale);

                resolve(scale);
            });
        });
    }

    /**
     * 获取组件支持的事件列表。
     * @virtual
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return ["show", "hide"];
    }

    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const component = this.component;

        const handlers =
        {
            visible(value: boolean)
            {
                value ? component.show() : component.hide();
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        if(this.map)
        {
            this.map.removeControl(this.component);
        }
        
        super.destroyed();
    }
}
