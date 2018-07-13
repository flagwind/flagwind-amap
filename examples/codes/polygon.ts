const generic = `
<template>
    <article>
        <amap class="polygon-example" :zoom="15" :center="[113.979596, 22.532278]">
            <amap-polygon :path="path"
                        :visible="visible"
                        :draggable="draggable"
                        :editable="editable"
                        :strokeStyle="strokeStyle"
                        strokeColor="#011935"
                        fillColor="#37c6c0"
                        @adjust="onEdit">
            </amap-polygon>
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
            <i-form-item v-show="editable" label="轮廓线节点">
                <i-input type="textarea" :value="JSON.stringify(currentPath)" :rows="4" />
            </i-form-item>
        </i-form>
    </article>
</template>

<style lang="less">
.polygon-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 多边形组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PolygonView extends View
{
    private editPath: Array<[number, number]> = [];         // 编辑时的轮廓线节点

    /**
     * 是否可见。
     * @member {boolean}
     */
    protected visible: boolean = true;

    /**
     * 是否可拖拽。
     * @member {boolean}
     */
    protected draggable: boolean = false;

    /**
     * 是否可编辑。
     * @member {boolean}
     */
    protected editable: boolean = false;

    /**
     * 轮廓线样式。
     * @member {string}
     */
    protected strokeStyle: string = "solid";

    /**
     * 多边形路径。
     * @member {Array[number, number]}
     */
    protected path: Array<[number, number]> =
    [
        [113.972976, 22.534607],
        [113.97495, 22.528344],
        [113.979242, 22.531277],
        [113.988426, 22.530326],
        [113.982589, 22.536985],
        [113.978812, 22.534369]
    ];

    /**
     * 当前轮廓线节点。
     * @property {Array<[number, number]>}
     */
    protected get currentPath(): Array<[number, number]>
    {
        return this.editPath.length ? this.editPath : this.path;
    }

    /**
     * 当编辑多边形轮廓时调用。
     * @param {any} e
     * @returns void
     */
    protected onEdit(e: any): void
    {
        const source = e.source;

        this.editPath = source.getPath();
    }
}
</script>
`;

export { generic };
