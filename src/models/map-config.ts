/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

/**
 * 表示一个地图配置项。
 * @interface
 * @version 1.0.0
 */
export default interface IMapConfig
{
    /**
     * 获取或设置地图Key。
     * @member
     * @returns string
     */
    key?: string;

    /**
     * 获取或设置地图版本号。
     * @member
     * @returns string
     */
    version?: string;
    
    /**
     * 获取或设置地图UI库版本号。
     * @member
     * @returns string
     */
    uiVersion?: string;
    
    /**
     * 获取或设置地图地址。
     * @member
     * @returns string
     */
    host?: string;

    /**
     * 获取或设置地图协议。
     * @member
     * @returns string
     */
    protocol?: string;
    
    /**
     * 获取或设置一个布尔值，表示是否延迟加载地图库。
     * @member
     * @returns boolean
     */
    lazyload?: boolean;

    /**
     * 获取或设置高德插件列表。
     * @member
     * @returns string
     */
    plugins?: Array<string>;
    
    /**
     * 获取或设置地图加载完成后调用的回调函数。
     * @member
     * @returns string
     */
    callback?: string;
}
