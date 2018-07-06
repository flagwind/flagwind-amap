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
     * Icon 类配置项。
     * @interface
     */
    interface IconOptions
    {
        /**
         * 图标尺寸，默认值(36,36)。
         * @member {Size}
         */
        size?: Size;

        /**
         * 图标的取图地址。默认为蓝色图钉图片。
         * @member {string}
         */
        image?: string;

        /**
         * 图标取图偏移量。当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围。
         * @member {Pixel}
         */
        imageOffset?: Pixel;

        /**
         * 图标所用图片大小，根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性。可用于实现高清屏的高清效果。
         * @member {Size}
         */
        imageSize?: Size;
    }

    /**
     * 表示点标记的图标。
     * 用于添加复杂点标记，即在普通点标记的基础上，添加Icon类，通过在Icon表示的大图上截取其中一部分作为标注的图标。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#icon
     */
    class Icon
    {
        /**
         * 构造点覆盖物图标，通过IconOptions设置图标属性。
         * @constructor
         * @param  {IconOptions} opts?
         */
        constructor(opts?: IconOptions);

        /**
         * 设置图标图片大小。
         * @param  {Size} size
         * @returns void
         */
        setImageSize(size: Size): void;

        /**
         * 获取图标图片大小。
         * @returns Size
         */
        getImageSize(): Size;
    }

    /**
     * MarkerShape 类配置项。
     * @interface
     */
    interface MarkerShapeOptions
    {
        /**
         * 可点击区域类型，可选值：
         * - circle:圆形
         * - poly:多边形
         * - rect:矩形
         * @member {string}
         */
        type?: string;

        /**
         * 可点击区域组成元素数组，存放图形的像素坐标等信息，该数组元素由type决定：
         * - circle:coords格式为 [x1, y1, r]，x1，y1为圆心像素坐标，r为圆半径
         * - poly: coords格式为 [x1, y1, x2, y2 … xn, yn]，各x，y表示多边形边界像素坐标
         * - rect: coords格式为 [x1, y1, x2, y2]，x1，y1为矩形左上角像素坐标，x2，y2为矩形右下角像素坐标
         * Markshape的像素坐标是指相对于marker的左上角的像素坐标偏移量
         * @member {Array<number>}
         */
        coords?: Array<number>;
    }
    
    /**
     * MarkerShape用于划定Marker的可点击区域范围。自定义区域和Marker重叠的部分，可以触发Marker的点击事件。
     * 需要注意的是，在IE浏览器中图标透明区域默认为不触发事件，因此MarkerShape在IE中不起作用。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#markershape
     */
    class MarkerShape
    {
        /**
         * 构造一个Marker可点击区域对象，通过MarkerShapeOptions设置可点击区域属性。
         * @constructor
         * @param  {MarkerOptions} opts?
         */
        constructor(opts?: MarkerOptions);
    }

    /**
     * 覆盖物基础配置。
     * @interface
     */
    interface OverlayOptions
    {
        /**
         * 要显示该覆盖物的地图对象。
         * @member {Map}
         */
        map?: Map;

        /**
         * 覆盖物的叠加顺序。
         * 地图上存在多个覆盖物叠加时，通过该属性使级别较高的覆盖物在上层显示。
         * @member {number}
         */
        zIndex?: number;

        /**
         * 是否将覆盖物的鼠标或 touch 等事件冒泡到地图上，默认值：false。
         * @description v1.3 新增
         * @member {boolean}
         * @default false
         */
        bubble?: boolean;

        /**
         * 指定鼠标悬停时的鼠标样式，自定义 cursor，IE仅支持 cur/ani/ico 格式，Opera 不支持自定义 cursor。
         * @member {string}
         */
        cursor?: string;

        /**
         * 自定义扩展数据，支持 JavaScript 中任意数据类型，如 Marker 的 id 等。
         * @member {any}
         */
        extData?: any;

        /**
         * 是否显示覆盖物。
         * @member {boolean}
         */
        visible?: boolean;
    }

    /**
     * 覆盖物基类。
     * @abstract
     * @class
     */
    abstract class Overlay extends AMap.EventDispatcher
    {
        /**
         * 为覆盖物指定目标显示地图。
         * 当参数值取 null 时，在地图上移除当前覆盖物。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
        
        /**
         * 获取覆盖物所在地图对象。
         * @returns Map
         */
        getMap(): Map;
        
        /**
         * 显示覆盖物。
         * @returns void
         */
        show(): void;
        
        /**
         * 隐藏覆盖物。
         * @returns void
         */
        hide(): void;

        /**
         * 设置覆盖物的叠加顺序，默认最先添加的覆盖物在最底层。
         * @param  {number} index
         * @returns void
         */
        setzIndex(index: number): void;
        
        /**
         * 获取覆盖物的叠加顺序。
         * @returns number
         */
        getzIndex(): number;
        
        /**
         * 设置鼠标悬停时的光标，参数 cur 可为 CSS 中的光标样式。
         * 如：setCursor("pointer")等；或者自定义的光标样式，
         * 如：setCursor("url('http://webapi.amap.com/images/0.png'), pointer") 
         * 注：当浏览器不支持css2，url值不起作用，鼠标样式就按 pointer 来设置
         * @param  {string} cursor
         * @returns void
         */
        setCursor(cursor: string): void;
        
        /**
         * 获取鼠标悬停时的光标。
         * @returns string
         */
        getCursor(): string;
        
        /**
         * 获取覆盖物的范围。
         * @returns Bounds
         */
        getBounds(): Bounds;
        
        /**
         * 获取当前覆盖物的显示状态。
         * @returns boolean
         */
        getVisible(): boolean;

        /**
         * 设置自定义扩展数据，支持 JavaScript 中任意数据类型，如 Marker 的 id 等。
         * @param  {T} data
         * @returns void
         */
        setExtData<T>(data: T): void;
        
        /**
         * 获取自定义扩展数据。
         * @returns T
         */
        getExtData<T>(): T;
    }

    /**
     * Marker 类配置项。
     * @interface
     */
    interface MarkerOptions extends OverlayOptions
    {
        /**
         * 点标记显示位置偏移量，默认值为Pixel(-10,-34)。
         * Marker指定position后，默认以marker左上角位置为基准点，对准所给定的position位置，若需使marker指定位置对准在position处，需根据marker的尺寸设置一定的偏移量。
         * @member {Pixel}
         */
        offset?: Pixel;
        
        /**
         * 需在点标记中显示的图标。可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效。
         * @member {string | Icon}
         */
        icon?: string | Icon;

        /**
         * 点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
         * @member {string | HTMLElement}
         */
        content?: string | HTMLElement;

        /**
         * 设置拖拽点标记时是否开启点标记离开地图的效果。
         * @member {boolean}
         */
        raiseOnDrag?: boolean;

        /**
         * 点标记的旋转角度，广泛用于改变车辆行驶方向。
         * 注：angle属性是使用CSS3来实现的，支持IE9及以上版本。
         * @member {number}
         */
        angle?: number;

        /**
         * 是否自动旋转。点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。
         * 广泛用于自动调节车辆行驶方向。IE8以下不支持旋转，autoRotation属性无效
         * @member {boolean}
         */
        autoRotation?: boolean;

        /**
         * 点标记的动画效果，默认值：
         * “AMAP_ANIMATION_NONE” 
         * 可选值： 
         * “AMAP_ANIMATION_NONE”，无动画效果 
         * “AMAP_ANIMATION_DROP”，点标掉落效果 
         * “AMAP_ANIMATION_BOUNCE”，点标弹跳效果 
         * @member {string}
         */
        animation?: string;

        /**
         * 点标记阴影，不设置该属性则点标记无阴影。
         * @member {Icon}
         */
        shadow?: Icon;

        /**
         * 设置Marker的可点击区域，在定义的区域内可触发Marker的鼠标点击事件。
         * @member {MarkerShape}
         */
        shape?: MarkerShape;

        /**
         * 添加文本标注，content为文本标注的内容，offset为偏移量，左上角为偏移量为（0,0）。
         * @member {object}
         * @returns 
         */
        label?: { content: string,  offset: Pixel};

        /**
         * 标记在地图上显示的位置，默认为地图中心点。
         * @member {LngLat | [number, number]}
         */
        position?: LngLat | [number, number];

        /**
         * 标记是否可见，默认为true。
         * @member {boolean}
         */
        visible?: boolean;

        /**
         * 标记是否可点击。
         * @member {boolean}
         */
        clickable?: boolean;

        /**
         * 设置标记是否可拖拽移动，默认为false。
         * @member {boolean}
         */
        draggable?: boolean;

        /**
         * 鼠标点击时marker是否置顶，默认false，不置顶。
         * @description v1.3 新增
         * @member {boolean}
         */
        topWhenClick?: boolean;

        /**
         * 鼠标滑过标记时的文字提示，不设置则鼠标滑过标记时无文字提示。
         * @member {string}
         */
        title?: string;

        /**
         * 支持的缩放级别范围。
         * @member {[number, number]}
         */
        zooms?: [number, number];
    }

    /**
     * 点标记。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#marker
     */
    class Marker extends Overlay
    {
        /**
         * 构造一个点标记对象，通过MarkerOptions设置点标记对象的属性。
         * @constructor
         * @param  {MarkerOptions} opts?
         */
        constructor(opts?: MarkerOptions);

        /**
         * 唤起高德地图客户端标注页。
         * 其中 object 里面包含有{ name: string, name属性 必要参数 position: LngLat 坐标点}
         * @param  {object} obj
         * @returns void
         */
        markOnAMAP(obj: object): void;

        /**
         * 设置标记是否支持鼠标单击事件。
         * @param  {boolean} clickable
         * @returns void
         */
        setClickable(clickable: boolean): void;
        
        /**
         * 获取标记是否支持鼠标单击事件。
         * @returns boolean
         */
        getClickable(): boolean;
        
        /**
         * 设置标记位置。
         * @param  {LngLat | [number, number]} lnglat
         * @returns void
         */
        setPosition(lnglat: LngLat | [number, number]): void;
        
        /**
         * 获取标记的位置。
         * @returns LngLat | [number, number]
         */
        getPosition(): LngLat | [number, number];

        /**
         * 设置标记对象是否可拖拽移动。
         * @param  {boolean} draggable
         * @returns void
         */
        setDraggable(draggable: boolean): void;
        
        /**
         * 获取标记对象是否可拖拽移动。
         * @returns boolean
         */
        getDraggable(): boolean;

        /**
         * 设置鼠标滑过标记时的文字提示。
         * @param  {string} title
         * @returns void
         */
        setTitle(title: string): void;
        
        /**
         * 获取获取标记的文字提示。
         * @returns string
         */
        getTitle(): string;

        /**
         * 设置当前 marker 是否置顶。
         * @param  {boolean} isTop
         * @returns void
         */
        setTop(isTop: boolean): void;
        
        /**
         * 获取当前 marker 是否为置顶状态。
         * @returns boolean
         */
        getTop(): boolean;

        /**
         * 获取该maker可显示的级别范围。
         * @returns [number, number]
         */
        getZooms(): [number, number];
        
        /**
         * 设置 Marker 偏移量。
         * @param  {Pixel} offset
         * @description v1.3 新增
         * @returns void
         */
        setOffset(offset: Pixel): void;
        
        /**
         * 获取Marker偏移量。
         * @description v1.3 新增
         * @returns Pixel
         */
        getOffset(): Pixel;
        
        /**
         * 设置点标记的动画效果，默认值：“AMAP_ANIMATION_NONE” 
         * 可选值： 
         * “AMAP_ANIMATION_NONE”，无动画效果 
         * “AMAP_ANIMATION_DROP”，点标掉落效果 
         * “AMAP_ANIMATION_BOUNCE”，点标弹跳效果
         * @param  {string} animate
         * @returns void
         */
        setAnimation(animate: string): void;

        /**
         * 获取点标记的动画效果类型。
         * @returns string
         */
        getAnimation(): string;
        
        /**
         * 设置点标记的旋转角度。
         * @param  {number} angle
         * @returns void
         */
        setAngle(angle: number): void;
        
        /**
         * 获取点标记的旋转角度。
         * @returns number
         */
        getAngle(): number;
        
        /**
         * 设置点标记文本标签内容。
         * @param  {object} label
         * @returns void
         */
        setLabel(label: object): void;
        
        /**
         * 获取点标记文本标签内容。
         * @returns object
         */
        getLabel(): object;
        
        /**
         * 设置点标记的显示图标。
         * 参数image可传入String、Icon两种类型的值。 
         * 若为String（图片url），表示点标记以指定图片形式显示；若为Icon，表示点标记以Icon对象形式显示。
         * @param  {string|Icon} content
         * @returns void
         */
        setIcon(content: string | Icon): void;
        
        /**
         * 当点标记未自定义图标时，获取Icon内容。
         * @returns string
         */
        getIcon(): string | Icon;
        
        /**
         * 设置点标记显示内容，可以是HTML要素字符串或者HTML DOM对象。
         * @param  {string|HTMLElement} content
         * @returns void
         */
        setContent(content: string | HTMLElement): void;
        
        /**
         * 	获取点标记内容。
         * @returns string
         */
        getContent(): string | HTMLElement;
        
        /**
         * 以指定的速度，点标记沿指定的路径移动。
         * @param  {Array<LngLat | [number, number]>} path 路径坐标串。
         * @param  {number} speed 指定速度，单位：千米/小时。
         * @param  {Function} func? 变化曲线函数，缺省为function(k){return k}。
         * @param  {boolean} circlable? 是否循环执行动画，默认为false。
         * @returns void
         */
        moveAlong(path: Array<LngLat | [number, number]>, speed: number, func?: Function, circlable?: boolean): void;
        
        /**
         * 以给定速度移动点标记到指定位置。
         * @param  {LngLat | [number, number]} lnglat 指定位置
         * @param  {number} speed 指定速度，单位：千米/小时。
         * @param  {Function} func? 变化曲线函数，缺省为function(k){return k}。
         * @returns void
         */
        moveTo(lnglat: LngLat | [number, number], speed: number, func?: Function): void;
        
        /**
         * 暂停点标记的动画效果。
         * @returns void
         */
        pauseMove(): void;
        
        /**
         * 重新开始点标记的动画效果。
         * @returns void
         */
        resumeMove(): void;
        
        /**
         * 点标记停止动画。
         * @returns void
         */
        stopMove(): void;
        
        /**
         * 为marker设置阴影效果。
         * @param  {Icon} icon
         * @returns void
         */
        setShadow(icon: Icon): void;
        
        /**
         * 获取marker的阴影图标。
         * @returns Icon
         */
        getShadow(): Icon;
        
        /**
         * 设置marker的可点击区域。
         * @param  {MarkerShape} shape
         * @returns void
         */
        setShape(shape: MarkerShape): void;
        
        /**
         * 获取marker的可点击区域。
         * @returns MarkerShape
         */
        getShape(): MarkerShape;
    }

    /**
     * ElasticMarker 类配置项。
     * @interface
     */
    interface ElasticMarkerOptions extends MarkerOptions
    {
        /**
         * 多个不同样式的数组，每个样式形式。
         * @example
         * 如：
         * {
         *     icon:
         *     {
         *         img: "./a,png",
         *         size: [16,16],                   // 图标的原始大小
         *         ancher: [8,16],                  // 锚点，图标原始大小下锚点所处的位置，相对左上角
         *         imageOffset: [360,340],          // 可缺省，当使用精灵图时可用，标示图标在整个图片中左上角的位置
         *         imageSize: [512,512],            // 可缺省，当使用精灵图时可用，整张图片的大小
         *         fitZoom: 14,                     // 最合适的级别，在此级别下显示为原始大小
         *         scaleFactor: 2,                  // 地图放大一级的缩放比例系数
         *         maxScale: 2,                     // 最大放大比例
         *         minScale: 1                      // 最小放大比例
         *     },
         *     label:
         *     {
         *         content: "标记1",                 // 文本内容
         *         position: "BM",                  // 文本位置相对于图标的基准点，BL、BM、BR、ML、MR、TL、TM、TR分别代表左下角、底部中央、右下角、左侧中央、右侧中央、左上角、顶部中央、右上角。缺省时代表相对图标的锚点位置。
         *         offset: [-35,0],                 // 相对position的偏移量
         *         minZoom: 15                      // label的最小显示级别
         *     }
         * }
         * @member {Array<object>}
         */
        styles?: Array<object>;
        
        /**
         * 表示地图级别与styles中样式对应关系的映射。
         * @example
         * 如：
         * {
         *     14: 0,
         *     15: 0,
         *     16: 1,
         *     17: 1,
         *     18: 1,
         *     19: 1,
         *     20: 1
         * }
         * 表示14到15级使用styles中的第0个样式，16-20级使用第二个样式。
         * @member {object}
         */
        zoomStyleMapping?: object;
    }
    
    /**
     * 灵活点标记，一种可以随着地图级别变化而改变图标和大小的点标记。
     * @class
     * @description 插件类，插件名："ElasticMarker"
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#elasticmarker
     */
    class ElasticMarker extends Marker
    {
        /**
         * 构造一个灵活点标记对象，通过 ElasticMarkerOptions 设置点标记对象的属性。
         * @param  {ElasticMarkerOptions} opts?
         */
        constructor(opts?: ElasticMarkerOptions);
    }

    /**
     * Text 类配置项。
     * @interface
     */
    interface TextOptions extends MarkerOptions
    {
        /**
         * 标记显示的文本内容。
         * @member {string}
         */
        text?: string;

        /**
         * 标记的文本样式。如同 CSS 样式表，如：{"background-color": "red"}
         * @member {object}
         */
        style?: object;

        /**
         * 横向位置，"left", "right", "center" 可选。
         * @member {string}
         */
        textAlign?: "left" | "right" | "center";

        /**
         * 纵向位置，"top"，"middle"，"bottom" 可选。
         * @member {string}
         */
        verticalAlign?: "top" | "middle" | "bottom";
    }

    /**
     * 纯文本标记，继承自Marker，具有Marker的大部分属性、方法和事件。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#text
     */
    class Text extends Marker
    {
        /**
         * 构造一个点标记对象，通过 TextOptions 设置点标记对象的属性。
         * @param  {TextOptions} opts?
         */
        constructor(opts?: TextOptions);
        
        /**
         * 修改文本内容。
         * @param  {string} text
         * @returns string
         */
        setText(text: string): string;

        /**
         * 获取文本内容。
         * @returns string
         */
        getText(): string;
        
        /**
         * 设置文本样式。
         * @param  {object} style 如同 CSS 样式表，如：{"background-color": "red"}
         * @returns void
         */
        setStyle(style: object): void;
        
        /**
         * 设置横向位置。
         * @param  {string} align
         * @returns void
         */
        setTextAlign(align: "left" | "right" | "center"): void;
        
        /**
         * 获取横向位置。
         * @returns string
         */
        getTextAlign(): string;
        
        /**
         * 设置纵向位置。
         * @param  {string} align
         * @returns void
         */
        setVerticalAlign(align: "top" | "middle" | "bottom"): void;
        
        /**
         * 获取纵向位置。
         * @returns string
         */
        getVerticalAlign(): string;
    }

    /**
     * CircleMarker 类配置项。
     * @interface
     */
    interface CircleMarkerOptions extends MarkerOptions
    {
        /**
         * 圆心位置。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

        /**
         * 圆点半径，单位：像素。
         * @member {number}
         */
        radius?: number;

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;

        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 圆形填充颜色,使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        fillColor?: string;

        /**
         * 圆形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        fillOpacity?: number;
    }

    /**
     * 圆点标记，属性和方法于Circle大体一致，区别为 CircleMarker 不随着地图级别变化发生大小改变。
     * @class
     * @description v1.4.3 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#circlemarker
     */
    class CircleMarker extends Marker
    {
        /**
         * 构造圆点标记，通过 CircleMarkerOptions 设置圆点标记的属性。
         * @constructor
         * @param  {CircleMarkerOptions} opts?
         */
        constructor(opts?: CircleMarkerOptions);
        
        /**
         * 设置圆点中心。
         * @param  {LngLat | [number, number]} center
         * @returns void
         */
        setCenter(center: LngLat | [number, number]): void;
        
        /**
         * 获取圆点中心。
         * @returns LngLat | [number, number]
         */
        getCenter(): LngLat | [number, number];
        
        /**
         * 设置圆点的半径。
         * @param  {number} radius
         * @returns void
         */
        setRadius(radius: number): void;
        
        /**
         * 获取圆点的半径。
         * @returns number
         */
        getRadius(): number;
        
        /**
         * 修改圆点标记的属性（样式风格，包括轮廓线、填充色等。属性详情参看 CircleMarkerOptions 列表）
         * @param  {CircleMarkerOptions} opts
         * @returns void
         */
        setOptions(opts: CircleMarkerOptions): void;
        
        /**
         * 获取圆点的属性。
         * @returns CircleMarkerOptions
         */
        getOptions(): CircleMarkerOptions;
    }

    /**
     * Polyline 类配置项。
     * @interface
     */
    interface PolylineOptions extends OverlayOptions
    {
        /**
         * 是否绘制成大地线，默认false。
         * @member {boolean}
         * @default false
         */
        geodesic?: boolean;

        /**
         * 线条是否带描边，默认false。
         * @member {boolean}
         * @default false
         */
        isOutline?: boolean;

        /**
         * 描边的宽度，默认为1。
         * @member {number}
         * @default 1
         */
        borderWeight?: number;

        /**
         * 线条描边颜色，此项仅在isOutline为true时有效，默认：#000000。
         * @member {string}
         * @default #000000
         */
        outlineColor?: string;

        /**
         * 折线的节点坐标数组。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 线条透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 线条宽度，单位：像素。
         * @member {number}
         */
        strokeWeight?: number;

        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
        
        /**
         * 折线拐点的绘制样式，默认值为"miter"尖角，其他可选值："round"圆角、"bevel"斜角。
         * @member {string}
         */
        lineJoin?: string;

        /**
         * 折线两端线帽的绘制样式，默认值为"butt"无头，其他可选值："round"圆头、"square"方头。
         * @member {string}
         */
        lineCap?: string;

        /**
         * 设置折线是否可拖拽移动，默认为false。
         * @member {boolean}
         * @default false
         */
        draggable?: boolean;

        /**
         * 是否延路径显示白色方向箭头,默认false。
         * Canvas绘制时有效，建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头（自V1.4.0版本参数效果变更）
         * @member {boolean}
         */
        showDir?: boolean;
    }

    /**
     * 折线覆盖物。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#polyline
     */
    class Polyline extends Overlay
    {
        /**
         * 构造折线对象，通过 PolylineOptions 指定折线样式。
         * @param  {PolylineOptions} opts?
         */
        constructor(opts?: PolylineOptions);
        
        /**
         * 设置组成该折线的节点数组。
         * @param  {Array<LngLat | [number, number]>} path
         * @returns void
         */
        setPath(path: Array<LngLat | [number, number]>): void;
        
        /**
         * 获取折线路径的节点数组。
         * @returns Array<LngLat | [number, number]>
         */
        getPath(): Array<LngLat | [number, number]>;
        
        /**
         * 修改折线属性（包括路径的节点、线样式、是否绘制大地线等。属性详情参看PolylineOptions列表）
         * @param  {PolylineOptions} opts
         * @returns void
         */
        setOptions(opts: PolylineOptions): void;
        
        /**
         * 获取折线的属性。
         * @returns PolylineOptions
         */
        getOptions(): PolylineOptions;
        
        /**
         * 获取折线的总长度。（单位：米）
         * @returns number
         */
        getLength(): number;
    }

    /**
     * Polygon 类配置项。
     * @interface
     */
    interface PolygonOptions extends OverlayOptions
    {
        /**
         * 多边形轮廓线的节点坐标数组，当为“环”多边形时（多边形区域在多边形内显示为“岛”），path为
         * 二维数组，数组元素为多边形轮廓线的节点坐标数组“环”多边形时，要求数组第一个元素为外多边形，其余为“岛”多边形，
         * 外多边形需包含“岛”多边形，否则程序不作处理。
         * @member {Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>}
         */
        path: Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>;

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;
        
        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 圆形填充颜色,使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        fillColor?: string;

        /**
         * 圆形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        fillOpacity?: number;

        /**
         * 设置多边形否可拖拽移动，默认为false。
         * @member {boolean}
         * @default false
         */
        draggable?: boolean;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
    }

    /**
     * 多边形覆盖物。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#polygon
     */
    class Polygon extends Overlay
    {
        /**
         * 构造多边形对象，通过 PolygonOptions 指定多边形样式。
         * @param  {PolygonOptions} opts?
         */
        constructor(opts?: PolygonOptions);
        
        /**
         * 设置多边形轮廓线节点数组，当为“环”多边形时，path为二维数组，数组元素为多边形轮廓线的节点坐标数组。
         * @param  {Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>} path
         * @returns void
         */
        setPath(path: Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>): void;

        /**
         * 获取多边形轮廓线节点数组。
         * @returns Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>
         */
        getPath(): Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>;
        
        /**
         * 修改多边形属性（样式风格，包括组成多边形轮廓线的节点、轮廓线样式等。属性详情参看PolygonOptions列表）。
         * @param  {PolygonOptions} opts
         * @returns void
         */
        setOptions(opts: PolygonOptions): void;
        
        /**
         * 获取多边形的属性。
         * @returns PolygonOptions
         */
        getOptions(): PolygonOptions;

        /**
         * 获取多边形的面积。（单位：平方米）
         */
        getArea(): number;
        
        /**
         * 判断指定点坐标是否在多边形范围内。
         * @param  {LngLat | [number, number]} point
         * @returns boolean
         */
        contains(point: LngLat | [number, number]): boolean;
    }

    /**
     * BezierCurve 类配置项。
     * @interface
     */
    interface BezierCurveOptions extends OverlayOptions
    {
        /**
         * 贝瑟尔曲线的路径。描述为一个二维数组规则如下：第一个元素是起点，
         * 之后的元素同时描述控制点和途经点，之后每个元素可以有0个到2个控制点
         * 控制点在前，途经点在最后
         * @example
         * [
         *     [lng,lat],                   // 起点0
         *     [lng,lat,lng,lat],           // 控制点、途经点1
         *     [lng,lat,lng,lat,lng,lat],   // 控制点、控制点、途经点2
         *     [lng,lat,lng,lat]            // 控制点、途经点3
         * ]
         * 或者
         * [
         *     [ [lng,lat] ],                           // 起点0
         *     [ [lng,lat] , [lng,lat] ],               // 控制点、途经点1
         *     [ [lng,lat] , [lng,lat] , [lng,lat]],    // 控制点、控制点、途经点2
         *     [ [lng,lat] , [lng,lat] ]                // 控制点、途经点3
         * ]
         * @member {Array<Array<number | Array<number>>>}
         */
        path?: Array<Array<number | Array<number>>>;
        
        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;
        
        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
        
        /**
         * 是否显示白色方向箭头。
         * @member {boolean}
         */
        showDir?: boolean;

        /**
         * 是否描边。
         * @member {boolean}
         */
        isOutline?: boolean;

        /**
         * 描边颜色。
         * @member {string}
         */
        outlineColor?: string;
        
        /**
         * 描边宽度。
         * @member {number}
         */
        borderWeight?: number;
    }

    /**
     * 贝瑟尔曲线类。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#BezierCurve
     */
    class BezierCurve extends Overlay
    {
        /**
         * 用于创建贝瑟尔曲线的构造函数。
         * @constructor
         * @param  {BezierCurveOptions} opts?
         */
        constructor(opts?: BezierCurveOptions);
        
        /**
         * 设置组成该折线的节点数组。
         * @param  {Array<Array<number | Array<number>>>} path
         * @returns void
         */
        setPath(path: Array<Array<number | Array<number>>>): void;
        
        /**
         * 获取组成该折线的节点数组。
         * @returns Array<Array<number | Array<number>>>
         */
        getPath(): Array<Array<number | Array<number>>>;
        
        /**
         * 设置贝瑟尔曲线属性（包括路径的节点、线样式等。属性详情参看 BezierCurveOptions 列表）
         * @param  {BezierCurveOptions} opts
         * @returns void
         */
        setOptions(opts: BezierCurveOptions): void;
        
        /**
         * 获取贝瑟尔曲线属性。
         * @returns BezierCurveOptions
         */
        getOptions(): BezierCurveOptions;
        
        /**
         * 获取贝瑟尔曲线的总长度（单位：米）
         * @returns number
         */
        getLength(): number;
    }

    /**
     * Circle 类配置项。
     * @interface
     */
    interface CircleOptions extends OverlayOptions
    {
        /**
         * 圆心位置。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

        /**
         * 圆半径，单位:米。
         * @member {number}
         */
        radius?: number;

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;
        
        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 圆形填充颜色,使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        fillColor?: string;

        /**
         * 圆形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        fillOpacity?: number;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
    }

    /**
     * 圆形覆盖物。
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#circle
     */
    class Circle extends Overlay
    {
        /**
         * 构造圆形覆盖物，通过 CircleOptions 设置属性。
         * @param  {CircleOptions} opts?
         */
        constructor(opts?: CircleOptions);

        /**
         * 设置圆中心点。
         * @param  {LngLat | [number, number]} center
         * @returns void
         */
        setCenter(center: LngLat | [number, number]): void;
        
        /**
         * 获取圆中心点。
         * @returns LngLat | [number, number]
         */
        getCenter(): LngLat | [number, number];
        
        /**
         * 设置圆形的半径。
         * @param  {number} radius
         * @returns void
         */
        setRadius(radius: number): void;
        
        /**
         * 获取圆形的半径。
         * @returns number
         */
        getRadius(): number;
        
        /**
         * 修改圆属性（样式风格，包括组成圆形轮廓线的节点、轮廓线样式等。属性详情参看CircleOptions列表）
         * @param  {CircleOptions} opts
         * @returns void
         */
        setOptions(opts: CircleOptions): void;
        
        /**
         * 获取圆型的属性。
         * @returns CircleOptions
         */
        getOptions(): CircleOptions;
        
        /**
         * 判断指定点坐标是否在圆内。
         * @param  {LngLat | [number, number]} point
         * @returns boolean
         */
        contains(point: LngLat | [number, number]): boolean;
    }

    /**
     * Ellipse 类配置项。
     * @interface
     */
    interface EllipseOptions extends OverlayOptions
    {
        /**
         * 椭圆的圆心位置。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

        /**
         * 椭圆的半径，用2个元素的数组表示，单位：米
         * 如： radius: [1000, 2000] 表示横向半径是1000，纵向的半径是2000 
         * 默认值：[1000, 1000]
         * @member {[number, number]}
         * @default [1000, 1000]
         */
        radius?: [number, number];

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;
        
        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 椭圆填充颜色,使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        fillColor?: string;

        /**
         * 椭圆填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        fillOpacity?: number;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
    }

    /**
     * 椭圆。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#ellipse
     */
    class Ellipse extends Overlay
    {
        /**
         * 构造椭圆覆盖物，通过 EllipseOptions 设置椭圆。
         * @param  {EllipseOptions} opts?
         */
        constructor(opts?: EllipseOptions);

        /**
         * 设置椭圆中心点。
         * @param  {LngLat | [number, number]} center
         * @returns void
         */
        setCenter(center: LngLat | [number, number]): void;
        
        /**
         * 获取椭圆中心点。
         * @returns LngLat | [number, number]
         */
        getCenter(): LngLat | [number, number];

        /**
         * 设置椭圆的半径。
         * @param  {[number, number]} radius
         * @returns void
         */
        setRadius(radius: [number, number]): void;
        
        /**
         * 获取椭圆的半径。
         * @returns [number, number]
         */
        getRadius(): [number, number];
        
        /**
         * 修改椭圆属性（样式风格，包括组成椭圆轮廓线的节点、轮廓线样式等。属性详情参看EllipseOptions列表）
         * @param  {EllipseOptions} opts
         * @returns void
         */
        setOptions(opts: EllipseOptions): void;
        
        /**
         * 获取椭圆的属性。
         * @returns EllipseOptions
         */
        getOptions(): EllipseOptions;
        
        /**
         * 断指定点坐标是否在椭圆内。
         * @param  {LngLat | [number, number]} point
         * @returns boolean
         */
        contains(point: LngLat | [number, number]): boolean;
    }

    /**
     * Rectangle 类配置项。
     * @interface
     */
    interface RectangleOptions extends OverlayOptions
    {
        /**
         * 矩形的范围。
         * @member {Bounds}
         */
        bounds?: Bounds;

        /**
         * 线条颜色，使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        strokeColor?: string;

        /**
         * 轮廓线透明度，取值范围 0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         */
        strokeOpacity?: number;
        
        /**
         * 轮廓线宽度。
         * @member {number}
         */
        strokeWeight?: number;
        
        /**
         * 线条样式，实线：solid、虚线：dashed。
         * @member {string}
         */
        strokeStyle?: string;

        /**
         * 矩形填充颜色,使用16进制颜色代码赋值。
         * @member {string}
         * @default #006600
         */
        fillColor?: string;

        /**
         * 矩形填充透明度，取值范围0 - 1，0表示完全透明，1表示不透明。
         * @member {number}
         * @default 0.9
         * @returns 
         */
        fillOpacity?: number;

        /**
         * 勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效， 此属性在ie9+浏览器有效 取值： 
         * 实线：[0,0,0] 
         * 虚线：[10,10] ，[10,10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线
         * 点画线：[10,2,10]， [10,2,10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白 （如此反复）组成的虚线
         * @member {Array<number>}
         */
        strokeDasharray?: Array<number>;
    }

    /**
     * 矩形。
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#rectangle
     */
    class Rectangle extends Overlay
    {
        /**
         * 构造矩形覆盖物，通过RectangleOptions设置矩形。
         * @param  {RectangleOptions} opts?
         */
        constructor(opts?: RectangleOptions);

        /**
         * 设置矩形范围。
         * @param  {Bounds} bounds
         * @returns void
         */
        setBoudns(bounds: Bounds): void;

        /**
         * 修改矩形属性（样式风格，包括组成椭圆轮廓线的节点、轮廓线样式等。属性详情参看RectangleOptions列表）
         * @param  {RectangleOptions} opts
         * @returns void
         */
        setOptions(opts: RectangleOptions): void;
        
        /**
         * 获取矩形属性。
         * @returns RectangleOptions
         */
        getOptions(): RectangleOptions;
        
        /**
         * 断指定点坐标是否在矩形内。
         * @param  {LngLat | [number, number]} point
         * @returns boolean
         */
        contains(point: LngLat | [number, number]): boolean;
    }
                  
    /**
     * OverlayGroup类用来包装其它覆盖物类的实例，对实例集合做整体操作，避免开发者对多个需要设置同样属性的覆盖物实例做循环处理。
     * 同时只要对OverlayGroup执行过setMap方法后，新添加到该OverlayGroup中的覆盖物会自动将其map属性修改到该group对应的map，此外从group中移除该覆盖物时，也会将该覆盖物从group对应的map中移除。 
     * 目前OverlayGroup支持Marker, Polygon, Polyline, Circle, Rectangle, Ellipse 和 BezierCurve。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#overlaygroup
     */
    class OverlayGroup extends EventDispatcher
    {
        /**
         * 构造覆盖物集合，传入的参数是一个覆盖物实例的数组。
         * @param  {Array<Overlay>} overlays
         */
        constructor(overlays: Array<Overlay>);
        
        /**
         * 添加单个覆盖物到集合中，不支持添加重复的覆盖物。
         * @param  {Overlay} layer
         * @returns void
         */
        addOverlay(layer: Overlay): void;
        
        /**
         * 	添加覆盖物数组到集合中，不支持添加重复的覆盖物。
         * @param  {Array<Overlay>} overlays
         * @returns void
         */
        addOverlays(overlays: Array<Overlay>): void;
        
        /**
         * 返回当前集合中所有的覆盖物。
         * @returns Array<Overlay>
         */
        getOverlays(): Array<Overlay>;
        
        /**
         * 判断传入的覆盖物实例是否在集合中。
         * @param  {Overlay} overlay
         * @returns boolean
         */
        hasOverlay(overlay: Overlay): boolean;
        
        /**
         * 从集合中删除传入的覆盖物实例。
         * @param  {Overlay} overlay
         * @returns void
         */
        removeOverlay(overlay: Overlay): void;
        
        /**
         * 从集合中删除传入的覆盖物实例数组。
         * @param  {Array<Overlay>} overlays
         * @returns void
         */
        removeOverlays(overlays: Array<Overlay>): void;
        
        /**
         * 清空集合。
         * @returns void
         */
        clearOverlays(): void;
        
        /**
         * 对集合中的覆盖物做迭代操作，其中iterator的函数定义是： 
         * function(overlay, index, collections)，相关含义如下： 
         * overlay: 当前迭代到的覆盖物 
         * index: 该覆盖物在集合中的序列号(从0开始) 
         * collections: 所有覆盖物实例
         * @param  {Function} iterator
         * @returns void
         */
        eachOverlay(iterator: (overlay: Overlay, index: number, collections: Array<Overlay>) => void): void;

        /**
         * 指定集合中里覆盖物的显示地图。
         * 当参数值取 null 时，在地图上移除当前覆盖物。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
        
        /**
         * 获取集合中里覆盖物的地图对象。
         * @returns Map
         */
        getMap(): Map;
        
        /**
         * 在地图上显示集合中覆盖物。
         * @returns void
         */
        show(): void;
        
        /**
         * 在地图上隐藏集合中覆盖物。
         * @returns void
         */
        hide(): void;
        
        /**
         * 修改覆盖物属性(包括线样式、样色等等)。
         * @param  {object} opts
         * @returns void
         */
        setOptions(opts: object): void;
    }

    /**
     * GeoJSON 类配置项。
     * @interface
     */
    interface GeoJSONOptions
    {
        /**
         * 要加载的标准GeoJSON对象。
         * @member {object}
         */
        geoJSON?: object;
        
        /**
         * 指定点要素的绘制方式，缺省时为Marker的默认样式。
         * geojson为当前要素对应的GeoJSON对象，lnglat为对应的点的位置
         * @member {Function}
         */
        getMarker?: (geojson: GeoJSON, lnglat: LngLat | [number, number]) => void;
        
        /**
         * 指定线要素的绘制方式，缺省时为Polyline的默认样式。
         * geojson为当前要素对应的GeoJSON对象，lnglats为对应的线的路径
         * @member {Function}
         */
        getPolyline?: (geojson: GeoJSON, lnglats: Array<LngLat | [number, number]>) => void;

        /**
         * 指定面要素的绘制方式，缺省时为Polygon的默认样式。
         * geojson为当前要素对应的GeoJSON对象，lnglats为对应的面的路径
         * @member {Function}
         */
        getPolygon?: (geojson: GeoJSON, lnglats: Array<LngLat | [number, number]> | Array<Array<LngLat | [number, number]>>) => void;
    }

    /**
     * GeoJSON类，继承自OverLayGroup，可实现GeoJSON对象与OverlayGroup的相互转换。
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#geojson
     */
    class GeoJSON extends OverlayGroup
    {
        /**
         * 创建一个GeoJSON对象，opts 为初始构造参数。
         * @param  {GeoJSONOptions} opts
         */
        constructor(opts: GeoJSONOptions);
        
        /**
         * 加载新的GeoJSON对象，转化为覆盖物，旧的覆盖物将移除。
         * @param  {object} geoJSON
         * @returns void
         */
        importData(geoJSON: object): void;
        
        /**
         * 将当前对象包含的覆盖物转换为GeoJSON对象。
         * @returns object
         */
        toGeoJSON(): object;
    }

    /**
     * ContextMenu 类配置项。
     * @interface
     */
    interface ContextMenuOptions
    {
        /**
         * 右键菜单内容（针对自定义菜单时，添加菜单内容及功能。可以是HTML要素字符串或者HTML DOM对象。）
         * @member {string | HTMLElement}
         */
        content?: string | HTMLElement;
    }

    /**
     * 地图右键菜单。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/overlay#contextmenu
     */
    class ContextMenu extends EventDispatcher
    {
        /**
         * 构造一个右键菜单对象。
         * @constructor
         * @param  {ContextMenuOptions} opts?
         */
        constructor(opts?: ContextMenuOptions);
        
        /**
         * 右键菜单中添加菜单项。
         * @param  {string} text 菜单显示内容。
         * @param  {Function} handler 菜单点击时的处理程序。
         * @param  {number} index   当前菜单项在右键菜单中的排序位置，以0开始
         * @returns void
         */
        addItem(text: string, handler: Function, index: number): void;
        
        /**
         * 删除一个菜单项。
         * @param  {string} text
         * @param  {Function} handler
         * @returns void
         */
        removeItem(text: string, handler: Function): void;
        
        /**
         * 在地图的指定位置打开右键菜单。
         * @param  {Map} map
         * @param  {LngLat | [number, number]} position
         */
        open(map: Map, position: LngLat | [number, number]): void;
        
        /**
         * 关闭右键菜单。
         * @returns void
         */
        close(): void;
    }
}
