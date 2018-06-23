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
     * SimpleMarker 类配置项。
     * @interface
     */
    interface SimpleMarkerOptions extends MarkerOptions
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
    class SimpleMarker extends Marker
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

    class WaterDrop
    {

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
         * @param  {AMap.SvgMarker.Shape.BaseShape} shape 形状实例，具体请参见下方的Shape。
         * @param  {SimpleMarkerOptions} opts? SimpleMarker的构造参数（但不包括iconStyle, offset），比如map, position, iconLabel等。
         */
        constructor(shape: object, opts?: SimpleMarkerOptions);
        
        /**
         * 更新shape实例，并基于该shape重新设定图标内容（即父类SimpleMarker的iconStyle）；shape实例的引用没变，但shape的相关参数（比如width，height等）改变时也需要调用此方法。
         * @param  {AMap.SvgMarker.Shape.BaseShape} shape
         * @returns void
         */
        setSvgShape(shape: AMap.SvgMarker.Shape.BaseShape): void;
    }
}

declare namespace AMap.SvgMarker.Shape
{
    abstract class BaseShape
    {

    }

    class WaterDrop extends BaseShape
    {

    }

    class SquarePin extends BaseShape
    {

    }

    class ShieldPin extends BaseShape
    {

    }

    class FivePointsStar extends BaseShape
    {

    }

    class TriangleFlagPin extends BaseShape
    {

    }

    class RectangleFlagPin extends BaseShape
    {

    }
}
