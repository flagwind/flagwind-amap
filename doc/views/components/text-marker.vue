<template>
    <l-article>
        <h1>TextMarker 文本标记</h1>
        <h2>概述</h2>
        <p>纯文本标记。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="text-marker-example" :zoom="15" :center="[113.979596, 22.532278]">
                    <amap-text-marker cursor="pointer" text="文本标记" :draggable="true" :styles="markerStyles"></amap-text-marker>
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
                        <td>text</td>
                        <td>标记显示的文本内容。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>textAlign</td>
                        <td>横向位置，"left", "right", "center" 可选。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>verticalAlign</td>
                        <td>纵向位置，"top"，"middle"，"bottom" 可选。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>styles</td>
                        <td>文本样式。如同 CSS 样式表，如：{"background-color": "red"}</td>
                        <td>object</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>点标记在地图上显示的位置，默认为地图中心点。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>地图中心点</td>
                    </tr>
                    <tr>
                        <td>offset</td>
                        <td>点标记显示位置偏移量，默认值为 [-10, -34]。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>[-10, -34]</td>
                    </tr>
                    <tr>
                        <td>topWhenClick</td>
                        <td>鼠标点击时Marker是否置顶。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>draggable</td>
                        <td>设置点标记是否可拖拽移动。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>raiseOnDrag</td>
                        <td>拖拽点标记时是否开启点标记离开地图的效果。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>angle</td>
                        <td>点标记的旋转角度，广泛用于改变车辆行驶方向。<br />注：angle属性是使用CSS3来实现的，支持IE9及以上版本。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>autoRotation</td>
                        <td>
                            是否自动旋转。<br />
                            点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度，默认为false。<br />
                            广泛用于自动调节车辆行驶方向。<br />
                            IE8以下不支持旋转，autoRotation属性无效。
                        </td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>animation</td>
                        <td>
                            点标记的动画效果，取值范围：<br />
                            “AMAP_ANIMATION_NONE” 无动画效果<br />
                            “AMAP_ANIMATION_DROP” 点标掉落效果<br />
                            “AMAP_ANIMATION_BOUNCE” 点标弹跳效果<br />
                        </td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>AMAP_ANIMATION_NONE</td>
                    </tr>
                    <tr>
                        <td>shadow</td>
                        <td>
                            点标记阴影，不设置该属性则点标记无阴影。<br />
                            请传入如下格式：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;size?: [number, number],&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;图标尺寸<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;image?: string,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;图标的取图地址<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;imageSize?: [number, number],&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;根据所设置的大小拉伸或压缩图片<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;imageOffset?: [number, number]&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;图标取图偏移量<br />
                            }<br />
                        </td>
                        <td>object</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>title</td>
                        <td>鼠标滑过点标记时的文字提示，不设置则鼠标滑过点标无文字提示。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>clickable</td>
                        <td>点标记是否可点击。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>shape</td>
                        <td>设置 Marker 的可点击区域，在定义的区域内可触发 Marker 的鼠标点击事件。</td>
                        <td><a href="https://lbs.amap.com/api/javascript-api/reference/overlay#MarkerShapeOptions" target="_blank">MarkerShapeOptions</a></td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>zIndex</td>
                        <td>点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>100</td>
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
                        <td>用户自定义数据，支持JavaScript API任意数据类型，如Marker的ID等。</td>
                        <td>any</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>点标记是否可见。</td>
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
                        <td>moveTo(lnglat: [number, number], speed: number, func?: Function)</td>
                        <td>
                            以给定速度移动点标记到指定位置。<br />
                            参数lnglat为指定位置，必设；<br />
                            speed为指定速度，单位：千米/小时；<br />
                            回调函数f为变化曲线函数，缺省为function(k){return k}。
                        </td>
                        <td>void</td>
                    </tr>
                    <tr>
                        <td>moveAlong(path: Array&lt;[number, number]&gt;, speed: number, func?: Function, circlable?: boolean)</td>
                        <td>
                            以指定的速度，点标记沿指定的路径移动。<br />
                            参数path为轨迹路径的经纬度对象的数组；<br />
                            speed为指定速度，单位：千米/小时；<br />
                            回调函数f为变化曲线函数，缺省为function(k){return k}；<br />
                            参数circlable表明是否循环执行动画，默认为false
                        </td>
                        <td>void</td>
                    </tr>
                    <tr>
                        <td>pauseMove()</td>
                        <td>暂停点标记的动画效果。</td>
                        <td>void</td>
                    </tr>
                    <tr>
                        <td>resumeMove()</td>
                        <td>重新开始点标记的动画效果。</td>
                        <td>void</td>
                    </tr>
                    <tr>
                        <td>stopMove()</td>
                        <td>点标记停止动画。</td>
                        <td>void</td>
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
                        <td>moving</td>
                        <td>
                            点标记在执行moveTo，moveAlong动画时触发事件。<br />
                            object 对象的格式为：{passedPath: Array&lt;[number, number]&gt;}。<br />
                            其中passedPath为Marker对象在moveAlong或者moveTo过程中已经走过的路径。
                        </td>
                        <td>{passedPath, source}</td>
                    </tr>
                    <tr>
                        <td>moveend</td>
                        <td>点标记执行moveTo动画结束时触发事件，也可以由moveAlong方法触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>movealong</td>
                        <td>点标记执行moveAlong动画一次后触发事件。</td>
                        <td>{source}</td>
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
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.text-marker-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/text-marker";

/**
 * 文本标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class TextMarkerView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

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
