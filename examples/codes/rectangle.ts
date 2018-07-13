const generic = `
<template>
    <article>
        <amap class="rectangle-example" :zoom="15" :center="[113.979596, 22.532278]">
            <amap-rectangle
                v-model="value"
                strokeColor="#f33"
                :strokeOpacity="1"
                :strokeWeight="3"
                :strokeStyle="strokeStyle"
                fillColor="#ee2200"
                :fillOpacity="0.35"
                :draggable="draggable"
                :visible="visible"
                :editable="editable">
            </amap-rectangle>
        </amap>
        <br />
        <i-form :label-width="80">
            <i-form-item label="轮廓线样式">
                <i-radio-group v-model="strokeStyle">
                    <i-radio label="solid">实线</i-radio>
                    <i-radio label="dashed">虚线</i-radio>
                </i-radio-group>
            </i-form-item>
            <i-form-item label="是否可见">
                <i-switch v-model="visible"></i-switch>
            </i-form-item>
            <i-form-item label="是否可拖拽">
                <i-switch v-model="draggable"></i-switch>
            </i-form-item>
            <i-form-item label="是否可编辑">
                <i-switch v-model="editable"></i-switch>
            </i-form-item>
            <i-form-item v-show="editable" label="组件当前值">
                <i-input type="textarea" :value="JSON.stringify(value)" :rows="4" />
            </i-form-item>
        </i-form>
    </article>
</template>

<style lang="less">
.rectangle-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 矩形组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class RectangleView extends View
{
    /**
     * 是否可见。
     * @member {boolean}
     */
    protected visible: boolean = true;

    /**
     * 是否可拖拽。
     * @member {boolean}
     */
    protected draggable: boolean = true;

    /**
     * 是否可编辑。
     * @member {boolean}
     */
    protected editable: boolean = true;

    /**
     * 轮廓线样式。
     * @member {string}
     */
    protected strokeStyle: string = "solid";

    /**
     * 矩形的值。
     * @member {Array<[number, number]>}
     */
    protected value: Array<[number, number]> =
    [
        [113.970701, 22.52767],     // 西南角
        [113.989241, 22.536574]     // 东北角
    ];
}
</script>
`;

export { generic };
