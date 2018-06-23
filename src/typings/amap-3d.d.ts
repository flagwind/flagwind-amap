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
     * 用于承载Object3D对象的图层，继承了一般图层的通用属性和属性的set get方法，比如：map、zIndex、opacity等。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#obj3dlayer
     */
    class Object3DLayer extends Layer
    {
        /**
         * 创建一个Object3DLayer，opts可包含图层的通用属性，比如：map、zIndex、opacity等。
         * @param  {LayerOptions} opts?
         */
        constructor(opts?: LayerOptions);

        /**
         * 用于获取该图层内的所有Object3D对象，只读，请勿修改。
         * @property {Array<object>}
         * @readonly
         */
        readonly objects: Array<object>;
        
        /**
         * 添加一个 Object3D 实例到图层。
         * @param  {object} obj
         * @returns void
         */
        add(obj: AMap.Object3D.IDisplayObject): void;
        
        /**
         * 从图层删除一个 Object3D 实例。
         * @param  {object} obj
         * @returns void
         */
        remove(obj: AMap.Object3D.IDisplayObject): void;
        
        /**
         * 清除所有Object3D实例。
         * @returns void
         */
        clear(): void;
        
        /**
         * 重绘，在修改了Object3D实例的数据属性，或者地图的光照信息之后调用，可使变更生效。
         * @returns void
         */
        reDraw(): void;
    }
}

declare namespace AMap.Lights
{
    /**
     * 描述一个环境光源，用于为地图设置环境光。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#ambient
     */
     class AmbientLight
     {
        /**
         * color用来描述光照的颜色，为一个三个元素的数组，每个元素代表RGB的三个分量，每个分量的取值范围[0,1]；
         * intensity用来描述光照强度，取值范围[0,1]；
         * 如：
         * map.AmbientLight = new AMap.Lights.AmbientLight([1,1,1],0.5)；
         * @param  {[number, number, number]} color
         * @param  {number} intensity
         */
        constructor(color: [number, number, number], intensity: number);
        
        /**
         * 修改光照的颜色。color用来描述光照的颜色，为一个三个元素的数组，
         * 每个元素代表RGB的三个分量，每个分量的取值范围[0,1]。
         * @param  {[number, number, number]} color
         * @returns void
         */
        setColor(color: [number, number, number]): void;
        
        /**
         * 修改光照的强度，intensity用来描述光照强度，取值范围[0, 1]。
         * @param  {number} intensity
         * @returns void
         */
        setIntensity(intensity: number): void;
     }

     /**
     * 描述一个环境光源，用于为地图设置平行光照。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#direction
     */
     class DirectionLight
     {
        /**
         * direction用来描述光的照射方向，为一个三个元素的数组，分别代表方向的xyz分量。
         * direction为相对于地图平面的方向，x正方向朝东，x正方向朝南，z正方向朝下
         * color用来描述光照的颜色，为一个三个元素的数组，每个元素代表RGB的三个分量，每个分量的取值范围[0,1]；
         * intensity用来描述光照强度，取值范围[0,1]；
         * 如：
         * map.AmbientLight = new AMap.Lights.AmbientLight([1,1,1],0.5)；
         * @param  {[number, number, number]} direction
         * @param  {[number, number, number]} color
         * @param  {number} intensity
         */
        constructor(direction: [number, number, number], color: [number, number, number], intensity: number);

        /**
         * 修改光照的颜色。color用来描述光照的颜色，为一个三个元素的数组，
         * 每个元素代表RGB的三个分量，每个分量的取值范围[0,1]。
         * @param  {[number, number, number]} color
         * @returns void
         */
        setColor(color: [number, number, number]): void;
        
        /**
         * 修改光照的强度，intensity用来描述光照强度，取值范围[0, 1]。
         * @param  {number} intensity
         * @returns void
         */
        setIntensity(intensity: number): void;
        
        /**
         * 修改光照的照射方向。
         * @param  {[number, number, number]} direction
         * @returns void
         */
        setDirection(direction: [number, number, number]): void;
     }
}

declare namespace AMap.Object3D
{
    interface IDisplayObject
    {

    }

    /**
     * 描述一个三维Mesh对象，支持纹理。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#mesh
     */
    class Mesh implements IDisplayObject
    {
        /**
         * 描述mesh的几何信息的对象，只读，修改其属性来描述mesh的几何信息。
         * @property {object}
         * @readonly
         */
        readonly geometry:
        {
            /**
             * 一维数据，每三个元素描述一个顶点的xyz信息，只可修改元素，不可直接赋值。
             * @property {Array<number>}
             * @readonly
             */
            readonly vertices: Array<number>,

            /**
             * 一维数据，每四个元素描述一个顶点颜色的RGBA分量信息，所有分量取值范围[0,1]，只可修改元素的值，不可直接赋值。
             * @property {Array<number>}
             * @readonly
             */
            readonly vertexColors: Array<number>,

            /**
             * 一维数据，每两个元素描述一个顶点的纹理坐标信息，纹理坐标以图片左上角为原点。
             * 只可修改元素，不可直接赋值。
             * @property {Array<number>}
             * @readonly
             */
            readonly vertexUVs: Array<number>,

            /**
             * 一维数据，每三个元素描述一个面的信息，每个元素分别为构成面的顶点的索引值，
             * 如不想使用ELEMENT_ARRAY_BUFFER方式，可不设值，此时其他数组按面依次设值即可；
             * 只可修改元素，不可直接赋值。
             * @property {Array<number>}
             * @readonly
             */
            readonly faces: Array<number>,

            /**
             * 一维数据，每个元素描述一个顶点的纹理索引信息，多纹理时使用，取值范围[0-7]。
             * 单纹理或者无纹理时不需要设值。
             * 只可修改元素，不可直接赋值。
             * @property {Array<number>}
             * @readonly
             */
            readonly textureIndices: Array<number>
        };

