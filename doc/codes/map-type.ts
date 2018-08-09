const generic = `
<template>
    <amap class="map-type-example" :zoom="13" :center="center">
        <amap-map-type :showTraffic="true"></amap-map-type>
    </amap>
</template>

<style lang="less">
.map-type-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 地图类型组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class MapTypeView extends View
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
