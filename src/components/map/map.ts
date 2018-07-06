/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Component from "../component";
import MapLoader from "common/loader";

/**
 * 组件事件列表。
 * @const
 */
const EVENTS =
[
    "complete",             // 地图图块加载完成后触发事件
    "click",                // 鼠标左键单击事件
    "dblclick",             // 鼠标左键双击事件
    "mapmove",              // 地图平移时触发事件
    "hotspotclick",         // 鼠标点击热点时触发
    "hotspotover",          // 鼠标滑过热点时触发
    "hotspotout",           // 鼠标移出热点时触发
    "movestart",            // 地图平移开始时触发
    "moveend",              // 地图平移结束后触发。如地图有拖拽缓动效果，则在缓动结束后触发
    "zoomchange",           // 地图缩放级别更改后触发
    "zoomstart",            // 缩放开始时触发
    "zoomend",              // 缩放停止时触发
    "mousemove",            // 鼠标在地图上移动时触发
    "mousewheel",           // 鼠标滚轮开始缩放地图时触发
    "mouseover",            // 鼠标移入地图容器内时触发
    "mouseout",             // 鼠标移出地图容器时触发
    "mouseup",              // 鼠标在地图上单击抬起时触发
    "mousedown",            // 鼠标在地图上单击按下时触发
    "rightclick",           // 鼠标右键单击事件
    "dragstart",            // 开始拖拽地图时触发
    "dragging",             // 拖拽地图过程中触发
    "dragend",              // 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
    "resize",               // 地图容器大小改变事件
    "touchstart",           // 触摸开始时触发事件，仅适用移动设备
    "touchmove",            // 触摸移动进行中时触发事件，仅适用移动设备
    "touchend"              // 触摸停止时触发，仅适用移动设备
];

