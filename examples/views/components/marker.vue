<template>
    <l-article>
        <h1>Marker 点标记</h1>
        <h2>概述</h2>
        <p>Marker 是一个用来往地图上添加点标记的组件。</p>
        <p>使用它将任何你希望用户看到的兴趣点标注在地图上，你可以为标注指定任意图标或者内容，以及文字标签。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <fw-amap viewMode="3D" :pitch="50" :zoom="11" :center="[116.480766, 39.932931]" style="height:600px;"></fw-amap>
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
                        <th>名称</th>
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

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/amap";

/**
 * 高德地图组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class MarkerView extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns object
     */
    protected code: object = code;

    /**
     * 获取或设置地图的中心点（行政区域）。
     * @protected
     * @member
     * @returns string
     */
    protected city: string = "440300";

    protected position = [114.065835, 22.56814];
}
</script>