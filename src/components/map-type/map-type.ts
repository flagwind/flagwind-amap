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
 * 地图类型切换插件，用来切换固定的几个常用图层。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-map-type"
})
export default class MapType extends Component
{
    /**
     * 获取或设置初始化默认图层类型。
     * 取值为0：默认底图
     * 取值为1：卫星图
     * 默认值：0
     * @config {number}
     * @default 0
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public defaultType: number;

    /**
     * 获取或设置是否叠加实时交通图层。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showTraffic: boolean;

    /**
     * 获取或设置是否叠加路网图层。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showRoad: boolean;

    /**
     * 获取或设置工具条是否可见。
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
     * @returns Promise<AMap.MapType>
     */
    protected async initialize(options: object): Promise<AMap.MapType>
    {
        return new Promise<AMap.MapType>((resolve, reject) =>
        {
            AMap.plugin(["AMap.MapType"], () =>
            {
                const mapType = new AMap.MapType(options);
                
                // 添加至地图
                this.map.addControl(mapType);

                resolve(mapType);
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
