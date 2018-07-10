/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Marker from "../marker";

/**
 * 文本标记。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-text-marker"
})
export default class TextMarker extends Marker
{
    /**
     * 获取或设置标记显示的文本内容。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String, required: true})
    public text: string;

    /**
     * 获取或设置横向位置，"left", "right", "center" 可选。
     * @config {string}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public textAlign: string;

    /**
     * 获取或设置纵向位置，"top"，"middle"，"bottom" 可选。
     * @config {string}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public verticalAlign: string;

    /**
     * 获取或设置文本样式。
     * 如同 CSS 样式表，如：{"background-color": "red"}
     * @config {object}
     * @description 动态属性，支持响应式。
     */
    @config({type: Object})
    public styles: object;

    /**
     * 根据指定配置项初始化组件。
     * @override
     * @param  {object} options
     * @returns AMap.Text
     */
    protected initialize(options: object): AMap.Text
    {
        return new AMap.Text(options);
    }
    
    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const self = this;

        const handlers =
        {
            styles(value: object)
            {
                self.component.setStyle(value);
            }
        };

        return {...handlers, ...super.getOptionHandlers()};
    }
}
