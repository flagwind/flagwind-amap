<template>
    <l-article>
        <h1>Marker 点标记</h1>
        <h2>概述</h2>
        <p>Marker 是一个用来往地图上添加点标记的组件。</p>
        <p>使用它将任何你希望用户看到的兴趣点标注在地图上，你可以为标注指定任意图标或者内容，以及文字标签。</p>
        <h2>代码示例</h2>
        <u-example title="综合示例" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="marker-example" :zoom="16" :center="[113.974222, 22.537001]">
                    <!--基本用法-->
                    <amap-marker :position="position1"></amap-marker>

                    <!--自定义图标并且可拖动-->
                    <amap-marker :position="position2" :icon="position2Icon" :draggable="true" :raiseOnDrag="true"></amap-marker>
                    
                    <!--自定义内容并且带出场动画-->
                    <amap-marker title="益田假日广场" :position="position3" animation="AMAP_ANIMATION_DROP">
                        <i-icon type="flag" :size="38" color="#ff0000"></i-icon>
                    </amap-marker>
                    
                    <!--自定义标签和内容并且携带扩展数据-->
                    <amap-marker :position="position4" :label="position4Label" :content="position4Content" :extData="position4Data" @click="onMarkerClick">
                    </amap-marker>
                </amap>
            </template>
            <template slot="desc">
                <i-button @click="visible = !visible">测试一下</i-button>
                <p>使用<code>position</code>属性设置点标记在地图上的显示位置。</p>
                <p>通过设置<code>draggable</code>为 true，可以让点标记拖拽移动。</p>
                <p>通过设置属性<code>icon</code>可以自定义点标记图标。</p>
                <p>使用插槽可以进行自定义渲染内容，同时设置<code>title</code>属性可以让鼠标滑过点标记时提示对应的文字。</p>
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
                        <td>icon</td>
                        <td>
                            点标记中显示的图标，可以是一个图标地址，或者Icon对象。<br />
                            如果是Icon对象，请传入如下格式：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;size?: [number, number],&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;图标尺寸，默认值[36, 36]<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;image?: string,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;图标的取图地址<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;imageSize?: [number, number],&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;根据所设置的大小拉伸或压缩图片，等同于CSS中的background-size属性<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;imageOffset?: [number, number]&nbsp;&nbsp;&nbsp;&nbsp;//&nbsp;当image中指定了一个大图时，可通过size和imageOffset配合，显示图标的指定范围<br />
                            }<br />
                        </td>
                        <td>string | object
                        </td>
                        <td>动态属性</td>
                        <td>蓝色图钉</td>
                    </tr>
                    <tr>
                        <td>content</td>
                        <td>
                            点标记显示内容，可以是HTML字符串或者DOM对象。content有效时，icon属性将被覆盖。<br />
                            建议采用 Vue 插槽设置自定义内容，例如：<br />
                            &lt;amap-marker :position="position"&gt;<br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&lt;i-icon type="flag" :size="36" color="#ff0000"&gt;&lt;/i-icon&gt;<br />
                            &lt;/amap-marker&gt;<br />
                        </td>
                        <td>string | HTMLElement</td>
                        <td>动态属性</td>
                        <td>-</td>
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
                        <td>label</td>
                        <td>
                            为点标记添加文本标注。<br />
                            请传入如下格式：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;content: string, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// 文本标注的内容<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;offset?: [number, number] // 偏移量，默认为：左上角[0, 0]<br />
                            }
                        </td>
                        <td>object</td>
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
.marker-example
{
    height: 600px;

    .marker-route
    {
        position: absolute;
        width: 40px;
        height: 44px;
        background: url(https://webapi.amap.com/theme/v1.3/images/newpc/poi-1.png) no-repeat;
        cursor: pointer;
    }

    .marker-marker-bus-from
    {
        background-position: -334px -180px;
    }
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/marker";

/**
 * 点标记组件示例。
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

    /**
     * 世界之窗坐标。
     * @member {Array<number>}
     */
    protected position1: Array<number> = [113.972976, 22.534607];

    /**
     * 欢乐谷坐标。
     * @member {Array<number>}
     */
    protected position2: Array<number> = [113.980606, 22.539449];

    /**
     * 欢乐谷点图标。
     * @member {object}
     */
    protected get position2Icon(): object
    {
        const icon =
        {
            size: [32, 32],
            image: "http://webapi.amap.com/ui/1.0/assets/position-picker.png",
            imageSize: [32, 32]
        };

        return icon;
    }

    /**
     * 益田假日广场坐标。
     * @member {Array<number>}
     */
    protected position3: Array<number> = [113.972446, 22.537833];

    /**
     * 南山中英文学校坐标。
     * @member {Array<number>}
     */
    protected position4: Array<number> = [113.966792, 22.537375];

    /**
     * 南山中英文学校点内容。
     * @member {Array<number>}
     */
    protected position4Content: string = '<div class="marker-route marker-marker-bus-from"></div>';

    /**
     * 南山中英文学校点标签。
     * @member {object}
     */
    protected position4Label: object =
    {
        offset: [-13, 45],
        content: "21点48分"
    };

    /**
     * 南山中英文学校点数据。
     * @member {object}
     */
    protected position4Data: object =
    {
        id: "P00001",
        name: "南山中英文学校",
        time: "2018-06-01 21:48:16",
        trails:
        [
            [113.966884, 22.537687],
            [113.966895, 22.537935],
            [113.9669, 22.538218],
            [113.966911, 22.538777],
            [113.966916, 22.539184]
        ]
    };

    /**
     * 当点击点标记时调用。
     * @returns void
     */
    protected onMarkerClick(e: any): void
    {
        // 获取Marker组件实例
        const marker = e.source;

        // 获取扩展数据
        const extData = marker.extData;
        
        marker.moveAlong(extData.trails, 60);
    }
}
</script>