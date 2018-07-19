<template>
    <l-article>
        <h1>InfoWindow 信息窗体</h1>
        <h2>概述</h2>
        <p>用于在地图上弹出一个详细信息展示窗体，地图上只允许同时展示1个信息窗体。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="info-window-example" :zoom="15" :center="center">
                    <amap-marker :position="center" :label="marker1Label" @click="onMarker1Click"></amap-marker>

                    <amap-info-window v-model="window1Visible" :position="window1Position">
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
                </amap>
            </template>
            <template slot="desc">
                <i-button @click="onButtonClick">测试一下</i-button>
            </template>
            <u-code slot="code" lang="html">{{code.generic}}</u-code>
        </u-example>
    </l-article>
</template>

<style lang="less">
.info-window-example
{
    height: 800px;

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
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/context-menu";

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
     * 标注标签。
     * @member {object}
     */
    protected marker1Label: object =
    {
        content: "点击右键试试",
        offset: [-25, 45]
    };

    protected window1Visible: boolean = false;

    protected window1Position: Array<number> = [];

    protected onMarker1Click(e: any): void
    {
        this.window1Position = e.lnglat;
        this.window1Visible = true;
    }

    protected onButtonClick(): void
    {
        this.window1Position = [113.980847, 22.541575];
    }
}
</script>
