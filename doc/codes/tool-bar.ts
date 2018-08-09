const generic = `
<template>
    <amap class="tool-bar-example" :zoom="13" :center="center">
        <amap-tool-bar></amap-tool-bar>
    </amap>
</template>

<style lang="less">
.tool-bar-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 工具条组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ToolBarView extends View
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
