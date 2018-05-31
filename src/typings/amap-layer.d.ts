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
     * 图层基础配置项。
     */
    interface LayerOptions
    {
        /**
         * 要显示该图层的地图对象。
         * @member
         * @returns Map
         */
        map?: Map;

        /**
         * 图层叠加的顺序值，0表示最底层。
         * @member
         * @default 1
         * @returns number
         */
        zIndex?: number;

        /**
         * 图层的透明度，取值范围[0,1]，1代表完全不透明，0代表完全透明。
         * @member
         * @returns number | [number, number]
         */
        opacity?: number | [number, number];

        /**
         * 支持的缩放级别范围，默认范围[3-18]，在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19]。
         * @member
         * @default PC: [3, 18] APP: [3, 19]
         * @returns [number, number]
         */
        zooms?: [number, number];
    }
    
    /**
     * 表示一个图层基础类。
     */
    class Layer extends EventProvider
    {
        /**
         * 设置图层的所在地图对象。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
        
        /**
         * 获取图层所在的地图对象。
         * @returns Map
         */
        getMap(): Map;

        /**
         * 显示图层。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏图层。
         * @returns void
         */
        hide(): void;

        /**
         * 设置图层透明度。
         * @param  {number | [number, number]} alpha
         * @returns void
         */
        setOpacity(alpha: number | [number, number]): void;
        
        /**
         * 获取图层透明度。
         * @returns number | [number, number]
         */
        getOpacity(): number | [number, number];

        /**
         * 设置图层叠加的顺序值。
         * @param  {number} index
         * @returns void
         */
        setzIndex(index: number): void;
        
        /**
         * 获取图层叠加的顺序值。
         * @returns number
         */
        getzIndex(): number;

        /**
         * 获取该图层可显示的级别范围；在PC上，取值范围为[3-18]；在移动设备上，取值范围为[3-19]。
         * @returns [number, number]
         */
        getZooms(): [number, number];
    }

    /**
     * TileLayer 类配置选项。
     * @interface
     */
    interface TileLayerOptions extends LayerOptions
    {
        /**
         * 切片大小，取值：
         * 256，表示切片大小为256x256，
         * 128，表示切片大小为128x128， 
         * 64，表示切片大小为64x64。
         * 默认值为256 
         * @member
         * @default 256
         * @returns number
         */
        tileSize?: number;

        /**
         * 切片取图地址(自1.3版本起，该属性与getTileUrl属性合并)
         * 如："http://abc.amap.com/tile?x=[x]&y=[y]&z=[z]" [x]、[y]、[z]分别替代切片的xyz。
         * @member
         * @returns string
         */
        tileUrl?: string;

        /**
         * 取图错误时的代替地址。
         * @member
         * @returns string
         */
        errorUrl?: string;
        
        /**
         * 获取图块取图地址，该属性值为一个字符串或者一个函数。
         * 字符串如："http://abc.amap.com/tile?x=[x]&y=[y]&z=[z]"
         * 函数参数z为地图缩放级别，x,y分别为相应缩放级别下图块横向、纵向索引号， 
         * 该属性可以用来改变取图地址，实现自定义栅格图。
         * @member
         * @returns string | ((x: number, y: number, z: number) => string)
         */
        getTileUrl?: string | ((x: number, y: number, z: number) => string);

        /**
         * 是否在高清屏下进行清晰度适配，默认为true。
         * 将根据移动设备屏幕设备像素比，采用相应的技术手段，保证图层在不同设备像素比下的清晰度。
         * @member
         * @default true
         * @returns boolean
         */
        detectRetina?: boolean;
    }

    /**
     * 切片图层类，该类为基础类，不指定getTileUrl时为高德默认底图。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer
     */
    class TileLayer extends Layer
    {
        /**
         * 构造一个切片图层对象，通过TileLayerOptions设置图层属性。
         * @constructor
         * @param  {TileLayerOptions} tileOpt
         */
        constructor(opts: TileLayerOptions);

        /**
         * 获取当前图层所有切片号。
         * @returns Array<string | number>
         */
        getTiles(): Array<string | number>;

        /**
         * 重新加载此图层。
         * @returns void
         */
        reload(): void;
        
        /**
         * 设置图层的取图地址。
         * @param  {string} url
         * @returns void
         */
        setTileUrl(url: string): void;
    }

    /**
     * Buildings 类配置项。
     * @interface
     */
    interface BuildingsOptions extends LayerOptions
    {
        /**
         * 高度比例系数，可控制3D视图下的楼块高度。
         * @member
         * @returns number
         */
        heightFactor?: number;

        /**
         * 是否可见。
         * @member
         * @returns boolean
         */
        visible?: boolean;
    }
    
    /**
     * 楼块图层，单独展示矢量化的楼块图层，兼容IE9以上(不含)的浏览器。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#buildings
     */
    class Buildings extends Layer
    {
        /**
         * 按区域设置楼块的颜色。
         * @description 示例地址：http://lbs.amap.com/api/javascript-api/example/personalized-map/building-style
         * @param  {object} style color1: 楼顶颜色、color2: 楼面颜色、path 区域路径
         * @returns void
         */
        setStyle(style: { color1: string, color2: string, path: Array<[number, number]> }): void;
    }

    /**
     * 海量点样式配置项。
     * @interface
     */
    interface MassMarksStyle
    {
        /**
         * 必填参数，图标显示位置偏移量，以图标的左上角为基准点（0,0）点。
         * 例如：anchor: new Pixel(5, 5)
         * @member
         * @returns Pixel
         */
        anchor: Pixel;

        /**
         * 必填参数，图标的地址。
         * @member
         * @returns string
         */
        url: string;
        
        /**
         * 必填参数，图标的尺寸。
         * 例如：size:new Size(11,11)
         * @member
         * @returns Size
         */
        size: Size;

        /**
         * 旋转角度。
         * @member
         * @returns number
         */
        rotation?: number;
    }

    /**
     * MassMarks 类配置项。
     * @interface
     */
    interface MassMarksOptions extends LayerOptions
    {
        /**
         * 指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor。
         * @member
         * @returns string
         */
        cursor?: string;

        /**
         * 表示是否在拖拽缩放过程中实时重绘，默认true，建议超过10000的时候设置false。
         * @member
         * @returns boolean
         */
        alwaysRender?: boolean;

        /**
         * 用于设置点的样式，当点样式一致时传入单个MassMarksStyle即可；
         * 当需要展示多种点样式时，传入MassMarksStyle的数组，此时需要为 Data中每个元素指定 style 字段为该元素要显示的样式在MassMarksStyle数组中的索引。
         * @member
         * @returns MassMarksStyle | Array<MassMarksStyle>
         */
        style?: MassMarksStyle | Array<MassMarksStyle>;
    }

    /**
     * 量点类，利用该类可同时在地图上展示万级别的点，目前仅适用于html5浏览器。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#MassMarks
     */
    class MassMarks extends Layer
    {
        /**
         * 创建海量点类。data为点对象的数组，点对象为包含经纬度lnglat属性的Object，opts为点与点集合的绘制样式。
         * 数据集格式为：Array 坐标数据集，例：data: [{lnglat: [116.405285, 39.904989], name: "南山区", id: 10056}, {}, …]
         * @constructor
         * @param  {Array<object>} data
         * @param  {MassMarksOptions} opts
         */
        constructor(data: Array<object>, opts: MassMarksOptions);
        
        /**
         * 设置MassMark的显示样式。
         * 当点样式一致时传入单个MassMarksStyle即可；
         * 当需要展示多种点样式时，传入MassMarksStyle的数组，此时需要为Data中每个元素指定 style 字段为该元素要显示的样式在MassMarksStyle数组中的索引。
         * @param  {MassMarksStyle|Array<MassMarksStyle>} style
         * @returns void
         */
        setStyle(style: MassMarksStyle | Array<MassMarksStyle>): void;
        
        /**
         * 获取MassMark的显示样式，数据结构同setStyle中的参数一致。
         * @returns MassMarksStyle | Array<MassMarksStyle>
         */
        getStyle(): MassMarksStyle | Array<MassMarksStyle>;
        
        /**
         * 设置MassMark展现的数据集。
         * 数据集格式为：Array 坐标数据集，例：data: [{lnglat: [116.405285, 39.904989], name: "南山区", id: 10056}, {}, …]
         * @param  {Array<object>} data
         * @returns void
         */
        setData(data: Array<object>): void;
        
        /**
         * 获取MassMark的数据集，数据结构同setData中的数据一致。
         * @returns Array<object>
         */
        getData(): Array<object>;
        
        /**
         * 清除海量点。
         * @returns void
         */
        clear(): void;
    }

    /**
     * Heatmap 类配置项。
     * @interface
     */
    interface HeatmapOptions extends LayerOptions
    {
        /**
         * 热力图中单个点的半径，默认：30，单位：pixel。
         * @member
         * @returns number
         */
        radius?: number;

        /**
         * 热力图的渐变区间，热力图按照设置的颜色及间隔显示热力图，例：
         * { 
         *    0.4: "rgb(0, 255, 255)",
         *    0.65: "rgb(0, 110, 255)",
         *    0.85: "rgb(100, 0, 255)",
         *    1.0: "rgb(100, 0, 255)"
         * } 
         * 其中 key 表示间隔位置，取值范围： [0,1]，value 为颜色值。默认：heatmap.js标准配色方案。
         * @member
         * @returns object
         */
        gradient?: object;
    }

    /**
     * 热力图，基于第三方heatmap.js实现，以特殊高亮的形式显示数据密集程度。
     * 根据密集程度的不同，图上会呈现不同的颜色，以直观的形式展现数据密度。
     * API引用了heatmap.js最新版本v2.0，v2.0基于新的渲染模型，具有更高的渲染效率和更强的性能。
     * 支持chrome、firefox、safari、ie9及以上浏览器。
     * @class
     * @description 插件类，插件名："AMap.Heatmap"
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#m_Heatmap
     */
    class Heatmap extends Layer
    {
        /**
         * 构造一个热力图插件对象，map为要叠加热力图的地图对象，opts属性参考HeatmapOptions列表中的说明。
         * @param  {Map} map
         * @param  {HeatmapOptions} opts
         */
        constructor(map: Map, opts: HeatmapOptions);

        /**
         * 设置热力图属性，参考HeatmapOptions列表中的说明。
         * @param  {HeatmapOptions} opts
         * @returns void
         */
        setOptions(opts: HeatmapOptions): void;
        
        /**
         * 获取热力图的属性信息。
         * @returns HeatmapOptions
         */
        getOptions(): HeatmapOptions;
        
        /**
         * 向热力图数据集中添加坐标点，count不填写时默认：1。
         * @param  {number} lng
         * @param  {number} lat
         * @param  {number} count?
         * @returns void
         */
        addDataPoint(lng: number, lat: number, count?: number): void;
        
        /**
         * 设置热力图展现的数据集。
         * dataset数据集格式为：
         * {
         *     max: Number 权重的最大值, 
         *     data: Array 坐标数据集
         * }
         * 其中max不填则取数据集count最大值 
         * 例：
         * {
         *     max: 100, 
         *     data: [{lng: 116.405285, lat: 39.904989, count: 65},{}, …]
         * }
         * 
         * 也可以通过url来加载数据，格式为
         * {
         *     data：jsonp格式数据的服务地址URL, 
         *     dataParser: 数据格式转换function     // 当jsonp返回结果和官方结构不一致的时候，用户可以传递一个函数用来进行数据格式转换；
         * } 
         * 例：
         * {
         *     data: "http://abc.com/jsonp.js",
         *     dataParser:function(data)
         *     {
         *         return doSomthing(data);    // 返回的对象结果应该与上面例子的data字段结构相同
         *     }
         * }
         * @param  {object} dataset
         * @returns void
         */
        setDataSet(dataset: object): void;
        
        /**
         * 输出热力图的数据集，数据结构同setDataSet中的数据集一致。
         * @returns object
         */
        getDataSet(): object;
    }

    /**
     * LayerGroup类用来包装其它图层类的实例，对实例集合做批量操作，避免开发者对多个需要设置同样属性的图层实例做循环处理。
     * 同时只要对LayerGroup执行过setMap方法后，新添加到该LayerGroup中的图层会自动将其map属性修改到该group对应的map，此外从group中移除该图层时，也会将该图层从group对应的map中移除。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#LayerGroup
     */
    class LayerGroup extends EventProvider
    {
        /**
         * 构造图层集合，传入的参数是一个图层实例的数组。
         * @param  {Array<Layer>} layers
         */
        constructor(layers: Array<Layer>);
        
        /**
         * 添加单个图层到集合中，不支持添加重复的图层。
         * @param  {Layer} layer
         * @returns void
         */
        addLayer(layer: Layer): void;
        
        /**
         * 添加图层数组到集合中，不支持添加重复的图层。
         * @param  {Array<Layer>} layers
         * @returns void
         */
        addLayers(layers: Array<Layer>): void;
        
        /**
         * 返回当前集合中所有的图层。
         * @returns void
         */
        getLayers(): Array<Layer>;
        
        /**
         * 判断传入的图层实例是否在集合中。
         * @param  {Layer} layer
         * @returns boolean
         */
        hasLayer(layer: Layer): boolean;
        
        /**
         * 从集合中删除传入的图层实例。
         * @param  {Layer} layer
         * @returns void
         */
        removeLayer(layer: Layer): void;
        
        /**
         * 从集合中删除传入的图层实例数组。
         * @param  {Array<Layer>} layers
         * @returns void
         */
        removeLayers(layers: Array<Layer>): void;
        
        /**
         * 	清空集合。
         * @returns void
         */
        clearLayers(): void;
        
        /**
         * 对集合中的图层做迭代操作，其中iterator的函数定义是： 
         * function(layer, index, collections)，相关含义如下： 
         * layer: 当前迭代到的图层 
         * index: 该图层在集合中的序列号(从0开始) 
         * layers: 所有图层实例
         * @param  {Function} iterator
         * @returns void
         */
        eachLayer(iterator: ((layer: Layer, index: number, layers: Array<Layer>) => void)): void;
        
        /**
         * 指定集合中里图层的显示地图。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;

        /**
         * 获取图层所在的地图对象。
         * @returns Map
         */
        getMap(): Map;
        
        /**
         * 修改图层属性(包括线样式、样色等等)。
         * @param  {object} opts
         * @returns void
         */
        setOptions(opts: object): void;

        /**
         * 获取图层属性。
         * @returns HeatmapOptions
         */
        getOptions(): object;
        
        /**
         * 在地图上显示集合中图层。
         * @returns void
         */
        show(): void;
        
        /**
         * 在地图上隐藏集合中图层。
         * @returns void
         */
        hide(): void;
    }

    /**
     * ImageLayer 类配置项。
     * @interface
     */
    interface ImageLayerOptions extends LayerOptions
    {
        /**
         * ImageLayer 显示的范围。
         * @member
         * @returns Bounds
         */
        bounds?: Bounds;

        /**
         * 需要显示的 Image 的 Url。
         * @member
         * @returns string
         */
        url?: string;

        /**
         * 是否显示。
         * @member
         * @returns boolean
         */
        visible?: boolean;
    }

    /**
     * 图片图层类，用户可以将一张静态图片作为图层添加在地图上，图片图层会随缩放级别而自适应缩放。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/self-own-layers#imagelayer
     */
    class ImageLayer extends Layer
    {
        /**
         * 构造一个ImageLayer图层对象，需要提供一个Image的url，以及它覆盖的Bounds。
         * Image的内容会根据Bounds大小显示。
         * @constructor
         * @param  {ImageLayerOptions} opts
         */
        constructor(opts: ImageLayerOptions);
        
        /**
         * 设置 ImageLayer 显示的范围。
         * @param  {Bounds} bounds
         * @returns void
         */
        setBounds(bounds: Bounds): void;
        
        /**
         * 返回 ImageLayer 显示的范围。
         * @returns Bounds
         */
        getBounds(): Bounds;
        
        /**
         * 返回 Image 对象。
         * @returns HTMLCanvasElement
         */
        getElement(): HTMLCanvasElement;
        
        /**
         * 修改 Image 的 Url。
         * @param  {string} url
         * @returns void
         */
        setImageUrl(url: string): void;
        
        /**
         * 获取 Image 的 Url。
         * @returns string
         */
        getImageUrl(): string;
    }

    /**
     * CanvasLayer 类配置项。
     * @interface
     */
    interface CanvasLayerOptions extends LayerOptions
    {
        /**
         * CanvasLayer 覆盖的范围。
         * @member
         * @returns Bounds
         */
        bounds?: Bounds;

        /**
         * 需要显示的Canvas对象。
         * @member
         * @returns HTMLCanvasElement
         */
        canvas?: HTMLCanvasElement;

        /**
         * 是否显示。
         * @member
         * @returns boolean
         */
        visible?: boolean;
    }
    
    /**
     * Canvas 图层类，用户可以将一个 Canvas 作为图层添加在地图上，Canvas 图层会随缩放级别而自适应缩放。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/self-own-layers#canvaslayer
     */
    class CanvasLayer extends Layer
    {
        /**
         * 构造一个CanvasLayer图层对象，需要提供一个Canvas，以及它覆盖的Bounds。
         * 显示的内容会根据Bounds大小显示。
         * @constructor
         * @param  {CanvasLayerOptions} opts
         */
        constructor(opts: CanvasLayerOptions);
        
        /**
         * 当canvas的内容发生改变是用于刷新图层，3D视图下调用，2D视图不需要调用。
         * @returns void
         */
        reFresh(): void;
        
        /**
         * 返回 Canvas 对象。
         * @returns HTMLCanvasElement
         */
        getElement(): HTMLCanvasElement;
        
        /**
         * 修改显示的 Canvas。
         * @param  {HTMLCanvasElement} canvas
         * @returns void
         */
        setCanvas(canvas: HTMLCanvasElement): void;
    }

    /**
     * VideoLayer 类配置项。
     * @interface
     */
    interface VideoLayerOptions extends LayerOptions
    {
        /**
         * 加载完成是否自动播放。
         * @member
         * @returns boolean
         */
        autoplay?: boolean;
        
        /**
         * 是否循环播放。
         * @member
         * @returns boolean
         */
        loop?: boolean;

        /**
         * VideoLayer覆盖的范围。
         * @member
         * @returns Bounds
         */
        bounds?: Bounds;

        /**
         * 需要显示的Video的Url，可使用同一视频的不同视频格式的url的数组来实现视频的浏览器兼容。
         * @member
         * @returns string | Array<string>
         */
        url?: string | Array<string>;

        /**
         * 是否显示图层。
         * @member
         * @returns boolean
         */
        visible?: boolean;
    }

    /**
     * 视频图层类，用户可以将一个视频作为图层添加在地图上，视频图层会随缩放级别而自适应缩放。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/self-own-layers#video
     */
    class VideoLayer extends Layer
    {
        /**
         * 构造一个VideoLayer图层对象，需要提供一个Video的url，以及它覆盖的Bounds。
         * Video的内容会根据Bounds大小显示。
         * @constructor
         * @param  {VideoLayerOptions} opts
         */
        constructor(opts: VideoLayerOptions);

        /**
         * 返回 Video 对象。
         * @returns HTMLVideoElement
         */
        getElement(): HTMLVideoElement;
        
        /**
         * 设置 Video 的 Url。
         * @param  {string|Array<string>} url
         * @returns void
         */
        setVideoUrl(url: string | Array<string>): void;
        
        /**
         * 获取 Video 的 Url。
         * @returns string
         */
        getVideoUrl(): string | Array<string>;
    }
    
    /**
     * CustomLayer 类配置项。
     * @interface
     */
    interface CustomLayerOptions extends LayerOptions
    {
    }

    /**
     * 自定义图层是一种完全由开发者来指定绘制方法的图层。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/self-own-layers#customlayer
     */
    class CustomLayer extends Layer
    {
        /**
         * 初始化完成时候，开发者需要给该图层设定render方法，该方法需要实现图层的绘制，API会在合适的时机自动调用该方法。
         * @property
         * @returns Function
         */
        render: Function;
        
        /**
         * 用于构建自定义图层。
         * @param  {CustomLayerOptions} opts
         */
        constructor(opts: CustomLayerOptions);
    }
}

