/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMapUI
{
    /**
     * UI库版本号。
     * @const
     * @member {string}
     */
    const version: string;
    
    /**
     * 假设某个UI的界面仅需要微调一下（比如互换两个节点的位置），就能满足您的需求，而该UI自身并没有提供这样的修改接口，UI组件库允许您从代码层面直接“覆盖”掉原来的模块实现。
     * @param  {string} moduleName
     * @param  {Array<string>} dependencies
     * @param  {Function} callback
     * @returns void
     */
    function define(moduleName: string, dependencies: Array<string>, callback: Function): void;
    
    /**
     * UI组件内部普遍采用AMapUI.weakDefine来定义依赖的模块，与原始define的区别是： weakDefine不会覆盖已经存在的模块定义（因此比define要弱）。 如果某个模块在加载之前已经被AMapUI.define过，那么该UI执行的过程中就会使用这个前置定义好的模块实现。
     * @param  {string} moduleName
     * @param  {Array<string>} dependencies
     * @param  {Function} callback
     * @returns void
     */
    function weakDefine(moduleName: string, dependencies: Array<string>, callback: Function): void;
    
    /**
     * 加载模块，该接口遵循require的语法。
     * @param  {Array<string>} moduleNames
     * @param  {(...modules:Array<any>)=>void} callback
     * @param  {object} opts?
     * @returns void
     */
    function load(moduleNames: Array<string>, callback: (...modules: Array<any>) => void, opts?: object): void;
     
    /**
     * 加载UI模块(即路径以ui/开头的模块)，可以模块名省略ui/前缀。
     * @param  {Array<string>} componentNames
     * @param  {Function} callback
     * @param  {object} opts?
     * @returns void
     */
    function loadUI(componentNames: Array<string>, callback: (...components: Array<any>) => void, opts?: object): void;
    
    /**
     * 部分 UI 依赖 jQuery 或者 Zepto（参见具体 UI 的使用说明），需要设置 DomLibrary 的引用。
     * 如果使用的 UI 组件中并未涉及 DomLibrary，可以跳过此项，不过，建议开发者统一设置，方便后续使用。
     * @param  {object} $
     * @returns void
     */
    function setDomLibrary($: object): void;

    interface SimpleMarkerOptions extends AMap.MarkerOptions
    {
        /**
         * 样式主题，目前包括 default, fresh, numv1, numv2 4种（可调用 SimpleMarker.getBuiltInIconThemes()获取）。
         * 默认取值 default，每个主题下内置一组特定的iconStyle可供选择。
         * @member {string}
         * @default "default"
         */
        iconTheme?: string;

        /**
         * 背景图标样式, 可以有如下取值：
         * 1. String，内置的样式名，取值可通过SimpleMarker.getBuiltInIconStyles(iconTheme|String)获取，效果见这里；
         * 2. String，html代码，需要以<开头，以>结尾， 比如<div...>，icon的dom节点将使用这段html构造；
         * 3. String，图片的url地址。通常还需要配合设置offset选项（定位点的偏移量，以确定该图片的定位点）；
         * 4. HTMLElement, 某个dom节点的引用，比如：
         * document.createElement("div")、document.getElementById("...")等；
         * 5. Object，img节点的属性值，比如 src,style,width,height等，比如：
         * {
         *     src: "图片地址",
         *     style:
         *     {
         *         width: "20px"
         *     }
         * }
         * @member {string | object}
         */
        iconStyle?: string | object;
        
        /**
         * 图标前景文字，可以有如下取值：
         * 1. String， 普通文本，比如"A"（可以配合containerClassNames调整文字样式，详见下文）
         * 2. Object, 内建的文字容器dom节点(DIV)的属性值，比如 innerHTML,style等， 比如：
         * {
         *     innerHTML: "<div>B</div>",
         *     style:
         *     {
         *         color: "red" //设置文字颜色
         *     }
         * }
         * @member {string | object}
         */
        iconLabel?: string | object;
        
        /**
         * 是否显示定位点，可以有如下取值：
         * 1. boolean， 是否显示，默认false；通常在仅在开发阶段开启，辅助设置图标相对于经纬度位置（定位点）的偏移量（即Marker的offset参数）
         * 2. Object{color:String, radius:number} , 显示特定颜色和半径的定位点，比如:
         * {
         *     color: "red", // 点的颜色
         *     radius: 3     // 点的半径。 因圆形使用了CSS3的border-radius属性，IE8及以下浏览器会呈现正方形
         * }       
         * @member {boolean | object}
         */
        showPositionPoint?: boolean | object;
        
        /**
         * 内建的Dom容器上附带的class，多个class name用空格分开，比如：
         *  new SimpleMarker
         * ({
         *     // 添加自定义的class
         *     containerClassNames: 'my_color',
         *     // ....其他参数....
         * })
         * @member {string}
         */
        containerClassNames?: string;
    }

    /**
     * SimpleMarker（简单标注）继承自AMap.Marker，在已有功能的基础上，额外增加如下的支持：
     * 支持设置背景图标（iconTheme，iconStyle）和前景文字（iconLabel）；背景图标内置若干样式可供挑选（如上方示例），也支持自定义图片地址或者Dom结构。
     * 支持显示定位点，默认用红点标识（查看示例），红点的中心即是经纬度（即position）对应的位置。用于开发阶段，辅助开发者设置Marker图标相对于经纬度的显示偏移量。（即Marker的offset参数）
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/simplemarker
     */
    class SimpleMarker extends AMap.Marker
    {
        /**
         * 初始化 SimpleMarker 类的新实例。
         * @param  {SimpleMarkerOptions} opts?
         */
        constructor(opts?: SimpleMarkerOptions);
        
        /**
         * 设置背景图标样式, iconStyle 取值见构造参数。
         * @param  {string|object} style
         * @returns void
         */
        setIconStyle(style: string | object): void;
        
        /**
         * 设置图标主题以及图标样式。
         * @param  {string} theme
         * @param  {string|object} style
         * @returns void
         */
        setIconThemeAndStyle(theme: string, style: string | object): void;
        
        /**
         * 设置图标前景文字, iconLabel取值见构造参数。
         * @param  {string|object} label
         * @returns void
         */
        setIconLabel(label: string | object): void;
        
        /**
         * 设置 Marker 的 DOM 容器上附带的 Class。
         * @param  {string} containerClassNames
         * @returns void
         */
        setContainerClassNames(containerClassNames: string): void;
        
        /**
         * 显示定位点。
         * @returns void
         */
        showPositionPoint(): void;
        
        /**
         * 隐藏定位点。
         * @returns void
         */
        hidePositionPoint(): void;
    }

    /**
     * SvgMarker（矢量标注）继承自 SimpleMarker ，支持使用Svg构建不同形状，颜色，大小的背景图标(利用SimpleMarker的iconStyle)。
     * 注意：IE9以下浏览器不支持Svg, 此时图标样式会回退回父类，即 SimpleMarker。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/svgmarker
     */
    class SvgMarker extends SimpleMarker
    {
        /**
         * 标识当前浏览器环境是否支持 SVG。
         * @static
         * @property {boolean}
         */
        static supportSvg: boolean;
        
        /**
         * 初始化 SvgMarker 类的新实例。
         * @param  {SvgMarker.Shape.BaseShape} shape 形状实例，具体请参见下方的Shape。
         * @param  {SimpleMarkerOptions} opts? SimpleMarker的构造参数（但不包括iconStyle, offset），比如map, position, iconLabel等。
         */
        constructor(shape: SvgMarker.Shape.BaseShape, opts?: SimpleMarkerOptions);
        
        /**
         * 更新shape实例，并基于该shape重新设定图标内容（即父类SimpleMarker的iconStyle）；shape实例的引用没变，但shape的相关参数（比如width，height等）改变时也需要调用此方法。
         * @param  {SvgMarker.Shape.BaseShape} shape
         * @returns void
         */
        setSvgShape(shape: SvgMarker.Shape.BaseShape): void;
    }

    interface AwesomeMarkerOptions extends SimpleMarkerOptions
    {
        /**
         * icon 的名称。
         * 可用的 icon 参见 Font Awesome 官网。
         * @member {string}
         */
        awesomeIcon?: string;
        
        /**
         * 可选，返回字体节点上的 classNames。
         * 默认的实现如下：
         * function(awesomeIcon)
         * {
         *     return "fa fa-"" + awesomeIcon;
         * }
         * 使用 FontAwesome 以外的图标资源（比如IconFont）时，可设置此方法。
         * @member {Function}
         */
        getClassnamesOfAwesomeIcon?: (icon: string) => string;
    }

    /**
     * AwesomeMarker（字体图标标注）继承自 SimpleMarker ，支持使用 Font Awesome 来标识 SimpleMarker 的前景内容（利用 SimpleMarker 的 iconLabel）。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/overlay/awesomemarker
     */
    class AwesomeMarker extends SimpleMarker
    {
        constructor(opts?: AwesomeMarkerOptions);
        
        /**
         * 设置 awesomeIcon。
         * @param  {string} icon
         * @returns void
         */
        setAwesomeIcon(icon: string): void;
    }

    interface SimpleInfoWindowOptions extends AMap.InfoWindowOptions
    {
        /**
         * 标题内容，HTML代码。
         * @member {string}
         */
        infoTitle?: string;

        /**
         * 主体内容，HTML代码。
         * @member {string}
         */
        infoBody?: string;

        /**
         * 模板数据，配合 infoTitle/infoBody 的模板使用。
         * @member {object}
         */
        infoTplData?: object;
    }

    /**
     * SimpleInfoWindow（简单信息窗体）继承自 AMap.InfoWindow，提供一种简单的“标题+内容”构造的信息窗体; 
     * 内容的构建支持使用模板。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/infowindow/simpleinfowindow
     */
    class SimpleInfoWindow extends AMap.InfoWindow
    {
        constructor(opts?: SimpleInfoWindowOptions);
        
        /**
         * 设置标题内容。
         * @param  {string} infoTitle
         * @returns void
         */
        setInfoTitle(infoTitle: string): void;
        
        /**
         * 设置主体内容。
         * @param  {string} infoBody
         * @returns void
         */
        setInfoBody(infoBody: string): void;
        
        /**
         * 设置模板数据。
         * @param  {object} infoTplData
         * @returns void
         */
        setInfoTplData(infoTplData: object): void;
        
        /**
         * 返回 InfoTitle 对应的 DOM 节点的 jQuery 对象。
         * @returns object
         */
        get$InfoTitle(): object;
        
        /**
         * 返回 InfoBody 对应的 DOM 节点的 jQuery 对象 。
         * @returns object
         */
        get$InfoBody(): object;
        
        /**
         * 返回整个窗体对应的 DOM 节点的 jQuery 对象。
         * @returns object
         */
        get$Container(): object;
    }

    interface PointSimplifierOptions
    {
        /**
         * 地图对象实例，用于显示相关的 Marker。
         * @member {Map}
         */
        map?: AMap.Map;

        /**
         * 绘制用图层的叠加顺序值 。
         * 如果需要叠加在地图的最上层，可以设置一个较大的值，比如 300。
         * @member {number}
         */
        zIndex?: number;

        /**
         * 数据源数组，每个元素即为点相关的信息。
         * @member {Array<any>}
         */
        data?: Array<any>;

        /**
         * 返回数据项中的经纬度信息。
         * @member {Function}
         */
        getPosition?: (item: any, index: number) => AMap.LngLat | [number, number];

        /**
         * 返回鼠标 Hover 时显示的 Title 内容。
         * @member {Function}
         */
        getHoverTitle?: (item: any, index: number) => string;

        /**
         * 数据项的优先级比较函数，用于 Array.sort(compare)；排序后的数组，靠前的优先绘制。
         * @member {Function}
         */
        compareDataItem?: (item1: any, item2: any, index1: number, index2: number) => number;

        /**
         * 是否在绘制后自动调整地图视野以适合全部点，默认true。
         * @member {boolean}
         */
        autoSetFitView?: boolean;
        
        /**
         * 绘制引擎的构造类，可选值有：
         * PointSimplifier.Render.Canvas （默认）
         * PointSimplifier.Render.Canvas.GroupStyleRender （支持样式分组，示例）
         * 如果有特殊需求，也可以参考GroupStyleRender的源码自主实现
         * @member {Function}
         */
        renderConstructor?: Function;

        /**
         * 绘制引擎的构造参数。
         * @member {object}
         */
        renderOptions?: object;

        /**
         * 四叉树叶子节点中包含的点的最大数量，超过该数量则进行宽高等分，一分为四。默认100。
         * 通常来说，值越小，分叉的可能性越大，一方面，这有助于精细的划分高密度区域，另外一面，也增加了四叉树的节点数量（指数增长），从而有损性能。
         * @member {number}
         */
        maxChildrenOfQuadNode?: number;

        /**
         * 四叉树的最大高度。默认16. 超过该高度，即使数量超过 maxChildrenOfQuadNode 的限制，也不再分叉。
         * @member {number}
         */
        maxDepthOfQuadTree?: number;

        /**
         * 点的范围矩形的最坏宽高比（ 取值小于1，大于 1 时会自动取倒数）。
         * 四叉树的根节点是根据点的分布范围构建的，分叉之后的宽高比也与根节点一致，过宽或者过高的矩形可能会影响TopN区域的视觉观感（比如出现 100*1 的矩形）。
         * 默认值为0.6，宽高比小于该阈值时会对范围矩形做一定的扩充，缩小宽和高的差距，使其更加“周正”。
         * @member {number}
         */
        badBoundsAspectRatio?: number;
    }

    /**
     * PointSimplifier 是一个针对海量点展示场景的组件，能够支持较大规模的经纬度数据，以及配置丰富的展示效果。
     * @class
     * @description PointSimplifier 目前依赖 Canvas 进行绘制，因此不支持IE9及以下浏览器。
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier
     */
    class PointSimplifier extends AMap.EventDispatcher
    {
        /**
         * 初始化海量点组件的新实例。
         * @param  {PointSimplifierOptions} opts?
         */
        constructor(opts?: PointSimplifierOptions);
        
        /**
         * 立即重新绘制。
         * @returns void
         */
        render(): void;
        
        /**
         * 延时设定的毫秒(默认10)后绘制；该时间段内重复调用只会触发一次。该函数适合短时间内多次触发绘制的场景。
         * @param  {number} delay?
         * @returns void
         */
        renderLater(delay?: number): void;
        
        /**
         * 设定数据源数组，并触发重新绘制。
         * data为空时将清除显示内容。
         * @param  {Array<any>} data
         * @returns void
         */
        setData(data: Array<any>): void;
        
        /**
         * 显示。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏。
         * @returns void
         */
        hide(): void;
        
        /**
         * 返回是否处于隐藏状态。
         * @returns boolean
         */
        isHidden(): boolean;
        
        /**
         * 返回内部使用的绘制引擎的实例。
         * @returns object
         */
        getRender(): object;
        
        /**
         * 返回内部绘制引擎的参数选项的引用。更改后，调用renderLater()方法重新绘制即可生效。
         * @returns object
         */
        getRenderOptions(): object;
    }

    interface PathSimplifierOptions
    {
        /**
         * 地图对象实例，用于显示相关的 Marker。
         * @member {AMap.Map}
         */
        map?: AMap.Map;

        /**
         * 绘制用图层的叠加顺序值 。如果需要叠加在地图的最上层，可以设置一个较大的值，比如300。
         * @member {number}
         */
        zIndex?: number;

        /**
         * 数据源数组，每个元素即为轨迹相关的信息。
         * @member {Array<any>}
         */
        data?: Array<any>;

        /**
         * 返回轨迹数据中的路径信息。
         * @member {Function}
         */
        getPath?: (pathData : any, pathIndex: number) => Array<AMap.LngLat | [number, number]>;

        /**
         * 返回轨迹数据项的叠加顺序值，即zIndex。zIndex较大的轨迹绘制在上层; 如果zIndex值相同，则pathIndex较大的绘制在上层。
         * @member {Function}
         */
        getZIndex?: (pathData : any, pathIndex: number) => number;

        /**
         * 返回鼠标悬停时显示的 Title 内容。
         * @member {Function}
         */
        getHoverTitle?: (pathData: any, pathIndex: number, pointIndex: number) => string;

        /**
         * 是否在绘制后自动调整地图视野以适合全部轨迹，默认true。
         * @member {boolean}
         * @default true
         */
        autoSetFitView?: boolean;

        /**
         * 点击轨迹节点或者轨迹节点间的连线时，选中该轨迹，默认true。
         * @member {boolean}
         * @default true
         */
        clickToSelectPath?: boolean;

        /**
         * 置顶选中的轨迹线；置顶的含义是，将该轨迹线的zIndex设置为现存最大值+1。默认true。
         * @member {boolean}
         * @default true
         */
        onTopWhenSelected?: boolean;

        /**
         * 绘制引擎的构造类（Function），默认为内置的 Canvas 引擎。
         * @member {Function}
         */
        renderConstructor?: Function;

        /**
         * 绘制引擎的构造参数。
         * @member {object}
         */
        renderOptions?: object;
    }

    /**
     * PathSimplifier是一个轨迹展示组件，相比 AMap.Polyline （折线），PathSimplifier更加针对节点数量巨大、排布密集的路径，比如按秒记录位置的车辆行进轨迹，精细的地理边界等等。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pathsimplifier
     */
    class PathSimplifier extends AMap.EventDispatcher
    {
        /**
         * 初始化轨迹展示组件的新实例。
         * @param  {PathSimplifierOptions} opts?
         */
        constructor(opts?: PathSimplifierOptions);
        
        /**
         * 大地线指地球球面上两点之间的最短曲线，PathSimplifier 提供了一个工具方法来创建该此种类型的轨迹路。
         * @static
         * @param  {AMap.LngLat | [number, number]} start
         * @param  {AMap.LngLat | [number, number]} end
         * @param  {number} interPointsNum
         * @returns Array<AMap.LngLat | [number, number]>
         */
        static getGeodesicPath(start: AMap.LngLat | [number, number], end: AMap.LngLat | [number, number], interPointsNum: number): Array<AMap.LngLat | [number, number]>;
        
        /**
         * 设置 pathIndex 对应的轨迹数据项的 zIndex 值。
         * @param  {number} pathIndex
         * @param  {number} zIndex
         * @returns void
         */
        setZIndexOfPath(pathIndex: number, zIndex: number): void;
        
        /**
         * 返回 pathIndex 对应的轨迹数据项的 zIndex 值。
         * @param  {number} pathIndex
         * @returns number
         */
        getZIndexOfPath(pathIndex: number): number;
        
        /**
         * 是否置顶显示pathIndex对应的轨迹。
         * @param  {number} pathIndex
         * @param  {boolean} isTop
         * @returns void
         */
        toggleTopOfPath(pathIndex: number, isTop: boolean): void;
        
        /**
         * 返回pathIndex对应的轨迹数据项。
         * @param  {number} pathIndex
         * @returns any
         */
        getPathData(pathIndex: number): any;
        
        /**
         * 创建一个轨迹巡航器。
         * @param  {number} pathIndex
         * @param  {PathNavigatorOptions} options?
         * @returns PathNavigator
         */
        createPathNavigator(pathIndex: number, options?: PathNavigatorOptions): PathNavigator;
        
        /**
         * 返回现存的所有轨迹巡航器。（已创建未销毁）
         * @returns Array<PathNavigator>
         */
        getPathNavigators(): Array<PathNavigator>;
        
        /**
         * 销毁现存的所有轨迹巡航器。
         * @returns void
         */
        clearPathNavigators(): void;
        
        /**
         * 返回处于选中状态的轨迹数据项；无选中时，返回null。
         * @returns any
         */
        getSelectedPathData(): any;
        
        /**
         * 返回处于选中状态的的pathIndex；无选中时，返回-1。
         * @returns number
         */
        getSelectedPathIndex(): number;
        
        /**
         * 判断 pathIndex 对应的轨迹是否处于选中状态。
         * @param  {number} pathIndex
         * @returns boolean
         */
        isSelectedPathIndex(pathIndex: number): boolean;
        
        /**
         * 选中（单选）pathIndex对应的轨迹；pathIndex < 0等同于清除选中状态。
         * @param  {number} pathIndex
         * @returns void
         */
        setSelectedPathIndex(pathIndex: number): void;
        
        /**
         * 立即重新绘制。
         * @returns void
         */
        render(): void;
        
        /**
         * 延时设定的毫秒(默认10)后绘制；该时间段内重复调用只会触发一次。该函数适合短时间内多次触发绘制的场景。
         * @param  {number} delay?
         * @returns void
         */
        renderLater(delay?: number): void;
        
        /**
         * 设定数据源数组，并触发重新绘制。
         * data为空时将清除显示内容。
         * @param  {Array<any>} data
         * @returns void
         */
        setData(data: Array<any>): void;
        
        /**
         * 自动调整地图视野，适应pathIndex对应的轨迹线。
         * 如果pathIndex < 0, 则适应全部的轨迹线。
         * @param  {number} pathIndex
         * @returns void
         */
        setFitView(pathIndex: number): void;
        
        /**
         * 隐藏。
         * @returns void
         */
        hide(): void;
        
        /**
         * 显示。
         * @returns void
         */
        show(): void;
        
        /**
         * 返回是否处于隐藏状态。
         * @returns boolean
         */
        isHidden(): boolean;
        
        /**
         * 返回内部使用的绘制引擎的实例。
         * @returns Function
         */
        getRender() : Function;
        
        /**
         * 返回内部绘制引擎的参数选项的引用。更改后，调用renderLater()方法重新绘制即可生效。
         * @returns object
         */
        getRenderOptions(): object;
    }

    interface PathNavigatorOptions
    {
        /**
         * 是否循环回放（到达终点后，返回起点重新开始），默认false。
         * @member {boolean}
         * @default false
         */
        loop?: boolean;

        /**
         * 巡航速度，单位千米/小时。
         * 默认 1000。
         * @member {number}
         * @default 1000
         */
        speed?: number;

        /**
         * 巡航器的样式，属性继承上述绘制引擎部分的  pathNavigatorStyle 参数。
         * @member {object}
         */
        pathNavigatorStyle?: object;

        /**
         * 动画触发的间隔，单位毫秒；默认16。
         * 该值只是建议性质，较大的间隔有助于降低资源消耗，但同时也会降低动画的流畅度，通常情况下保持原值即可。
         * @member {number}
         * @default 16
         */
        animInterval?: number;

        /**
         * 该值会影响巡航器行进中的方向指向。
         * 该值默认200，单位毫秒。
         * @member {number}
         * @default 200
         */
        dirToPosInMillsecs?: number;

        /**
         * 巡航路径的节点索引范围，默认为[0, 路径长度-1]，即整条路径。
         * @member {Array<number>}
         */
        range?: Array<number>;
    }

    /**
     * 轨迹巡航器。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pathsimplifier
     */
    class PathNavigator extends AMap.EventDispatcher
    {
        /**
         * 初始化一个轨迹巡航器的新实例。
         * @param  {PathNavigatorOptions} opts?
         */
        constructor(opts?: PathNavigatorOptions);

        /**
         * 开始路径巡航。 
         * pointIndex用于指定巡航的起始节点索引，默认为节点索引范围（range）的最小值
         * 如果是浮点类型，则整数部分表示起始点索引，小数部分表示起始点和下一节点间的比例位置。比如7.5就表示7~8的中间位置
         * @param  {number} pointIndex?
         * @returns void
         */
        start(pointIndex?: number): void;
        
        /**
         * 暂停巡航。
         * @returns void
         */
        pause(): void;
        
        /**
         * 恢复巡航。
         * @returns void
         */
        resume(): void;
        
        /**
         * 停止巡航，同时清除已经过路径（这一点不同于pause）。
         * @returns void
         */
        stop(): void;
        
        /**
         * 销毁巡航器。
         * 巡航作为动画过程是非常耗费性能的，因此不再需要时应及时销毁。
         * @returns void
         */
        destroy(): void;
        
        /**
         * 返回当前所处的索引位置。返回属性为:
         * {
         *    idx: {number}， 节点索引
         *    tail: {number}，至下一个节点的比例位置
         * }
         * 比如{idx: 1, tail:0.5}就表示当前处于节点1到节点2的中间位置
         * @returns object
         */
        getCursor(): object;
        
        /**
         * 返回巡航状态，有三种：
         * stop：停止状态，start之前或者stop之后处于该状态
         * moving：巡航状态，start或者resume之后处于该状态
         * pause：暂停状态，pause之后处于该状态
         * @returns string
         */
        getNaviStatus(): string;
        
        /**
         * 返回巡航路径的轨迹索引，即 创建（createPathNavigator）时 传入的第一个参数。
         * @returns number
         */
        getPathIndex(): number;
        
        /**
         * 返回当前位置的经纬度。
         * @returns AMap.LngLat | [number, number]
         */
        getPosition(): AMap.LngLat | [number, number];
        
        /**
         * 返回当前设定的速度。
         * @returns number
         */
        getSpeed(): number;
        
        /**
         * 返回巡航经过的距离(起始节点到当前位置)，单位米；
         * stop后会重置为0。
         * @returns number
         */
        getMovedDistance(): number;
        
        /**
         * 返回巡航路径的起始节点索引。
         * @returns number
         */
        getPathStartIdx(): number;
        
        /**
         * 返回巡航路径的结束节点索引。
         * @returns number
         */
        getPathEndIdx(): number;
        
        /**
         * 将巡航器移动指定的距离，单位米。
         * @param  {number} distance
         * @returns void
         */
        moveByDistance(distance: number): void;
        
        /**
         * 将巡航器移动到指定的节点索引位置，tail含义见getCursor。
         * @param  {number} idx
         * @param  {number} tail
         * @returns void
         */
        moveToPoint(idx: number, tail: number): void;
        
        /**
         * 
         * @returns boolean
         */
        isCursorAtPathEnd(): boolean;
        
        /**
         * @returns boolean
         */
        isCursorAtPathStart(): boolean;
        
        /**
         * 设定巡航器的速度，单位千米/小时。
         * @param  {number} speed
         * @returns void
         */
        setSpeed(speed: number): void;
        
        /**
         * 设定巡航器的路径节点索引范围
         * @param  {number} startIndex
         * @param  {number} endIndex
         * @returns void
         */
        setRange(startIndex: number, endIndex: number): void;

    }

    interface DistrictExplorerOptions
    {
        /**
         * 地图对象实例。仅仅获取数据，不涉及地图相关的操作时，可以不设置。
         * @member {AMap.Map}
         */
        map?: AMap.Map;

        /**
         * 是否启用事件支持，默认false。
         * 开启后，可以在map上识别鼠标位置所属的区划。
         * @member {boolean}
         */
        eventSupport?: boolean;
        
        /**
         * 需要预加载的adcode列表。
         * @member {Array<number>}
         */
        preload?: Array<number>;
    }

    /**
     * DistrictExplorer（行政区划浏览）提供了全国范围内到区县一级的行政区划数据（含边界），同时提供一些辅助功能，比如区划面绘制、事件监听，以及快速判断经纬度所属的子级区划等。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-explorer
     */
    class DistrictExplorer extends AMap.EventDispatcher
    {
        constructor(opts?: DistrictExplorerOptions);
        
        /**
         * 加载 adcode 对应的 AreaNode。
         * @param  {number} adcode
         * @param  {Function} callback
         * @returns void
         */
        loadAreaNode(adcode: number, callback: (error: any, areaNode: AreaNode) => void): void;
            
        /**
         * 批量加载 AreaNode。
         * @param  {Array<number>} adcodes
         * @param  {Function} callback
         * @returns void
         */
        loadMultiAreaNodes(adcodes: Array<number>, callback: (error: any, areaNodes: Array<AreaNode>) => void): void;
        
        /**
         * 相当于 loadAreaNode(100000, callback)。
         * @param  {Function} callback
         * @returns void
         */
        loadCountryNode(callback: (error: any, areaNode: AreaNode) => void): void;
        
        /**
         * 用递归方式获取某个经纬度位置所属的各级别区划信息。
         * @param  {AMap.LngLat | [number, number]} position
         * @param  {Function} callback
         * @param  {object} options?
         * @returns void
         */
        locatePosition(position: AMap.LngLat | [number, number], callback: (error: any, features: Array<object>) => void, options?: object): void;
        
        /**
         * 绘制 areaNode 中的父级区划（ParentFeature）。
         * polygonOptions 为所绘多边形的样式，属性包括 strokeColor ，fillColor等。
         * @param  {AreaNode} areaNode
         * @param  {AMap.PolygonOptions} polygonOptions
         * @returns void
         */
        renderParentFeature(areaNode: AreaNode, polygonOptions: AMap.PolygonOptions): void;
        
        /**
         * 绘制areaNode中的子级区划(SubFeature)。
         * 因为子级区划有多个，因此 polygonOptions 允许传递一个函数，对不同的子级返回不同的内容。
         * @param  {AreaNode} areaNode
         * @param  {AMap.PolygonOptions | Function} polygonOptions
         * @param  {number} index
         * @returns void
         */
        renderSubFeatures(areaNode: AreaNode, polygonOptions: AMap.PolygonOptions | ((subFeature: object, index: number) => AMap.PolygonOptions)): void;
        
        /**
         * 绘制指定的feature，并返回内部创建的多边形（AMap.Polygon）数组。
         * @param  {object} feature
         * @param  {AMap.PolygonOptions} polygonOptions
         * @returns Array<AMap.Polygon>
         */
        renderFeature(feature: object, polygonOptions: AMap.PolygonOptions): Array<AMap.Polygon>;
        
        /**
         * 返回内部创建（通过上述的render**方法）的且adcode匹配的全部polygon。
         * @param  {number} adcode
         * @returns Array<AMap.Polygon>
         */
        findFeaturePolygonsByAdcode(adcode: number): Array<AMap.Polygon>;
        
        /**
         * 返回内部创建的全部 Polygon。
         * @returns Array<AMap.Polygon>
         */
        getAllFeaturePolygons(): Array<AMap.Polygon>;
        
        /**
         * 清除内部创建的且由参数数组包含的 Polygon。
         * @param  {Array<AMap.Polygon>} polygons
         * @returns void
         */
        removeFeaturePolygons(polygons: Array<AMap.Polygon>): void;
        
        /**
         * 清除内部创建的全部 Polygon。
         * @returns void
         */
        clearFeaturePolygons(): void;
        
        /**
         * 设置用于位置归属识别的areaNode列表，优先级从高到低。
         * @param  {Array<AreaNode>} areaNodes
         * @returns void
         */
        setAreaNodesForLocating(areaNodes: Array<AreaNode>): void;
        
        /**
         * 手动设置鼠标悬浮的 feature，同时触发 featureMouseover 事件（如果之前存在处于 hover 状态的 feature，则先对其触发 featureMouseout 事件）。
         * @param  {object} feature
         * @param  {object} event?
         * @returns void
         */
        setHoverFeature(feature: object, event?: object): void;
        
        /**
         * 清除adcode对应的AreaNode实例缓存（adcode为空时，将清除全部缓存）。
         * 建议仅在对内存异常敏感的场景下使用。
         * @param  {number} adcode?
         * @returns void
         */
        clearAreaNodeCache(adcode?: number): void;
    }

    /**
     * AreaNode实例不能直接创建，需要由上述的 loadAreaNode 或者 loadMultiAreaNodes 方法获取。 
     * @class
     */
    class AreaNode
    {
        private constructor();
        
        /**
         * 返回父级区划的 adcode。
         * @returns number
         */
        getAdcode(): number;
        
        /**
         * 返回当前区域节点的整体经纬度范围。
         * @returns AMap.Bounds
         */
        getBounds(): AMap.Bounds;
        
        /**
         * 返回查看该区域的最佳级别，仅推荐性质。
         * @returns number
         */
        getIdealZoom(): number;
        
        /**
         * 返回父级区划的 name。
         * @returns string
         */
        getName(): string;
        
        /**
         * 返回父级区划的属性（parentFeature.properties）。
         * @returns object
         */
        getProps(): object;
        
        /**
         * 返回某个经纬度位置所属的子级区划，区域外返回null。该方法性能较高（每秒可达百万次），但不够精确（相对于逆地理编码服务），原因在于它是纯粹的几何判断，从而受限于feature中边界数据的精确程度。
         * @param  {LngLat | [number, number]} position
         * @returns object
         */
        getLocatedSubFeature(position: AMap.LngLat | [number, number]): object;
        
        /**
         * 返回某个经纬度位置所属的子级区划的索引（针对 SubFeatures 数组中），区域外返回 -1。
         * @param  {LngLat | [number, number]} position
         * @returns number
         */
        getLocatedSubFeatureIndex(position: AMap.LngLat | [number, number]) : number;
        
        /**
         * 返回父级区划对应Feature。
         * @returns object
         */
        getParentFeature(): object;
        
        /**
         * 返回该区域中全部的子级区划 Feature 数组。
         * @returns Array<object>
         */
        getSubFeatures(): Array<object>;
        
        /**
         * 返回子级区划中adcode匹配的子级Feature。
         * @param  {number} adcode
         * @returns object
         */
        getSubFeatureByAdcode(adcode: number): object;
        
        /**
         * 返回子级区划中对应索引位置的子级Feature。
         * @param  {number} index
         * @returns object
         */
        getSubFeatureByIndex(index: number): object;
        
        /**
         * 根据所属的子级区划，将传入的位置点进行分组。
         * @param  {Array<any>} points
         * @param  {Function} getPosition
         * @returns Array<object>
         */
        groupByPosition(points: Array<any>, getPosition: (point: any, index: number) => AMap.LngLat | [number, number]): Array<object>;
    }

    interface DistrictClusterOptions
    {
        /**
         * 地图对象实例。
         * @member {AMap.Map}
         */
        map?: AMap.Map;

        /**
         * 绘制用图层的叠加顺序值 。
         * 如果需要叠加在地图的最上层，可以设置一个较大的值，比如300。
         * @member {number}
         */
        zIndex?: number;

        /**
         * 数据源数组，每个元素即为点相关的信息。
         * @member {Array<any>}
         */
        data?: Array<any>;

        /**
         * 返回数据项中的经纬度信息。
         * @member {Function}
         */
        getPosition?: (dataItem: any, dataIndex: number) => AMap.LngLat | [number, number];

        /**
         * 是否在绘制后自动调整地图视野以适合全部点，默认true。
         * @member {boolean}
         * @default true
         */
        autoSetFitView?: boolean;

        /**
         * 顶层区划的adcode列表 （TXT，JSON） 。默认为[100000]，
         * 即全国范围。
         * 假如仅需要展示河北和北京，可以设置为[130000, 110000]。
         * @member {Array<number>}
         * @default 100000
         */
        topAdcodes?: Array<number>;

        /**
         * 需要排除的区划的adcode列表。
         * @member {Array<number>}
         */
        excludedAdcodes?: Array<number>;

        /**
         * 是否开启范围查询，默认false。
         * 开启后将增加一项辅助性的功能支持，即快速查询某个矩形范围内（比如当前地图窗口）的点。
         * @member {boolean}
         * @default false
         */
        boundsQuerySupport?: boolean;

        /**
         * 绘制引擎的构造类，目前仅提供一个默认引擎。
         * 如果有特殊需求，也可以参照现有引擎代码自主实现。
         * @member {Function}
         */
        renderConstructor?: Function;

        /**
         * 绘制引擎的构造参数，请参见下方绘制引擎部分。
         * @member {object}
         */
        renderOptions?: object;
    }

    /**
     * DistrictCluster（行政区划聚合）基于 DistrictExplorer（行政区划浏览） 实现，功能上主要有两个部分：
     * 区划游历：随着地图的缩放、平移，自动加载最优的区划节点（AreaNode），并支持绘制相关的区划面。
     * 区划聚合：计算出包含在各区划范围内的点，并支持通过Marker显示相关信息，比如区划名称，点的总数等。如果需要绘制单独的数据点，可以配合使用海量点组件。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/geo/district-cluster
     */
    class DistrictCluster extends AMap.EventDispatcher
    {
        static ClusterMarkerPositionStrategy:
        {
            CENTER: Function,

            CENTROID: Function,
            
            AVERAGE_POINTS_POSITION: Function
        };

        constructor(opts?: DistrictClusterOptions);
        
        /**
         * 设定数据源数组，并触发重新绘制。
         * @param  {Array<any>} data
         * @returns void
         */
        setData(data: Array<any>): void;
        
        /**
         * 延时设定的毫秒（默认10）后绘制；该时间段内重复调用只会触发一次。
         * 该函数适合短时间内多次触发绘制的场景。
         * @param  {number} delay?
         * @returns void
         */
        renderLater(delay?: number): void;
        
        /**
         * 立即重新绘制。因绘制操作较“重”，推荐优先考虑 renderLater 方法。
         * @returns void
         */
        render(): void;
        
        /**
         * 显示。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏。
         * @returns void
         */
        hide(): void;
        
        /**
         * 返回是否处于隐藏状态。
         * @returns boolean
         */
        isHidden(): boolean;
        
        /**
         * 返回当前地图窗口范围内的数据点信息（boundsQuerySupport开启后有效）。
         * @returns Array<object>
         */
        getDataItemsInView(): Array<object>;
        
        /**
         * 返回指定范围内的数据点信息（boundsQuerySupport开启后有效）。
         * @param  {AMap.Bounds} bounds
         * @returns Array
         */
        getDataItemsByBounds(bounds: AMap.Bounds): Array<object>;
        
        /**
         * 缩放地图至某一级别，此时adcode对应的区划刚好展开显示自身的子级；同时移动地图中心到center（默认为区划行政中心）所指位置。
         * 比如adcode传入110000（北京），调用后地图将展示北京下辖的区县。
         * 默认情况下，点击聚合信息标注会执行该操作。
         * @param  {number} adcode
         * @param  {AMap.LngLat | [number, number]} center?
         * @returns void
         */
        zoomToShowSubFeatures(adcode: number, center?: AMap.LngLat | [number, number]): void;
        
        /**
         * 返回一个最小的zoom级别，该级别下adcode对应的区划将切换到子级展示 。
         * 子级显示的控制可参数见下述 minHeightToShowSubFeatures 部分。
         * @param  {number} adcode
         * @returns number
         */
        getMinZoomToShowSub(adcode: number): number;
        
        /**
         * 返回adcode（不支持区县一级）对应的区划节点的属性。
         * @param  {number} adcodes
         * @returns object
         */
        getAreaNodeProps(adcodes: number): object;
        
        /**
         * 异步获取adcode对应的区划节点的聚合结果信息。
         * @param  {number} adcode
         * @param  {Function} callback
         * @returns void
         */
        getClusterRecord(adcode: number, callback: (error: any, record: object) => void): void;
    }

    interface MarkerListOptions
    {
        /**
         * 地图对象实例，用于显示相关的Marker。
         * @member {AMap.Map}
         */
        map?: AMap.Map;

        /**
         * 列表容器的 DOM 节点或者 Id。
         * @member {string | HTMLElement}
         */
        listContainer?: string | HTMLElement;

        /**
         * 返回数据项中的经纬度信息。
         * @member {Function}
         */
        getPosition?: (dataItem: any) => AMap.LngLat | [number, number];

        /**
         * 返回数据项Id，Id具备唯一性；实在没有的话，可以用数据项索引（dataIndex）代替。
         * @member {Function}
         */
        getDataId?: (dataItem: any, dataIndex: number) => string;

        /**
         * 根据数据项，返回一个Marker或者其子类（比如SimpleMarker）的实例（不需要设置map和position）。
         * @member {Function}
         */
        getMarker?: (dataItem: any, context: object, recycledMarker?: AMap.Marker) => AMap.Marker;

        /**
         * 根据数据项，返回一个InfoWindow或者其子类（比如SimpleInfoWindow）的实例( 不需要设置map和position ) 。
         * @member {Function}
         */
        getInfoWindow?: (dataItem: any, context: object, recycledInfoWindow?: AMap.InfoWindow) => AMap.InfoWindow;

        /**
         * 根据数据项，返回一个 DOM 节点，或者该节点的html（outerHTML）构造。
         * @member {Function}
         */
        getListElement?: (dataItem: any, context: object, recycledListElement?: HTMLElement) => string | HTMLElement;

        /**
         * 列表节点上需要被监听的全部事件名称（列表的Dom节点触发的事件），默认的取值是：["click"]。
         * 如需要增加监听mouseover事件，需要设置为["click", "mouseover"]。
         * @member {Array<string>}
         */
        listElementEvents?: Array<string>;

        /**
         * Marker上需要被监听的全部事件（由Marker触发的事件）名称 ，默认的取值是：["click"] 。
         * 如需要增加监听mouseover事件，需要设置为["click", "mouseover"]。
         * @member {Array<string>}
         */
        markerEvents?: Array<string>;
        
        /**
         * InfoWindow上需要被监听的事件列表（InfoWindow的DOM容器触发的事件），默认的取值是：["click"] 。
         * 如需要增加监听dblclick事件，需要设置为["click", "dblclick"]。
         * @member {Array<string>}
         */
        infoWindowEvents?: Array<string>;

        /**
         * 是否在绘制后自动调整地图视野以适合全部Marker，默认true。
         * @member {boolean}
         */
        autoSetFitView?: boolean;

        /**
         * 选中状态时，列表节点和Marker的Dom容器上附带的class，多个class name可以用空格分开，默认取值："selected"。
         * 可以借此编写css控制选中状态的UI效果。
         * @member {string}
         */
        selectedClassNames?: string;

        /**
         * 默认触发相关记录被“选中”（单选）的事件名称（MarkerList自身触发的事件），默认的取值是：
         * ["markerClick", "listElementClick"]，也就是关联的Marker和ListElement被点击时。
         * @member {Array<string>}
         */
        makeSelectedEvents ?: Array<string>;

        /**
         * 定义选中后需要执行的默认行为，包括：
         * 1.置顶显示关联的Marker(marker.setTop)
         * 2.地图中心移动到Marker对应的位置
         * 3.在Marker上展开InfoWindow
         * 如果要修改这些行为，请将该值置 null，并监听 selectedChanged 事件手动进行选中处理
         * @member {Function}
         */
        onSelected?: Function;
    }

    /**
     * MarkerList，即点标注（Marker）+ 列表（List），是一类非常典型的地图应用，通常包括如下的需求片段：
     * 存在一组包含经纬度信息的数据，比如连锁店面的信息，地点的搜索结果等等，每一条数据可称为“数据项”。
     * 要在地图上用Marker标识出各个数据项的位置；Marker上支持打开一个信息窗体（infoWindow）来展示数据项的相关信息。
     * 要构建一个列表（如上方示例的右侧部分），每个列表节点（ListElement）展示数据项的相关信息，比如名称，地址，介绍等等
     * 要支持互动，比如选中，点击Marker，点击列表节点，鼠标Hover列表节点等等；还要支持联动，比如点击列表节点时，要把关联的Marker移动到地图中心等等。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/other/markerlist
     */
    class MarkerList extends AMap.EventDispatcher
    {
        static utils:
        {
            $: any,

            template: (tpl: string, opts: object) => string
        };
        
        /**
         * 初始化一个标注列表新实例。
         * @param  {MarkerListOptions} opts?
         */
        constructor(opts?: MarkerListOptions);
        
        /**
         * 传入数据源 data，绘制图面；
         * 图面绘制后，可以通过 getAllRecords 获取所有的记录，包括 Marker，列表节点等。
         * @param  {Array<any>} data
         * @returns void
         */
        render(data: Array<any>): void;
        
        /**
         * 返回数据源数组（注意，这个数组不是上述render中传入的data，而是一个浅层的拷贝，即每个元素的引用没变，但数组本身是个新数组）。
         * @returns Array<any>
         */
        getData(): Array<any>;
        
        /**
         * 返回所有记录，每条记录中包括数据项，数据项Id，数据项索引及其关联的Marker、ListElement。通常要等到render之后才能调用。
         * @returns Array<object>
         */
        getAllRecords(): Array<object>;
        
        /**
         * 返回有数据对应的所有的列表节点。
         * @returns Array<HTMLElement>
         */
        getAllListElements(): Array<HTMLElement>;
        
        /**
         * 返回有数据对应的所有的 Marker。
         * @returns Array<AMap.Marker>
         */
        getAllMarkers(): Array<AMap.Marker>;
        
        /**
         * 返回 InfoWindow 
         * 因为 InfoWindow 每次只能显示一个，所以与Marker不同，所有的数据项共用唯一的一个InfoWindow。
         * @returns AMap.InfoWindow
         */
        getInfoWindow(): AMap.InfoWindow;
        
        /**
         * 遍历所有记录，返回其中 record.id == id 的记录。 
         * @param  {string} id
         * @returns object
         */
        getRecordByDataId(id: string): object;
        
        /**
         * 遍历所有记录，返回其中 record.index == index 的记录。
         * @param  {number} index
         * @returns object
         */
        getRecordByDataIndex(index: number): object;
        
        /**
         * 遍历所有记录，返回其中 record.data == dateItem 的记录。
         * @param  {any} dataItem
         * @returns object
         */
        getRecordByDataItem(dataItem: any): object;
        
        /**
         * 遍历所有记录，返回其中 record.marker == marker 的记录。
         * @param  {AMap.Marker} marker
         * @returns object
         */
        getRecordByMarker(marker: AMap.Marker): object;
        
        /**
         * 遍历所有记录，返回其中 record.listElement == listElement 的记录。
         * @param  {HTMLElement} listElement
         * @returns object
         */
        getRecordByListElement(listElement: HTMLElement): object;
        
        /**
         * 返回InfoWindow关联的数据项Id。
         * @param  {AMap.InfoWindow} infoWindow
         * @returns string
         */
        getDataIdOfInfoWindow(infoWindow: AMap.InfoWindow): string;
        
        /**
         * 返回列表节点关联的数据项Id。
         * @param  {HTMLElement} listElement
         * @returns string
         */
        getDataIdOfListElement(listElement: HTMLElement) : string;
        
        /**
         * 返回Marker管理的数据项Id。
         * @param  {AMap.Marker} marker
         * @returns string
         */
        getDataIdOfMarker(marker: AMap.Marker) : string;
        
        /**
         * 返回当前选中的数据项Id。
         * @returns string
         */
        getSelectedDataId(): string;
        
        /**
         * 返回当前处于选中状态的记录。
         * @returns object
         */
        getSelectedRecord(): object;
        
        /**
         * 判断传入的数据项Id是否是当前选中的Id。
         * @param  {string} id
         * @returns boolean
         */
        isSelectedDataId(id: string): boolean;
        
        /**
         * 清除选中。
         * @returns void
         */
        clearSelected(): void;
        
        /**
         * 遍历所有记录，选中其中 record.id == id 的记录。
         * @param  {string} id
         * @returns object
         */
        selectByDataId(id: string): object;
        
        /**
         * 遍历所有记录，选中其中 record.index == index 的记录。
         * @param  {number} index
         * @returns object
         */
        selectByDataIndex(index: number): object;
        
        /**
         * 遍历所有记录，选中其中 record.data == dataItem 的记录 。
         * @param  {any} dataItem
         * @returns object
         */
        selectByDataItem(dataItem: any): object;
        
        /**
         * 遍历所有记录，选中其中 记录总数-1-record.index ==  reverseIndex （即倒叙索引）的记录 。
         * @param  {number} reverseIndex
         * @returns object
         */
        selectByDataReverseIndex(reverseIndex: number): object;
            
        /**
         * 选中传入的记录。 
         * sourceEvent为触发该选中的来源事件，比如 markerClick的事件处理函数中获得的event参数；
         * sourceEvent会影响selectedChanged 事件抛出的 sourceEventInfo 信息（详见下方事件部分）。
         * @param  {object} record
         * @param  {object} sourceEvent?
         * @returns object
         */
        selectByRecord(record: object, sourceEvent?: object): object;
        
        /**
         * 根据record的相关信息(包括位置，内容等)展开InfoWindow。
         * @param  {object} record
         * @returns void
         */
        openInfoWindowOnRecord(record: object): void;
        
        /**
         * 关闭InfoWindow 。
         * @returns void
         */
        closeInfoWindow(): void;
        
        /**
         * 清空数据以及关联的UI对象，包括Marker和列表节点。
         * @returns void
         */
        clearData(): void;
        
        /**
         * 清空回收站，回收站包括未被使用的Marker和列表节点。
         * @returns void
         */
        clearRecycle(): void;
        
        /**
         * 触发 eventName 事件。
         * @param  {string} eventName
         * @param  {Array<any>} args?
         * @returns void
         */
        trigger(eventName: string, args?: Array<any>) : void;
        
        /**
         * 触发 eventName 事件，并利用 originalEvent 构造监听函数的 event 参数。
         * @param  {string} eventName
         * @param  {object} originalEvent
         * @param  {Array<any>} args?
         * @returns void
         */
        triggerWithOriginalEvent(eventName: string, originalEvent: object, args?: Array<any>): void;
    }

    interface MobiCityPickerOptions
    {
        /**
         * 头部显示的城市列表数组。
         * @member {Array<object>}
         */
        topGroups?: Array<object>;

        /**
         * 主题样式，内置 light(默认) 和 dark 两种。
         * @member {string}
         */
        theme?: string;
    }

    /**
     * MobiCityPicker是一个手机端的城市选择器，默认情况下，会从左侧滑入打开城市列表，用户点击选中某个城市后，回调返回相应的城市信息。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/other/mobicitypicker
     */
    class MobiCityPicker extends AMap.EventDispatcher
    {
        /**
         * 初始化一个城市选择器新实例。
         * @param  {MobiCityPickerOptions} opts?
         */
        constructor(opts?: MobiCityPickerOptions);
        
        /**
         * 显示城市列表。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏城市列表。
         * @returns void
         */
        hide(): void;
    }

    interface PoiPickerOptions
    {
        /**
         * 必填，输入框 DOM 对象或者 Id。
         * @member {string}
         */
        input?: string

        /**
         * 可以为城市名（中文或中文全拼）、citycode、adcode, 默认'auto', 即自动设定为用户ip所在城市（这个过程是异步的，参见方法中的onCityReady）
         * @member {string}
         */
        city?: string;

        /**
         * 搜索结果的容器对象或者容器ID。
         * @member {string | HTMLElement}
         */
        searchResultsContainer?: string | HTMLElement;

        /**
         * 输入提示的容器对象或者容器ID。
         * @member {string | HTMLElement}
         */
        suggestContainer?: string | HTMLElement;

        /**
         * 输入提示服务的构造参数。
         * @member {object}
         */
        autocompleteOptions?: object;

        /**
         * 地点搜索服务的构造参数。
         * @member {object}
         */
        placeSearchOptions?: object;
    }

    /**
     * PoiPicker（POI选点）在给定的输入框上集成输入提示和关键字搜索功能，方便用户选取特定地点（即POI）。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/other/poipicker
     */
    class PoiPicker extends AMap.EventDispatcher
    {
        /**
         * 初始化一个 POI 选点组件的新实例。
         * @param  {PoiPickerOptions} opts?
         */
        constructor(opts?: PoiPickerOptions);
        
        /**
         * 显示 keyword 的搜索结果。
         * @param  {string} keyword
         * @returns void
         */
        searchByKeyword(keyword: string): void;
        
        /**
         * 清除搜索结果列表。
         * @returns void
         */
        clearSearchResults(): void;
        
        /**
         * 显示 keyword 的输入提示。
         * @param  {string} keyword
         * @returns void
         */
        suggest(keyword: string): void;
        
        /**
         * 清除输入提示列表。
         * @returns void
         */
        clearSuggest(): void;
        
        /**
         * city信息就绪后触发传入的回调函数；通常用于构造参数包含city:'auto'（根据用户ip判断当前城市）时，此时需要异步获取城市。
         * @param  {Function} callback
         * @returns void
         */
        onCityReady(callback: Function): void;
    }

    interface PositionPickerOptions
    {
        /**
         * 指定地图对象。
         * @member {AMap.Map}
         */
        map?: AMap.Map;

        /**
         * 指定拖拽模式，默认 dragMap,可选 dragMap、dragMarker。
         * @member {string}
         */
        mode?: string;

        /**
         * 用于自定义点的显示样式。
         * @member {object}
         */
        iconStyle?:
        {
            /**
             * 指定自定义点样式的图片地址。
             * @member {string}
             */
            url?: string,

            /**
             * 指定自定义点的大小，图片将配缩放成此大小。
             * @member {[number, number]}
             */
            size?: [number, number],

            /**
             * 指定锚点的位置，即被缩放之后，图片的什么位置作为选中的位置。
             * @member {[number, number]}
             */
            ancher?: [number, number]
        };
    }

    /**
     * PositionPicker（拖拽选址），用于在地图上选取位置，并获取所选位置的地址信息，以及周边POI、周边道路、周边路口等信息。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/other/positionpicker
     */
    class PositionPicker extends AMap.EventDispatcher
    {
        /**
         * 初始化拖拽选址组件的新实例。
         * @param  {PositionPickerOptions} opts?
         */
        constructor(opts?: PositionPickerOptions);
        
        /**
         * 以originPos为初始位置开始拖拽选址，参数缺省值为地图中心点。
         * @param  {AMap.LngLat|[number, number]} originPos?
         * @returns void
         */
        start(originPos?: AMap.LngLat | [number, number]): void;
        
        /**
         * 停止拖拽选址。
         * @returns void
         */
        stop(): void;
    }

    interface PositionPickerResult
    {
        /**
         * 选中的位置。
         * @member {AMap.LngLat | [number, number]}
         */
        position?: AMap.LngLat | [number, number];

        /**
         * 选中的位置的地址信息。
         * @member {string}
         */
        address?: string;

        /**
         * 据选中位置最近的十字路口的信息，更详细的信息见 regeocode.crosses。
         * @member {string}
         */
        nearestJunction?: string;

        /**
         * 据选中位置最近的道路，更详细的信息见regeocode.roads。
         * @member {string}
         */
        nearestRoad?: string;

        /**
         * 据选中位置最近的POI信息，更详细的信息见regeocode.pois。
         * @member {string}
         */
        nearestPOI?: string;

        /**
         * 逆地理编码信息，详见 AMap.Geocoder。
         * @member {AMap.ReGeocodeResult}
         */
        regeocode?: AMap.ReGeocodeResult;
    }
}

