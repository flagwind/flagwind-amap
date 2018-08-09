const generic = `
<template>
    <article>
        <amap class="bezier-curve-example" :zoom="14" :center="[116.40, 39.90]">
            <amap-bezier-curve v-model="path"
                        :visible="visible"
                        :editable="editable"
                        :strokeWeight="3"
                        strokeColor="#FF33FF">
            </amap-bezier-curve>
        </amap>
        <br />
        <i-form :label-width="80">
            <i-form-item label="是否可见">
                <i-switch v-model="visible"></i-switch>
            </i-form-item>
            <i-form-item label="是否可编辑">
                <i-switch v-model="editable"></i-switch>
            </i-form-item>
            <i-form-item label="当前组件值">
                <i-input type="textarea" :value="JSON.stringify(path)" :rows="4" />
            </i-form-item>
        </i-form>
    </article>
</template>

<style lang="less">
.bezier-curve-example-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 贝瑟尔曲线组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class BezierCurveView extends View
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
     * 贝瑟尔曲线路径。
     * @member {Array<Array<[number, number]>>}
     */
    protected path: Array<Array<[number, number]>> =
    [
        [
            [116.39, 39.91],
            [116.37, 39.91]
        ],
        [
            [116.380298, 39.907771],
            [116.38, 39.90]
        ],
        [
            [116.385298, 39.907771],
            [116.40, 39.90]
        ],
        [
            [116.392872, 39.887391],
            [116.40772, 39.909252],
            [116.41, 39.89]
        ],
        [
            [116.423857, 39.889498],
            [116.422312, 39.899639],
            [116.425273, 39.902273]
        ]
    ];
}
</script>
`;

export { generic };
