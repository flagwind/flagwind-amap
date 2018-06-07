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
     * View2D 类配置选项。
     * @interface
     */
    interface View2DOptions
    {
        /**
         * 地图中心点坐标值。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

        /**
         * 地图顺时针旋转角度，取值范围 [0-360]。
         * @member {number}
         * @default 0
         */
        rotation?: number;

        /**
         * 地图显示的缩放级别。若center与zoom未赋值，地图初始化默认显示用户所在城市范围。
         * @member {number}
         */
        zoom?: number;

        /**
         * 地图显示的参考坐标系，取值范围："EPSG3857"、"EPSG3395"、"EPSG4326"。
         * @member {string}
         * @default "EPSG3857"
         */
        crs?: "EPSG3857" | "EPSG3395" | "EPSG4326"
    }
    
    /**
     * 二维地图显示视口，用于定义二维地图静态显示属性，如地图缩放级别"zoom"、地图中心点"center"等。
     * @class
     */
    class View2D
    {
        /**
         * 构造一个二维地图显示视口对象，opts二维地图视口对象初始化属性，详见 View2Doptions。
         * @constructor
         * @param  {View2DOptions} opts
         */
        constructor(opts: View2DOptions);
    }

    interface MapOptions
    {
        /**
         * 地图视口，用于控制影响地图静态显示的属性，如：地图中心点“center”推荐直接使用zoom、center属性为地图指定级别和中心点。
         * @member
         * @returns View2D
         */
        view?: View2D;

        /**
         * 地图图层数组，数组可以是图层中的一个或多个，默认为普通二维地图。当叠加多个图层时，普通二维地图需通过实例化一个TileLayer类实现。
         * @member
         * @returns Array<any>
         */
        layers?: Array<any>;

        /**
         * 地图显示的缩放级别，若center与level未赋值，地图初始化默认显示用户所在城市范围3D地图下，zoom值，可以设置为浮点数。
         *（在V1.3.0版本level参数调整为zoom，3D地图修改自V1.4.0开始生效）
         * @member
         * @returns number
         */
        zoom?: number;

        /**
         * 地图中心点坐标值。
         * @member
         * @returns LngLat | [number, number]
         */
        center?: LngLat | [number, number];

        /**
         * 地图标注显示顺序，大于110即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。
         * @member
         * @returns number
         */
        labelzIndex?: number;

        /**
         * 地图显示的缩放级别范围。
         * 在PC上，默认为[3,18]，取值范围[3-18]；
         * 在移动设备上，默认为[3,19],取值范围[3-19]。
         * @member
         * @returns number
         */
        zooms?: [number, number];

        /**
         * 地图语言类型。
         * 可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照。
         * 默认为: zh_cn：中文简体。
         * 注：由于图面内容限制，中文、英文 、中英文地图POI可能存在不一致的情况。
         * @member
         * @returns string
         */
        lang?: "zh_cn" | "en" | "zh_en";

        /**
         * 地图默认鼠标样式。参数defaultCursor应符合CSS的cursor属性规范。
         * @member
         * @returns string
         */
        defaultCursor?: string;

        /**
         * 地图显示的参考坐标系，取值："EPSG3857"、"EPSG3395"、"EPSG4326"。
         * 自V1.3.0移入view对象中。
         * @member
         * @returns string
         */
        crs?: "EPSG3857" | "EPSG3395" | "EPSG4326";

        /**
         * 地图平移过程中是否使用动画（如调用panBy、panTo、setCenter、setZoomAndCenter等函数，将对地图产生平移操作，是否使用动画平移的效果），默认为true，即使用动画
         * @member
         * @returns boolean
         */
        animateEnable?: boolean;

        /**
         * 是否开启地图热点，默认 false 不打开。
         * @member
         * @returns boolean
         */
        isHotspot?: boolean;

        // defaultLayer?: 
    }
    
    /**
     * 地图对象类，封装了地图的属性设置、图层变更、事件交互等接口的类。
     * @class
     */
    class Map
    {
        /**
         * 构造一个地图对象，参数container中传入地图容器DIV的ID值或者DIV对象，opts地图初始化参数对象，参数详情参看MapOptions列表。
         * @constructor
         * @param  {string|HTMLDivElement} container
         * @param  {MapOptions} opts
         */
        constructor(container: string | HTMLDivElement, opts: MapOptions);
    }
}