declare namespace AMapUI.SvgMarker.Shape
{
    interface ShapeOptions
    {
        /**
         * 尺寸，如果宽高相等的情况下设置。
         * @member {number}
         */
        size?: number;

        /**
         * 宽度。
         * @member {number}
         */
        width?: number;

        /**
         * 高度。
         * @member {number}
         */
        height?: number;

        /**
         * 描边宽度。
         * @member {number}
         */
        strokeWidth?: number;

        /**
         * 描边颜色。
         * @member {string}
         */
        strokeColor?: string;

        /**
         * 填充颜色。
         * @member {string}
         */
        fillColor?: string;

        /**
         * 相对于定位点的偏移量，因图标内容的差异，offset 需要开发者自主确定。
         * @member {[number, number]}
         */
        offset?: [number, number];
    }

    abstract class BaseShape
    {
        constructor(opts?: ShapeOptions);

        /**
         * 获取当前图形的配置项。
         * @readonly
         * @property {object}
         */
        readonly opts: object;

        /**
         * 返回 Svg 的内部构造。
         * 参数 opts 包含有构造参数中的内容（也可以使用this.opts），比如 width,height,fillColor 等。
         * @param  {object} opts
         * @returns string
         */
        getInnerHTML(opts: object): string;
        
        /**
         * 返回形状左上角相对于定位点的偏移量。
         * @returns [number, number]
         */
        getOffset(): [number, number];
        
