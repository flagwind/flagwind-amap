<template>
    <l-article>
        <h1>Circle 圆形</h1>
        <h2>概述</h2>
        <p>圆形。</p>
        <h2>代码示例</h2>
        <u-example title="综合示例" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="circle-example" :zoom="15" :center="[113.979596, 22.532278]">
                    <amap-circle
                        v-model="value"
                        strokeColor="#f33"
                        :strokeOpacity="1"
                        :strokeWeight="3"
                        :strokeStyle="strokeStyle"
                        fillColor="#ee2200"
                        :fillOpacity="0.35"
                        :draggable="draggable"
                        :visible="visible"
                        :editable="editable">
                    </amap-circle>
                </amap>
            </template>
            <template slot="desc">
                <i-form :label-width="80">
                    <i-form-item label="轮廓线样式">
                        <i-radio-group v-model="strokeStyle">
                            <i-radio label="solid">实线</i-radio>
                            <i-radio label="dashed">虚线</i-radio>
                        </i-radio-group>
                    </i-form-item>
                    <i-form-item label="是否可见">
                        <i-switch v-model="visible"></i-switch>
                    </i-form-item>
                    <i-form-item label="是否可拖拽">
                        <i-switch v-model="draggable"></i-switch>
                    </i-form-item>
                    <i-form-item label="是否可编辑">
                        <i-switch v-model="editable"></i-switch>
                    </i-form-item>
                    <i-form-item label="组件当前值">
                        <i-input type="textarea" :value="JSON.stringify(value)" :rows="4" />
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
                        <td>
                            组件当前值，支持 v-model 双向绑定数据，格式如下：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;center: [number, number], // 圆心位置<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;radius: number&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 圆半径，单位：米<br />
                            }
                        </td>
                        <td>{center, radius}</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>zIndex</td>
                        <td>圆形覆盖物的叠加顺序。地图上存在多个圆形覆盖物叠加时，通过该属性使级别较高的圆形覆盖物在上层显示。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>bubble</td>
                        <td>是否将覆盖物的鼠标或touch等事件冒泡到地图上。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>cursor</td>
                        <td>指定鼠标悬停时的鼠标样式，自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>strokeColor</td>
                        <td>线条颜色，使用16进制颜色代码赋值。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>#006600</td>
                    </tr>
                    <tr>
                        <td>strokeOpacity</td>
                        <td>轮廓线透明度，取值范围0-1，0表示完全透明，1表示不透明。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>0.9</td>
                    </tr>
                    <tr>
                        <td>strokeWeight</td>
                        <td>轮廓线宽度。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>strokeStyle</td>
                        <td>轮廓线样式，实线:solid，虚线:dashed。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>solid</td>
                    </tr>
                    <tr>
                        <td>strokeDasharray</td>
                        <td>
                            勾勒形状轮廓的虚线和间隙的样式，此属性在strokeStyle 为dashed 时有效，此属性在ie9+浏览器有效 取值：<br />
                            实线：[0, 0, 0] <br />
                            虚线：[10, 10] 表示10个像素的实线和10个像素的空白（如此反复）组成的虚线<br />
                            点画线：[10, 2, 10] 表示10个像素的实线和2个像素的空白 + 10个像素的实线和10个像素的空白（如此反复）组成的虚线
                        </td>
                        <td>Array&lt;number&gt;</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>fillColor</td>
                        <td>圆形填充颜色，使用16进制颜色代码赋值。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>#006600</td>
                    </tr>
                    <tr>
                        <td>fillOpacity</td>
                        <td>圆形填充透明度，取值范围0-1，0表示完全透明，1表示不透明。默认为0.9。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>0.9</td>
                    </tr>
                    <tr>
                        <td>draggable</td>
                        <td>设置圆形是否可拖拽移动。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>editable</td>
                        <td>设置圆形是否可编辑。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>extData</td>
                        <td>用户自定义数据，支持JavaScript API任意数据类型，如Polygon的ID等。</td>
                        <td>any</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>圆形是否可见。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                </tbody>
            </table>

            <h3>方法</h3>
            <table>
                <thead>
                    <tr>
                        <th>方法名</th>
                        <th>说明</th>
                        <th>返回值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>getBounds()</td>
                        <td>获取圆外切矩形范围。</td>
                        <td>Array&lt;[number, number]&gt;</td>
                    </tr>
                    <tr>
                        <td>contains(point: [number, number])</td>
                        <td>判断指定点坐标是否在圆内。</td>
                        <td>boolean</td>
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
                        <td>click</td>
                        <td>鼠标左键单击事件。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dblclick</td>
                        <td>鼠标左键双击事件。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>rightclick</td>
                        <td>鼠标右键单击事件。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mousemove</td>
                        <td>鼠标在组件上移动时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseover</td>
                        <td>鼠标移入组件内时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseout</td>
                        <td>鼠标移出组件时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseup</td>
                        <td>鼠标在组件上单击抬起时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mousedown</td>
                        <td>鼠标在组件上单击按下时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragstart</td>
                        <td>开始拖拽组件时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragging</td>
                        <td>拖拽组件过程中触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragend</td>
                        <td>停止拖拽组件时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>touchstart</td>
                        <td>触摸开始时触发事件，仅适用移动设备。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>touchmove</td>
                        <td>触摸移动进行中时触发事件，仅适用移动设备。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>touchend</td>
                        <td>触摸停止时触发，仅适用移动设备。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>show</td>
                        <td>显示组件时触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>hide</td>
                        <td>隐藏组件时触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>move</td>
                        <td>编辑状态下，拖拽圆心调整圆形位置时触发此事件。</td>
                        <td>{source, lnglat}</td>
                    </tr>
                    <tr>
                        <td>adjust</td>
                        <td>编辑状态下，鼠标调整圆形半径时，触发此事件。</td>
                        <td>{source, radius}</td>
                    </tr>
                    <tr>
                        <td>end</td>
                        <td>关闭编辑状态时触发该事件。</td>
                        <td>{source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.circle-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/circle";

/**
 * 圆形组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class CircleView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 是否可见。
     * @member {boolean}
     */
    protected visible: boolean = true;

    /**
     * 是否可拖拽。
     * @member {boolean}
     */
    protected draggable: boolean = true;

    /**
     * 是否可编辑。
     * @member {boolean}
     */
    protected editable: boolean = true;

    /**
     * 轮廓线样式。
     * @member {string}
     */
    protected strokeStyle: string = "solid";

    /**
     * 圆形的值。
     * @member {object}
     */
    protected value: object =
    {
        // 圆中心
        center: [113.979596, 22.532278],

        // 半径，单位：米
        radius: 500
    };
}
</script>