        /**
         * 给Mesh设置纹理贴图，数组中可以放入图片url和canvas对象，宽高需要为 2的n次方 乘 2的m次方。
         * @property {Array<string | HTMLCanvasElement>}
         */
        textures: Array<string | HTMLCanvasElement>;

        /**
         * 当修改了geometry信息或者textures之后设置为true，同时调用本实例的reDraw方法使修改生效。
         * @property {boolean}
         */
        needUpdate: boolean;

        /**
         * 表示是否使用了透明颜色，并进行颜色混合。
         * @property {boolean}
         */
        transparent: boolean;

        /**
         * 表示绘制当前对象时是否需要开启深度检测。
         * @property {boolean}
         */
        DEPTH_TEST: boolean;
        
        /**
         * 当修改了geometry信息或者textures之后设置needUpdate为true，同时调用该方法使修改生效。
         * @returns void
         */
        reDraw(): void;
    }

    interface MeshLineOptions
    {
        /**
         * 设置meshline的路径，path是一个AMap.LngLat的数组。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 设置meshline的宽度，单位是像素，默认值是2。
         * @member {number}
         */
        width?: number;

        /**
         * 设置meshline路径上各点的高度，height有两种类型：
         * 传入一个数值数组，数组中每个元素对应path参数下相同位置的点的高度
         * 传入一个数值，则meshline的路径上所有点都以此为高度
         * 默认值0
         * @member {number | Array<number>}
         * @default 0
         */
        height?: number | Array<number>;
        
        /**
         * 设置meshline的颜色，支持RGBA, HEX 和 英文颜色名称(如 "blue", "green")。
         * @member {string | Array<number>}
         */
        color?: string | Array<number>;
    }

    /**
     * 基于路径、宽度和高度构建MeshLine，从v1.4.6开始支持。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#meshline
     */
    class MeshLine implements IDisplayObject
    {
        /**
         * 创建MeshLine对象，opts是MeshLine的构造参数。
         * @constructor
         * @param  {MeshLineOptions} opts?
         */
        constructor(opts?: MeshLineOptions);
        
        /**
         * 修改meshline的path，参数说明和构造参数表格中一致。
         * @param  {Array<LngLat | [number, number]>} path
         * @returns void
         */
        setPath(path: Array<LngLat | [number, number]>): void;
        
        /**
         * 修改meshline的width，参数说明和构造参数表格中一致。
         * @param  {number} width
         * @returns void
         */
        setWidth(width: number): void;
        
        /**
         * 修改meshline的height，参数说明和构造参数表格中一致。
         * @param  {number|Array<number>} height
         * @returns void
         */
        setHeight(height: number | Array<number>): void;
        
        /**
         * 修改meshline的color，参数说明和构造参数表格中一致。
         * @param  {string | Array<number>} color
         * @returns void
         */
        setColor(color: string | Array<number>): void;
    }

    /**
     * 描述一个接受光照的Mesh对象，支持纹理。继承Mesh的所有属性和方法。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#meshlights
     */
    class MeshAcceptLights extends Mesh
    {
        /**
         * 一维数据，每三个元素描述一个顶点法向量的xyz信息，只可修改元素，不可直接赋值。
         * @property {Array<number>}
         */
        readonly vertexNormals: Array<number>;
    }

    interface PrismOptions
    {
         /**
         * 设置路径，path是一个AMap.LngLat的数组。
         * @member {Array<Array<LngLat | [number, number]>>}
         */
        path?: Array<Array<LngLat | [number, number]>>;

        /**
         * 设置宽度，单位是像素，默认值是2。
         * @member {number}
         */
        width?: number;

        /**
         * 设置路径上各点的高度，height有两种类型：
         * 传入一个数值数组，数组中每个元素对应path参数下相同位置的点的高度
         * 传入一个数值，则meshline的路径上所有点都以此为高度
         * 默认值0
         * @member {number | Array<number>}
         * @default 0
         */
        height?: number | Array<number>;

        /**
         * 设置颜色，支持RGBA, HEX 和 英文颜色名称(如 "blue", "green")。
         * @member {string | Array<number>}
         */
        color?: string | Array<number>;
    }

    /**
     * 使用MeshAcceptLights封装的棱柱类型，可使用路径和高度快速构建Mesh，支持光照，不支持纹理。
     * @class
     * @see http://lbs.amap.com/api/javascript-api/reference/maps-3d#prism
     */
    class Prism implements IDisplayObject
    {
        /**
         * 初始化 Prism 类的新实例。
         * @param  {PrismOptions} opts?
         */
        constructor(opts?: PrismOptions);
        
        /**
         * 获取或设置一个布尔值，用于控制棱柱是否透明。
         * @property {boolean}
         */
        transparent: boolean;
    }
}