/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import Type = flagwind.Type;
import { Component as ComponentBase } from "flagwind-web";
import upperCamelCase from "uppercamelcase";
import Convert from "common/convert";

/**
 * 公共配置属性转换函数。
 * @const
 */
const COMMON_CONVERTER =
{
    position: Convert.toLngLat,
    offset: Convert.toPixel,
    size: Convert.toSize,
    bounds: Convert.toBounds
};

/**
 * 组件基类，包含一些通用的功能。
 * @class
 * @version 1.0.0
 */
export default abstract class Component extends ComponentBase
{
    private _map: AMap.Map;                                 // 高德地图实例
    private _component: any;                                // 高德原始组件实例，如：Marker、Polyline、Polygon、Rectangle 等

    /**
     * 高德事件监听器列表。
     * @member {Array<AMap.EventListener>}
     */
    protected listeners: Array<AMap.EventListener> = [];

    /**
     * Vue 属性监听器取消函数列表。
     * @member {Array<Function>}
     */
    protected unwatchs: Array<Function> = [];

    /**
     * 当地图准备完毕时触发的事件。
     * @static
     * @readonly
     * @member {string}
     */
    public static readonly MAP_READY: string = "map-ready";

    /**
     * 当组件初始化完毕时触发的事件。
     * @static
     * @readonly
     * @member {string}
     */
    public static readonly INITIALIZED: string = "initialized";
    
    /**
     * 获取或设置高德地图实例。
     * @property {AMap.Map}
     */
    public get map(): AMap.Map
    {
        return this._map;
    }

    public set map(value: AMap.Map)
    {
        this._map = value;
    }
    
    /**
     * 获取或设置高德原生组件实例。
     * @property {any}
     * @description 原生组件如：Marker、Polyline、Polygon、Rectangle 等实例。
     */
    public get component(): any
    {
        return this._component;
    }
    
    public set component(value: any)
    {
        this._component = value;
    }
    
