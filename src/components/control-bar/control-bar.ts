/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { CreateElement, VNode } from "vue";
import { component, config } from "flagwind-web";
import Component from "../component";

/**
 * 组合了旋转、倾斜、复位、缩放在内的地图控件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-control-bar"
})
export default class ControlBar extends Component
{
    /**
     * 获取或设置显示位置，如：{top: "10px", right: "10px"}。
     * @config {object}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Object})
    public position: object;
    
    /**
     * 获取或设置是否显示缩放按钮。移动端默认为false，PC端为默认为true。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showZoomBar?: boolean;
    
    /**
     * 获取或设置是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showControlButton?: boolean;

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
     * @returns Promise<AMap.ControlBar>
     */
    protected async initialize(options: object): Promise<AMap.ControlBar>
    {
        return new Promise<AMap.ControlBar>((resolve, reject) =>
        {
            AMap.plugin(["AMap.ControlBar"], () =>
            {
                const controlBar = new AMap.ControlBar(options);
                
                // 添加至地图
                this.map.addControl(controlBar);

                resolve(controlBar);
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
