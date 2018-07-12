<template>
    <l-article>
        <h1>CircleMarker 圆点标记</h1>
        <h2>概述</h2>
        <p>圆点标记，不随地图级别变化而发生大小改变。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="circle-marker-example" :zoom="4" :center="[108, 34]">
                    <amap-circle-marker v-for="item in capitals"
                        :key="item.adcode"
                        :center="item.center"
                        :radius="10 + Math.random() * 10"
                        strokeColor="white"
                        :strokeWeight="2"
                        :strokeOpacity="0.5"
                        fillColor="#339933"
                        :fillOpacity="0.7"
                        :zIndex="10"
                        :bubble="true"
                        cursor="pointer"
                        :clickable="true">
                    </amap-circle-marker>
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
                        <th>名称</th>
                        <th>说明</th>
                        <th>数据类型</th>
                        <th>属性类型</th>
                        <th>默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>center</td>
                        <td>圆心位置。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>radius</td>
                        <td>圆点半径，单位：像素。</td>
                        <td>number</td>
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
                        <td>fillColor</td>
                        <td>填充颜色，使用16进制颜色代码赋值。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>#006600</td>
                    </tr>
                    <tr>
                        <td>fillOpacity</td>
                        <td>填充透明度，取值范围0-1，0表示完全透明，1表示不透明。默认为0.9。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>0.9</td>
                    </tr>
                    <tr>
                        <td>draggable</td>
                        <td>设置是否可拖拽移动。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>zIndex</td>
                        <td>覆盖物的叠加顺序。地图上存在多个多边形覆盖物叠加时，通过该属性使级别较高的多边形覆盖物在上层显示。</td>
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
                        <td>extData</td>
                        <td>用户自定义数据，支持JavaScript API任意数据类型，如ID等。</td>
                        <td>any</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>是否可见。</td>
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
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.circle-marker-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/circle-marker";

/**
 * 圆点标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class CircleMarkerView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;
    
    /**
     * 省会列表。
     * @member {Array<object>}
     */
    protected capitals: Array<object> =
    [
        {
            "citycode": "010",
            "adcode": "110000",
            "name": "北京市",
            "center": [116.407394, 39.904211]
        },
        {
            "citycode": "023",
            "adcode": "500000",
            "name": "重庆市",
            "center": [106.551643, 29.562849]
        },
        {
            "citycode": "1853",
            "adcode": "820000",
            "name": "澳门特别行政区",
            "center": [113.543028, 22.186835]
        },
        {
            "adcode": "440000",
            "name": "广东省",
            "center": [113.26641, 23.132324]
        },
        {
            "adcode": "350000",
            "name": "福建省",
            "center": [119.295143, 26.100779]
        },
        {
            "adcode": "460000",
            "name": "海南省",
            "center": [110.349228, 20.017377]
        },
        {
            "adcode": "140000",
            "name": "山西省",
            "center": [112.562678, 37.873499]
        },
        {
            "citycode": "1886",
            "adcode": "710000",
            "name": "台湾省",
            "center": [121.509062, 25.044332]
        },
        {
            "adcode": "520000",
            "name": "贵州省",
            "center": [106.70546, 26.600055]
        },
        {
            "adcode": "450000",
            "name": "广西壮族自治区",
            "center": [108.327546, 22.815478]
        },
        {
            "adcode": "620000",
            "name": "甘肃省",
            "center": [103.826447, 36.05956]
        },
        {
            "adcode": "410000",
            "name": "河南省",
            "center": [113.753394, 34.765869]
        },
        {
            "adcode": "130000",
            "name": "河北省",
            "center": [114.530235, 38.037433]
        },
        {
            "adcode": "340000",
            "name": "安徽省",
            "center": [117.329949, 31.733806]
        },
        {
            "adcode": "430000",
            "name": "湖南省",
            "center": [112.9836, 28.112743]
        },
        {
            "citycode": "021",
            "adcode": "310000",
            "name": "上海市",
            "center": [121.473662, 31.230372]
        },
        {
            "adcode": "420000",
            "name": "湖北省",
            "center": [114.341745, 30.546557]
        },
        {
            "adcode": "230000",
            "name": "黑龙江省",
            "center": [126.661665, 45.742366]
        },
        {
            "adcode": "150000",
            "name": "内蒙古自治区",
            "center": [111.76629, 40.81739]
        },
        {
            "adcode": "640000",
            "name": "宁夏回族自治区",
            "center": [106.259126, 38.472641]
        },
        {
            "adcode": "360000",
            "name": "江西省",
            "center": [115.81635, 28.63666]
        },
        {
            "adcode": "320000",
            "name": "江苏省",
            "center": [118.762765, 32.060875]
        },
        {
            "adcode": "220000",
            "name": "吉林省",
            "center": [125.32568, 43.897016]
        },
        {
            "adcode": "210000",
            "name": "辽宁省",
            "center": [123.431382, 41.836175]
        },
        {
            "adcode": "370000",
            "name": "山东省",
            "center": [117.019915, 36.671156]
        },
        {
            "adcode": "650000",
            "name": "新疆维吾尔自治区",
            "center": [87.627704, 43.793026]
        },
        {
            "citycode": "022",
            "adcode": "120000",
            "name": "天津市",
            "center": [117.200983, 39.084158]
        },
        {
            "adcode": "630000",
            "name": "青海省",
            "center": [101.780268, 36.620939]
        },
        {
            "adcode": "610000",
            "name": "陕西省",
            "center": [108.954347, 34.265502]
        },
        {
            "adcode": "540000",
            "name": "西藏自治区",
            "center": [91.117525, 29.647535]
        },
        {
            "adcode": "510000",
            "name": "四川省",
            "center": [104.075809, 30.651239]
        },
        {
            "citycode": "1852",
            "adcode": "810000",
            "name": "香港特别行政区",
            "center": [114.171203, 22.277468]
        },
        {
            "adcode": "530000",
            "name": "云南省",
            "center": [102.710002, 25.045806]
        },
        {
            "adcode": "330000",
            "name": "浙江省",
            "center": [120.152585, 30.266597]
        }
    ];
}
</script>
