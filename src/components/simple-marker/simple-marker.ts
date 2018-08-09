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
 * SimpleMarker（简单标注）继承自Marker，在已有功能的基础上，额外增加如下的支持：
 * 支持设置背景图标（iconTheme，iconStyle）和前景文字（iconLabel）；背景图标内置若干样式可供挑选（如上方示例），也支持自定义图片地址或者Dom结构。
 * 支持显示定位点，默认用红点标识（查看示例），红点的中心即是经纬度（即position）对应的位置。用于开发阶段，辅助开发者设置Marker图标相对于经纬度的显示偏移量。（即Marker的offset参数）
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-simple-marker"
})
export default class SimpleMarker extends Marker
{
    /**
     * 获取或设置样式主题，目前包括 "default", "fresh", "numv1", "numv2" 4种。
     * 每个主题下内置一组特定的iconStyle可供选择。
     * @config {string}
     * @default "default"
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public iconTheme: string;

    /**
     * 获取或设置背景图标样式, 可以有如下取值：
     * 1. string，内置的样式名，取值可通过SimpleMarker.getBuiltInIconStyles(iconTheme|String)获取；
     * 2. string，HTML代码，需要以<开头，以>结尾， 比如<div...>，icon的DOM节点将使用这段html构造；
     * 3. string，图片的url地址。通常还需要配合设置offset选项（定位点的偏移量，以确定该图片的定位点）；
     * 4. HTMLElement, 某个DOM节点的引用，比如：
     * document.createElement("div")、document.getElementById("...")等；
     * 5. Object，img节点的属性值，比如 src,style,width,height等，比如：
     * {
     *     src: "图片地址",
     *     style:
     *     {
     *         width: "20px"
     *     }
     * }
     * @config {string | object}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String, Object]})
    public iconStyle: string | object;

    /**
     * 获取或设置图标前景文字，可以有如下取值：
     * 1. String， 普通文本，比如"A"（可以配合containerClassNames调整文字样式，详见下文）
     * 2. Object, 内建的文字容器DOM节点(DIV)的属性值，比如 innerHTML,style等， 比如：
     * {
     *     innerHTML: "<div>B</div>",
     *     style:
     *     {
     *         color: "red" //设置文字颜色
     *     }
     * }
     * @config {string | object}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String, Object]})
    public iconLabel: string | object;

    /**
     * 获取或设置是否显示定位点，可以有如下取值：
     * 1. boolean， 是否显示，默认false；通常在仅在开发阶段开启，辅助设置图标相对于经纬度位置（定位点）的偏移量（即Marker的offset参数）
     * 2. Object{color:String, radius:number} , 显示特定颜色和半径的定位点，比如:
     * {
     *     color: "red", // 点的颜色
     *     radius: 3     // 点的半径。 因圆形使用了CSS3的border-radius属性，IE8及以下浏览器会呈现正方形
     * }       
     * @config {boolean | object}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Boolean, Object]})
    public showPositionPoint: boolean | object;
    
    /**
     * 获取或设置内建的Dom容器上附带的class，多个class name用空格分开。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public containerClassNames: string;
    
    /**
     * 根据指定配置项初始化组件。
     * @async
     * @override
     * @param  {object} options
     * @returns Promise<AMapUI.SimpleMarker>
     */
    protected async initialize(options: object): Promise<AMapUI.SimpleMarker>
    {
        return new Promise<AMapUI.SimpleMarker>((resolve, reject) =>
        {
            // tslint:disable-next-line:variable-name
            AMapUI.loadUI(["overlay/SimpleMarker"], (SimpleMarker = AMapUI.SimpleMarker) =>
            {
                const marker = new SimpleMarker(options);

                resolve(marker);
            });
        });
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
            showPositionPoint(value: boolean)
            {
                value === true ? self.component.showPositionPoint() : self.component.hidePositionPoint();
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }
}