    /**
     * 当创建组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        const parent = this.$parent as Component;
        
        // 从当前或父组件中获取地图实例
        this.map = this.map || parent.map;
        
        if(this.map)
        {
            // 如果地图已经准备就绪，则直接开始创建组件
            this.createComponent();
        }
        else
        {
            // 否则监听 "map-ready" 事件，等地图准备就绪后再创建组件
            this.$on(Component.MAP_READY, (map: AMap.Map) =>
            {
                this.map = map;
                
                this.createComponent();
            });
        }
    }
    
    /**
     * 当销毁组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        this.unregisterEvents();
        this.unregisterWatchers();
        
        const component = this.component;
        
        if(component)
        {
            component.setMap && component.setMap(null);
            component.close && component.close();
            component.editor && component.editor.close();
            component.destroy && component.destroy();
        }
    }
    
    /**
     * 根据组件配置项初始化高德原生组件。
     * @abstract
     * @param  {object} options
     * @description 支持同步/异步初始化，异步返回 Promise 即可，异步初始化主要用于初始化插件型组件。
     * @returns any
     */
    protected abstract initialize(options: object): any;
    
    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @virtual
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        return {};
    }
    
    /**
     * 获取配置属性转换程序列表。
     * @description 当配置属性赋值时调用的函数，用于转换数据类型。
     * @virtual
     * @returns object
     */
    protected getOptionConverters(): object
    {
        return {};
    }
    
    /**
     * 获取组件支持的事件列表。
     * @virtual
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return [];
    }
    
    /**
     * 解析配置属性。
     * @returns object
     */
    protected resolveOptions(): object
    {
        const options: any = {};

        if(this.map)
        {
            options.map = this.map;
        }

        // 获取当前组件的实际配置项
        const { $options: { propsData: props = {} } } = this;
        
        Object.keys(props).forEach((name: string) =>
        {
            let value = this.resolveOptionValue(name, props[name]);

            if(value !== undefined)
            {
                options[name] = value;
            }
        });

        return options;
    }

    /**
     * 解析配置属性的值。
     * @param  {string} optionName
     * @param  {any} sourceValue
     * @returns any
     */
    private resolveOptionValue(optionName: string, sourceValue: any): any
    {
        const converters = this.getOptionConverters();

        let converter = converters && converters[optionName];

        // 首先根据配置项名称从自定义转换器中查找
        if(converter)
        {
            return converter.call(this, sourceValue);
        }
        else
        {
            // 其次从公共转换器中查找
            converter = COMMON_CONVERTER[optionName];

            if(converter)
            {
                return converter(sourceValue);
            }
        }

        // 防止高德篡改组件原始数据
        if(Type.isArray(sourceValue))
        {
            return [...sourceValue];
        }
        else if(Type.isObject(sourceValue))
        {
            return {...sourceValue};
        }

        return sourceValue;
    }
    
    /**
     * 创建高德组件实例。
     * @returns void
     */
    private createComponent(): void
    {
        const options: object = this.resolveOptions();
        const result: any = this.initialize(options);
        
        // 组件有可能是同步初始化，也可能是异步初始化，高德插件类组件都需要异步初始化
        // 异步初始化的组件，则需要通过 Promise 来处理
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
    
    /**
     * 注册高德组件实例。
     * @param  {any} component 高德组件实例
     * @returns void
     */
    private registerComponent(component: any): void
    {
        if(!this.component && component)
        {
            this.component = component;
        }
        
        // 注册组件事件
        this.registerEvents();

        // 注册组件属性监听器
        this.registerWatchers();

        // 触发组件初始化完毕事件
        this.$emit(Component.INITIALIZED, { type: Component.INITIALIZED, source: this });
    }
    
    /**
     * 注册高德组件事件。
     * @returns void
     */
    private registerEvents(): void
    {
        const events = this.getComponentEvents();

        // 根据传入的事件监听器过滤支持的事件名
        const eventNames = Object.keys(this.$listeners).filter((e: string) => ~events.indexOf(e));

        for(const eventName of eventNames)
        {
            const listener = AMap.event.addListener(this.component, eventName, (e: any) =>
            {
                // 基于原生事件参数对象，注入事件源
                e.source = this;
                
                // 通过 Vue 的事件模型转发高德原生事件
                this.$emit(eventName, e);

            }, this);
            
            this.listeners.push(listener);
        }
    }
    
    /**
     * 移除高德组件事件。
     * @returns void
     */
    private unregisterEvents(): void
    {
        for(const listener of this.listeners)
        {
            AMap.event.removeListener(listener);
        }

        this.listeners = [];
    }
    
    /**
     * 注册配置属性监听器。
     * @returns void
     */
    private registerWatchers(): void
    {
        const handlers = this.getOptionHandlers();
        const { $options: { propsData: options = {} } } = this;
        
        Object.keys(options).forEach((name: string) =>
        {
            const [handerName, handler] = this.resolveOptionHandler(name);

            if(!handler)
            {
                return;
            }

            // 如果是自定义处理程序，则需要做即使调用处理
            if(handlers[handerName])
            {
                handler.call(this, options[name]);
            }
            
            const unwatch = this.$watch(name, (value: any) =>
            {
                if(handlers[handerName])
                {
                    handler.call(this, value);
                }
                else if(handerName === "setOptions" || handerName === "setStatus")
                {
                    handler.call(this.component, {[name]: this.resolveOptionValue(name, value)});
                }
                else
                {
                    handler.call(this.component, this.resolveOptionValue(name, value));
                }
            });

            this.unwatchs.push(unwatch);
        });
    }
    
    /**
     * 解析指定配置属性的侦听处理程序。
     * @param  {string} optionName
     * @returns [string, Function]
     */
    private resolveOptionHandler(optionName: string): [string, Function]
    {
        const component = this.component;
        const handlers = this.getOptionHandlers();
        
        // 1.首先从自定义侦听处理程序中查找
        if(handlers[optionName])
        {
            return [optionName, handlers[optionName]];
        }
        
        // 2.其次尝试从高德原生组件中查找对应的属性set方法，例如 setLang
        let methodName = `set${upperCamelCase(optionName)}`;
        
        if(component[methodName])
        {
            return [methodName, component[methodName]];
        }

        // 3.如果属性没有对应的set方法，则尝试交由 setStatus 处理
        methodName = "setStatus";

        if(component[methodName])
        {
            return [methodName, component[methodName]];
        }

        // 4.如果组件没有 setStatus 方法，则尝试交由 setOptions 处理
        methodName = "setOptions";

        if(component[methodName])
        {
            return [methodName, component[methodName]];
        }

        return [null, null];
    }
    
    /**
     * 移除配置属性监听器。
     * @returns void
     */
    private unregisterWatchers(): void
    {
        for(const unwatch of this.unwatchs)
        {
            unwatch();
        }

        this.unwatchs = [];
    }
}
