const generic = `
<template>
    <article>
        <amap class="polyline-example" :zoom="14" :center="[113.979596, 22.532278]">
            <amap-polyline v-model="path"
                        :visible="visible"
                        :editable="editable"
                        :strokeWeight="6"
                        strokeColor="#011935"
                        :strokeOpacity="1"
                        :isOutline="true"
                        outlineColor="#fff"
                        :showDir="true"
                        lineJoin="round">
            </amap-polyline>
        </amap>
        <br />
        <i-form :label-width="80">
            <i-form-item label="是否可见">
                <i-switch v-model="visible"></i-switch>
            </i-form-item>
            <i-form-item label="是否可编辑">
                <i-switch v-model="editable"></i-switch>
            </i-form-item>
            <i-form-item v-show="editable" label="当前组件值">
                <i-input type="textarea" :value="JSON.stringify(path)" :rows="4" />
            </i-form-item>
        </i-form>
    </article>
</template>

<style lang="less">
.polyline-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 折线组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PolylineView extends View
{
    /**
     * 是否可见。
     * @member {boolean}
     */
    protected visible: boolean = true;

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
     * 折线路径。
     * @member {Array[number, number]}
     */
    protected path: Array<[number, number]> =
    [
        [113.947055, 22.532665],
        [113.965938, 22.529454],
        [113.963535, 22.537738],
        [113.97126, 22.538174],
        [113.979414, 22.531436],
        [113.983361, 22.545229],
        [113.978104, 22.550342]
    ];
}
</script>
`;

export { generic };
