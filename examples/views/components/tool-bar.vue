<template>
    <l-article>
        <h1>ToolBar 工具条</h1>
        <h2>概述</h2>
        <p>地图工具条插件，可以用来控制地图的缩放和平移。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="tool-bar-example" :zoom="13" :center="center">
                    <amap-tool-bar></amap-tool-bar>
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
                        <td>动态属性</td>
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
                        <td>LT</td>
                    </tr>
                    <tr>
                        <td>ruler</td>
                        <td>标尺键盘是否可见。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>liteStyle</td>
                        <td>是否使用精简模式。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>direction</td>
                        <td>方向键盘是否可见。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>locate</td>
                        <td>是否显示定位按钮。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>noIpLocate</td>
                        <td>定位失败后，是否开启IP定位。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>autoPosition</td>
                        <td>是否自动定位，即地图初始化加载完成后，是否自动定位的用户所在地，仅在支持HTML5的浏览器中有效。</td>
                        <td>boolean</td>
                        <td>静态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>locationMarker</td>
                        <td>自定义定位图标，值为 <a href="https://lbs.amap.com/api/javascript-api/reference/overlay#MarkerOptions" target="_blank">AMap.Marker</a> 配置项。</td>
                        <td>object</td>
                        <td>静态属性</td>
                        <td>-</td>
                    </tr>
                    <tr>
                        <td>visible</td>
                        <td>工具条是否可见。</td>
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
                        <td>工具条显示时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>hide</td>
                        <td>工具条隐藏时触发此事件。</td>
                        <td>{source}</td>
                    </tr>
                    <tr>
                        <td>location</td>
                        <td>使用ToolBar定位按钮进行定位，定位完成时触发此事件。</td>
                        <td>{source, lnglat}</td>
                    </tr>
                    <tr>
                        <td>zoomchanged</td>
                        <td>使用工具条缩放地图时触发此事件。</td>
                        <td>{source, type}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.tool-bar-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/tool-bar";

/**
 * 工具条组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ToolBarView extends View
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
