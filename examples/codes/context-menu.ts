const generic = `
<template>
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

<style lang="less">
.context-menu-example
{
    height: 600px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 右键菜单组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ContextMenuView extends View
{
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
`;

export { generic };
