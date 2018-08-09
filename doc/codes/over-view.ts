const generic = `
<template>
    <amap class="over-view-example" :zoom="13" :center="center">
        <amap-over-view :isOpen="true"></amap-over-view>
    </amap>
</template>

<style lang="less">
.over-view-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 鹰眼组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class OverViewExample extends View
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
