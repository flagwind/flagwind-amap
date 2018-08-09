const generic = `
<template>
    <amap class="scale-example" :zoom="13" :center="center">
        <amap-scale></amap-scale>
    </amap>
</template>

<style lang="less">
.scale-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 比例尺组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ScaleView extends View
{
    /**
     * 地图中心点。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.972976, 22.534607];
}
</script>
`;

export { generic };