declare namespace TileLayer
{
    /**
     * Satellite 类配置项。
     * @interface
     */
    interface SatelliteOptions extends AMap.LayerOptions
    {
        
    }

    /**
     * 卫星图层类，继承自TileLayer。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer.Satellite
     */
    class Satellite extends AMap.TileLayer
    {
        /**
         * 构造一个卫星切片图层对象，通过SatelliteOptions设置图层属性。
         * @constructor
         * @param  {SatelliteOptions} opts
         */
        constructor(opts: SatelliteOptions);
    }
    
    /**
     * RoadNet 类配置项。
     * @interface
     */
    interface RoadNetOptions extends AMap.LayerOptions
    {
        
    }

    /**
     * 路网图层类，继承自TileLayer。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer.RoadNet
     */
    class RoadNet extends AMap.TileLayer
    {
        /**
         * 构造路网图层对象，通过RoadNetOptions设置图层属性。
         * @constructor
         * @param  {RoadNetOptions} opts
         */
        constructor(opts: RoadNetOptions);
    }

    /**
     * Traffic 类配置项。
     * @interface
     */
    interface TrafficOptions extends AMap.LayerOptions
    {
        /**
         * 是否设置可以自动刷新实时路况信息，默认为false。
         * @member
         * @default false;
         * @returns boolean
         */
        autoRefresh?: boolean;

