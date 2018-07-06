<template>
    <l-article>
        <h1>ElasticMarker 灵活点标记</h1>
        <h2>概述</h2>
        <p>灵活点标记，一种可以随着地图级别变化而改变图标和大小的点标记。</p>
        <h2>代码示例</h2>
        <u-example title="基本使用" :vertical="true" :hideCode="true">
            <template slot="case">
                <amap viewMode="3D"
                    defaultCursor="pointer"
                    :turboMode="false"
                    :showIndoorMap="false"
                    :showBuildingBlock="false"
                    :zooms="[14, 20]"
                    :showLabel="false"
                    :zoom="16"
                    :pitch="55"
                    :rotation="-45"
                    :center="[116.408967, 39.880101]"
                    :forceVector="true">
                    
                    <!--设施 BEGIN-->
                    <amap-elastic-marker v-for="facilitiy in facilities" 
                        :key="facilitiy.id"
                        :position="facilitiy.position"
                        :zooms="[14, 20]"
                        :styles="getFacilitiyStyles(facilitiy)"
                        :zoomStyleMapping="facilitiyMapping">
                    </amap-elastic-marker>
                    <!--设施 END-->

                    <!--景点 BEGIN-->
                    <amap-elastic-marker v-for="touristSpot in touristSpots"
                        :key="touristSpot.id"
                        :position="touristSpot.position"
                        :zooms="[14, 20]"
                        :styles="getTouristSpotStyles(touristSpot)"
                        :zoomStyleMapping="touristSpotMapping">
                    </amap-elastic-marker>
                    <!--景点 END-->
                </amap>
            </template>
            <template slot="desc">
            </template>
            <u-code slot="code" lang="html"></u-code>
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
                </tbody>
            </table>
        </div>
    </l-article>
</template>

<style lang="less">

.amap
{
    height: 600px;
}

.amap-marker-label
{
    display: inline-block;
    width: 60px;
    padding-top: 4px;
    padding-bottom: 4px;
    border-radius: 15px;
    border: solid 2px rgba(100, 255, 200, 0.8);
    font-size: 16px;
    text-align: center;
    font-family: "MSYAHEI";
    color: green;
    background-color: rgba(255, 255, 255, 0.4);
}

</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import * as code from "examples/codes/amap";

/**
 * 灵活点标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ElasticMarkerView extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member {object}
     */
    protected code: object = code;
    
    /**
     * 设施列表。
     * @protected
     * @member {Array<object>}
     */
    protected facilities: Array<object> =
    [
        {
            id: "facilitiy_1",
            name: "停车场",
            position: [116.418563, 39.883041],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/停车场.png"
        },
        {
            id: "facilitiy_2",
            name: "洗手间",
            position: [116.415419, 39.883125],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/洗手间.png"
        },
        {
            id: "facilitiy_3",
            name: "洗手间",
            position: [116.410226, 39.88364],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/洗手间.png"
        },
        {
            id: "facilitiy_4",
            name: "洗手间",
            position: [116.412247, 39.887258],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/洗手间.png"
        },
        {
            id: "facilitiy_5",
            name: "洗手间",
            position: [116.412701, 39.874841],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/洗手间.png"
        },
        {
            id: "facilitiy_6",
            name: "售票处",
            position: [116.412442, 39.887925],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/门票.png"
        },
        {
            id: "facilitiy_7",
            name: "售票处",
            position: [116.413039, 39.874522],
            icon: "https://a.amap.com/jsapi_demos/static/resource/img/门票.png"
        }
    ];

    /**
     * 设施的缩放映射关系。
     * @protected
     * @member {Array<object>}
     */
    protected facilitiyMapping: object =
    {
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0,
        19: 0,
        20: 0
    };

    /**
     * 景点列表。
     * @protected
     * @member {Array<object>}
     */
    protected touristSpots: Array<object> =
    [
        {
            id: "tourist_spot_1",
            name: "祈年殿",
            position: [116.412866, 39.88365],
            zIndex: 300,
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/故宫.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/qiniandian.png",
            size: [128, 160],
            ancher: [64, 153]
        },
        {
            id: "tourist_spot_2",
            name: "西天门",
            position: [116.405562, 39.881166],
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/门.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/men.png",
            size: [146, 144],
            ancher: [73, 140]
        },
        {
            id: "tourist_spot_3",
            name: "北天门",
            position: [116.412745, 39.885776],
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/门.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/men2.png",
            size: [185, 94],
            ancher: [93, 90]
        },
        {
            id: "tourist_spot_4",
            name: "百花园",
            position: [116.40783, 39.88212],
            zIndex: 200,
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/盆景02.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/men3.png",
            size: [210, 98],
            ancher: [105, 94]
        },
        {
            id: "tourist_spot_5",
            name: "万寿亭",
            position: [116.406792, 39.8837],
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/景点.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/tingzi.png",
            size: [128, 168],
            ancher: [64, 164]
        },
        {
            id: "tourist_spot_6",
            name: "圜丘",
            position: [116.413219, 39.876967],
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/景点.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/men4.png",
            size: [148, 137],
            ancher: [74, 133]
        },
        {
            id: "tourist_spot_7",
            name: "东天门",
            position: [116.417604, 39.881557],
            smallIcon: "https://a.amap.com/jsapi_demos/static/resource/img/门.png",
            bigIcon: "https://a.amap.com/jsapi_demos/static/resource/img/men2.png",
            size: [185, 94],
            ancher: [93, 90]
        }
    ];

    /**
     * 景点的缩放映射关系。
     * @protected
     * @member {object}
     */
    protected touristSpotMapping: object =
    {
        14: 0,
        15: 0,
        16: 1,
        17: 1,
        18: 1,
        19: 1,
        20: 1
    };

    /**
     * 获取设施的呈现样式。
     * @param  {any} item 设施项
     * @returns Array<object>
     */
    protected getFacilitiyStyles(item: any): Array<object>
    {
        const styles =
        [
            {
                icon:
                {
                    img: item.icon,
                    size: [16, 16],         // 可见区域的大小
                    ancher: [8, 16],        // 锚点
                    fitZoom: 14,            // 最合适的级别
                    scaleFactor: 2,         // 地图放大一级的缩放比例系数
                    maxScale: 1.4,          // 最大放大比例
                    minScale: 0.8           // 最小放大比例
                }
            }
        ];

        return styles;
    }

    /**
     * 获取景点的呈现样式。
     * @param  {any} item 设施项
     * @returns Array<object>
     */
    protected getTouristSpotStyles(item: any): Array<object>
    {
        const styles: Array<object> =
        [
            {
                icon:
                {
                    img: item.smallIcon,
                    size: [16, 16],           // 可见区域的大小
                    ancher: [8, 16],          // 锚点
                    fitZoom: 14,             // 最合适的级别
                    scaleFactor: 2,          // 地图放大一级的缩放比例系数
                    maxScale: 2,             // 最大放大比例
                    minScale: 1              // 最小放大比例
                },
                label:
                {
                    content: item.name,
                    offset: [-35, 0],
                    position: "BM",
                    minZoom: 15
                }
            },
            {
                icon:
                {
                    img: item.bigIcon,
                    size: item.size,
                    ancher: item.ancher,
                    fitZoom: 17.5,
                    scaleFactor: 2,
                    maxScale: 2,
                    minScale: 0.125
                },
                label:
                {
                    content: item.name,
                    offset: [-35, 0],
                    position: "BM"
                }
            }
        ];

        return styles;
    }
}
</script>
