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
 * 地图工具条插件，可以用来控制地图的缩放和平移。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-tool-bar"
})
export default class ToolBar extends Component
{
    /**
     * 获取或设置相对于地图容器左上角的偏移量，正数代表向右下偏移。
     * 默认为 AMap.Pixel(10, 10)。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: [Array, Object]})
    public offset: [number, number] | AMap.Pixel;

    /**
     * 获取或设置控件停靠位置。
     * LT:左上角;
     * RT:右上角;
     * LB:左下角;
     * RB:右下角;
     * @config {string}
     * @default "LT"
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public position: string;

    /**
     * 获取或设置标尺键盘是否可见。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public ruler: boolean;

    /**
     * 获取或设置定位失败后，是否开启IP定位。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public noIpLocate: boolean;

    /**
     * 获取或设置是否显示定位按钮。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public locate: boolean;

    /**
     * 获取或设置是否使用精简模式。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public liteStyle: boolean;

    /**
     * 获取或设置方向键盘是否可见。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public direction: boolean;

    /**
     * 获取或设置是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，
     * 仅在支持 HTML5 的浏览器中有效，默认为false
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public autoPosition: boolean;

    /**
     * 获取或设置自定义定位图标，值为 Marker 对象。
     * @config {AMap.Marker}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Object})
    public locationMarker: AMap.Marker;

    /**
     * 是否使用高德定位sdk用来辅助优化定位效果，默认：false。
     * 仅供在使用了高德定位sdk的APP中，嵌入webview页面时使用，
     * 注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，
     * 还需要调用高德定位idk中，AMapLocationClient类的startAssistantLocation()方法开启辅助H5定位功能；
     * 不用时，可以调用stopAssistantLocation()方法停止辅助H5定位功能。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public useNative: boolean;

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
     * @returns Promise<AMap.ToolBar>
     */
    protected async initialize(options: object): Promise<AMap.ToolBar>
    {
        return new Promise<AMap.ToolBar>((resolve, reject) =>
        {
            AMap.plugin(["AMap.ToolBar"], () =>
            {
                const toolBar = new AMap.ToolBar(options);
                
                // 添加至地图
                this.map.addControl(toolBar);

                resolve(toolBar);
            });
        });
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
