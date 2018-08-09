<template>
    <l-article>
        <h1>PositionPicker 位置选点</h1>
        <h2>概述</h2>
        <p>用于在地图上选取位置，并获取所选位置的地址信息，以及周边POI、周边道路、周边路口等信息。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="position-picker-example" :zoom="15" :center="center">
                    <amap-tool-bar></amap-tool-bar>
                    <amap-position-picker v-model="position" mode="dragMarker" @select="onSelect"></amap-position-picker>
                </amap>
            </template>
            <template slot="desc">
                <i-form :label-width="100">  
                    <i-form-item label="经纬度">
                        <i-input :value="JSON.stringify(position)" />
                    </i-form-item>
                    <i-form-item label="详细地址">
                        <i-input :value="selectResult.address" />
                    </i-form-item>
                    <i-form-item label="地址组成元素">
                        <i-input type="textarea" :rows="4" :value="JSON.stringify(selectResult.regeocode.addressComponent)" />
                    </i-form-item>
                </i-form>
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
                        <td>value</td>
                        <td>组件值，即位置点，支持 v-model 双向绑定数据。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>mode</td>
                        <td>拖拽模式，可选 dragMap、dragMarker。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>dragMap</td>
                    </tr>
                    <tr>
                        <td>iconStyle</td>
                        <td>自定义点的显示样式。</td>
                        <td>object</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>allowClick</td>
                        <td>是否允许点击地图切换点位置。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
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
                        <td>select</td>
                        <td>获取到点的有效地址和周边信息时触发。</td>
                        <td>{source, address, regeocode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.position-picker-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/position-picker";

/**
 * 位置选点组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PositionPickerView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 地图的默认中心点位置。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.979596, 22.532278];

    /**
     * 当前选中的经纬度信息。
     * @member {[number, number]}
     */
    protected position: Array<number> = [113.972976, 22.534607];

    /**
     * 选中的效地址和周边信息。
     * @member {object}
     */
    protected selectResult: object =
    {
        regeocode:
        {

        }
    };

    /**
     * 当选中地址时调用。
     * @param {any} e
     */
    protected onSelect(e: any): void
    {
        this.selectResult = e;
    }
}
</script>