        /**
         * 返回形状的“中心”点位置，默认返回形状宽高所占矩形的中心点。
         * @returns [number, number]
         */
        getCenter(): [number, number];
    }

    interface PathShapeOptions extends ShapeOptions
    {
        /**
         * 原始路径。
         * @member {object}
         */
        sourcePath?: object;
    }

    abstract class PathShape extends BaseShape
    {
        /**
         * 初始化一个路径图形实例。
         * @param  {PathShapeOptions} opts
         */
        constructor(opts?: PathShapeOptions);
    }

    /**
     * 水滴形。
     * @class
     */
    class WaterDrop extends PathShape
    {

    }

    /**
     * 带尖角的方形。
     * @class
     */
    class SquarePin extends PathShape
    {

    }

    /**
     * 盾牌形。
     * @class
     */
    class ShieldPin extends PathShape
    {

    }

    /**
     * 五角星。
     * @class
     */
    class FivePointsStar extends PathShape
    {

    }

    /**
     * 三角旗帜。
     * @class
     */
    class TriangleFlagPin extends PathShape
    {

    }

    /**
     * 矩形旗帜。
     * @class
     */
    class RectangleFlagPin extends PathShape
    {

    }

    interface CircleOptions extends ShapeOptions
    {
        /**
         * 半径。
         * @member {number}
         */
        radius?: number;
    }

