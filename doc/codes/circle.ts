const generic = `
<template>
    <article>
        <amap class="circle-example" :zoom="15" :center="[113.979596, 22.532278]">
            <amap-circle
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
            </amap-circle>
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
.circle-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 圆形组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class CircleView extends View
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
     * 圆形的值。
     * @member {object}
     */
    protected value: object =
    {
        // 圆中心
        center: [113.979596, 22.532278],

        // 半径，单位：米
        radius: 500
    };
}
</script>
`;

export { generic };
