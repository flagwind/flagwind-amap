const generic = `
<template>
    <amap class="position-picker-example" :zoom="15" :center="center">
        <amap-tool-bar></amap-tool-bar>
        <amap-position-picker v-model="position" mode="dragMarker" @select="onSelect"></amap-position-picker>
    </amap>
</template>

<style lang="less">
.position-picker-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 位置选点组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PositionPickerView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 地图的默认中心点位置。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.979596, 22.532278];

    /**
     * 当前选中的经纬度信息。
     * @member {[number, number]}
     */
    protected position: Array<number> = [113.972976, 22.534607];

    /**
     * 选中的效地址和周边信息。
     * @member {object}
     */
    protected selectResult: object =
    {
        regeocode:
        {

        }
    };

    /**
     * 当选中地址时调用。
     * @param {any} e
     */
    protected onSelect(e: any): void
    {
        this.selectResult = e;
    }
}
</script>
`;

export { generic };