    /**
     * 圆形。
     * @class
     */
    class Circle extends BaseShape
    {
        constructor(opts?: CircleOptions);
    }

    interface IconFontOptions extends ShapeOptions
    {
        /**
         * symboljs 地址，类似 "//at.alicdn.com/t/font_1473319176_4914331.js"。
         * @member {string}
         * @see http://www.iconfont.cn/plus/help/detail?helptype=code
         */
        symbolJs?: string;

        /**
         * 图标类名。
         * @member {string}
         */
        icon?: string;
    }

    /**
     * IconFont 矢量图标。
     * @see http://webapi.amap.com/ui/1.0/ui/overlay/SvgMarker/examples/iconfont.html
     */
    class IconFont extends BaseShape
    {
        constructor(opts?: IconFontOptions);
    }
}

declare namespace AMapUI.BasicControl
{
    interface BasicControlOptions
    {
        /**
         * 控件的位置。
         * @member {string | object}
         */
        position?: string | object;

        /**
         * 主题样式。
         * 控件的 DOM 容器上会附加名为： "amap-ui-control-theme-"" + theme 的 class, 可以据此编写css来调整控件的样式。
         * @member {string}
         */
        theme?: string;
    }

    abstract class BasicControl extends AMap.Control
    {
        constructor(opts?: BasicControlOptions);
        