        /**
         * 设置刷新间隔时长，单位：秒，默认180s刷新一次。
         * @member
         * @default 180;
         * @returns number
         */
        interval?: number;
    }
    
    /**
     * 实时交通图层类，继承自TileLayer。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer.Traffic
     */
    class Traffic extends AMap.TileLayer
    {
        /**
         * 构造一个实时交通图层对象。
         * @constructor
         * @param  {TrafficOptions} opts
         */
        constructor(opts: TrafficOptions);
    }

    /**
     * Flexible 类配置项。
     */
    interface FlexibleOptions extends AMap.LayerOptions
    {
        /**
         * 由开发者实现，由API自动调用，xyz分别为切片横向纵向编号和层级，切片大小256。
         * 假设每次创建的贴片为A(支持img或者canvas)，当创建或者获取成功时请回调success(A)，不需要显示或者失败时请回调fail()
         * @member
         * @returns Function
         */
        createTile?: (x: string | number, y: string | number, z: string | number, success: Function, fail: Function) => void;

        /**
         * 内存中缓存的切片的数量上限。
         * @member
         * @returns number 
         */
        cacheSize?: number;
        
        /**
         * 是否显示。
         * @member
         * @returns boolean
         */
        visible?: boolean;
    }

    /**
     * 灵活切片图层，继承自TileLayer，开发者可通过构造时传入给其传入createTile字段来指定每一个切片的内容。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/self-own-layers#flex
     */
    class Flexible extends AMap.TileLayer
    {
        /**
         * 创建自定义切片图层。
         * @constructor
         * @param  {FlexibleOptions} opts
         */
        constructor(opts: FlexibleOptions)
    }

