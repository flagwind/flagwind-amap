const generic = `
<template>
    <amap class="control-bar-example" :pitch="80" viewMode="3D" :zoom="18" :center="center">
        <amap-control-bar></amap-control-bar>
    </amap>
</template>

<style lang="less">
.control-bar-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 控制条组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ControlBarView extends View
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