        /**
         * 添加到 Map。
         * @param  {AMap.Map} map
         * @returns void
         */
        addTo(map: AMap.Map): void;
        
        /**
         * 从 Map 上移除。
         * @param  {AMap.Map} map
         * @returns void
         */
        removeFrom(map: AMap.Map): void;
    }

    interface ZoomOptions extends BasicControlOptions
    {
        /**
         * 是否显示当前 zoom 值，默认false。
         * @member {boolean}
         * @default false
         */
        showZoomNum?: boolean;
    }

    /**
     * 缩放控件。
     * @class
     * @see http://webapi.amap.com/ui/1.0/ui/control/BasicControl/examples/zoom.html
     */
    class Zoom extends BasicControl
    {
        /**
         * 初始化缩放控件实例。
         * @param  {ZoomOptions} opts?
         */
        constructor(opts?: ZoomOptions);
        
        /**
         * 放大。
         * @returns void
         */
        zoomIn(): void;
        
        /**
         * 缩小。
         * @returns void
         */
        zoomOut(): void;
        
        /**
         * 显示 zoom 值。
         * @returns void
         */
        showZoomNum(): void;
        
        /**
         * 隐藏 zoom 值。
         * @returns void
         */
        hideZoomNum(): void;
    }

    interface LayerSwitcherOptions extends BasicControlOptions
    {
        /**
         * 底图图层列表，每次只启用一个。
         * 底图图层的显示内容覆盖全部图面，常用的底图图层包括： AMap.TileLayer，AMap.TileLayer.Satellite 等。
         * @member {Array<object>}
         */
        baseLayers?: Array<object>;

