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
     * 鼠标工具插件。通过该插件，可进行鼠标画标记点、线、多边形、矩形、圆、距离量测、面积量测、拉框放大、拉框缩小等功能。
     * @class
     * @description 插件类，插件名："AMap.MouseTool"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MouseTool
     */
    class MouseTool extends EventDispatcher
    {
        /**
         * MouseTool的构造函数，目前仅支持桌面浏览器。
         * @constructor
         * @param  {Map} map
         */
        constructor(map: Map);
        
        /**
         * 开启鼠标画点标注模式。鼠标在地图上单击绘制点标注，标注样式参考MarkerOptions设置。
         * @param  {MarkerOptions} opts
         * @returns void
         */
        marker(opts: MarkerOptions): void;
        
        /**
         * 开启鼠标画折线模式。鼠标在地图上点击绘制折线，鼠标左键双击或右键单击结束绘制，折线样式参考PolylineOptions设置。
         * @param  {PolylineOptions} opts
         * @returns void
         */
        polyline(opts: PolylineOptions): void;
        
        /**
         * 开启鼠标画多边形模式。鼠标在地图上单击开始绘制多边形，鼠标左键双击或右键单击结束当前多边形的绘制，多边形样式参考PolygonOptions设置。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        polygon(opts: PolygonOptions): void;
        
        /**
         * 开启鼠标画矩形模式。鼠标在地图上拉框即可绘制相应的矩形。矩形样式参考PolygonOptions设置。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        rectangle(opts: PolygonOptions): void;
        
        /**
         * 开启鼠标画圆模式。鼠标在地图上拖动绘制相应的圆形。圆形样式参考CircleOptions设置。
         * @param  {CircleOptions} opts
         * @returns void
         */
        circle(opts: CircleOptions): void;
        
        /**
         * 开启距离量测模式。鼠标在地图上单击绘制量测节点，并计算显示两两节点之间的距离，鼠标左键双击或右键单击结束当前量测操作。
         * 量测线样式参考 PolylineOptions 设置。
         * 注：不能同时使用rule方法和RangTool插件进行距离量测
         * @param  {PolylineOptions} opts
         * @returns void
         */
        rule(opts: PolylineOptions): void;
        
        /**
         * 开启面积量测模式。鼠标在地图上单击绘制量测区域，鼠标左键双击或右键单击结束当前量测操作，并显示本次量测结果。
         * 量测面样式参考PolygonOptions设置。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        measureArea(opts: PolygonOptions): void;
        
        /**
         * 开启鼠标拉框放大模式。鼠标可在地图上拉框放大地图。矩形框样式参考PolygonOptions设置。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        rectZoomIn(opts: PolygonOptions): void;
        
        /**
         * 开启鼠标拉框缩小模式。鼠标可在地图上拉框缩小地图。矩形框样式参考PolygonOptions设置。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        rectZoomOut(opts: PolygonOptions): void;
        
        /**
         * 关闭当前鼠标操作。参数flag设为true时，鼠标操作关闭的同时清除地图上绘制的所有覆盖物对象；
         * 设为false时，保留所绘制的覆盖物对象。默认为false
         * @param  {boolean} flag
         * @returns void
         */
        close(flag?: boolean): void;
    }

    /**
     * 圆编辑插件。
     * 用于编辑AMap.Circle对象，功能包括使用鼠标改变圆半径大小、拖拽圆心改变圆的位置。
     * @class
     * @description 插件类，插件名："AMap.CircleEditor"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.CircleEditor
     */
    class CircleEditor extends EventDispatcher
    {
        /**
         * CircleEditor的构造函数，参数Map为指定的地图对象，Circle为需要编辑的圆形对象。
         * 目前仅支持桌面浏览器
         * @constructor
         * @param  {Map} map
         * @param  {Circle} circle
         */
        constructor(map: Map, circle: Circle);
        
        /**
         * 打开编辑功能。
         * @returns void
         */
        open(): void;
        
        /**
         * 关闭编辑功能。
         * @returns void
         */
        close(): void;
    }

    /**
     * 折线、多边形编辑插件，用于编辑AMap.Polyline、AMap.Polygon对象，目前支持通过鼠标调整折线、多边形的形状。
     * @class
     * @description 插件类，插件名："AMap.PolyEditor"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.PolyEditor
     */
    class PolyEditor extends EventDispatcher
    {
        /**
         * PolyEditor的构造函数，参数Map为指定的地图对象，Object为需要编辑的折线或多边形对象。
         * 目前仅支持桌面浏览器
         * @constructor
         * @param  {Map} map
         * @param  {Polyline|Polygon} obj
         */
        constructor(map: Map, obj: Polyline | Polygon);
        
        /**
         * 打开编辑功能。
         * 功能开启后，多边形/折线上显示可编辑点，其中不透明点为实际结点，鼠标左键单击该类节点可进行删除操作；
         * 半透明点为虚拟节点，单击该类节点将为多边形/折线新增结点；
         * 实际结点和虚拟节点均可进行拖动操作，以改变多边形/折线的形状。
         * @returns void
         */
        open(): void;
        
        /**
         * 关闭编辑功能。
         * @returns void
         */
        close(): void;
    }

    interface BezierCurveEditorOptions
    {
        /**
         * 用于自定义编辑控制点的样式，返回字段同MarkerOptions。type有'pathNode','ctrlNode','midNode'。分别指途经点、控制点和中间点。
         * @member {Function}
         */
        getMarkerOptions?: Function;

        /**
         * 用于自定义控制线的样式，返回字段同PolylineOptions。
         * @member {Function}
         */
        getCtrlLineOptions?: Function;
    }

    /**
     * 贝瑟尔曲线的编辑插件，用于编辑AMap.BezierCurve对象，支持途经点控制点的调整和控制点的增加删除。
     * 操作方法：
     * 1）单击途经点或者控制点可删除被点击的途经点或者控制点
     * 2）PC上右键点击途经点或者手机上长按途经点可以在该途经点之前增加控制点  
     * @class
     * @description 插件类，插件名："AMap.BezierCurveEditor"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#bezier-editor
     */
    class BezierCurveEditor extends EventDispatcher
    {
        /**
         * 贝瑟尔曲线编辑器的构造函数，参数Map为指定的地图对象，curve为需要编辑的贝瑟尔曲线对象，ops为构造配置参数
         * 支持桌面浏览器和手机浏览器
         * @constructor
         * @param  {Map} map
         * @param  {BezierCurve} curve
         * @param  {BezierCurveEditorOptions} opts?
         */
        constructor(map: Map, curve: BezierCurve, opts?: BezierCurveEditorOptions);
        
        /**
         * 打开编辑功能。
         * 功能开启后及，曲线上显示途经点和控制点，按照上面的操作方法即可进行曲线的编辑。
         * @returns void
         */
        open(): void;
        
        /**
         * 关闭编辑功能。
         * @returns void
         */
        close(): void;
    }

    /**
     * 椭圆的编辑插件，用于编辑AMap.Ellipse对象，目前支持通过鼠标调整椭圆的圆心和形状。
     * @class
     * @description 插件类，插件名："AMap.EllipseEditor"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.EllipseEditor
     */
    class EllipseEditor extends EventDispatcher
    {
        /**
         * EllipseEditor的构造函数，参数map为指定的地图对象，ellipse是需要编辑的椭圆对象。
         * 目前仅支持桌面浏览器。
         * @param  {Map} map
         * @param  {Ellipse} ellipse
         */
        constructor(map: Map, ellipse: Ellipse);

        /**
         * 打开编辑功能。功能开启后，通关编辑点可调整椭圆的圆心和长短轴半径。
         * @returns void
         */
        open(): void;
        
        /**
         * 关闭编辑功能。
         * @returns void
         */
        close(): void;
    }

    /**
     * 矩形的编辑插件，用于编辑AMap.Rectangle对象，目前支持通过鼠标调整矩形的形状。
     * @class
     * @description 插件类，插件名："AMap.RectangleEditor"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.RectangleEditor
     */
    class RectangleEditor extends EventDispatcher
    {
        /**
         * RectangleEditor的构造函数，参数map为指定的地图对象，Rectangle是需要编辑的矩形对象。
         * 目前仅支持桌面浏览器。
         * @param  {Map} map
         * @param  {Rectangle} rectangle
         */
        constructor(map: Map, rectangle: Rectangle);
        
        /**
         * 打开编辑功能。
         * 功能开启后，通过编辑点可调整矩形的形状。
         * @returns void
         */
        open(): void;
        
        /**
         * 关门编辑功能。
         * @returns void
         */
        close(): void;
    }

    /**
     * 底图热点插件，该插件作用是为底图上POI点增加热点事件。底图热点也支持通过Map的isHotspot属性开启。
     * @class
     * @description 插件类，插件名："AMap.Hotspot"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.Hotspot
     */
    class Hotspot extends EventDispatcher
    {
        /**
         * 构造函数，构造底图热点类对象。
         * @param  {Map} map
         */
        constructor(map: Map);
        
        /**
         * 设置添加该图层的地图对象，参数设置为null时，取消该插件。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
    }

    interface MarkerClustererOptions
    {
        /**
         * 聚合计算时网格的像素大小，默认60。
         * @member {number}
         * @default 60
         */
        gridSize?: number;

        /**
         * 聚合的最小数量。默认值为2，即小于2个点则不能成为一个聚合。
         * @member {number}
         * @default 2
         */
        minClusterSize?: number;

        /**
         * 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为18，即小于18级的级别均进行聚合，18及以上级别不进行聚合。
         * @member {number}
         * @default 18
         */
        maxZoom?: number;

        /**
         * 聚合点的图标位置是否是所有聚合内点的中心点。默认为false，即聚合点的图标位置位于聚合内的第一个点处
         * @member {boolean}
         * @default false
         */
        averageCenter?: boolean;

        /**
         * 指定聚合后的点标记的图标样式，可缺省，缺省时为默认样式；
         * 数据元素分别对应聚合量在1-10,11-100,101-1000…的聚合点的样式；
         * 当用户设置聚合样式少于实际叠加的点数，未设置部分按照系统默认样式显示；
         * 单个图标样式包括以下几个属性：
         * 1. {string}url：图标显示图片的url地址（必选）
         * 2. {AMap.Size}size：图标显示图片的大小（必选）
         * 3. {AMap.Pixel} offset：图标定位在地图上的位置相对于图标左上角的偏移值。默认为(0,0),不偏移（可选）
         * 4. {AMap.Pixel} imageOffset：图片相对于可视区域的偏移值，此功能的作用等同CSS中的background-position属性。默认为(0,0)，不偏移（可选）
         * 5. {String} textColor：文字的颜色，默认为"#000000"（可选）
         * 6. {Number} textSize：文字的大小，默认为10（可选）
         * @member {Array<object>}
         */
        styles?: Array<object>;

        /**
         * 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了renderCluserMarker后styles无效。
         * 该函数的入参为一个Object，包含如下属性：
         * 1. count: 当前聚合点下聚合的Marker的数量
         * 2. markers: 当前聚合点下聚合的所有Marker的数组
         * 3. marker：当前聚合点的显示Marker
         * 在renderCluserMarker里面可以根据count和markers的一些附加属性来修改marker的icon、content等属性实现聚合点的完全自定义
         * @member {Function}
         */
        renderCluserMarker?: Function;

        /**
         * 点击聚合点时，是否散开，默认值为：true。
         * @member {boolean}
         */
        zoomOnClick?: boolean;
    }

    /**
     * 用于地图上加载大量点标记，提高地图的绘制和显示性能。
     * 目前点聚合插件聚合的点的数量在10万以内时可以保持较好的性能。
     * 点聚合支持用户自定义点标记。
     * @class
     * @description 插件类，插件名："AMap.MarkerClusterer"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.MarkerClusterer
     */
    class MarkerClusterer extends EventDispatcher
    {
        /**
         * 构造一个点聚合插件对象。参数map为地图实例，将要进行点聚合的地图对象；markers为需要进行聚合显示的点标记集合。opts属性参考MarkerClustererOptions列表中的说明
         * @param  {Map} map
         * @param  {Array<Marker>} markers
         * @param  {MarkerClustererOptions} opts?
         */
        constructor(map: Map, markers: Array<Marker>, opts?: MarkerClustererOptions);
        
        /**
         * 添加一个需进行聚合的点标记。
         * @param  {Marker} marker
         * @returns void
         */
        addMarker(marker: Marker): void;
        
        /**
         * 删除一个聚合的点标记。
         * @param  {Marker} marker
         * @returns void
         */
        removeMarker(marker: Marker): void;
        
        /**
         * 获取聚合点的总数量。
         * @returns number
         */
        getClustersCount(): number;
        
        /**
         * 获取聚合网格的像素大小。
         * @returns number
         */
        getGridSize(): number;

        /**
         * 获取地图中点标记的最大聚合级别。
         * @returns number
         */
        getMaxZoom(): number;
        
        /**
         * 获取单个聚合的最小数量。
         * @returns number
         */
        getMinClusterSize(): number;
        
        /**
         * 获取聚合的样式风格集合。
         * @returns Array
         */
        getStyles(): Array<object>;
        
        /**
         * 设置聚合网格的像素大小。
         * @param  {number} size
         * @returns void
         */
        setGridSize(size: number): void;
        
        /**
         * 设置地图中点标记的最大聚合级别。
         * @param  {number} zoom
         * @returns void
         */
        setMaxZoom(zoom: number): void;
        
        /**
         * 设置单个聚合的最小数量。
         * @param  {number} size
         * @returns void
         */
        setMinClusterSize(size: number): void;
        
        /**
         * 设置聚合的样式风格。
         * @param  {Array<object>} styles
         * @returns void
         */
        setStyles(styles: Array<object>): void;
        
        /**
         * 从地图上彻底清除所有聚合点标记。
         * @returns void
         */
        clearMarkers(): void;
        
        /**
         * 设置将进行点聚合的地图对象。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
        
        /**
         * 设置将进行点聚合显示的点标记集合。
         * @param  {Array<Marker>} markers
         * @returns void
         */
        setMarkers(markers: Array<Marker>): void;
        
        /**
         * 获取该点聚合的地图对象。
         * @returns Map
         */
        getMap(): Map;
        
        /**
         * 获取该点聚合中的点标记集合。
         * @returns Array
         */
        getMarkers(): Array<Marker>;
        
        /**
         * 添加一组需进行聚合的点标记。
         * @param  {Array<Marker>} markers
         * @returns void
         */
        addMarkers(markers: Array<Marker>): void;
        
        /**
         * 删除一组聚合的点标记。
         * @param  {Array<Marker>} markers
         * @returns void
         */
        removeMarkers(markers: Array<Marker>): void;
        
        /**
         * 获取单个聚合点位置是否是聚合内所有标记的平均中心。
         * @returns boolean
         */
        isAverageCenter(): boolean;
        
        /**
         * 设置单个聚合点位置是否是聚合内所有标记的平均中心。
         * @param  {boolean} averageCenter
         * @returns void
         */
        setAverageCenter(averageCenter: boolean): void;
    }

    interface RangingToolOptions
    {
        /**
         * 设置量测起始点标记属性对象，包括点标记样式、大小等。
         * @member {MarkerOptions}
         */
        startMarkerOptions?: MarkerOptions;

        /**
         * 设置量测中间点标记属性对象，包括点标记样式、大小等。
         * @member {MarkerOptions}
         */
        midMarkerOptions?: MarkerOptions;

        /**
         * 设置量测结束点标记属性对象，包括点标记样式、大小等。
         * @member {MarkerOptions}
         */
        endMarkerOptions?: MarkerOptions;

        /**
         * 设置距离量测线的属性对象，包括线样式、颜色等。
         * @member {PolylineOptions}
         */
        lineOptions?: PolylineOptions;

        /**
         * 设置距离量测过程中临时量测线的属性对象，包括线样式、颜色等。
         * @member {PolylineOptions}
         */
        tmpLineOptions?: PolylineOptions;

        /**
         * 设置量测起始点标签的文字内容，默认为“起点”。
         * @member {string}
         */
        startLabelText?: string;

        /**
         * 设置量测中间点处标签的文字内容，默认为当前量测结果值。
         * @member {string}
         */
        midLabelText?: string;

        /**
         * 设置量测结束点处标签的文字内容，默认为当前量测结果值。
         * @member {string}
         */
        endLabelText?: string;

        /**
         * 设置量测起始点标签的偏移量。默认值：Pixel(-6, 6)。
         * @member {Pixel}
         */
        startLabelOffset?: Pixel;

        /**
         * 设置量测中间点标签的偏移量。默认值：Pixel(-6, 6)。
         * @member {Pixel}
         */
        midLabelOffset?: Pixel;

        /**
         * 设置量测结束点标签的偏移量。默认值：Pixel(-6, 6)。
         * @member {Pixel}
         */
        endLabelOffset?: Pixel;
    }

    /**
     * 距离量测插件，提供更为丰富的样式设置功能。
     * @class
     * @description 插件类，插件名："AMap.RangingTool"
     * @see http://lbs.amap.com/api/javascript-api/reference/plugin#AMap.RangingTool
     */
    class RangingTool extends EventDispatcher
    {
        /**
         * 构造一个距离量测插件对象。参数map为地图实例。opts属性参考RangingToolOptions列表中的说明。
         * @param  {Map} map
         * @param  {RangingToolOptions} opts?
         */
        constructor(map: Map, opts?: RangingToolOptions);
        
        /**
         * 开启距离量测功能。
         * @returns void
         */
        turnOn(): void;
        
        /**
         * 关闭距离量测功能。
         * @returns void
         */
        turnOff(): void;
    }
}
