/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMap
{
    /**
     * 信息窗体基础配置。
     * @interface
     */
    interface WindowOptions
    {
        /**
         * 显示内容，可以是HTML要素字符串或者HTMLElement对象。
         * @member
         * @returns string | HTMLElement
         */
        content?: string | HTMLElement;

        /**
         * 相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量。
         * @member
         * @returns Pixel
         */
        offset?: Pixel;

        /**
         * 信息窗体显示基点位置。
         * @member
         * @returns LngLat | [number, number] 
         */
        position?: LngLat | [number, number];

        /**
         * 是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）
         * @member
         * @returns boolean
         */
        autoMove?: boolean;

        /**
         * 控制是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体。
         * @member
         * @default false
         * @returns boolean
         */
        closeWhenClickMap?: boolean;
    }

    /**
     * 信息窗体基类。
     * @abstract
     * @class
     */
    abstract class Window extends EventProvider
    {
        /**
         * 在地图的指定位置打开信息窗体。
         * @param  {Map} map
         * @param  {LngLat | [number, number]} position
         * @returns void
         */
        open(map: Map, position: LngLat | [number, number]): void;
        
        /**
         * 关闭信息窗体。
         * @returns void
         */
        close(): void;
        
        /**
         * 获取信息窗体是否打开。
         * @returns boolean
         */
        getIsOpen(): boolean;
        
        /**
         * 设置信息窗体内容，可通过该函数动态更新信息窗体中的信息。
         * @param  {string|HTMLElement} content
         * @returns void
         */
        setContent(content: string | HTMLElement): void;
        
        /**
         * 获取信息窗体内容 ，结果以字符串方式返回。
         * @returns string
         */
        getContent(): string | HTMLElement;
        
        /**
         * 设置信息窗体显示基点位置。
         * @param  {LngLat|[number|number]} lnglat
         * @returns void
         */
        setPosition(lnglat: LngLat | [number, number]): void;
        
        /**
         * 获取信息窗体显示基点位置。
         * @returns LngLat | [number, number]
         */
        getPosition(): LngLat | [number, number];
    }

    /**
     * InfoWindow 类配置项。
     * @interface
     */
    interface InfoWindowOptions extends WindowOptions
    {
        /**
         * 是否自定义窗体。
         * 设为true时，信息窗体外框及内容完全按照 content 所设的值添加（默认为false，即在系统默认的信息窗体外框中显示content内容）
         * @member
         * @default false
         * @returns boolean
         */
        isCustom?: boolean;

        /**
         * 信息窗体尺寸（isCustom为true时，该属性无效）。
         * @member
         * @returns Size
         */
        size?: Size;

        /**
         * 控制是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影。
         * @member
         * @default false
         * @returns boolean
         */
        showShadow?: boolean;
    }

    /**
     * 用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示1个信息窗体
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/infowindow
     */
    class InfoWindow extends Window
    {
        /**
         * 构造详细信息展示窗体。
         * @constructor
         * @param  {InfoWindowOptions} opts
         */
        constructor(opts: InfoWindowOptions);
        
        /**
         * 设置信息窗体大小（isCustom为false时有效）。
         * @param  {Size} size
         * @returns void
         */
        setSize(size: Size): void;
        
        /**
         * 获取信息窗体大小。
         * @returns Size
         */
        getSize(): Size;
    }

    /**
     * AdvancedInfoWindow 类配置项。
     * @interface
     */
    interface AdvancedInfoWindowOptions extends WindowOptions
    {
        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * @member
         * @returns string | HTMLElement
         */
        panel?: string | HTMLElement;

        /**
         * 设定周边搜索的半径，默认值：5000，单位：米。
         * @member
         * @default 5000
         * @returns number
         */
        searchRadius?: number;

        /**
         * 是否支持显示周边搜索，默认是true。
         * @member
         * @default true
         * @returns boolean
         */
        placeSearch?: boolean;

        /**
         * 是否支持驾车路径规划，默认是true。
         * @member
         * @default true
         * @returns boolean
         */
        driving?: boolean;

        /**
         * 是否支持步行路径规划，默认是true。
         * @member
         * @default true
         * @returns boolean
         */
        walking?: boolean;

        /**
         * 是否支持公交路径规划，默认是true。
         * @member
         * @default true
         * @returns boolean
         */
        transit?: boolean;

        /**
         * 是否支持作为路径规划的起点，默认是true。
         * @member
         * @default true
         * @returns boolean
         */
        asOrigin?: boolean;

        /**
         * 是否支持作为路径规划的终点，默认是true。 
         * @member
         * @returns
         */
        asDestination?: boolean;
    }
    
    /**
     * 用于在地图上弹出一个详细信息展示窗体。
     * @class
     * @description 插件类，插件名："AMap.AdvancedInfoWindow"
     * @see http://lbs.amap.com/api/javascript-api/reference/infowindow#AMap.AdvancedInfoWindow
     */
    class AdvancedInfoWindow extends Window
    {
        /**
         * 构造详细信息展示窗体。
         * @constructor
         * @param  {AdvancedInfoWindowOptions} opts
         */
        constructor(opts: AdvancedInfoWindowOptions);

        /**
         * 清除高级信息窗体在地图上绘制的路线规划或者搜索的结果。
         * @returns void
         */
        clear(): void;
    }

    /**
     * 查询结果。
     * @interface
     */
    interface SearchResult
    {
        /**
         * 成功状态说明。
         * @member
         * @returns string
         */
        info?: string;

        /**
         * 查询成功后，返回查询类型。
         * @description placesearch | driving | walking | transit
         * @member
         * @returns string
         */
        type?: string;

        /**
         * 查询成功后，根据查询类型返回对应的查询结果。
         * @member
         * @returns object
         */
        data?: object;
    }
}