        /**
         * 覆盖物图层列表，可同时启用多个, 结构与 baseLayers 相同。
         * 覆盖物图层的显示内容仅覆盖部分图面，叠加于底图图层之上显示，常用的覆盖物图层包括：AMap.TileLayer.RoadNet，AMap.TileLayer.Traffic，AMap.ImageLayer 等。
         * @member {Array<object>}
         */
        overlayLayers?: Array<object>;
    }

    /**
     * 图层切换控件。
     * @class
     * @see http://webapi.amap.com/ui/1.0/ui/control/BasicControl/examples/layer-switcher.html
     */
    class LayerSwitcher extends BasicControl
    {
        /**
         * 初始化图层切换控件实例。
         * @param  {LayerSwitcherOptions} opts?
         */
        constructor(opts?: LayerSwitcherOptions);
        
        /**
         * 在 baseLayers 和 overlayLayers 中查找对应 id 的图层信息并返回。
         * @param  {string} id
         * @returns object
         */
        getLayerInfoById(id: string): object;
        
        /**
         * 显示图层列表面板。
         * @returns void
         */
        showLayersPanel(): void;
        
        /**
         * 隐藏图层列表面板。
         * @returns void
         */
        hideLayersPanel(): void;
    }

    interface TrafficOptions extends BasicControlOptions
    {
        /**
         * 是否开启交通图，默认 true。
         * @member {boolean}
         * @default true
         */
        open?: boolean;

