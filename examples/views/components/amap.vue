<template>
    <l-article>
        <h1>AMap 地图</h1>
        <h2>概述</h2>
        <p>显示地图。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <fw-amap :lang="lang" :mapStyle="style" :zoom="zoom" :center="center" :plugins="plugins"></fw-amap>
                <br />
                <i-form :label-width="80">
                    <i-form-item label="语言切换">
                        <i-radio-group v-model="lang">
                            <i-radio label="zh_cn">中文</i-radio>
                            <i-radio label="en">英文</i-radio>
                        </i-radio-group>
                    </i-form-item>

                    <i-form-item label="风格切换">
                        <i-radio-group v-model="style">
                            <i-radio label="amap://styles/normal">标准</i-radio>
                            <i-radio label="amap://styles/light">月光银</i-radio>
                            <i-radio label="amap://styles/dark">幻影黑</i-radio>
                            <i-radio label="amap://styles/fresh">草色青</i-radio>
                            <i-radio label="amap://styles/grey">雅士灰</i-radio>
                            <i-radio label="amap://styles/graffiti">涂鸦</i-radio>
                            <i-radio label="amap://styles/whitesmoke">远山黛</i-radio>
                            <i-radio label="amap://styles/macaron">马卡龙</i-radio>
                            <i-radio label="amap://styles/blue">靛青蓝</i-radio>
                            <i-radio label="amap://styles/darkblue">极夜蓝</i-radio>
                        </i-radio-group>
                    </i-form-item>
                    
                    <i-form-item label="缩放级别">
                        <i-input-number :max="24" :min="3" v-model="zoom"></i-input-number>
                    </i-form-item>

                </i-form>
            </template>
            <template slot="desc">
                <p>基本用法，通过设置<code>value</code>的增减实现数据的上下翻动。</p>
            </template>
            <u-code slot="code" lang="html">111</u-code>
        </u-example>
    </l-article>
</template>

<style lang="less" scoped>
.fw-amap
{
    width:100%;
    height:500px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

@component
export default class AMapView extends View
{
    /**
     * 获取或设置地图显示的语言。
     * @protected
     * @member
     * @returns string
     */
    protected lang: string = "zh_cn";

    protected style: string = "amap://styles/normal";

    protected zoom: number = 11;

    /**
     * 获取或设置地图中心点经纬度坐标值。
     * @protected
     * @member
     * @returns Array<number>
     */
    protected center: Array<number> = [114.065835, 22.56814];

    /**
     * 获取或设置地图需要使用的插件列表。
     * @protected
     * @member
     * @returns Array<object>
     */
    protected plugins: Array<object> =
    [
        {
            name: "ToolBar"
        }
    ];

    protected onLangChange(lang: string): void
    {
        this.lang = lang;
    }
}
</script>
