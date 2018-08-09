<template>
    <l-article>
        <h1>ControlBar 控制条</h1>
        <h2>概述</h2>
        <p>组合了旋转、倾斜、复位、缩放在内的地图控件，在3D地图模式下会显示。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="control-bar-example" :pitch="80" viewMode="3D" :zoom="18" :center="center">
                    <amap-control-bar></amap-control-bar>
                </amap>
            </template>
            <template slot="desc">
            </template>
            <u-code slot="code" lang="html">{{code.generic}}</u-code>
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
                    <tr>
                        <td>position</td>
                        <td>显示位置，如：{top: "10px", right: "10px"}。</td>
                        <td>object</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showZoomBar</td>
                        <td>是否显示缩放按钮。移动端默认为false，PC端为默认为true。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showControlButton</td>
                        <td>是否显示倾斜、旋转按钮。移动端默认为false，PC端为默认为true。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
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
                    <tr>
                        <td>initialized</td>
                        <td>组件初始化完成后触发。</td>
                        <td>{source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.control-bar-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/control-bar";

/**
 * 控制条组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ControlBarView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 地图中心点。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.972976, 22.534607];
}
</script>
