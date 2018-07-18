<template>
    <l-article>
        <h1>ContextMenu 右键菜单</h1>
        <h2>概述</h2>
        <p>地图右键菜单。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="context-menu-example" :zoom="15" :center="center" @rightclick="onMapRightClick">
                    <amap-marker :position="center" @rightclick="onMarkerRightClick"></amap-marker>
                    
                    <!--默认右键菜单 BEGIN-->
                    <amap-context-menu ref="defaultMenu" @select="onDefaultMenuSelect">
                        <amap-context-menu-item name="increase-level">放大一级</amap-context-menu-item>
                        <amap-context-menu-item name="reduce-level">缩小一级</amap-context-menu-item>
                        <amap-context-menu-item name="zoom-to-country">缩放至全国</amap-context-menu-item>
                    </amap-context-menu>
                    <!--默认右键菜单 END-->
                    
                    <!--自定义菜单 BEGIN-->
                    <amap-context-menu ref="customMenu">
                        <i-card style="width:320px;">
                            <h2 slot="title">自定义菜单</h2>
                            <p>Content of card</p>
                            <p>Content of card</p>
                            <p>Content of card</p>
                        </i-card>
                    </amap-context-menu>
                    <!--自定义菜单 END-->
                </amap>
            </template>
            <template slot="desc">
                <p>通过为菜单组件注册<code>ref</code>引用信息，然后调用组件的<code>open</code>方法即可展现右键菜单。</p>
                <p>除了默认展现形式，右键菜单同时支持自定义内容，但是自定义内容暂不支持动态更新。</p>
            </template>
            <u-code slot="code" lang="html">{{code.generic}}</u-code>
        </u-example>

        <div class="api">
            <h2>API</h2>

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
                        <td>open(point: [number, number])</td>
                        <td>在地图的指定位置打开右键菜单。</td>
                        <td>void</td>
                    </tr>
                    <tr>
                        <td>close()</td>
                        <td>关闭右键菜单。</td>
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
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/context-menu";

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
     * 当在地图单击鼠标右键时调用。
     * @param {any} e
     * @returns void
     */
    protected onMapRightClick(e: any): void
    {
        const point = e.lnglat;
        const contextMenu: any = this.$refs.defaultMenu;

        contextMenu.open(point);
    }

    /**
     * 当在标记上单击鼠标右键时调用。
     * @param {any} e
     * @returns void
     */
    protected onMarkerRightClick(e: any): void
    {
        const point = e.lnglat;
        const contextMenu: any = this.$refs.customMenu;

        contextMenu.open(point);
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