        /**
         * 是否自动刷新交通信息，默认 true。
         * @member {boolean}
         * @default true
         */
        autoRefresh?: boolean;

        /**
         * 刷新间隔，单位：秒，默认：30。
         * @member {number}
         * @default 30
         */
        interval?: number;

        /**
         * 是否显示切换按钮，默认 true。
         * @member {boolean}
         * @default true
         */
        showButton?: boolean;
    }

    /**
     * 交通图控件。
     * @class
     * @see http://webapi.amap.com/ui/1.0/ui/control/BasicControl/examples/traffic.html
     */
    class Traffic extends BasicControl
    {
        /**
         * 初始化交通图控件实例。
         * @param  {TrafficOptions} opts?
         */
        constructor(opts?: TrafficOptions);
        
        /**
         * 显示切换按钮。
         * @returns void
         */
        showButton(): void;
        
        /**
         * 隐藏切换按钮。
         * @returns void
         */
        hideButton(): void;
    }
}

declare namespace AMapUI.PointSimplifier.Render
{
    interface CanvasOptions
    {
        /**
         * 是否支持事件（click，mouseover，mouseout），默认为True。
         * 事件监听本身对性能有一定的损耗，如果不需要，可以关闭。
         * @member {boolean}
         * @default true
         */
        eventSupport?: boolean;

