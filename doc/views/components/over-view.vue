<template>
    <l-article>
        <h1>OverView 地图鹰眼</h1>
        <h2>概述</h2>
        <p>地图鹰眼组件。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="over-view-example" :zoom="13" :center="center">
                    <amap-over-view :isOpen="true"></amap-over-view>
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
                        <td>tileLayer</td>
                        <td>鹰眼窗体中需显示的切片图层，值为 <a href="https://lbs.amap.com/api/javascript-api/reference/layer#TileLayer" target="_blank">AMap.TileLayer</a> 配置项。</td>
                        <td>object</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>isOpen</td>
                        <td>鹰眼是否展开。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>鹰眼是否显示。</td>
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
                    <tr>
                        <td>open</td>
                        <td>展开鹰眼窗体时触发的事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>折叠鹰眼窗体时触发的事件。</td>
                        <td>{source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.over-view-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/over-view";

/**
 * 鹰眼组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class OverViewExample extends View
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
