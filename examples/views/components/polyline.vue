<template>
    <l-article>
        <h1>Polyline 折线</h1>
        <h2>概述</h2>
        <p>折线。</p>
        <h2>代码示例</h2>
        <u-example title="综合示例" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="polyline-example" :zoom="14" :center="[113.979596, 22.532278]">
                    <amap-polyline v-model="path"
                                :visible="visible"
                                :draggable="draggable"
                                :editable="editable"
                                :strokeWeight="6"
                                strokeColor="#011935"
                                :strokeOpacity="1"
                                :isOutline="true"
                                outlineColor="#fff"
                                :showDir="true"
                                lineJoin="round">
                    </amap-polyline>
                </amap>
            </template>
            <template slot="desc">
                <i-form :label-width="80">  
                    <i-form-item label="是否可见">
                        <i-switch v-model="visible"></i-switch>
                    </i-form-item>
                    <i-form-item label="是否可拖拽">
                        <i-switch v-model="draggable"></i-switch>
                    </i-form-item>
                    <i-form-item label="是否可编辑">
                        <i-switch v-model="editable"></i-switch>
                    </i-form-item>
                    <i-form-item v-show="editable" label="当前组件值">
                        <i-input type="textarea" :value="JSON.stringify(path)" :rows="4" />
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
                        <td>组件当前值，组成该折线的节点数组，支持 v-model 双向绑定数据。</td>
                        <td>Array&lt;[number, number]&gt;</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>geodesic</td>
                        <td>是否绘制成大地线。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>isOutline</td>
                        <td>线条是否带描边。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>borderWeight</td>
                        <td>描边的宽度。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>outlineColor</td>
                        <td>线条描边颜色，此项仅在isOutline为true时有效。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>#000000</td>
                    </tr>
                    <tr>
                        <td>lineJoin</td>
                        <td>折线拐点的绘制样式，默认值为"miter"尖角，其他可选值："round"圆角、"bevel"斜角。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>miter</td>
                    </tr>
                    <tr>
                        <td>lineCap</td>
                        <td>折线两端线帽的绘制样式，默认值为"butt"无头，其他可选值："round"圆头、"square"方头。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>butt</td>
                    </tr>
                    <tr>
                        <td>showDir</td>
                        <td>是否延路径显示白色方向箭头。<br />Canvas绘制时有效，建议折线宽度大于6时使用；在3D视图下不支持显示方向箭头。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>


                    <tr>
                        <td>zIndex</td>
                        <td>折线覆盖物的叠加顺序。地图上存在多个折线覆盖物叠加时，通过该属性使级别较高的折线覆盖物在上层显示。</td>
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
                        <td>draggable</td>
                        <td>设置折线是否可拖拽移动。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>editable</td>
                        <td>设置折线是否可编辑。</td>
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
                        <td>折线是否可见。</td>
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
                        <td>getPath()</td>
                        <td>获取折线轮廓线节点数组。</td>
                        <td>Array&lt;[number, number]&gt;<br /> | Array&lt;Array&lt;[number, number]&gt;&gt;</td>
                    </tr>
                    <tr>
                        <td>getBounds()</td>
                        <td>获取当前折线的矩形范围对象。</td>
                        <td>Array&lt;[number, number]&gt;</td>
                    </tr>
                    <tr>
                        <td>getArea()</td>
                        <td>获取折线的面积（单位：平方米）。</td>
                        <td>number</td>
                    </tr>
                    <tr>
                        <td>contains(point: [number, number])</td>
                        <td>判断指定点坐标是否在折线范围内。</td>
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
                        <td>addnode</td>
                        <td>编辑状态下，通过鼠标在折线上增加一个节点或在折线上增加一个顶点时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>adjust</td>
                        <td>编辑状态下，鼠标调整折线上某个节点或折线上某个顶点的位置时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>removenode</td>
                        <td>编辑状态下，通过鼠标在折线上删除一个节点或在折线上删除一个顶点时触发此事件。</td>
                        <td>{source}</td>
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
.polyline-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/polygon";

/**
 * 折线组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PolygonView extends View
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
     * 折线路径。
     * @member {Array[number, number]}
     */
    protected path: Array<[number, number]> =
    [
        [113.947055, 22.532665],
        [113.965938, 22.529454],
        [113.963535, 22.537738],
        [113.97126, 22.538174],
        [113.979414, 22.531436],
        [113.983361, 22.545229],
        [113.978104, 22.550342]
    ];
}
</script>
