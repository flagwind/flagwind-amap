<template>
    <l-article>
        <h1>SimpleMarker 简单标注</h1>
        <h2>概述</h2>
        <p>SimpleMarker（简单标注）继承自Marker，在已有功能的基础上，额外增加如下的支持：</p>
        <p>支持设置背景图标（iconTheme，iconStyle）和前景文字（iconLabel）；背景图标内置若干样式可供挑选，也支持自定义图片地址或者DOM结构。</p>
        <p>支持显示定位点，默认用红点标识，红点的中心即是经纬度（即position）对应的位置。<br />用于开发阶段，辅助开发者设置Marker图标相对于经纬度的显示偏移量。（即Marker的offset参数）</p>
        <h2>代码示例</h2>
        <u-example title="内置样式" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap ref="themeExample" class="simple-marker-example" :zoom="4" :center="[108, 34]" @initialized="onMapInitialized">
                    <amap-simple-marker v-for="point in points"
                        :key="point.id"
                        :iconTheme="point.iconTheme"
                        :iconStyle="point.iconStyle"
                        :iconLabel="point.iconLabel"
                        :showPositionPoint="showPositionPoint"
                        :position="point.position"
                        :label="point.label">
                    </amap-simple-marker>
                </amap>
                <br />
                <i-form :label-width="100">
                    <i-form-item label="切换主题">
                        <i-radio-group v-model="theme">
                            <i-radio v-for="(item, key) in themes" :label="key" :key="key"></i-radio>
                        </i-radio-group>
                    </i-form-item>
                    <i-form-item label="是否显示定位点">
                        <i-switch v-model="showPositionPoint"></i-switch>
                    </i-form-item>
                </i-form>
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
                        <td>iconTheme</td>
                        <td>样式主题，目前包括 default, fresh, numv1, numv2 4种，每个主题下内置一组特定的iconStyle可供选择。</td>
                        <td>string</td>
                        <td>静态属性</td>
                        <td>default</td>
                    </tr>
                    <tr>
                        <td>iconStyle</td>
                        <td>
                            背景图标样式, 可以有如下取值：<br />
                            1. string，内置的样式名，取值可通过SimpleMarker.getBuiltInIconStyles(iconTheme | string)获取，效果见这里；<br />
                            2. string，HTML 代码，需要以&lg;开头，以&gt;结尾， 比如&lt;div...&gt;，icon的DOM节点将使用这段HTML构造；<br />
                            3. string，图片的url地址。通常还需要配合设置offset选项（定位点的偏移量，以确定该图片的定位点）；<br />
                            4. HTMLElement, 某个DOM节点的引用，比如：<br />
                            document.createElement("div")、document.getElementById("...")等；<br />
                            5. object，img节点的属性值，比如 src, style, width, height等，比如：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;src: "图片地址",<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;style:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;width: "20px"<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
                            }
                        </td>
                        <td>string | object</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>

                    <tr>
                        <td>iconLabel</td>
                        <td>
                            图标前景文字，可以有如下取值：<br />
                            1. string， 普通文本，比如"A"（可以配合containerClassNames调整文字样式，详见下文）<br />
                            2. object, 内建的文字容器DOM节点(DIV)的属性值，比如 innerHTML,style等， 比如：<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;innerHTML: "&lt;div&gt;B&lt;/div&gt;",<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;style:<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;{<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: "red" //设置文字颜色<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;}<br />
                            }
                        </td>
                        <td>string | object</td>
                        <td>动态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>showPositionPoint</td>
                        <td>
                            是否显示定位点，可以有如下取值：<br />
                            1. boolean， 是否显示，默认false；通常在仅在开发阶段开启，辅助设置图标相对于经纬度位置（定位点）的偏移量（即Marker的offset参数）<br />
                            2. object{color:String, radius:number} , 显示特定颜色和半径的定位点，比如:<br />
                            {<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;color: "red", // 点的颜色<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;radius: 3     // 点的半径。 因圆形使用了CSS3的border-radius属性，IE8及以下浏览器会呈现正方形<br />
                            }
                        </td>
                        <td>boolean | object</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>containerClassNames</td>
                        <td>内建的DOM容器上附带的class，多个class name用空格分开。</td>
                        <td>string</td>
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
.simple-marker-example
{
    height: 600px;

    .amap-marker-label
    {
        font-size: 13px;
        border: 1px solid #b8b8b8;
        background: #fff;
        border-radius: 6px 6px 6px 0;
        color: #777;
        line-height: 130%;
    }
}
</style>

<script lang="ts">
import { component, watch, View } from "flagwind-web";
import * as code from "examples/codes/simple-marker";

