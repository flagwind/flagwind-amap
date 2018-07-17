<template>
    <l-article>
        <h1>ContextMenu 右键菜单</h1>
        <h2>概述</h2>
        <p>地图右键菜单。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap class="context-menu-example" :zoom="15" :center="[113.979596, 22.532278]" @rightclick="onMapRightClick">
                    <amap-context-menu>
                        <amap-context-menu-item><i-icon type="close"></i-icon>{{title}}</amap-context-menu-item>
                    </amap-context-menu>
                </amap>
            </template>
            <template slot="desc">
                <i-button @click="onButtonClick">测试按钮</i-button>
            </template>
            <u-code slot="code" lang="html"></u-code>
        </u-example>
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
import * as code from "examples/codes/text-marker";

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

    protected i = 1;

    protected title: string = "放大一级";

    protected menuItems: Array<object> =
    [
        {
            name: "increase-level",
            title: "放大一级"
        },
        {
            name: "reduce-level",
            title: "缩小一级"
        },
        {
            name: "zoom-to-country",
            title: "缩放至全国范围"
        },
        {
            name: "insert-marker",
            title: "添加标记"
        }
    ];

    /**
     * 当在地图单击鼠标右键时调用。
     * @param {any}
     * @returns void
     */
    protected onMapRightClick(e: any): void
    {
        const point = e.lnglat;
        const contextMenu: any = this.$refs.defaultContextMenu;

        contextMenu.open(point);
    }

    protected onButtonClick(e: any): void
    {
        this.title = `放大一级${this.i++}`;
    }
}
</script>
