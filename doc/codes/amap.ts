const generic = `
<template>
    <article>
        <amap :lang="lang" :mapStyle="style" :zoom="zoom" :city="city"></amap>
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

            <i-form-item label="城市切换">
                <i-radio-group v-model="city">
                    <i-radio label="440300">深圳市</i-radio>
                    <i-radio label="440100">广州市</i-radio>
                    <i-radio label="310000">上海市</i-radio>
                    <i-radio label="110000">北京市</i-radio>
                    <i-radio label="810000">香港特别行政区</i-radio>
                    <i-radio label="820000">澳门特别行政区</i-radio>
                </i-radio-group>
            </i-form-item>
            
            <i-form-item label="缩放级别">
                <i-input-number v-model="zoom" :max="18" :min="3"></i-input-number>
            </i-form-item>
        </i-form>
    </article>
</template>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 高德地图组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class AMapView extends View
{
    /**
     * 获取或设置地图的显示语言。
     * @protected
     * @member
     * @returns string
     */
    protected lang: string = "zh_cn";

    /**
     * 获取或设置地图的显示样式。
     * @protected
     * @member
     * @returns string
     */
    protected style: string = "amap://styles/normal";

    /**
     * 获取或设置地图的中心点（行政区域）。
     * @protected
     * @member
     * @returns string
     */
    protected city: string = "440300";

    /**
     * 获取或设置地图的缩放级别。
     * @protected
     * @member
     * @returns number
     */
    protected zoom: number = 11;

    /**
     * 获取或设置地图的中心点（经纬度）。
     * @protected
     * @member
     * @returns Array<number>
     */
    protected center: Array<number> = [114.065835, 22.56814];
}
</script>
`;

export { generic };
