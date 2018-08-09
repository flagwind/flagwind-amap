const generic = `
<template>
    <amap class="text-marker-example" :zoom="15" :center="[113.979596, 22.532278]">
        <amap-text-marker cursor="pointer" text="文本标记" :draggable="true" :styles="markerStyles" animation="AMAP_ANIMATION_BOUNCE"></amap-text-marker>
    </amap>
</template>

<style lang="less">
.text-marker-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 文本标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class TextMarkerView extends View
{
    /**
     * 文本标记样式。
     * @member {object}
     */
    protected markerStyles: object =
    {
        "background-color": "#ff6e97",
        "border": "solid 1px #f1aaa6",
        "color": "#fff",
        "padding": "10px 20px"
    };
}
</script>
`;

export { generic };
