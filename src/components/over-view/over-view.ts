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
 * 地图鹰眼插件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-over-view"
})
export default class OverView extends Component
{
    /**
     * 获取或设置鹰眼中需显示的切片图层。
     * @config {object}
     * @description 动态属性，支持响应式。
     */
    @config({type: Object})
    public tileLayer: object | AMap.TileLayer;

    /**
     * 获取或设置鹰眼是否展开。
     * @config {boolean}
     * @default false
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public isOpen: boolean;
    
    /**
     * 获取或设置组件是否可见。
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
     * @returns Promise<AMap.OverView>
     */
    protected async initialize(options: object): Promise<AMap.OverView>
    {
        return new Promise<AMap.OverView>((resolve, reject) =>
        {
            AMap.plugin(["AMap.OverView"], () =>
            {
                const overView = new AMap.OverView(options);
                
                // 添加至地图
                this.map.addControl(overView);

                resolve(overView);
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
        return ["show", "hide", "open", "close"];
    }

    /**
     * 获取配置属性转换程序列表。
     * @description 当配置属性赋值时调用的函数，用于转换数据类型。
     * @virtual
     * @returns object
     */
    protected getOptionConverters(): object
    {
        const converters =
        {
            tileLayer(value: object)
            {
                if(value)
                {
                    return new AMap.TileLayer(value);
                }

                return null;
            }
        };
        
        return {...super.getOptionConverters(), ...converters};
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
            isOpen(value: boolean)
            {
                value ? component.open() : component.close();
            },
            
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