/**
 * 地图组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap",
    template: require("./map.html"
)})
export default class Map extends Component
{
    private _loadPromise: Promise<void>;                              // 地图库加载 Promise
   
    /**
     * 获取高德地图的DOM节点。
     * @property {HTMLDivElement}
     */
    public get $amap(): HTMLDivElement
    {
        return this.$refs.amap as HTMLDivElement;
    }
    
    /**
     * 获取或设置地图图层数组，数组可以是图层中的一个或多个，默认为普通二维地图。
     * 当叠加多个图层时，普通二维地图需通过实例化一个 TileLayer 类实现。
     * @config {Array<object>}
     * @description 动态属性，支持响应式。
     */
    // @config({type: Array})
    // public layers: Array<AMap.Layer>;

    /**
     * 获取或设置地图是否可缩放，默认值为true。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public zoomEnable: boolean;

    /**
     * 获取或设置地图显示的缩放级别。
     * 3D地图下，zoom值，可以设置为浮点数。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public zoom: number;
    
    /**
     * 获取或设置地图的可缩放级别范围。
     * 在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3,19]，取值范围[3-19]。
     * @config {[number, number]}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Array})
    public zooms: [number, number];
    
    /**
     * 获取或设置设置地图显示的中心点[经度，纬度]。
     * @config {[number, number]}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public center: [number, number];
    
    /**
     * 获取或设置一个行政区名称或 adcode，用于设置地图显示的中心点。
     * 注意：不要同时使用 center 属性，如一起使用将以 city 属性作为最终呈现结果。 
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: [String]})
    public city: string;

    /**
     * 获取或设置地图标注显示顺序，大于110可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。。
     * @config {number}
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public labelzIndex: number;
    
    /**
     * 获取或设置地图渲染模式。
     * 取值范围 "2D" 或 "3D"
     * @config {string}
     * @default "2D"
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public viewMode: "2D" | "3D";

    /**
     * 获取或设置是否允许设置俯仰角度。
     * 3D视图下为true，2D视图下设置无效。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public pitchEnable: boolean;

    /**
     * 获取或设置地图处于3D渲染模式下的俯仰角度(0°-83°)。
     * 取值范围 0 至 83。
     * @config {number}
     * @default 0
     * @description 动态属性，支持响应式。
     */
    @config({type: Number})
    public pitch: number;

    /**
     * 获取或设置地图是否可旋转。
     * 3D视图默认为true，2D视图默认false。
     * @config {boolean}
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public rotateEnable: boolean;

    /**
     * 获取或设置天空颜色，仅针对3D视图有效。
     * @config {string}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String})
    public skyColor: string;

    /**
     * 获取或设置渲染楼块时是否带动画效果，3D视图有效，PC端默认true，手机端默认false。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public buildingAnimation: boolean;

    /**
     * 获取或设置地图的语言类型。
     * 可选值：zh_cn(中文简体)，en(英文)，zh_en(中英文对照)。
     * @config {string}
     * @default zh_cn
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public lang: string;

    /**
     * 获取或设置地图默认鼠标样式。
     * 该参数应符合 CSS 的 cursor 属性规范。
     * @config {string}
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public defaultCursor: string;
    
    /**
     * 获取或设置地图平移过程中是否使用动画。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public animateEnable: boolean;

    /**
     * 获取或设置是否开启地图热点。
     * PC端默认是true，移动端默认是false。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public isHotspot: boolean;
    
    /**
     * 获取或设置是否监控地图容器尺寸变化。
     * @config {boolean}
     * @default false
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public resizeEnable: boolean;

    /**
     * 获取或设置是否在有矢量底图的时候自动展示室内地图。
     * PC端默认是true，移动端默认是false。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showIndoorMap: boolean;
    
    /**
     * 获取或设置是否支持可以扩展最大缩放级别。
     * 和 zooms 属性配合使用设置为 true 的时候，zooms 的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20。
     * @config {boolean}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public expandZoomRange: boolean;

    /**
     * 获取或设置地图是否可通过鼠标拖拽平移。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public dragEnable: boolean;

    /**
     * 获取或设置地图是否可通过双击鼠标放大地图。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public doubleClickZoom: boolean;

    /**
     * 获取或设置地图是否可通过键盘控制。
     * 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+"→"顺时针旋转，Ctrl+"←"逆时针旋转。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public keyboardEnable: boolean;

    /**
     * 获取或设置地图是否使用缓动效果。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public jogEnable: boolean;

    /**
     * 获取或设置地图是否可通过鼠标滚轮缩放浏览。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public scrollWheel: boolean;

    /**
     * 获取或设置地图在移动终端上是否可通过多点触控缩放浏览地图。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public touchZoom: boolean;

    /**
     * 获取或设置触控缩放中心，当 touchZoomCenter = 1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。
     * @config {number}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public touchZoomCenter: number;
    
    /**
     * 获取或设置地图的显示样式。
     * 目前支持官方样式模板，如："amap://styles/grey"。
     * 或用户自定义地图样式，如："amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"。
     * @config {string}
     * @default "amap://styles/normal"
     * @description 动态属性，支持响应式。
     */
    @config({type: String})
    public mapStyle: string;

    /**
     * 获取或设置需要加载的地图插件。
     * @config Array<String | Object>
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Array})
    public plugins: Array<string | object>;

    /**
     * 获取或设置地图上显示的元素种类。
     * 支持"bg"（地图背景）、"point"（POI点）、"road"（道路）、"building"（建筑物）
     * @public
     * @config Array<string>
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public features: Array<string>;

    /**
     * 获取或设置地图是否显示3D楼块效果，移动端也可使用。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public showBuildingBlock: boolean;

    /**
     * 获取或设置地图的预加载模式，开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据，优化使用体验。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public preloadMode: boolean;

    @config({type: Boolean})
    public turboMode: boolean;

    @config({type: Boolean})
    public forceVector: boolean;
    
    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const handlers =
        {
            city(value: string)
            {
                (<any>this).map.setCity(value);
            }
        };

        return handlers;
    }
    
    /**
     * 获取组件支持的事件列表。
     * @override
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return EVENTS;
    }
    
    /**
     * 当准备创建组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected beforeCreate(): void
    {
        // 获取地图库加载器单实例
        const loader = MapLoader.instance;
        
        // 检验地图库是否已经初始化
        if(!loader)
        {
            throw new Error("AMap library is not initialize, please check!");
        }

        // 如果地图配置为懒加载，则在创建组件时进行延迟加载
        this._loadPromise = loader.load();
    }
    
    /**
     * 当创建组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 初始化高德地图
        this.createMap().then(() =>
        {
            // 调用基类方法
            super.mounted();
        });
    }
    
    /**
     * 当销毁组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        super.destroyed();
    }
    
    /**
     * 初始化组件。
     * @override
     * @returns any
     */
    protected initialize(): any
    {
        return this.map;
    }
    
    /**
     * 创建高德地图实例。
     * @returns void
     */
    private async createMap(): Promise<void>
    {
        if(this.map)
        {
            return;
        }
        
        // 加载地图库
        await this._loadPromise;

        // 解析配置选项
        const options = this.resolveOptions();

        // 初始化地图实例
        this.map = this.component = new AMap.Map(this.$amap, options);
        
        // 通知外部组件高德地图已准备就绪
        this.$emit(Component.MAP_READY, this.map);

        // 通知所有子组件高德地图已准备就绪
        this.$children.forEach(child =>
        {
            child.$emit(Component.MAP_READY, this.map);
        });
    }
}