    /**
     * WMS 类配置项。
     */
    interface WMSOptions extends AMap.LayerOptions
    {
        /**
         * wms服务的url地址，如："https://ahocevar.com/geoserver/wms"
         * @member
         * @returns string
         */
        url?: string;

        /**
         * 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false。
         * @member
         * @returns boolean
         */
        blend?: boolean;

        /**
         * 加载WMS图层服务时，图片的分片大小，可自由设定，不易过大，建议[256,512]。
         * @member
         * @returns number
         */
        tileSize?: number;

        /**
         * 初始时时候是否显示。
         * @member
         * @returns boolean
         */
        visible?: boolean;

        /**
         * OGC标准的WMS地图服务的GetMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等，
         * CRS、BBOX、REQUEST、WIDTH、HEIGHT等参数请勿添加，例如：
         * {
         *     LAYERS: "topp:states",
         *     VERSION: "1.3.0",
         *     FORMAT: "image/png"
         * } 
         * @member
         * @returns object
         */
        params?: object;
    }

    /**
     * 用于加载OGC标准的WMS地图服务的一种图层类，自v1.4.3新增，仅支持EPSG3857坐标系统的WMS图层。
     * @class
     * @description v1.4.3 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/wms#wms
     */
    class WMS extends AMap.Layer
    {
        /**
         * 创建WMS图层，WMSOptions为创建图层所需要的属性组对象。
         * @constructor
         * @param  {WMSOptions} opts
         */
        constructor(opts: WMSOptions);

