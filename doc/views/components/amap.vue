<template>
    <l-article>
        <h1>Map 地图</h1>
        <h2>概述</h2>
        <p>基础地图组件，封装了高德地图常用属性、事件等。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap :lang="lang" :mapStyle="style" :zoom="zoom" :city="city" style="height:500px"></amap>
                <br />
                <i-form :label-width="80">
                    <i-form-item label="语言切换">
                        <i-radio-group v-model="lang">
                            <i-radio label="zh_cn">中文</i-radio>
                            <i-radio label="en">英文</i-radio>
                        </i-radio-group>
                    </i-form-item>

                    <i-form-item label="风格切换">
                        <i-radio-group v-model="style">
                            <i-radio label="amap://styles/normal">标准</i-radio>
                            <i-radio label="amap://styles/light">月光银</i-radio>
                            <i-radio label="amap://styles/dark">幻影黑</i-radio>
                            <i-radio label="amap://styles/fresh">草色青</i-radio>
                            <i-radio label="amap://styles/grey">雅士灰</i-radio>
                            <i-radio label="amap://styles/graffiti">涂鸦</i-radio>
                            <i-radio label="amap://styles/whitesmoke">远山黛</i-radio>
                            <i-radio label="amap://styles/macaron">马卡龙</i-radio>
                            <i-radio label="amap://styles/blue">靛青蓝</i-radio>
                            <i-radio label="amap://styles/darkblue">极夜蓝</i-radio>
                        </i-radio-group>
                    </i-form-item>

                    <i-form-item label="城市切换">
                        <i-radio-group v-model="city">
                            <i-radio label="440300">深圳市</i-radio>
                            <i-radio label="440100">广州市</i-radio>
                            <i-radio label="310000">上海市</i-radio>
                            <i-radio label="110000">北京市</i-radio>
                            <i-radio label="810000">香港特别行政区</i-radio>
                            <i-radio label="820000">澳门特别行政区</i-radio>
                        </i-radio-group>
                    </i-form-item>
                    
                    <i-form-item label="缩放级别">
                        <i-input-number v-model="zoom" :max="18" :min="3"></i-input-number>
                    </i-form-item>
                </i-form>
            </template>
            <template slot="desc">
                <p>使用<code>center</code>或<code>city</code>属性设置地图显示的中心点。</p>
                <p>通过设置<code>zoom</code>属性可改变地图显示的缩放级别，在PC上，缩放级别默认在3-18之间，通过更改<code>zooms</code>属性可改变默认缩放范围。</p>
                <p>通过设置<code>mapStyle</code>属性控制地图的显示样式，目前支持两种地图样式：<br />1、高德官方样式，如：<code>amap://styles/light</code> <br />2、自定义地图样式，如：<code>amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86</code></p>
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
                        <td>viewMode</td>
                        <td>默认为"2D"，可选"3D"，选择"3D"会显示 3D 地图效果。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>2D</td>
                    </tr>
                    <tr>
                        <td>pitchEnable</td>
                        <td>是否允许设置俯仰角度，3D视图下为true，2D视图下设置无效。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>pitch</td>
                        <td>地图处于3D渲染模式下的俯仰角度(0°-83°)。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>maxPitch</td>
                        <td>设置地图的最大倾角。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>rotateEnable</td>
                        <td>地图是否可旋转，3D视图下为true，2D视图下设置无效。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>rotation</td>
                        <td>设置地图的旋转角度。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>skyColor</td>
                        <td>调整天空颜色，配合自定义地图，仅针对3D视图有效，如："#ff0000"。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>buildingAnimation</td>
                        <td>用于控制渲染楼块时是否带动画效果，3D视图有效，PC端默认true，手机端默认false。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>lang</td>
                        <td>地图的语言类型。<br />可选值：zh_cn(中文简体)，en(英文)，zh_en(中英文对照)。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>zh_cn</td>
                    </tr>
                    <!-- <tr>
                        <td>layers</td>
                        <td>地图图层数组，数组可以是<a href="http://lbs.amap.com/api/javascript-api/reference/layer" target="_blank">图层</a>中的一个或多个，默认为普通二维地图。<br />当叠加多个图层时，普通二维地图需通过实例化一个<a href="http://lbs.amap.com/api/javascript-api/reference/layer#TileLayer" target="_blank">TileLayer</a>类实现。</td>
                        <td>Array</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr> -->
                    <tr>
                        <td>zoomEnable</td>
                        <td>地图是否可缩放，默认值为true。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>zoom</td>
                        <td>地图显示的缩放级别，若<code>center</code>属性未赋值，地图初始化默认显示用户所在城市范围。<br />3D地图下，<code>zoom</code>值，可以设置为浮点数。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>zooms</td>
                        <td>地图显示的缩放级别范围。<br />在PC上，默认为[3,18]，取值范围[3-18]；<br />在移动设备上，默认为[3,19],取值范围[3-19]。</td>
                        <td>[number, number]</td>
                        <td>静态属性</td>
                        <td>[3,18]</td>
                    </tr>
                    <tr>
                        <td>center</td>
                        <td>设置地图显示的中心点[经度，纬度]。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>city</td>
                        <td>按照行政区名称或adcode来设置地图显示的中心点。<br />行政区名称支持中国、省、市、区/县名称，如遇重名的情况，会按城市编码表顺序返回第一个。<br />adcode请在<a href="http://a.amap.com/lbs/static/file/AMap_adcode_citycode.xlsx.zip" target="_blank">城市编码表</a>中查询。<br />注意：不要同时使用<code>center</code>和<code>city</code>属性，如一起使用将以<code>city</code>属性作为最终呈现结果。 </td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>labelzIndex</td>
                        <td>地图标注显示顺序，大于110可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。</td>
                        <td>number</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showLabel</td>
                        <td>设置地图是否显示地标标签。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>defaultCursor</td>
                        <td>设置鼠标指针默认样式，该属性应符合CSS的cursor属性规范。可为CSS标注中的光标样式，如："pointer"等。</td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>animateEnable</td>
                        <td>地图平移过程中是否使用动画。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>isHotspot</td>
                        <td>是否开启地图热点，默认false 不打开。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>resizeEnable</td>
                        <td>是否监控地图容器尺寸变化，默认值为false。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>showIndoorMap</td>
                        <td>是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>expandZoomRange</td>
                        <td>是否支持可以扩展最大缩放级别，和<code>zooms</code>属性配合使用。<br />设置为true的时候，<code>zooms</code>的最大级别在PC上可以扩大到20级，移动端为：高清19，非高清20。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>dragEnable</td>
                        <td>地图是否可通过鼠标拖拽平移，默认为true。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>doubleClickZoom</td>
                        <td>地图是否可通过双击鼠标放大地图，默认为true。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>keyboardEnable</td>
                        <td>地图是否可通过键盘控制，默认为true。<br />方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+"→"顺时针旋转，Ctrl+"←"逆时针旋转。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>jogEnable</td>
                        <td>地图是否使用缓动效果，默认为true。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>scrollWheel</td>
                        <td>地图是否可通过鼠标滚轮缩放浏览，默认为true。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>touchZoom</td>
                        <td>地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>touchZoomCenter</td>
                        <td>设置触控缩放中心，当 touchZoomCenter = 1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。</td>
                        <td>number</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>mapStyle</td>
                        <td>
                            设置地图的显示样式。<br />
                            目前支持官方样式模板，如："amap://styles/grey"<br />
                            或用户自定义地图样式，如："amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"<br />
                            可前往<a href="http://lbs.amap.com/dev/mapstyle/index" target="_blank">地图自定义平台</a>定制自己的个性地图样式。<br />
                            官方样式模板：<br />
                            标准：amap://styles/normal<br />
                            月光银：amap://styles/light<br />
                            幻影黑：amap://styles/dark<br />
                            草色青：amap://styles/fresh<br />
                            雅士灰：amap://styles/grey<br />
                            涂鸦：amap://styles/graffiti<br />
                            远山黛：amap://styles/whitesmoke<br />
                            马卡龙：amap://styles/macaron<br />
                            靛青蓝：amap://styles/blue<br />
                            极夜蓝：amap://styles/darkblue<br />
                        </td>
                        <td>string</td>
                        <td>动态属性</td>
                        <td>amap://styles/normal</td>
                    </tr>
                    <!-- <tr>
                        <td>plugins</td>
                        <td>需要加载的地图插件。</td>
                        <td>Array</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr> -->
                    <tr>
                        <td>features</td>
                        <td>设置地图上显示的元素种类。<br />支持"bg"（地图背景）、"point"（POI点）、"road"（道路）、"building"（建筑物）</td>
                        <td>Array&lt;string&gt;</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showBuildingBlock</td>
                        <td>设置地图显示3D楼块效果，移动端也可使用。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>preloadMode</td>
                        <td>设置地图的预加载模式，开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据，优化使用体验。</td>
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
                        <td>组件初始化完成后触发的事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>complete</td>
                        <td>地图图块加载完成后触发的事件。</td>
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
                        <td>mapmove</td>
                        <td>地图平移时触发事件。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>hotspotclick</td>
                        <td>鼠标点击热点时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>hotspotover</td>
                        <td>鼠标滑过热点时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>hotspotout</td>
                        <td>鼠标移出热点时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>movestart</td>
                        <td>地图平移开始时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>moveend</td>
                        <td>地图移动结束后触发，包括平移，以及中心点变化的缩放。如地图有拖拽缓动效果，则在缓动结束后触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>zoomchange</td>
                        <td>地图缩放级别更改后触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>zoomstart</td>
                        <td>缩放开始时触发。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>zoomend</td>
                        <td>缩放停止时触发。</td>
                        <td>{source}</td>
                    </tr>
                    
                    <tr>
                        <td>mousemove</td>
                        <td>鼠标在地图上移动时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mousewheel</td>
                        <td>鼠标滚轮开始缩放地图时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseover</td>
                        <td>鼠标移入地图容器内时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseout</td>
                        <td>鼠标移出地图容器时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mouseup</td>
                        <td>鼠标在地图上单击抬起时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>mousedown</td>
                        <td>鼠标在地图上单击按下时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>rightclick</td>
                        <td>鼠标右键单击事件。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragstart</td>
                        <td>开始拖拽地图时触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragging</td>
                        <td>拖拽地图过程中触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>dragend</td>
                        <td>停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                    <tr>
                        <td>resize</td>
                        <td>地图容器大小改变事件。</td>
                        <td>{source}</td>
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
                        <td>触摸结束时触发事件，仅适用移动设备。</td>
                        <td>{lnglat, pixel, source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less" scoped>
// .fw-amap
// {
//     width: 100%;
//     height: 550px;
// }
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/amap";

/**
 * 高德地图组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class AMapView extends View
{
    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 获取或设置地图的显示语言。
     * @member {string}
     */
    protected lang: string = "zh_cn";

    /**
     * 获取或设置地图的显示样式。
     * @member {string}
     */
    protected style: string = "amap://styles/normal";

    /**
     * 获取或设置地图的中心点（行政区域）。
     * @member {string}
     */
    protected city: string = "440300";
    
    /**
     * 获取或设置地图的缩放级别。
     * @member {number}
     */
    protected zoom: number = 11;

    /**
     * 获取或设置地图的中心点（经纬度）。
     * @member {Array<number>}
     */
    protected center: Array<number> = [114.065835, 22.56814];
}
</script>