        /**
         * 是否绘制四叉树，通常在开发调试阶段开启，默认关闭。
         * 开启后可以通过 quadTreeStyle 来调整样式。
         * @member {boolean}
         * @default false
         */
        drawQuadTree?: boolean;

        /**
         * 是否绘制位置点，通常在开发调试阶段开启，辅助设定点的绘制区域的偏移（比如圆形的定位点在中心，而水滴形状的定位点在底部中心位置），默认关闭。
         * 开启后可以通过 pointPositionStyle 来调整样式。
         * @member {boolean}
         * @default false
         */
        drawPositionPoint?: boolean;

        /**
         * 是否绘制 Shadow Point ，默认关闭。 
         * 开启后可以通过 shadowPointStyle 来调整样式。
         * 该功能有助于直观的分辨哪些点的空间被挤占了。但是，绘制的点的数量将大幅增加（相当于规避了占位检测的过滤功能），建议谨慎开启。
         * @member {boolean}
         * @default false
         */
        drawShadowPoint?: boolean;

        /**
         * 点的样式。
         * @member {object}
         */
        pointStyle?: object;

        /**
         * 点的"硬核空间"的样式，取值参见 pointStyle。
         * 默认 fillStyle、strokeStyle 以及content属性为空，即不显示。
         * @member {object}
         */
        pointHardcoreStyle?: object;

        /**
         * 定位点的样式， drawPositionPoint 开启时有效，取值参见pointStyle。
         * @member {object}
         */
        pointPositionStyle?: object;

        /**
         * 鼠标 Hover 时绘制的覆盖点的样式，取值参见 pointStyle 。默认为黄色描边的圆圈，见下图。
         * @member {object}
         */
        pointHoverStyle?: object;

        /**
         * Shadow Point（空间被挤占的点）的样式，drawShadowPoint 开启时有效，取值参见pointStyle。
         * @member {object}
         */
        shadowPointStyle?: object;

        /**
         * TopN区域的样式， 取值参见pointStyle。
         * @member {object}
         */
        topNAreaStyle?: object;

        /**
         * 根据密度计算TopN区域的分数，范围为1-10，就近取整。
         * @member {Function}
         */
        getAreaScore?: (minScore: number, maxScore: number, bounds: object, descendantsNum: number, pointSize: object) => number;

        /**
         * 四叉树的样式，drawQuadTree 开启时有效，取值（仅包括属性fillStyle, lineWidth, strokeStyle）参见 pointStyle。 
         * @member {object}
         */
        quadTreeStyle?: object;

        /**
         * 鼠标 Hover 时显示的 Title。
         * @member {object}
         */
        hoverTitleStyle?: object;

        /**
         * 返回一个面积阈值，当四叉树的节点区域小于该阈值时，会进行TopN选取。推荐使用一个视觉上可分辨的较小面积，默认10*10。
         * @member {Function}
         */
        getAreaSizeForTopSelect?: (zoom: number, pointSize: object) => number;

        /**
         * 返回某个区域内按优先级（由 compareDataItem 确定）选取的点的数量。
         * @member {Function}
         */
        getNumForTopSelect?: (zoom: number, bounds: object, descendantsNum: number, pointSize: object) => number;
    }

    /**
     * 基于 Canvas 的绘制引擎。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier
     */
    class Canvas
    {
        constructor(opts?: CanvasOptions);
    }

    namespace Canvas
    {
        interface GroupStyleRenderOptions extends CanvasOptions
        {
            /**
             * 返回某个数据项的分组 Id。
             * @member {Function}
             */
            getGroupId?: (item: any, index: number) => string;

            /**
             * 如果是Object，则取值为：
             * {
             *     id1:样式配置,
             *     id2:样式配置,
             *     ....
             * }
             * 如果是Function，则类型为：
             * @param  {string} 分组Id 
             * @return {object} 返回分组Id对应的样式配置
             * 样式配置的属性取值如下：
             * {
             *     pointStyle:<同上述pointStyle>,
             *     pointHardcoreStyle:<同上述pointStyle>,
             *     pointPositionStyle:<同上述pointPositionStyle>
             * }
             * @member {Object | Function}
             */
            groupStyleOptions?: object | ((groupId: string) => object);
        }

        /**
         * 继承自 PointSimplifier.Render.Canvas，额外增加如下构造参数以支持定义样式分组。
         * @class
         * @see http://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier
         */
        class GroupStyleRender
        {
            constructor(opts?: GroupStyleRenderOptions);
        }
    }
}

declare namespace AMapUI.DistrictCluster.Render
{
    interface DefaultRenderOptions
    {
        /**
         * 是否启用动画，默认true。
         * @member {boolean}
         * @default true
         */
        animEnable?: boolean;

        /**
         * 动画持续时长，单位毫秒，默认300。
         * @member {number}
         * @default 300
         */
        animDuration?: number;

        /**
         * AreaNode缓存的数量，默认-1，即不限制。
         * 极端场景下，假设用户拖动地图一个不漏的查看了全国所有的区县，加载的AreaNode的数量会非常大（360个左右），从而占用较大的内存。
         * 如果您的应用对内存方面较为敏感，可以适当设置一个有限的数值，比如100
         * @member {number}
         * @default -1
         */
        areaNodeCacheLimit?: number;

        /**
         * 聚合标注是否开启事件支持，默认true。
         * @member {boolean}
         * @default true
         */
        clusterMarkerEventSupport?: boolean;

        /**
         * 聚合标注上需要监听的事件类型列表，默认["click"]。
         * @member {Array<string>}
         * @default ["click"]
         */
        clusterMarkerEventNames?: Array<string>;

        /**
         * 点击聚合标注是否触发展示子级区划（即调用 zoomToShowSubFeatures 方法），默认true。
         * @member {boolean}
         * @default true
         */
        clusterMarkerClickToShowSub?: boolean;

        /**
         * 返回聚合信息标注的位置。
         * @member {Function}
         */
        getClusterMarkerPosition?: (feature: object, dataItems: Array<any>) => AMap.LngLat | [number, number];

        /**
         * 返回聚合信息标注。
         * @member {Function}
         */
        getClusterMarker?: (feature: object, dataItems: Array<any>, recycledMarker?: AMap.Marker) => AMap.Marker;

        /**
         * 聚合信息标注在参数不变时（ getClusterMarker 中的feature和dataItems）是否保持一致。默认true。
         * @member {boolean}
         * @default true
         */
        clusterMarkerKeepConsistent ?: boolean;

        /**
         * 保留在回收站中的聚合信息标注的最大数量，默认30。
         * @member {number}
         * @default 30
         */
        clusterMarkerRecycleLimit?: number;

        /**
         * 区划面是否开启事件支持，默认true。
         * @member {boolean}
         * @default true
         */
        featureEventSupport?: boolean;

        /**
         * 点击区划面是否触发进入子级区划，默认false。
         * @member {boolean}
         * @default false
         */
        featureClickToShowSub?: boolean;

        /**
         * 父级区划的最小显示高度，默认630。
         * @member {number}
         * @default 630
         */
        minHeightToShowSubFeatures?: number;

        /**
         * 父级区划的同级兄弟区划的最小平均显示高度，默认600。
         * @member {number}
         * @default 600
         */
        minSiblingAvgHeightToShowSubFeatures?: number;

        /**
         * 子级区划的最小平均显示高度，默认300。
         * @member {number}
         * @default 300
         */
        minSubAvgHeightToShowSubFeatures?: number;

        /**
         * 区划面的基本样式。该参数优先级最低。
         * @member {object}
         */
        featureStyle?: object;

        /**
         * 按区划级别（如下4类）定义的区划面样式，优先级高于 featureStyle。
         * @member {object}
         */
        featureStyleByLevel?: object;

        /**
         * 直接指定某个区划的样式，优先级最高。
         * @member {Function}
         */
        getFeatureStyle?: (feature: object, dataItems: Array<any>) => object;
    }

    /**
     * DistrictCluster 默认绘制引擎。
     * @class
     */
    class DefaultRender
    {
        constructor(opts?: DefaultRenderOptions);
    }
}
