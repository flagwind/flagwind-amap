/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Component from "components/component";
import Convert from "../../common/convert";

/**
 * 位置选点组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-position-picker",
    template: require("./position-picker.html")
})
export default class PositionPicker extends Component
{
    private _currentValue: [number, number];                      // 组件的当前值
    private _autocomplete: AMap.Autocomplete;                     // Autocomplete 插件
    
    /**
     * 获取或设置组件值，即位置点。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public value: [number, number];

    /**
     * 获取或设置拖拽模式，可选dragMap、dragMarker。
     * @config {string}
     * @default "dragMap"
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public mode: string;

    /**
     * 获取或设置用于自定义点的显示样式。
     * @config {object}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Object})
    public iconStyle: object;

    /**
     * 获取或设置是否允许点击地图切换点位置。
     * @config {object}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean, default: true})
    public allowClick: boolean;

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
     * @returns Promise<AMapUI.PositionPicker>
     */
    protected async initialize(options: object): Promise<AMapUI.PositionPicker>
    {
        return new Promise<AMapUI.PositionPicker>((resolve, reject) =>
        {
            AMapUI.loadUI(["misc/PositionPicker"], (PositionPicker = AMapUI.PositionPicker) =>
            {
                const positionPicker = new PositionPicker(options);
                
                // 监听选择器的 success, fail 事件，以便更新当前值
                positionPicker.on("success", this.onPickSuccess, this);
                positionPicker.on("fail", this.onPickFail, this);
                
                // 监听地图的点击事件，以便更新点坐标位置
                this.map.on("click", this.onMapClick, this);
                
                // 加载 Autocomplete 插件，以便支持关键字查询地点
                AMap.plugin(["AMap.Autocomplete"], () =>
                {
                    this._autocomplete = new AMap.Autocomplete
                    ({
                        input: this.$refs.keywords as HTMLInputElement
                    });

                    this._autocomplete.on("select", this.onAutocompleteSelect, this);

                    resolve(positionPicker);
                });
            });
        });
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
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const self = this;
        const component = this.component;

        const handlers =
        {
            value(value: any)
            {
                if(!value || !value.length || value === self._currentValue)
                {
                    return;
                }

                component.start(value);
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        this.map.off("click", this.onMapClick, this);
        this.component.off("success", this.onPickSuccess, this);
        this.component.off("fail", this.onPickFail, this);
        this._autocomplete.off("select", this.onAutocompleteSelect, this);
        
        super.destroyed();
    }
    
    /**
     * 当鼠标左键单击地图时调用。
     * @param  {any} e
     * @returns void
     */
    private onMapClick(e: any): void
    {
        if(this.allowClick)
        {
            // 更新拖拽点的位置
            this.component.start(e.lnglat);
        }
    }
    
    /**
     * 当搜索框选中一条记录时调用。
     * @param  {any} e
     * @returns void
     */
    private onAutocompleteSelect(e: any): void
    {
        this.component.start(e.poi.location);
    }

    /**
     * 当成功获取到了拖拽结束点的有效地址和周边信息时调用。
     * @param  {any} e
     * @returns void
     */
    private onPickSuccess(e: any): void
    {
        this._currentValue = Convert.lngLatTo(e.position);

        this.$emit("input", this._currentValue);
        
        e.source = this;

        this.$emit("select", e);
    }
    
    /**
     * 当获取不到拽结束点的有效地址和周边信息时调用。
     * @param  {any} e
     * @returns void
     */
    private onPickFail(e: any): void
    {
        this._currentValue = null;
        
        this.$emit("input", this._currentValue);
    }
}