        /**
         * 设置wms服务地址。
         * @param  {string} url
         * @returns void
         */
        setUrl(url: string): void;
        
        /**
         * 返回wms服务地址。
         * @returns string
         */
        getUrl(): string;
        
        /**
         * 设置OGC标准的WMS getMap接口的参数，包括VERSION、LAYERS、STYLES、FORMAT、TRANSPARENT等。
         * @param  {object} params
         * @returns void
         */
        setParams(params: object): void;
        
        /**
         * 返回OGC标准的WMS getMap接口的参数。
         * @returns object
         */
        getParams(): object;
    }

    /**
     * WMTS 类配置项。
     * @interface
     */
    interface WMTSOptions extends AMap.LayerOptions
    {
        /**
         * wmts服务的url地址，如："https://services.arcgisonline.com/arcgis/rest/services/Demographics/USA_Population_Density/MapServer/WMTS/"
         * @member
         * @returns string
         */
        url?: string;

        /**
         * 地图级别切换时，不同级别的图片是否进行混合，如图层的图像内容为部分透明请设置为false。
         * @member
         * @returns boolean
         */
        blend?: boolean;

        /**
         * WMTS图层的分片大小，需要和WMTS服务支持的大小一致。
         * @member
         * @returns number
         */
        tileSize?: number;

