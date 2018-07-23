<template>
    <l-article>
        <h1>Scale 比例尺</h1>
        <h2>概述</h2>
        <p>比例尺组件。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="scale-example" :zoom="13" :center="center">
                    <amap-scale></amap-scale>
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
                        <td>offset</td>
                        <td>相对于地图容器左上角的偏移量，正数代表向右下偏移。</td>
                        <td>[number, number]</td>
                        <td>静态属性</td>
                        <td>[10, 10]</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>
                            控件停靠位置。<br />
                            LT:左上角;<br />
                            RT:右上角;<br />
                            LB:左下角;<br />
                            RB:右下角;<br />
                        </td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>LB</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>组件是否显示。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
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
                    <tr>
                        <td>show</td>
                        <td>组件显示时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>hide</td>
                        <td>组件隐藏时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.scale-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/scale";

/**
 * 比例尺组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ScaleView extends View
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
