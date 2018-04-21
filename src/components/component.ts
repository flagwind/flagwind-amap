/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { Component as ComponentBase } from "flagwind-web";

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

    protected mounted(): void
    {
        console.log("base mounted...");
    }
    
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
}
