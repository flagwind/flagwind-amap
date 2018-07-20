/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMap
{
    abstract class Control extends EventDispatcher
    {
        /**
         * 显示控件。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏控件。
         * @returns void
         */
        hide(): void;
    }

    interface ControlBarOptions
    {
        /**
         * 控制显示位置，如{top: "10px", right: "10px"}。
         * @member {object}
         */
        position?: object;
        
        /**
         * 是否显示缩放按钮。移动端默认为false，PC端为默认为true。
         * @member {boolean}
         */
        showZoomBar?: boolean;

        /**
         * 是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true。
         * @member {boolean}
         */
        showControlButton?: boolean;
    }

    /**
     * 组合了旋转、倾斜、复位、缩放在内的地图控件，在3D地图模式下会显示。
     * @class
     * @description v1.4.0新增，插件类，插件名："AMap.ControlBar"
     * @see http://lbs.amap.com/api/javascript-api/reference/map-control#control-bar
     */
    class ControlBar extends Control
    {
        /**
         * 初始化 ControlBar 类的新实例。
         * @constructor
         * @param  {ControlBarOptions} opts?
         */
        constructor(opts?: ControlBarOptions);
    }

    interface MaptypeOptions
    {
        /**
         * 初始化默认图层类型。
         * 取值为0：默认底图
         * 取值为1：卫星图
         * 默认值：0
         * @member {number}
         * @default 0
         */
        defaultType?: number;

        /**
         * 叠加实时交通图层，默认值：false。
         * @default false
         * @member {boolean}
         */
        showTraffic?: boolean;

        /**
         * 叠加路网图层 默认值：false
         * @member {boolean}
         * @default false
         */
        showRoad?: boolean;
    }

    /**
     * 地图类型切换插件，用来切换固定的几个常用图层。
     * @class
     * @description 插件类，插件名："AMap.MapType"
     * @see http://lbs.amap.com/api/javascript-api/reference/map-control#AMap.MapType
     */
    class MapType extends Control
    {
        /**
         * 地图类型切换插件，用于切换设定好的几个常用地图图层。
         * @constructor
         * @param  {MaptypeOptions} opts?
         */
        constructor(opts?: MaptypeOptions);
    }

    interface OverViewOptions
    {
        /**
         * 鹰眼窗体中需显示的切片图层。
         * @member {TileLayer}
         */
        tileLayer?: TileLayer;

        /**
         * 鹰眼是否展开，默认为false。
         * @member {boolean}
         */
        isOpen?: boolean;

        /**
         * 鹰眼是否显示，默认为true。
         * @member {boolean}
         */
        visible?: boolean;
    }
    
    /**
     * 地图鹰眼插件，默认在地图右下角显示缩略图。
     * @class
     * @description 插件类，插件名："AMap.OverView"
     * @see http://lbs.amap.com/api/javascript-api/reference/map-control#AMap.OverView
     */
    class OverView extends Control
    {
        /**
         * 初始化 OverView 类的新实例。
         * @param  {OverViewOptions} opts?
         */
        constructor(opts?: OverViewOptions);
        
        /**
         * 展开鹰眼窗口。
         * @returns void
         */
        open(): void;
        
        /**
         * 折叠鹰眼窗口。
         * @returns void
         */
        close(): void;
        
        /**
         * 设置鹰眼中需显示的切片图层。
         * @param  {TileLayer} layer
         * @returns void
         */
        setTileLayer(layer: TileLayer): void;
        
        /**
         * 获取窗体中显示的切片图层。
         * @returns TileLayer
         */
        getTileLayer(): TileLayer;
    }

    interface ScaleOptions
    {
        /**
         * 相对于地图容器左上角的偏移量，正数代表向右下偏移。
         * 默认为AMap.Pixel(10,10)
         * @member {Pixel}
         */
        offset?: Pixel;

        /**
         * 控件停靠位置
         * LT:左上角;
         * RT:右上角;
         * LB:左下角;
         * RB:右下角;
         * 默认位置：LB
         * @member {string}
         * @default LB
         */
        position?: string;
    }

    /**
     * 地图比例尺插件。
     * @class
     * @description 插件类，插件名："AMap.Scale"
     * @see http://lbs.amap.com/api/javascript-api/reference/map-control#AMap.Scale
     */
    class Scale extends Control
    {
        /**
         * 初始化 Scale 类的新实例。
         * @constructor
         * @param  {ScaleOptions} opts?
         */
        constructor(opts?: ScaleOptions);
    }

    interface ToolBarOptions
    {
        /**
         * 相对于地图容器左上角的偏移量，正数代表向右下偏移。
         * 默认为AMap.Pixel(10,10)
         * @member {Pixel}
         * @default AMap.Pixel(10,10)
         */
        offset?: Pixel;

        /**
         * 控件停靠位置
         * LT:左上角;
         * RT:右上角;
         * LB:左下角;
         * RB:右下角;
         * 默认位置：LT
         * @member {string}
         * @default "LT"
         */
        position?: string;

        /**
         * 标尺键盘是否可见，默认为true
         * @member {boolean}
         * @default true
         */
        ruler?: boolean;

        /**
         * 定位失败后，是否开启IP定位，默认为false
         * @member {boolean}
         * @default false
         */
        noIpLocate?: boolean;

        /**
         * 是否显示定位按钮，默认为false
         * @member {boolean}
         * @default false
         */
        locate?: boolean;

        /**
         * 是否使用精简模式，默认为false
         * @member {boolean}
         * @default false
         */
        liteStyle?: boolean;

        /**
         * 方向键盘是否可见，默认为true
         * @member {boolean}
         * @default true
         */
        direction?: boolean;

        /**
         * 是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，
         * 仅在支持 HTML5 的浏览器中有效，默认为false
         * @member {boolean}
         * @default false
         */
        autoPosition?: boolean;

        /**
         * 自定义定位图标，值为 Marker 对象。
         * @member {Marker}
         */
        locationMarker?: Marker;

        /**
         * 是否使用高德定位sdk用来辅助优化定位效果，默认：false。
         * 仅供在使用了高德定位sdk的APP中，嵌入webview页面时使用，
         * 注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，
         * 还需要调用高德定位idk中，AMapLocationClient类的startAssistantLocation()方法开启辅助H5定位功能；
         * 不用时，可以调用stopAssistantLocation()方法停止辅助H5定位功能。
         * @member {boolean}
         */
        useNative?: boolean;
    }

    /**
     * 地图工具条插件，可以用来控制地图的缩放和平移。
     * @class
     * @description 插件类，插件名："AMap.ToolBar"
     * @see http://lbs.amap.com/api/javascript-api/reference/map-control#AMap.ToolBar
     */
    class ToolBar extends Control
    {
        /**
         * 地图操作工具条，有放大缩小功能，地图左右平移功能，定位功能。
         * @constructor
         * @param  {ToolBarOptions} opts?
         */
        constructor(opts?: ToolBarOptions);
        
        /**
         * 设置工具条相对于地图容器左上角的偏移量。
         * @param  {Pixel} pixel
         * @returns void
         */
        setOffset(pixel: Pixel): void;
        
        /**
         * 获取工具条相对于地图容器左上角的偏移量。
         * @returns Pixel
         */
        getOffset(): Pixel;
        
        /**
         * 显示缩放级别等级条。
         * @returns void
         */
        showRuler(): void;
        
        /**
         * 隐藏缩放级别等级条。
         * @returns void
         */
        hideRuler(): void;
        
        /**
         * 显示方向键盘。
         * @returns void
         */
        showDirection(): void;
        
        /**
         * 隐藏方向键盘。
         * @returns void
         */
        hideDirection(): void;
        
        /**
         * 显示定位小部件。
         * @returns void
         */
        showLocation(): void;
        
        /**
         * 隐藏定位小部件。
         * @returns void
         */
        hideLocation(): void;
        
        /**
         * 进行位置定位，浏览器须支持html5，且用户须同意共享位置信息。结果位置信息通过location事件函数获取。
         * @returns void
         */
        doLocation(): void;
        
        /**
         * 获取上次定位的结果(lng、lat)。执行该功能的前须进行位置定位：doLocation，且定位事件已经执行完毕。
         * @returns LngLat
         */
        getLocation(): LngLat | [number, number];
    }
}