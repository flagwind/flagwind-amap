/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { CreateElement, VNode } from "vue";
import { component, config } from "flagwind-web";
import Component from "components/component";

/**
 * 海量点组件。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-point-simplifier"
})
export default class PointSimplifier extends Component
{
    /**
     * 获取或设置绘制用图层的叠加顺序值。
     * 如果需要叠加在地图的最上层，可以设置一个较大的值，比如 300。
     * @config {number}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public zIndex: number;

    /**
     * 获取或设置数据源数组，每个元素即为点相关的信息。
     * @config {Array<any>}
     * @description 动态属性，支持响应式。
     */
    @config({type: Array})
    public data: Array<any>;
    
    /**
     * 获取或设置一个函数，用于返回数据项中的经纬度信息。
     * @config {Function}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Function})
    public getPosition: Function;

    /**
     * 获取或设置一个函数，用于返回鼠标 Hover 时显示的 Title 内容。
     * @config {Function}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Function})
    public getHoverTitle: Function;
    
    /**
     * 获取或设置数据项的优先级比较函数，用于 Array.sort(compare)；排序后的数组，靠前的优先绘制。
     * @config {Function}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Function})
    public compareDataItem: Function;

    /**
     * 获取或设置是否在绘制后自动调整地图视野以适合全部点。
     * @config {boolean}
     * @default true
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Boolean})
    public autoSetFitView: boolean;

    /**
     * 获取或设置绘制引擎类型，取值："default"、"group"。
     * @config {string}
     * @default canvas
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: String, default: "default"})
    public renderEngine: string;

    /**
     * 获取或设置绘制引擎的构造参数。
     * @config {object}
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Object})
    public renderOptions: object;

    /**
     * 获取或设置四叉树叶子节点中包含的点的最大数量，超过该数量则进行宽高等分，一分为四。默认100。
     * 通常来说，值越小，分叉的可能性越大，一方面，这有助于精细的划分高密度区域，另外一面，也增加了四叉树的节点数量（指数增长），从而有损性能。
     * @config {number}
     * @default 100
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public maxChildrenOfQuadNode: number;

    /**
     * 获取或设置四叉树的最大高度。默认16. 超过该高度，即使数量超过 maxChildrenOfQuadNode 的限制，也不再分叉。
     * @config {number}
     * @default 16
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public maxDepthOfQuadTree: number;

    /**
     * 获取或设置点的范围矩形的最坏宽高比（ 取值小于1，大于 1 时会自动取倒数）。
     * 四叉树的根节点是根据点的分布范围构建的，分叉之后的宽高比也与根节点一致，过宽或者过高的矩形可能会影响TopN区域的视觉观感（比如出现 100*1 的矩形）。
     * 默认值为0.6，宽高比小于该阈值时会对范围矩形做一定的扩充，缩小宽和高的差距，使其更加“周正”。
     * @config {number}
     * @default 0.6
     * @description 静态属性，仅支持初始化配置。
     */
    @config({type: Number})
    public badBoundsAspectRatio: number;
    
    /**
     * 获取或设置组件是否可见。
     * @config {boolean}
     * @default true
     * @description 动态属性，支持响应式。
     */
    @config({type: Boolean})
    public visible: boolean;

    /**
     * 当渲染组件时调用的钩子方法。
     * @override
     * @returns VNode
     */
    protected render(createElement: CreateElement): VNode
    {
        return null;
    }

    /**
     * 当装载组件时调用的钩子方法。
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 调用基类方法
        super.mounted();
    }

    /**
     * 根据指定配置项初始化组件。
     * @async
     * @override
     * @param  {object} options
     * @returns Promise<AMapUI.PointSimplifier>
     */
    protected async initialize(options: any): Promise<AMapUI.PointSimplifier>
    {
        return new Promise<AMapUI.PointSimplifier>((resolve, reject) =>
        {
            // tslint:disable-next-line:variable-name
            AMapUI.loadUI(["misc/PointSimplifier"], (PointSimplifier = AMapUI.PointSimplifier) =>
            {
                AMapUI.PointSimplifier = PointSimplifier;

                if(!PointSimplifier.supportCanvas)
                {
                    reject("当前环境不支持 Canvas！");

                    return;
                }
                
                if(options.renderEngine === "group")
                {
                    options.renderConstructor = PointSimplifier.Render.Canvas.GroupStyleRender;
                }

                const simplifier = new PointSimplifier(options);
                
                resolve(simplifier);
            });
        });
    }

    /**
     * 获取组件支持的事件列表。
     * @virtual
     * @returns Array<string>
     */
    protected getComponentEvents(): Array<string>
    {
        return ["pointClick", "pointMouseover", "pointMouseout"];
    }

    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const component = this.component;

        const handlers =
        {
            visible(value: boolean)
            {
                value ? component.show() : component.hide();
            },

            data(value: Array<any>)
            {
                component.setData(value);
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        super.destroyed();
    }
}
