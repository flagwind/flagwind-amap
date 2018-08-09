<template>
    <l-article>
        <h1>InfoWindow 信息窗体</h1>
        <h2>概述</h2>
        <p>用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示1个信息窗体。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="info-window-example" mapStyle="amap://styles/whitesmoke" :zoom="15" :center="center">
                    <amap-simple-marker iconTheme="fresh" iconStyle="green" :label="point1.label" :position="point1.position" @click="onPoint1Click"></amap-simple-marker>

                    <amap-info-window v-model="point1.visible" :position="point1.position">
                        <i-circle :size="250"
                            :trail-width="4"
                            :stroke-width="5"
                            :percent="75"
                            stroke-linecap="square"
                            stroke-color="#43a3fb">
                            <div class="circle">
                                <h1>42,001,776</h1>
                                <p>消费人群规模</p>
                                <span>总占人数<i>75%</i></span>
                            </div>
                        </i-circle>
                    </amap-info-window>
                    
                    <amap-simple-marker iconTheme="fresh" iconStyle="orange" :label="point2.label" :position="point2.position" @click="onPoint2Click"></amap-simple-marker>
                    
                    <amap-info-window v-model="point2.visible" :isCustom="true" :position="point2.position">
                        <i-card style="width:350px">
                            <p slot="title"><i-icon type="ios-film-outline"></i-icon> Classic film</p>
                            <a href="javascript:void(0);" slot="extra" @click.prevent="onWindow2Close"><i-icon type="close"></i-icon> Close</a>
                            <ul>
                                <li v-for="item in movieList" :key="item.name">
                                    <a :href="item.url" target="_blank">{{ item.name }}</a>
                                    <span><i-icon type="ios-star" v-for="n in 4" :key="n"></i-icon><i-icon type="ios-star" v-if="item.rate >= 9.5"></i-icon><i-icon type="ios-star-half" v-else></i-icon> {{ item.rate }}</span>
                                </li>
                            </ul>
                        </i-card>
                    </amap-info-window>
                </amap>
            </template>
            <template slot="desc">
                <p>通过控制<code>value</code>属性来显示/隐藏信息窗体。</p>
                <p>设置<code>position</code>属性控制信息窗体的显示位置。</p>
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
                        <td>value</td>
                        <td>信息窗体是否显示，支持 v-model 双向绑定数据。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>信息窗体的显示位置。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>isCustom</td>
                        <td>是否为自定义窗体。<br />设为true时，信息窗体外框及内容完全按照插槽所设的值添加（默认为false，即在系统默认的信息窗体外框中显示插槽内容）</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>autoMove</td>
                        <td>是否自动调整窗体到视野内（当信息窗体超出视野范围时，通过该属性设置是否自动平移地图，使信息窗体完全显示）</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>closeWhenClickMap</td>
                        <td>是否在鼠标点击地图后关闭信息窗体，默认false，鼠标点击地图后不关闭信息窗体。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>信息窗体尺寸（isCustom为true时，该属性无效）。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>offset</td>
                        <td>相对于基点的偏移量。默认情况是信息窗体的底部中心点(BOTTOM_CENTER) 和基点之间的偏移量。</td>
                        <td>[number, number]</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showShadow</td>
                        <td>是否显示信息窗体阴影，取值false时不显示窗体阴影，取值true时显示窗体阴影。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
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
                        <td>open</td>
                        <td>信息窗体打开事件。</td>
                        <td>{lnglat, source}</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>信息窗体关闭事件。</td>
                        <td>{lnglat, source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.info-window-example
{
    height: 800px;

    .amap-marker-label
    {
        font-size: 13px;
        border: 1px solid #b8b8b8;
        background: #fff;
        border-radius: 6px 0 6px 0;
        color: #666;
        line-height: 130%;
    }

    .circle
    {
        h1
        {
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }

        p
        {
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }

        span
        {
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;

            &:before
            {
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            };
        }

        span i
        {
            font-style: normal;
            color: #3f414d;
        }
    }

    .ivu-card ul
    {
        li
        {
            margin-bottom: 5px;
            
            span
            {
                float: right;
                color: #ffac2d;
            }

            a:after
            {
                content: "";
            }
        }
    }
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/info-window";

/**
 * 信息窗体组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class InfoWindowView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 地图中心点。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.972976, 22.534607];
    
    /**
     * 默认窗体标注点位信息。
     * @member {object}
     */
    protected point1: any =
    {
        visible: false,

        position: [113.972976, 22.534607],

        label:
        {
            content: "默认窗体",

            offset: [-10, 50]
        }
    };

    /**
     * 自定义窗体标注点位信息。
     * @member {object}
     */
    protected point2: any =
    {
        visible: false,

        position: [113.980606, 22.539449],

        label:
        {
            content: "自定义窗体",

            offset: [-15, 50]
        }
    };

    /**
     * 自定义窗体数据。
     * @member {object}
     */
    protected movieList: Array<object> =
    [
        {
            name: "The Shawshank Redemption",
            url: "https://movie.douban.com/subject/1292052/",
            rate: 9.6
        },
        {
            name: "Leon:The Professional",
            url: "https://movie.douban.com/subject/1295644/",
            rate: 9.4
        },
        {
            name: "Farewell to My Concubine",
            url: "https://movie.douban.com/subject/1291546/",
            rate: 9.5
        },
        {
            name: "Forrest Gump",
            url: "https://movie.douban.com/subject/1292720/",
            rate: 9.4
        },
        {
            name: "Life Is Beautiful",
            url: "https://movie.douban.com/subject/1292063/",
            rate: 9.5
        }
    ];

    /**
     * 默认窗体标注点击时调用。
     * @param {any} e
     * @returns void
     */
    protected onPoint1Click(e: any): void
    {
        this.point1.visible = true;
    }

    /**
     * 自定义窗体标注点击时调用。
     * @param {any} e
     * @returns void
     */
    protected onPoint2Click(e: any): void
    {
        this.point2.visible = true;
    }

    /**
     * 自定义窗体关闭时调用。
     * @param {any} e
     * @returns void
     */
    protected onWindow2Close(): void
    {
        this.point2.visible = false;
    }
}
</script>
