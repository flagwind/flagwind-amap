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
     * GeometryUtil为一组空间数据计算的函数库。
     * 支持点线面的空间关系计算、长度、面积计算等等。
     * @static
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/math
     */
    class GeometryUtil
    {
        /**
         * @private
         * @constructor
         */
        private constructor();

        /**
         * 计算两个经纬度点之间的实际距离。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @returns number
         */
        static distance(p1: LngLat | [number, number], p2: LngLat | [number, number]): number;
        
        /**
         * 计算一个经纬度路径围成区域的实际面积。
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns number
         */
        static ringArea(ring: Array<LngLat | [number, number]>): number;
        
        /**
         * 判断一个经纬度路径是否为顺时针。
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static isClockwise(ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 计算一个经纬度路径的实际长度。
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns number
         */
        static distanceOfLine(ring: Array<LngLat | [number, number]>): number;
        
        /**
         * 计算两个经纬度面的交叉区域。
         * @param  {Array<LngLat | [number, number]>} ring1
         * @param  {Array<LngLat | [number, number]>} ring2
         * @returns number
         */
        static ringRingClip(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): number;
        
        /**
         * 判断两个经纬度面是否交叉。
         * @param  {Array<LngLat | [number, number]>} ring1
         * @param  {Array<LngLat | [number, number]>} ring2
         * @returns boolean
         */
        static doesRingRingIntersect(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断经纬度路径和经纬度面是否交叉。
         * @param  {Array<LngLat | [number, number]>} line
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static doesLineRingIntersect(line: Array<LngLat | [number, number]>, ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断两个经纬度路径是否相交。
         * @param  {Array<LngLat | [number, number]>} line1
         * @param  {Array<LngLat | [number, number]>} line2
         * @returns boolean
         */
        static doesLineLineIntersect(line1: Array<LngLat | [number, number]>, line2: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断线段和多个环是否相交。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {Array<Array<LngLat | [number, number]>>} rings
         * @returns boolean
         */
        static doesSegmentPolygonIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>): boolean;
        
        /**
         * 判断线段和一个环是否相交。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static doesSegmentRingIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断线段和一个路径是否相交。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {Array<LngLat | [number, number]>} line
         * @returns boolean
         */
        static doesSegmentLineIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], line: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断两个线段是否相交。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {LngLat | [number, number]} p3
         * @param  {LngLat | [number, number]} p4
         * @returns boolean
         */
        static doesSegmentsIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number], p4: LngLat | [number, number]): boolean;
        
        /**
         * 判断点是否在环内。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static isPointInRing(p: LngLat | [number, number], ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断环是否在另一个环内。
         * @param  {Array<LngLat | [number, number]>} ring1
         * @param  {Array<LngLat | [number, number]>} ring2
         * @returns boolean
         */
        static isRingInRing(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 判断点是否在多个环组成区域内。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<Array<LngLat | [number, number]>>} rings
         * @returns boolean
         */
        static isPointInPolygon(p: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>): boolean;
        
        /**
         * 将一个路径变为顺时针。
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static makesureClockwise(ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 将一个路径变为逆时针。
         * @param  {Array<LngLat | [number, number]>} ring
         * @returns boolean
         */
        static makesureAntiClockwise(ring: Array<LngLat | [number, number]>): boolean;
        
        /**
         * 计算P2、P3上距离P1最近的点。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {LngLat | [number, number]} p3
         * @returns LngLat
         */
        static closestOnSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number]): LngLat;
        
        /**
         * 计算line上距离P最近的点。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<LngLat | [number, number]>} line
         * @returns LngLat | [number, number]
         */
        static closestOnLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>): LngLat;
        
        /**
         * 计算P2、P3到P1的距离。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {LngLat | [number, number]} p3
         * @returns number
         */
        static distanceToSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number]): number;
        
        /**
         * 计算P到line的距离。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<LngLat | [number, number]>} line
         * @returns number
         */
        static distanceToLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>): number;
        
        /**
         * 判断P1是否在P2、P3上，tolerance为误差范围。
         * @param  {LngLat | [number, number]} p1
         * @param  {LngLat | [number, number]} p2
         * @param  {LngLat | [number, number]} p3
         * @param  {number} tolerance
         * @returns boolean
         */
        static isPointOnSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number], tolerance: number): boolean;
        
        /**
         * 判断P是否在line上，tolerance为误差范围。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<LngLat | [number, number]>} line
         * @param  {number} tolerance
         * @returns boolean
         */
        static isPointOnLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>, tolerance: number): boolean;
        
        /**
         * 判断P是否在ring的边上，tolerance为误差范围。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<LngLat | [number, number]>} line
         * @param  {number} tolerance
         * @returns boolean
         */
        static isPointOnRing(p: LngLat | [number, number], ring: Array<LngLat | [number, number]>, tolerance: number): boolean;
        
        /**
         * 判断P是否在多个ring的边上，tolerance为误差范围。
         * @param  {LngLat | [number, number]} p
         * @param  {Array<Array<LngLat | [number, number]>>} rings
         * @param  {number} tolerance
         * @returns boolean
         */
        static isPointOnPolygon(p: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>, tolerance: number): boolean;
    }

    /**
     * DOM相关的库函数集合。
     * @static
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/util#dom
     */
    class DomUtil
    {
        /**
         * @private
         * @constructor
         */
        private constructor();

        /**
         * 获取DOM元素的大小。
         * @param  {HTMLElement} element
         * @returns AMap
         */
        static getViewport(element: HTMLElement): AMap.Size;
        
        /**
         * 获取DOM元素距离窗口左上角的距离。
         * @param  {HTMLElement} element
         * @returns AMap
         */
        static getViewportOffset(element: HTMLElement): AMap.Pixel;
        
        /**
         * 在parentNode内部创建一个className类名的tagName元素。
         * @param  {string} tagName
         * @param  {HTMLElement} parentNode
         * @param  {string} className
         * @returns void
         */
        static create(tagName: string, parentNode: HTMLElement, className: string): void;
        
        /**
         * 给DOM元素设置为className样式。
         * @param  {HTMLElement} element
         * @param  {string} className
         * @returns void
         */
        static setClass(element: HTMLElement, className: string): void;
        
        /**
         * DOM元素是否包含className。
         * @param  {HTMLElement} element
         * @param  {string} className
         * @returns boolean
         */
        static hasClass(element: HTMLElement, className: string): boolean;
        
        /**
         * 给DOM元素添加一个className。
         * @param  {HTMLElement} element
         * @param  {string} className
         * @returns void
         */
        static addClass(element: HTMLElement, className: string): void;
        
        /**
         * 给DOM元素删除一个className。
         * @param  {HTMLElement} element
         * @param  {string} className
         * @returns void
         */
        static removeClass(element: HTMLElement, className: string): void;
        
        /**
         * 给DOM元素删除一组样式，Object同样式表。
         * @param  {HTMLElement} element
         * @param  {object} style
         * @returns void
         */
        static setCss(element: HTMLElement, style: object): void;
        
        /**
         * 给DOM元素设定一个透明度。
         * @param  {HTMLElement} element
         * @param  {Number} opacity
         * @returns void
         */
        static setOpacity(element: HTMLElement, opacity: Number): void;
        
        /**
         * 给DOM元素旋转一个角度，以center为中心，center以元素左上角为坐标原点。
         * @param  {HTMLElement} element
         * @param  {Number} rotation
         * @param  {Pixel} center
         * @returns void
         */
        static rotate(element: HTMLElement, rotation: Number, center: Pixel): void;
        
        /**
         * 清空DOM元素。
         * @param  {HTMLElement} element
         * @returns void
         */
        static empty(element: HTMLElement): void;
        
        /**
         * 将DOM元素从父节点删除。
         * @returns void
         */
        static remove(): void;
    }

    /**
     * 常用库函数集合。
     * @static
     * @class
     * @description v1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/util#util
     */
    class Util
    {
        /**
         * @private
         * @constructor
         */
        private constructor();

        /**
         * 将颜色名转换为16进制RGB颜色值
         * @param  {string} colorName
         * @returns string
         */
        static colorNameToHex(colorName: string): string;
        
        /**
         * 将16进制RGB转为rgba(R,G,B,A)
         * @param  {string} hex
         * @returns string
         */
        static rgbHex2Rgba(hex: string): string;
        
        /**
         * 将16进制RGBA转为rgba(R,G,B,A)
         * @param  {string} hex
         * @returns string
         */
        static argbHex2Rgba(hex: string): string;
        
        /**
         * 判断一个对象是都为空
         * @param  {object} obj
         * @returns boolean
         */
        static isEmpty(obj: object): boolean;
        
        /**
         * 从数组删除元素
         * @param  {Array<any>} array
         * @param  {any} item
         * @returns void
         */
        static deleteItemFromArray(array: Array<any>, item: any): void;
        
        /**
         * 按索引删除数组元素
         * @param  {Array<any>} array
         * @param  {number} index
         * @returns void
         */
        static deleteItemFromArrayByIndex(array: Array<any>, index: number): void;
        
        /**
         * 返回元素索引
         * @param  {Array<any>} array
         * @param  {any} item
         * @returns number
         */
        static indexOf(array: Array<any>, item: any): number;
        
        /**
         * 保留小数点后digits位
         * @param  {number} num
         * @param  {number} digits
         * @returns number
         */
        static format(num: number, digits: number): number;
        
        /**
         * 判断是否数组
         * @param  {any} obj
         * @returns boolean
         */
        static isArray(obj: any): boolean;
        
        /**
         * 判断参数是否为DOM元素
         * @param  {any} obj
         * @returns boolean
         */
        static isDOM(obj: any): boolean;
        
        /**
         * 判断数组是否包含某个元素
         * @param  {Array<any>} array
         * @param  {any} item
         * @returns boolean
         */
        static includes(array: Array<any>, item: any): boolean;
        
        /**
         * 同原生requestIdleCallback
         * @param  {Function} func
         * @returns Number
         */
        static requestIdleCallback(func: Function): Number;
        
        /**
         * 同原生cancelIdleCallback
         * @param  {number} id
         * @returns void
         */
        static cancelIdleCallback(id: number): void;
        
        /**
         * 同原生requestAnimationFrame
         * @param  {Function} func
         * @returns Number
         */
        static requestAnimFrame(func: Function): Number;
        
        /**
         * 同原生cancelAnimationFrame
         * @param  {number} id
         * @returns void
         */
        static cancelAnimFrame(id: number): void;
    }

    /**
     * 包含当前浏览器的一些信息。
     * @static
     * @class
     * @description 1.4.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/util#browser
     */
    class BrowserUtil
    {
        /**
         * @private
         * @constructor
         */
        private constructor();

        /**
         * 当前浏览器userAgent。
         * @member {string}
         */
        static ua: string;
        
        /**
         * 是否移动设备。
         * @member {boolean}
         */
        static mobile: boolean;

        /**
         * 平台类型，如：'windows'、'mac'、'ios'、'android'、'other'。
         * @member {string}
         */
        static plat: string;

        /**
         * 是否windows设备。
         * @member {boolean}
         */
        static windows: boolean;

        /**
         * 是否iOS设备。
         * @member {boolean}
         */
        static ios: boolean;

        /**
         * 是否iPad。
         * @member {boolean}
         */
        static iPad: boolean;

        /**
         * 是否iPhone。
         * @member {boolean}
         */
        static iPhone: boolean;

        /**
         * 是否安卓设备。
         * @member {boolean}
         */
        static android: boolean;

        /**
         * 是否安卓4以下系统。
         * @member {boolean}
         */
        static android23: boolean;

        /**
         * 是否Chrome浏览器。
         * @member {boolean}
         */
        static chrome: boolean;

        /**
         * 是否火狐浏览器。
         * @member {boolean}
         */
        static firefox: boolean;

        /**
         * 是否Safari浏览器。
         * @member {boolean}
         */
        static safari: boolean;

        /**
         * 是否微信。
         * @member {boolean}
         */
        static wechat: boolean;

        /**
         * 是否UC浏览器。
         * @member {boolean}
         */
        static uc: boolean;

        /**
         * 是否QQ或者QQ浏览器。
         * @member {boolean}
         */
        static qq: boolean;

        /**
         * 是否IE。
         * @member {boolean}
         */
        static ie: boolean;

        /**
         * 是否IE6。
         * @member {boolean}
         */
        static ie6: boolean;

        /**
         * 是否IE7。
         * @member {boolean}
         */
        static ie7: boolean;

        /**
         * 是否IE8。
         * @member {boolean}
         */
        static ie8: boolean;

        /**
         * 是否IE9。
         * @member {boolean}
         */
        static ie9: boolean;

        /**
         * 是否IE10。
         * @member {boolean}
         */
        static ie10: boolean;

        /**
         * 是否IE11。
         * @member {boolean}
         */
        static ie11: boolean;

        /**
         * 是否IE9以下。
         * @member {boolean}
         */
        static ielt9: boolean;

        /**
         * 是否Edge浏览器。
         * @member {boolean}
         */
        static edge: boolean;

        /**
         * 是否支持LocaStorage。
         * @member {boolean}
         */
        static isLocalStorage: boolean;

        /**
         * 是否支持Geolocation。
         * @member {boolean}
         */
        static isGeolocation: boolean;

        /**
         * 是否Webkit移动浏览器。
         * @member {boolean}
         */
        static mobileWebkit: boolean;

        /**
         * 是否支持Css3D的Webkit移动端浏览器。
         * @member {boolean}
         */
        static mobileWebkit3d: boolean;

        /**
         * 是否高清屏幕，devicePixelRatio>1。
         * @member {boolean}
         */
        static retina: boolean;

        /**
         * 是否触屏。
         * @member {boolean}
         */
        static touch: boolean;

        /**
         * 是否msPointer设备。
         * @member {boolean}
         */
        static msPointer: boolean;

        /**
         * 是否pointer设备。
         * @member {boolean}
         */
        static pointer: boolean;

        /**
         * 是否webkit浏览器。
         * @member {boolean}
         */
        static webkit: boolean;

        /**
         * 是否支持Css3D的Webkit浏览器。
         * @member {boolean}
         */
        static webkit3d: boolean;

        /**
         * 是否支持Css3D的gecko浏览器。
         * @member {boolean}
         */
        static gecko3d: boolean;

        /**
         * 是否支持Css3D的ie浏览器。
         * @member {boolean}
         */
        static ie3d: boolean;

        /**
         * 是否支持Css3D的浏览器。
         * @member {boolean}
         */
        static any3d: boolean;

        /**
         * 是否支持Css3D的opera浏览器。
         * @member {boolean}
         */
        static opera3d: boolean;

        /**
         * 是否支持canvas。
         * @member {boolean}
         */
        static isCanvas: boolean;

        /**
         * 是否支持svg。
         * @member {boolean}
         */
        static isSvg: boolean;

        /**
         * 是否支持vml。
         * @member {boolean}
         */
        static isVML: boolean;

        /**
         * 是否支持WebWorker。
         * @member {boolean}
         */
        static isWorker: boolean;

        /**
         * 是否支持WebSocket。
         * @member {boolean}
         */
        static isWebsocket: boolean;

        /**
         * 判断是否支持webgl。
         * @member {boolean}
         */
        static isWebGL: boolean;
    }
}