/**
 * 简单标注组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class SimpleMarkerView extends View
{
    private pointsCache: object = {};            // 点位缓存对象

    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 需要渲染的点位对象。
     * @member {Array<object>}
     */
    protected points: Array<object> = [];
    
    /**
     * 主题列表。
     * @member {object}
     */
    protected themes: object =
    {
        "default": ["beige", "black", "blue", "cadetblue", "darkblue", "darkgreen", "darkred", "gray", "green", "lightblue", "lightgray", "lightgreen", "lightpink", "orange", "orchid", "pink", "purple", "red", "salmon", "white"],
        "fresh": ["beige", "black", "blue", "darkblue", "darkgreen", "darkyellow", "gray", "green", "lightblue", "lightgray", "lightgreen", "lightpink", "lightyellow", "orange", "orchid", "pink", "purple", "red", "salmon", "yellow"],
        "numv1": ["blue", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "blue-6", "blue-7", "blue-8", "blue-9", "blue-10", "blue-11", "blue-12", "blue-13", "blue-14", "blue-15", "blue-16", "blue-17", "blue-18", "blue-19", "blue-20", "end", "pass", "red", "red-1", "red-2", "red-3", "red-4", "red-5", "red-6", "red-7", "red-8", "red-9", "red-10", "red-11", "red-12", "red-13", "red-14", "red-15", "red-16", "red-17", "red-18", "red-19", "red-20", "start"],
        "numv2": ["blue", "blue-1", "blue-2", "blue-3", "blue-4", "blue-5", "blue-6", "blue-7", "blue-8", "blue-9", "blue-10", "blue-11", "blue-12", "blue-13", "blue-14", "blue-15", "blue-16", "blue-17", "blue-18", "blue-19", "blue-20", "lightblue", "red", "red-1", "red-2", "red-3", "red-4", "red-5", "red-6", "red-7", "red-8", "red-9", "red-10", "red-11", "red-12", "red-13", "red-14", "red-15", "red-16", "red-17", "red-18", "red-19", "red-20"]
    };
    
    /**
     * 当前主题。
     * @member {string}
     */
    protected theme: string = "default";

    /**
     * 是否显示定位点。
     * @member {boolean}
     */
    protected showPositionPoint: boolean = false;
    
    /**
     * 当地图组件初始化完成时调用。
     * @returns void
     */
    protected onMapInitialized(): void
    {
        // 根据默认主题刷新点位信息
        this.refreshPoints(this.theme);
    }

    /**
     * 当前主题发生改变时调用。
     * @param  {string} theme
     * @returns void
     */
    @watch("theme")
    protected onThemeChange(theme: string): void
    {
        this.refreshPoints(theme);
    }

    /**
     * 根据主题刷新点位信息。
     * @param  {string} theme
     * @returns void
     */
    private refreshPoints(theme: string): void
    {
        const map = (<any>this.$refs.themeExample).map as AMap.Map;
        const styles = this.themes[theme];
        let points = this.pointsCache[theme];
        
        if(!points || !points.length)
        {
            points = this.pointsCache[theme] = [];
            
            const noLabel = theme === "numv1" || theme === "numv2";

            // 根据地图中心和主题样式数量点生成网格
            const lngLats = this.getGridLngLats(map, map.getCenter(), 5, styles.length, 120, 60);

            for(let i = 0, len = lngLats.length; i < len; i++)
            {
                points.push
                ({
                    id: theme + i,
                    position: lngLats[i],
                    iconTheme: theme,
                    iconStyle: styles[i],
                    iconLabel: noLabel ? null :
                    {
                        innerHTML: String.fromCharCode("A".charCodeAt(0) + i),
                        style:
                        {
                            color: styles[i] === "white" ? "#000" : "#fff"
                        }
                    },
                    label:
                    {
                        content: styles[i],
                        offset: new AMap.Pixel(32, 25)
                    }
                });
            }
        }

        this.points = points;
    }
    
    /**
     * 返回一批网格排列的经纬度。
     * @param  {AMap.Map} map 地图实例。
     * @param  {AMap.LngLat} center 网格中心。
     * @param  {number} colNum 列数。
     * @param  {number} size 总数。
     * @param  {number} cellX 横向间距。
     * @param  {number} cellY 竖向间距。
     * @returns Array<AMap.LngLat>
     */
    private getGridLngLats(map: AMap.Map, center: AMap.LngLat, colNum: number, size: number, cellX: number = 70, cellY: number = 70): Array<AMap.LngLat>
    {
        let pxCenter = map.lnglatToPixel(center);
        let rowNum = Math.ceil(size / colNum);
        
        let startX = pxCenter.getX(),
            startY = pxCenter.getY();
        
        let lngLats = [];
        
        for(let r = 0; r < rowNum; r++)
        {
            for(let c = 0; c < colNum; c++)
            {
                let x = startX + (c - (colNum - 1) / 2) * (cellX);
                let y = startY + (r - (rowNum - 1) / 2) * (cellY);
                
                lngLats.push(map.pixelToLngLat(new AMap.Pixel(x, y)));
                
                if(lngLats.length >= size)
                {
                    break;
                }
            }
        }

        return lngLats;
    }
}
</script>
