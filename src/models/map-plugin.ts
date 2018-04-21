/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

/**
 * 表示一个地图插件。
 * @interface
 * @version 1.0.0
 */
export default interface IMapPlugin
{
    /**
     * 获取或设置插件的名称。
     * @member
     * @returns string
     */
    name: string;

    /**
     * 获取或设置插件的完整名称。
     * @member
     * @returns string
     */
    fullName?: string;

    /**
     * 获取或设置插件的简短名称。
     * @member
     * @returns string
     */
    shortName?: string;
    
    /**
     * 获取或设置插件的事件。
     * @member
     * @returns object
     */
    events?: object;
}
