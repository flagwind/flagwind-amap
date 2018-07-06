<template>
    <l-article>
        <h1>Polygon 多边形</h1>
        <h2>概述</h2>
        <p>多边形。</p>
        <h2>代码示例</h2>
        <u-example title="综合示例" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap :zoom="15" :center="[113.979596, 22.532278]">
                    <amap-polygon :path="path" strokeColor="#011935" fillColor="#37c6c0" :draggable="true"></amap-polygon>
                </amap>
            </template>
            <template slot="desc">
            </template>
            <u-code slot="code" lang="html"></u-code>
        </u-example>

        <div class="api">
            <h2>API</h2>
            <h3>属性</h3>
            <table>
                <thead>
                    <tr>
                        <th>属性名</th>
                        <th>说明</th>
                        <th>数据类型</th>
                        <th>属性类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>

            <h3>事件</h3>
            <table>
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.amap
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/marker";

/**
 * 多边形组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class MarkerView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    protected path: Array<[number, number]> =
    [
        [113.972976, 22.534607],
        [113.97495, 22.528344],
        [113.979242, 22.531277],
        [113.988426, 22.530326],
        [113.982589, 22.536985],
        [113.978812, 22.534369]
    ];
}
</script>
