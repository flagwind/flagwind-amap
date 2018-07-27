<template>
    <l-article>
        <h1>PointSimplifier 海量点展示</h1>
        <h2>概述</h2>
        <p>PointSimplifier是一个针对海量点展示场景的组件，能够支持较大规模的经纬度数据，以及配置丰富的展示效果。</p>
        <p>PointSimplifier目前依赖Canvas进行绘制，因此不支持IE9及以下浏览器。</p>
        <p>更多介绍，请阅读官方文档<a href="https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier" target="_blank">《PointSimplifier（海量点展示）》</a></p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="point-simplifier-example" mapStyle="amap://styles/darkblue" :zoom="4" @initialized="onMapInitialized">
                    <amap-point-simplifier ref="pointSimplifier"
                        :zIndex="115"
                        :data="data"
                        :getPosition="options.getPosition"
                        :getHoverTitle="options.getHoverTitle"
                        renderEngine="group"
                        :renderOptions="options.renderOptions">
                    </amap-point-simplifier>
                </amap>
            </template>
            <template slot="desc">
            </template>
            <u-code slot="code" lang="html">{{code.generic}}</u-code>
        </u-example>

        <div class="api">
            <h2>API</h2>
            <h3>属性</h3>
            <table>
                <thead>
                    <tr>
                        <th>属性名</th>
                        <th>说明</th>
                        <th>数据类型</th>
                        <th>属性类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>zIndex</td>
                        <td>绘制用图层的叠加顺序值 。如果需要叠加在地图的最上层，可以设置一个较大的值，比如300。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>data</td>
                        <td>数据源数组，每个元素即为点相关的信息。</td>
                        <td>Array&lt;any&gt;</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>getPosition</td>
                        <td>用于返回数据项中的经纬度信息。</td>
                        <td>Function</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>getHoverTitle</td>
                        <td>用于返回鼠标 Hover 时显示的 Title 内容。</td>
                        <td>Function</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>compareDataItem</td>
                        <td>数据项的优先级比较函数，用于Array.sort(compare)；排序后的数组，靠前的优先绘制。</td>
                        <td>Function</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>autoSetFitView</td>
                        <td>是否在绘制后自动调整地图视野以适合全部点。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>renderEngine</td>
                        <td>
                            绘制引擎类型，取值："default"、"group"。<br />
                            default：<a href="https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier#render" target="_blank">Canvas默认</a><br />
                            group：<a href="https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier#render" target="_blank">GroupStyleRender样式分组</a>
                        </td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>renderOptions</td>
                        <td>绘制引擎的构造参数，请参见 <a href="https://lbs.amap.com/api/javascript-api/reference-amap-ui/mass-data/pointsimplifier#render" target="_blank">绘制引擎</a> 部分</td>
                        <td>object</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>maxChildrenOfQuadNode</td>
                        <td>四叉树叶子节点中包含的点的最大数量，超过该数量则进行宽高等分，一分为四。默认100。通常来说，值越小，分叉的可能性越大，一方面，这有助于精细的划分高密度区域，另外一面，也增加了四叉树的节点数量（指数增长），从而有损性能。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>100</td>
                    </tr>
                    <tr>
                        <td>maxDepthOfQuadTree</td>
                        <td>四叉树的最大高度。默认16. 超过该高度，即使数量超过 maxChildrenOfQuadNode 的限制，也不再分叉。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>badBoundsAspectRatio</td>
                        <td>四叉树的根节点是根据点的分布范围构建的，分叉之后的宽高比也与根节点一致，过宽或者过高的矩形可能会影响TopN区域的视觉观感（比如出现 100*1 的矩形）。默认值为0.6，宽高比小于该阈值时会对范围矩形做一定的扩充，缩小宽和高的差距，使其更加“周正”。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>0.6</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>组件是否可见。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                </tbody>
            </table>

            <h3>事件</h3>
            <table>
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>initialized</td>
                        <td>组件初始化完成后触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>pointClick</td>
                        <td>鼠标点击点的矩形区域时触发。</td>
                        <td>{source, originalEvent}</td>
                    </tr>
                    <tr>
                        <td>pointMouseover</td>
                        <td>鼠标移入到点的矩形区域时触发。</td>
                        <td>{source, originalEvent}</td>
                    </tr>
                    <tr>
                        <td>pointMouseout</td>
                        <td>鼠标移出到点的矩形区域时触发。</td>
                        <td>{source, originalEvent}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.point-simplifier-example
{
    height: 800px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/point-simplifier";

/**
 * 海量点组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PointSimplifierView extends View
{
    private _colors: Array<string> = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];

    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 海量点组件需要渲染的数据。
     * @member {Array<any>}
     */
    protected data: Array<any> = [];

    /**
     * 海量点组件的配置项。
     * @member {Array<any>}
     */
    protected options: object =
    {
        renderOptions:
        {
            getGroupId(item: any, index: number)
            {
                return item.groupId;
            },

            groupStyleOptions: (groupId: number) =>
            {
                const options =
                {
                    pointStyle:
                    {
                        fillStyle: this._colors[groupId]
                    }
                };

                return options;
            }
        },

        getPosition(item: any)
        {
            return item.position;
        },

        getHoverTitle(item: any, index: number)
        {
            return `序号：${index}`;
        }
    };

    /**
     * 当地图初始化完成后触发。
     * @param  {e} any
     * @returns void
     */
    protected onMapInitialized(e: any): void
    {
        AMapUI.load(["lib/$"], ($: any) =>
        {
            // 加载 10 万个点
            $.get("https://a.amap.com/amap-ui/static/data/10w.txt", (csv: string) =>
            {
                const lines = csv.split("\n");
                const data = [];

                for(let i = 0, len = lines.length; i < len; i++)
                {
                    const line = lines[i];
                    
                    if(!line)
                    {
                        continue;
                    }

                    const parts = line.split(",");

                    data.push
                    ({
                        groupId: i % 5,
                        position: [parseFloat(parts[0]), parseFloat(parts[1])]
                    });
                }

                this.data = data;
            });
        });
    }
}
</script>
