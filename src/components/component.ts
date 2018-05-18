/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { Component as ComponentBase } from "flagwind-web";
import upperCamelCase from "uppercamelcase";
import events from "config/events";
const window: any = global;

/**
 * 地图组件基类。
 * @class
 * @version 1.0.0
 */
export default abstract class Component extends ComponentBase
{
    private _amap: any;                                 // 高德地图实例
    private _amapComponent: any;                        // 高德组件实例

    /**
     * 获取或设置组件支持的高德事件。
     * @protected
     * @member
     * @returns Array<string>
     */
    protected amapEvents: Array<string>;

    /**
     * 获取或设置组件属性侦听处理程序。
     * @protected
     * @member
     * @returns object
     */
    protected watchHandlers: object;
    
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
     * 获取或设置高德组件实例。
     * @public
     * @property
     * @returns any
     */
    public get amapComponent(): any
    {
        return this._amapComponent;
    }
    
    public set amapComponent(value: any)
    {
        this._amapComponent = value;
    }
    
    /**
     * 初始化组件的新示例。
     * @constructor
     * @param  {Array<string>} events 组件支持的高德事件。
     */
    protected constructor(events: Array<string>)
    {
        super();

        this.amapEvents = events || [];
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

    protected destroyed(): void
    {
        this.unregisterEvents();

        const component = this.amapComponent;
        
        if(component)
        {
            component.setMap && component.setMap(null);
            component.close && component.close();
            component.editor && component.editor.close();
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
        const result: any = this.initializeComponent(this.resolveOptions());

        if(result && result.then)
        {
            result.then((component: any) =>
            {
                this.registerComponent(component);
            });
        }
        else
        {
            this.registerComponent(result);
        }
    }
    
    protected registerComponent(component: any): void
    {
        // 设置组件实例
        if(!this.amapComponent && component)
        {
            this.amapComponent = component;
        }
        
        // 注册事件
        this.registerEvents();

        // 注册属性监听器
        this.registerWatchers();
    }

    /**
     * 根据指定
     * @param  {object} options
     * @returns void
     */
    protected initializeComponent(options: object): void
    {
        // virtual method
    }
    
    /**
     * 注册所有高德原生事件。
     * @private
     * @returns void
     */
    private registerEvents(): void
    {
        const eventNames = Object.keys(this.$listeners).filter((e: string) => ~this.amapEvents.indexOf(e));

        for(const eventName of eventNames)
        {
            window.AMap.event.addListener(this.amapComponent, eventName, this.amapEventListener, this);
        }
    }
    
    /**
     * 移除所有高德原生事件。
     * @private
     * @returns void
     */
    private unregisterEvents(): void
    {
        const eventNames = Object.keys(this.$listeners).filter((e: string) => ~this.amapEvents.indexOf(e));

        for(const eventName of eventNames)
        {
            window.AMap.event.removeListener(this.amapComponent, eventName);
        }
    }
    
    /**
     * 高德公用事件监听器。
     * 只有在Vue组件中注册了高德事件，才会调用此方法。
     * @private
     * @param  {any} args 高德传递的事件参数。
     * @returns void
     */
    private amapEventListener(args: any): void
    {
        if(args.type)
        {
            // 通过 Vue 的事件模型转发高德原生事件
            this.$emit(args.type, args);
        }
    }

    private registerWatchers(): void
    {
        const { $options: { propsData: props = {} } } = this;
        
        Object.keys(props).forEach((prop: string) =>
        {
            const handler = this.resolveWatchHandler(prop);

            if(handler)
            {
                this.$watch(prop, (value: any) =>
                {
                    if(handler === this.amapComponent.setOptions)
                    {
                        handler.call(this.amapComponent, { [prop]: value });
                    }
                    else
                    {
                        handler.call(this.amapComponent, value);
                    }
                });
            }
        });
    }
    
    /**
     * 解析指定属性的侦听处理程序。
     * @param  {string} prop 属性名。
     * @returns Function
     */
    private resolveWatchHandler(prop: string): Function
    {
        const amapComponent = this.amapComponent;
        const handlers = this.watchHandlers;
        
        if(handlers && handlers[prop])
        {
            return handlers[prop];
        }

        return amapComponent[`set${upperCamelCase(prop)}`] || amapComponent.setOptions;
    }
}
