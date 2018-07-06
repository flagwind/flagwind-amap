const generic = `
<template>
    <amap :zoom="16" :center="[113.974222, 22.537001]">
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

<style lang="less">
.amap
{
    height: 600px;
}

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
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 点标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class MarkerView extends View
{
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
`;

export { generic };
