/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import IMapConfig from "models/map-config";
import DEFAULT_MAP_CONFIG from "config/index";

/**
 * 地图加载器。
 * @class
 * @version 1.0.0
 */
export default class MapLoader
{
    private _config: IMapConfig;                                    // 地图配置项
    private _document: Document = document;                         // Document 实例
    private _window: any = window;                                  // Window 实例
    private _scriptLoadPromise: Promise<void>;                      // 异步加载的 Promise 实例
    private static _instance: MapLoader;                            // 加载器单实例
    
    /**
     * 获取地图加载器的单实例。
     * @static
     * @property
     * @returns MapLoader
     */
    public static get instance(): MapLoader
    {
        return MapLoader._instance;
    }
    
    /**
     * 初始化地图加载器的新实例。
     * @constructor
     * @param  {IMapConfig} config 地图配置项。
     */
    private constructor(config: IMapConfig)
    {
        // 初始化配置项
        this._config =
        {
            ...DEFAULT_MAP_CONFIG,
            ...config
        };
    }
    
    /**
     * 加载地图核心库。
     * @description 如果配置了 `uiVersion` 配置项，则同时会加载UI库。
     * @async
     * @returns Promise<void>
     */
    public async load(): Promise<void>
    {
        const config = this._config;
        const window = this._window;

        // 如果地图核心库已经加载完成，则尝试加载UI库
        if(window.AMap && window.AMap.Map)
        {
            return this.loadUI();
        }

        if(this._scriptLoadPromise)
        {
            return this._scriptLoadPromise;
        }

        const script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.defer = true;
        script.src = this.getMapUrl();

        const uiPromise = config.uiVersion ? this.loadUI() : null;

        this._scriptLoadPromise = new Promise<void>((resolve, reject) =>
        {
            // 注入高德核心库加载完成时调用的回调函数
            window[config.callback] = () =>
            {
                if(uiPromise)
                {
                    uiPromise.then(() =>
                    {
                        // 初始化地图UI库
                        window.initAMapUI();

                        setTimeout(resolve);
                    });
                }
                else
                {
                    return resolve();
                }
            };

            script.onerror = (error: any) =>
            {
                reject(error);
            };
        });
        
        // 将 script 标签插入到 head 标签中
        this._document.head.appendChild(script);

        return this._scriptLoadPromise;
    }

    /**
     * 加载地图UI库。
     * @description 只有配置了 `uiVersion` 配置项才会加载UI库。
     * @async
     * @returns Promise<void>
     */
    private async loadUI(): Promise<void>
    {
        const config = this._config;

        // 如果明确配置需要加载UI库，或者已经加载完了UI库则直接退出
        if(!config.uiVersion || this._window.AMapUI)
        {
            return Promise.resolve();
        }

        // 解析主版本号、子版本号、次版本号
        const [versionMain, versionSub, versionDetail] = config.uiVersion.split(".");

        if(versionMain === undefined || versionSub === undefined)
        {
            throw new Error(`AMap UI version is not correct, please check! version: ${config.uiVersion}`);
        }

        let src = `${config.protocol}://webapi.amap.com/ui/${versionMain}.${versionSub}/main-async.js`;

        if(versionDetail)
        {
            src += `?v=${versionMain}.${versionSub}.${versionDetail}`;
        }

        return new Promise<void>((resolve, reject) =>
        {
            const script = document.createElement("script");
            script.src = src;
            script.type = "text/javascript";
            script.async = true;

            this._document.head.appendChild(script);

            script.onload = () =>
            {
                setTimeout(resolve, 0);
            };

            script.onerror = () =>
            {
                reject();
            };
        });
    }
    
    /**
     * 获取地图核心库的加载地址。
     * @returns string
     */
    private getMapUrl(): string
    {
        const config = this._config;
        const amapPrefix = /^AMap./;
        const paramMap = {"version": "v", "key": "key", "plugins": "plugin", "callback": "callback"};
        const paramKeys = Object.keys(paramMap);

        // 检查插件的前缀
        if(config.plugins && config.plugins.length > 0)
        {
            // 加入默认插件
            config.plugins.push("Autocomplete", "PlaceSearch", "PolyEditor", "CircleEditor");
            
            config.plugins = config.plugins.map(item =>
            {
                return (amapPrefix.test(item)) ? item : "AMap." + item;
            });
        }

        const params = Object.keys(config)
                             .filter(key => ~paramKeys.indexOf(key))
                             .filter(key => config[key] !== null && config[key] !== undefined)
                             .filter(key => !Array.isArray(config[key]) || (Array.isArray(config[key]) && config[key].length > 0))
                             .map(key =>
                             {
                                 let value = config[key];
                                
                                 if(Array.isArray(value))
                                 {
                                     // key 为高德要求的key
                                     return { key: paramMap[key], value: value.join(",") };
                                 }
                                 else
                                 {
                                     // key 为高德要求的key
                                     return { key: paramMap[key], value: value };
                                 }
                             })
                             .map(entry => `${entry.key}=${entry.value}`)
                             .join("&");
        
        return `${config.protocol}://${config.host}?${params}`;
    }
    
    /**
     * 初始化地图加载器。
     * @static
     * @async
     * @param  {IMapConfig} config 地图配置项。
     * @returns Promise<void>
     */
    public static async init(config: IMapConfig): Promise<void>
    {
        // 防重复调用
        if(MapLoader._instance)
        {
            return Promise.resolve();
        }

        // 初始化地图加载器
        MapLoader._instance = new MapLoader(config);
        
        return MapLoader._instance.load();
    }
}
