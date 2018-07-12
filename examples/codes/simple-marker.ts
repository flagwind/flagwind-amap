const generic = `
<template>
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
`;

export { generic };
