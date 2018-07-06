/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, config } from "flagwind-web";
import Marker from "../marker";

/**
 * 灵活点标记，一种可以随着级别改变图标和大小的点标记。
 * @class
 * @version 1.0.0
 */
@component
export default class ElasticMarker extends Marker
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
     * @config {Array<object>}
     */
    @config({type: Array})
    public styles: Array<object>;
    
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
     * @config {object}
     */
    @config({type: Object})
    public zoomStyleMapping: object;

    /**
     * 根据指定配置项初始化组件。
     * @protected
     * @override
     * @param  {object} options
     * @returns void
     */
    protected async initialize(options: object): Promise<AMap.ElasticMarker>
    {
        return new Promise<AMap.ElasticMarker>((resolve, reject) =>
        {
             // tslint:disable-next-line:variable-name
            AMap.plugin("ElasticMarker", (ElasticMarker = AMap.ElasticMarker) =>
            {
                const marker = new ElasticMarker(options);

                console.log(marker);

                resolve(marker);
            });
        });
    }

    // protected render(createElement: Function): void
    // {
    //     // ddd
    // }
}
