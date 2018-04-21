/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { Component as ComponentBase } from "flagwind-web";
import events from "config/events";

/**
 * 地图组件基类。
 * @class
 * @version 1.0.0
 */
export default abstract class Component extends ComponentBase
{
    private _amap: any;                         //  高德地图实例

    /**
     * 获取或设置高德地图实例。
     * @public
     * @property
     * @returns any
     */
    public get amap(): any
    {
        return this._amap;
    }

    public set amap(value: any)
    {
        this._amap = value;
    }

    /**
     * 当创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        const parentComponent = this.$parent as any;

        this.amap = this.amap || parentComponent.amap;
        
        if(this.amap)
        {
            this.register();
        }
        else
        {
            this.$on(events.amapReady, () =>
            {
                this.register();
            });
        }
    }
    
    /**
     * 解析地图配置选项。
     * @protected
     * @returns object
     */
    protected resolveOptions(): object
    {
        const options: any = {};

        if(this.amap)
        {
            options.map = this.amap;
        }

        const { $options: { propsData: props = {} } } = this;
        
        Object.keys(props).forEach((key: string) =>
        {
            let value = props[key];

            options[key] = value;
        });

        return options;
    }

    protected register(): void
    {
        console.log("register...");
    }
}