        /**
         * 初始时时候是否显示。
         * @member
         * @returns boolean
         */
        visible?: boolean;

        /**
         * OGC标准的WMTS地图服务的GetTile接口的参数，包括Version、Layer、Style、Format、Service等，TileMatrixSet、TileRow、TileCol、Request 等参数请勿添加，例如：
         * {
         *     Layer: "0",
         *     Version: "1.0.0",
         *     Format: "image/png"
         * }
         * @member
         * @returns object
         */
        params?: object;
    }

    /**
     * 用于加载OGC标准的WMTS地图服务的一种图层类，自v1.4.3新增，仅支持EPSG3857坐标系统的WMTS图层。
     * @class
     * @description v1.4.3 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/wms#wmts
     */
    class WMTS extends AMap.Layer
    {
        /**
         * 创建WMTS图层，WMTSOptions为创建图层所需要的属性组对象。
         * @param  {WMTSOptions} opts
         */
        constructor(opts: WMTSOptions);

        /**
         * 设置wmts服务地址。
         * @param  {string} url
         * @returns void
         */
        setUrl(url: string): void;
        
        /**
         * 返回wmts服务地址。
         * @returns string
         */
        getUrl(): string;
        
        /**
         * 设置OGC标准的WMTS getTile接口的参数，包括Version、Layer、Style、Format、Service等。
         * @param  {object} params
         * @returns void
         */
        setParams(params: object): void;
        
        /**
         * 设置OGC标准的WMTS getTile接口的参数。
         * @returns object
         */
        getParams(): object;
    }
}
