<template>
    <l-article>
        <h1>ContextMenu 右键菜单</h1>
        <h2>概述</h2>
        <p>地图右键菜单。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="context-menu-example" mapStyle="amap://styles/whitesmoke" :zoom="15" :center="center" @rightclick="onMapRightClick">
                    <amap-marker :position="center" :label="label" @rightclick="onMarkerRightClick"></amap-marker>
                    
                    <!--默认右键菜单 BEGIN-->
                    <amap-context-menu v-model="defaultMenuVisible" :position="defaultMenuPosition" @select="onDefaultMenuSelect">
                        <amap-context-menu-item name="increase-level">放大一级</amap-context-menu-item>
                        <amap-context-menu-item name="reduce-level">缩小一级</amap-context-menu-item>
                        <amap-context-menu-item name="zoom-to-country">缩放至全国</amap-context-menu-item>
                    </amap-context-menu>
                    <!--默认右键菜单 END-->
                    
                    <!--自定义菜单 BEGIN-->
                    <amap-context-menu v-model="customMenuVisible" :position="customMenuPosition">
                        <i-collapse style="width:400px;" value="1">
                            <i-panel name="1">
                                史蒂夫·乔布斯
                                <p slot="content">史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                            </i-panel>
                            <i-panel name="2">
                                斯蒂夫·盖瑞·沃兹尼亚克
                                <p slot="content">斯蒂夫·盖瑞·沃兹尼亚克（Stephen Gary Wozniak），美国电脑工程师，曾与史蒂夫·乔布斯合伙创立苹果电脑（今之苹果公司）。斯蒂夫·盖瑞·沃兹尼亚克曾就读于美国科罗拉多大学，后转学入美国著名高等学府加州大学伯克利分校（UC Berkeley）并获得电机工程及计算机（EECS）本科学位（1987年）。</p>
                            </i-panel>
                            <i-panel name="3">
                                乔纳森·伊夫
                                <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
                            </i-panel>
                        </i-collapse>
                    </amap-context-menu>
                    <!--自定义菜单 END-->
                </amap>
            </template>
            <template slot="desc">
                <p>通过控制<code>value</code>属性来显示/隐藏右键菜单。</p>
                <p>设置<code>position</code>属性控制右键菜单的显示位置。</p>
                <p>除了默认展现形式，右键菜单同时支持自定义内容。</p>
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
                        <td>右键菜单是否显示，支持 v-model 双向绑定数据。</td>
                        <td>boolean</td>
                        <td>动态属性</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>右键菜单的显示位置。</td>
                        <td>[number, number]</td>
                        <td>动态属性</td>
                        <td>-</td>
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
                        <td>open</td>
                        <td>右键菜单打开事件。</td>
                        <td>{lnglat, source}</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>右键菜单关闭事件。</td>
                        <td>{lnglat, source}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">
.context-menu-example
{
    height: 800px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "doc/codes/context-menu";

/**
 * 右键菜单组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ContextMenuView extends View
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

    /**
     * 默认菜单是否显示。
     * @member {boolean}
     */
    protected defaultMenuVisible: boolean = false;

    /**
     * 默认菜单的显示位置。
     * @member {boolean}
     */
    protected defaultMenuPosition: Array<number> = [];

    /**
     * 自定义菜单是否显示。
     * @member {boolean}
     */
    protected customMenuVisible: boolean = false;

    /**
     * 自定义菜单的显示位置。
     * @member {boolean}
     */
    protected customMenuPosition: Array<number> = [];

    /**
     * 标注标签。
     * @member {object}
     */
    protected label: object =
    {
        content: "点击右键试试",
        offset: [-25, 45]
    };

    /**
     * 当在地图单击鼠标右键时调用。
     * @param {any} e
     * @returns void
     */
    protected onMapRightClick(e: any): void
    {
        this.defaultMenuPosition = e.lnglat;
        this.defaultMenuVisible = true;
    }

    /**
     * 当在标记上单击鼠标右键时调用。
     * @param {any} e
     * @returns void
     */
    protected onMarkerRightClick(e: any): void
    {
        this.customMenuPosition = e.lnglat;
        this.customMenuVisible = true;
    }

    /**
     * 当选中默认菜单项时调用。
     * @param {any} e
     * @returns void
     */
    protected onDefaultMenuSelect(e: any): void
    {
        const map: AMap.Map = e.source.map;

        switch(e.name)
        {
            case "increase-level":
            {
                map.zoomIn();

                break;
            }
            case "reduce-level":
            {
                map.zoomOut();

                break;
            }
            case "zoom-to-country":
            {
                 map.setZoomAndCenter(4, [108.946609, 34.262324]);

                 break;
            }
        }
    }
}
</script>
