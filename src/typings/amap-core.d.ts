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
     * 异步加载插件。
     * 异步加载指的是在 JS API 加载完成之后，在需要使用到某个插件的时候，通过AMap.plugin方法按需引入插件，在plugin回调之后使用插件功能。
     * @see http://lbs.amap.com/api/javascript-api/guide/abc/plugins#plugin
     * @param  {string|Array<string>} plugins
     * @param  {Function} callback
     * @returns void
     */
    function plugin(plugins: string | Array<string>, callback: Function): void;
    
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
     * @see http://lbs.amap.com/api/javascript-api/reference/map#View2D
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
         * 地图视口，用于控制影响地图静态显示的属性；
         * 如：地图中心点 "center" 推荐直接使用 "zoom"、"center" 属性为地图指定级别和中心点。
         * @member {View2D}
         * @description v1.3 新增
         */
        view?: View2D;

        /**
         * 地图图层数组，数组可以是图层 中的一个或多个，默认为普通二维地图。
         * 当叠加多个图层时，普通二维地图需通过实例化一个 TileLayer 类实现。
         * @member {Array<Layer>}
         */
        layers?: Array<Layer>;

        /**
         * 地图显示的缩放级别，若 center 与 level 未赋值，地图初始化默认显示用户所在城市范围；
         * 3D地图下，zoom 值，可以设置为浮点数。
         * @member {number}
         * @description 在 v1.3.0 版本 level 参数调整为 zoom，3D地图修改自 v1.4.0开始生效。
         */
        zoom?: number;

        /**
         * 地图中心点坐标值。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

        /**
         * 地图标注显示顺序，大于 110 即可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。
         * @member {number}
         */
        labelzIndex?: number;

        /**
         * 地图显示的缩放级别范围。
         * @member {[number, number]}
         * @description 在 PC 上，默认为 [3,18]，取值范围 [3-18]；在移动设备上，默认为[3, 19],取值范围[3 - 19]。
         */
        zooms?: [number, number];

        /**
         * 地图语言类型。
         * 可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照。
         * @member {string}
         * @description 由于图面内容限制，中文、英文 、中英文地图POI可能存在不一致的情况。
         */
        lang?: "zh_cn" | "en" | "zh_en";

        /**
         * 地图默认鼠标样式。
         * @member {string}
         * @description defaultCursor 应符合 CSS 的 cursor 属性规范。
         */
        defaultCursor?: string;

        /**
         * 地图显示的参考坐标系，取值："EPSG3857"、"EPSG3395"、"EPSG4326"。
         * @member {string}
         * @description 自V1.3.0移入view对象中。
         */
        crs?: "EPSG3857" | "EPSG3395" | "EPSG4326";

        /**
         * 地图平移过程中是否使用动画，默认为 true，即使用动画。
         * @member {boolean}
         * @description 如调用 panBy、panTo、setCenter、setZoomAndCenter 等函数，将对地图产生平移操作，是否使用动画平移的效果。
         * @default true
         */
        animateEnable?: boolean;

        /**
         * 是否开启地图热点，默认 false 不打开。
         * @member {boolean}
         * @default false
         */
        isHotspot?: boolean;

        /**
         * 当前地图中默认显示的图层。
         * 默认图层可以是 TileLayer.Satellite 等切片地图，也可以是通过 TileLayer 自定义的切片图层。
         * @member {TileLayer}
         */
        defaultLayer?: TileLayer;

        /**
         * 地图是否可旋转。
         * @member {boolean}
         * @description 3D视图默认为true，2D视图默认false。
         */
        rotateEnable?: boolean;

        /**
         * 是否监控地图容器尺寸变化，默认值为 false。
         * @member {boolean}
         * @default false
         */
        resizeEnable?: boolean;

        /**
         * 是否在有矢量底图的时候自动展示室内地图。
         * @member {boolean}
         * @description PC端默认是true，移动端默认是false。
         */
        showIndoorMap?: boolean;

        /**
         * 在展示矢量图的时候自动展示室内地图图层，当地图 complete 之后可以获取到该对象。
         * @member {IndoorMap}
         */
        indoorMap?: IndoorMap;

        /**
         * 是否支持可以扩展最大缩放级别，和 zooms 属性配合使用。
         * @member {boolean}
         * @description 设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
         */
        expandZoomRange?: boolean;

        /**
         * 地图是否可通过鼠标拖拽平移，默认为 true。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        dragEnable?: boolean;

        /**
         * 地图是否可缩放，默认值为true。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        zoomEnable?: boolean;

        /**
         * 地图是否可通过双击鼠标放大地图，默认为true。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        doubleClickZoom?: boolean;

        /**
         * 地图是否可通过键盘控制，默认为true。
         * 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        keyboardEnable?: boolean;

        /**
         * 地图是否使用缓动效果，默认值为true。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        jogEnable?: boolean;

        /**
         * 地图是否可通过鼠标滚轮缩放浏览，默认为true。
         * @member {boolean}
         * @description 此属性可被 setStatus/getStatus 方法控制。
         * @default true
         */
        scrollWheel?: boolean;

        /**
         * 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false。
         * @member {boolean}
         * @default true
         */
        touchZoom?: boolean;

        /**
         * 可缺省，当 touchZoomCenter = 1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心
         * @member {number}
         */
        touchZoomCenter?: number;

        /**
         * 设置地图的显示样式，目前支持两种地图样式：
         * 第一种：自定义地图样式，如"amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"
         * 可前往地图自定义平台定制自己的个性地图样式；
         * 第二种：官方样式模版,如"amap://styles/grey"。
         * 其他模版样式及自定义地图的使用说明见开发指南
         * @member {string}
         */
        mapStyle?: string;

        /**
         * 设置地图上显示的元素种类；
         * 支持"bg"（地图背景）、"point"（POI点）、"road"（道路）、"building"（建筑物）。
         * @member {Array<string>}
         */
        features?: Array<string>;

        /**
         * 设置地图显示3D楼块效果，移动端也可使用。推荐使用。
         * @member {boolean}
         */
        showBuildingBlock?: boolean;

        /**
         * 默认为"2D"，可选"3D"，选择"3D"会显示 3D 地图效果。
         * @member {string}
         * @description v1.4.0开始支持
         * @default "2D"
         */
        viewMode?: string;

        /**
         * 俯仰角度。
         * 取值范围：0 - 83。
         * @member {number}
         * @description v1.4.0开始支持
         * @description 0
         */
        pitch?: number;

        /**
         * 地图的最大倾角。
         * @member {number}
         */
        maxPitch?: number;
        
        /**
         * 地图的旋转角度。
         * @member {number}
         */
        rotation?: number;

        /**
         * 是否允许设置俯仰角度，3D视图下为 true，2D视图下无效。
         * @member {boolean}
         * @description v1.4.0开始支持
         */
        pitchEnable?: boolean;

        /**
         * 楼块出现和消失的时候是否显示动画过程，3D视图有效，PC端默认true，手机端默认false。
         * @member {boolean}
         * @description v1.4.0开始支持
         */
        buildingAnimation?: boolean;

        /**
         * 调整天空颜色，配合自定义地图，3D视图有效，如："#ff0000"。
         * @member {string}
         * @description v1.4.0开始支持
         */
        skyColor?: string;

        /**
         * 设置地图的预加载模式，开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据，优化使用体验。
         * 该参数默认值true。  
         * @member {boolean}
         * @default true
         */
        preloadMode?: boolean;
        
        /**
         * 设置地图是否显示地标标签。
         * @member {boolean}
         * @default true
         */
        showLabel?: boolean;
    }
    
    /**
     * 地图对象类，封装了地图的属性设置、图层变更、事件交互等接口的类。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/map
     */
    class Map extends EventDispatcher
    {
        /**
         * 用于设置地图的默认环境光源，仅会作用于 MeshAcceptLights 和 Prism 和室内地图，需在 Map 初始化之后设置，如：
         * map.AmbientLight = new AMap.Lights.AmbientLight([1,1,1],0.4);
         * @property {AMap.Lights.AmbientLight}
         */
        AmbientLight: AMap.Lights.AmbientLight;
        
        /**
         * 用于设置地图的平行光源，仅会作用于MeshAcceptLights和Prism和室内地图，
         * 需在Map初始化之后设置，如：
         * map.DirectionLight = new AMap.Lights.DirectionLight([1,0,1],[1,1,1],0.6);
         * @property {AMap.Lights.DirectionLight}
         */
        DirectionLight: AMap.Lights.DirectionLight;

        /**
         * 构造一个地图对象，参数container中传入地图容器DIV的ID值或者DIV对象，opts地图初始化参数对象，参数详情参看MapOptions列表。
         * @constructor
         * @param  {string|HTMLDivElement} container
         * @param  {MapOptions} opts?
         */
        constructor(container: string | HTMLDivElement, opts?: MapOptions);
        
        /**
         * 唤起高德地图客户端 marker页。
         * 其中 object里面包含有
         * {
         *     id: "B000A7BD6C",             // POI ID
         *     name: String,                 // 必要参数
         *     location: LngLat|position     // 必须参数
         * }
         * @param  {object} obj
         * @returns void
         */
        poiOnAMAP(obj: object): void;
        
        /**
         * 唤起高德地图客户端 marker详情页。
         * 其中 object里面包含有
         * {
         *     id: "B000A7BD6C",             // POI ID
         *     name: String,                 // 必要参数
         *     location: LngLat|position     // 必须参数
         * }
         * @param  {object} obj
         * @returns void
         */
        detailOnAMAP(obj: object): void;
        
        /**
         * 获取当前地图缩放级别。
         * 在PC上，默认取值范围为[3, 18]；
         * 在移动设备上，默认取值范围为[3-19]；
         * 3D地图会返回浮点数，2D视图为整数。
         * @returns number
         */
        getZoom(): number;
        
        /**
         * 获取地图图层数组，数组为一个或多个图层。
         * @returns Array<Layer>
         */
        getLayers(): Array<Layer>;
        
        /**
         * 获取地图中心点经纬度坐标值。
         * @returns LngLat
         */
        getCenter(): LngLat;
        
        /**
         * 返回地图对象的容器。
         * @returns HTMLDivElement
         */
        getContainer(): HTMLDivElement;
        
        /**
         * 获取地图中心点所在区域，回调函数返回对象属性分别对应为{省，市，区/县}。
         * @returns void
         */
        getCity(callback: Function): void;
        
        /**
         * 获取当前地图视图范围，获取当前可视区域。
         * 3D地图下返回类型为AMap.ArrayBounds，2D地图下仍返回AMap.Bounds 。
         * @returns Bounds
         */
        getBounds(): Bounds;
        
        /**
         * 获取当前地图标注的显示顺序。
         * @returns number
         */
        getLabelzIndex(): number;
        
        /**
         * 获取 Map 的限制区域。
         * @returns Bounds
         */
        getLimitBounds(): Bounds;
        
        /**
         * 获取底图语言类型。
         * @returns string
         */
        getLang(): string;
        
        /**
         * 获取地图容器像素大小。
         * @returns Size
         */
        getSize(): Size;
        
        /**
         * 获取地图顺时针旋转角度。
         * @returns number
         */
        getRotation(): number;
        
        /**
         * 获取当前地图状态信息。
         * 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等。
         * @returns object
         */
        getStatus(): object;
        
        /**
         * 获取地图默认鼠标指针样式。
         * @returns string
         */
        getDefaultCursor(): string;
        
        /**
         * 获取指定位置的地图分辨率，单位：米/像素。
         * 参数point有指定值时，返回指定点地图分辨率，point缺省时，默认返回当前地图中心点位置的分辨率。
         * @param  {LngLat | [number, number]} point?
         * @returns number
         */
        getResolution(point?: LngLat | [number, number]): number;
        
        /**
         * 获取当前地图比例尺。
         * 其值为当前地图中心点处比例尺值的倒数。
         * @param  {number} dpi
         * @returns number
         */
        getScale(dpi: number): number;
        
        /**
         * 设置地图显示的缩放级别，在PC上，参数zoom可设范围：[3,18]；在移动端：参数zoom可设范围：[3,19]；3D地图下，可将zoom设置为浮点数。
         * @param  {number} level
         * @returns void
         */
        setZoom(level: number): void;
        
        /**
         * 设置地图标注显示的顺序。
         * @param  {number} index
         * @returns void
         */
        setlabelzIndex(index: number): void;
        
        /**
         * 设置地图图层数组，数组为一个或多个图层。当叠加多个图层时，普通二维地图需通过实例化一个 TileLayer 类实现。
         * @param  {Array<Layer>} layers
         * @returns void
         */
        setLayers(layers: Array<Layer>): void;
        
        /**
         * 添加地图覆盖物数组，数组为一个或多个覆盖物。
         * @param  {Overlay | Array<Overlay> | Layer | Array<Layer>} overlayers
         * @returns void
         */
        add(overlayers: Overlay | Array<Overlay> | Layer | Array<Layer>): void;
        
        /**
         * 删除地图覆盖物数组，数组为一个或多个覆盖物。
         * @param  {Overlay | Array<Overlay> | Layer | Array<Layer>} overlayers
         * @returns void
         */
        remove(overlayers: Overlay | Array<Overlay> | Layer | Array<Layer>): void;
        
        /**
         * 返回添加的覆盖物对象，可选类型包括marker、circle、polyline、polygon； 
         * Type可缺省，缺省时返回所有覆盖物（marker、circle、polyline、polygon）。
         * 返回结果不包含官方覆盖物等，比如定位 marker，周边搜索圆等。
         * @param  {string} type?
         * @returns Array
         */
        getAllOverlays(type?: string): Array<Overlay>;
        
        /**
         * 设置地图显示的中心点。
         * @param  {LngLat | [number, number]} position
         * @returns void
         */
        setCenter(position: LngLat | [number, number]): void;
        
        /**
         * 地图缩放至指定级别并以指定点为地图显示中心点。
         * @param  {number} zoomLevel
         * @param  {LngLat | [number, number]} center
         * @returns void
         */
        setZoomAndCenter(zoomLevel: number, center: LngLat | [number, number]): void;
        
        /**
         * 按照行政区名称或adcode来设置地图显示的中心点。
         * 行政区名称支持中国、省、市、区/县名称，如遇重名的情况，会按城市编码表顺序返回第一个。
         * adcode请在城市编码表中查询。
         * 建议不要同时使用center/setCenter()和setCity()，如一起使用程序将以setCity()作为最后结果。
         * @param  {string} city
         * @param  {Function} callback?
         * @returns void
         */
        setCity(city: string, callback?: Function): void;
        
        /**
         * 指定当前地图显示范围，参数 bounds 为指定的范围。
         * @param  {Bounds} bound
         * @returns void
         */
        setBounds(bound: Bounds): void;
        
        /**
         * 设置 Map 的限制区域，设定区域限制后，传入参数为限制的Bounds，地图仅在区域内可拖拽。
         * @param  {Bounds} bound
         * @returns void
         */
        setLimitBounds(bound: Bounds): void;
        
        /**
         * 清除限制区域。
         * @returns void
         */
        clearLimitBounds(): void;
        
        /**
         * 设置地图语言类型，设置后底图重新加载。
         * @param  {string} lang
         * @returns string
         */
        setLang(lang: string): string;
        
        /**
         * 设置地图顺时针旋转角度，旋转原点为地图容器中心点，取值范围 [0-360]。
         * @param  {number} rotation
         * @returns void
         */
        setRotation(rotation: number): void;
        
        /**
         * 设置当前地图显示状态，包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等 
         * @param  {object} status
         * @returns void
         */
        setStatus(status: object): void;
        
        /**
         * 设置鼠标指针默认样式，参数cursor应符合CSS的cursor属性规范。
         * 可为CSS标注中的光标样式，如：setCursor(“pointer”)等；
         * 或者自定义的光标样式，如：setCursor("url('http://lbs.amap.com/webapi/static/Images//0.png'), pointer");
         * @param  {string} cursor
         * @returns void
         */
        setDefaultCursor(cursor: string): void;
        
        /**
         * 地图放大一级显示。
         * @returns void
         */
        zoomIn(): void;
        
        /**
         * 地图缩小一级显示。
         * @returns void
         */
        zoomOut(): void;
        
        /**
         * 地图中心点平移至指定点位置。
         * @param  {LngLat | [number, number]} positon
         * @returns void
         */
        panTo(positon: LngLat | [number, number]): void;
        
        /**
         * 以像素为单位，沿x方向和y方向移动地图，x向右为正，y向下为正。
         * @param  {number} x
         * @param  {number} y
         * @returns void
         */
        panBy(x: number, y: number): void;
        
        /**
         * 根据地图上添加的覆盖物分布情况，自动缩放地图到合适的视野级别，参数overlayList默认为当前地图上添加的所有覆盖物图层。
         * @param  {Array<Overlay>} overlayList?
         * @returns void
         */
        setFitView(overlayList?: Array<Overlay>): void;
        
        /**
         * 删除地图上所有的覆盖物。
         * @returns void
         */
        clearMap(): void;
        
        /**
         * 注销地图对象，并清空地图容器。
         * @returns void
         */
        destroy(): void;
        
        /**
         * 插件加载方法。参数name中指定需要加载的插件类型，同时加载多个插件时，以字符串数组的形式添加。在Callback回调函数中进行地图插件的创建、插件事件的绑定等操作；
         * @param  {string|Array<string>} name
         * @param  {Function} callback
         * @returns void
         */
        plugin(name: string | Array<string>, callback: Function): void;
        
        /**
         * 添加控件。参数可以是插件列表中的任何插件对象，如：ToolBar、OverView、Scale等。
         * @param  {Control} control
         * @returns void
         */
        addControl(control: Control): void;
        
        /**
         * 移除地图上的指定控件。
         * @param  {Control} control
         * @returns void
         */
        removeControl(control: Control): void;
        
        /**
         * 清除地图上的信息窗体。
         * @returns void
         */
        clearInfoWindow(): void;
        
        /**
         * 平面地图像素坐标转换为地图经纬度坐标。
         * @param  {Pixel} pixel
         * @param  {number} level?
         * @returns LngLat
         */
        pixelToLngLat(pixel: Pixel, level?: number): LngLat;
        
        /**
         * 地图经纬度坐标转换为平面地图像素坐标。
         * @param  {LngLat | [number, number]} lngLat
         * @param  {number} level?
         * @returns Pixel
         */
        lnglatToPixel(lngLat: LngLat | [number, number], level?: number): Pixel;
        
        /**
         * 地图容器像素坐标转为地图经纬度坐标。
         * @param  {Pixel} pixel
         * @returns LngLat | [number, number]
         */
        containerToLngLat(pixel: Pixel): LngLat | [number, number];
        
        /**
         * 地图经纬度坐标转为地图容器像素坐标。
         * @param  {LngLat | [number, number]} lnglat
         * @returns Pixel
         */
        lngLatToContainer(lnglat: LngLat | [number, number]): Pixel;
        
        /**
         * 设置地图的显示样式，目前支持两种地图样式：
         * 第一种：自定义地图样式，如"amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"
         * 可前往地图自定义平台定制自己的个性地图样式；
         * 第二种：官方样式模版,如"amap://styles/grey"。
         * 其他模版样式及自定义地图的使用说明见开发指南
         * @param  {string} style
         * @returns void
         */
        setMapStyle(style: string): void;
        
        /**
         * 获取地图显示样式。
         * @returns string
         */
        getMapStyle(): string;
        
        /**
         * 设置地图上显示的元素种类，支持bg（地图背景）、point（兴趣点）、road（道路）、building（建筑物）。
         * @param  {Array<string>} features
         * @returns void
         */
        setFeatures(features: Array<string>): void;
        
        /**
         * 获取地图显示元素种类。
         * @returns Array<string>
         */
        getFeatures(): Array<string>;
        
        /**
         * 修改底图图层。
         * @obs
         * @param  {TileLayer} layer
         * @returns void
         */
        setDefaultLayer(layer: TileLayer): void;
        
        /**
         * 设置俯仰角, 3D视图有效。
         * @param  {number} pitch
         * @returns void
         */
        setPitch(pitch: number): void;
        
        /**
         * 获取俯仰角。
         * @returns number
         */
        getPitch(): number;
    }
}