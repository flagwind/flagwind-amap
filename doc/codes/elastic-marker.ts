const generic = `
<template>
    <amap class="elastic-marker-example"
        viewMode="3D"
        defaultCursor="pointer"
        :showIndoorMap="false"
        :showBuildingBlock="false"
        :zooms="[14, 20]"
        :showLabel="false"
        :zoom="16"
        :pitch="55"
        :rotation="-45"
        :center="[116.408967, 39.880101]">

    <!--多边形背景 BEGIN-->
    <amap-polygon
        :path="polygonPath"
        :bubble="true"
        fillColor="green"
        :fillOpacity="0.3"
        :strokeWeight="1">
    </amap-polygon>
    <!--多边形背景 END-->

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

<style lang="less">
.elastic-marker-example
{
    height: 600px;

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
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 灵活点标记组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class ElasticMarkerView extends View
{
    /**
     * 多边形背景点位。
     * @member {Array[number, number]}
     */
    protected polygonPath: Array<[number, number]> =
    [
        [116.419763, 39.882967],
        [116.419791, 39.882397],
        [116.419674, 39.882398],
        [116.419632, 39.882376],
        [116.419086, 39.882371],
        [116.41912, 39.88163],
        [116.41769, 39.881571],
        [116.417726, 39.880507],
        [116.417791, 39.879454],
        [116.417847, 39.878396],
        [116.417896, 39.87733],
        [116.418027, 39.874746],
        [116.418002, 39.874715],
        [116.417888, 39.874716],
        [116.417732, 39.874711],
        [116.417141, 39.874692],
        [116.416588, 39.874675],
        [116.415591, 39.874645],
        [116.413683, 39.874562],
        [116.413676, 39.874127],
        [116.412921, 39.874095],
        [116.41292, 39.874514],
        [116.412799, 39.874549],
        [116.412244, 39.874536],
        [116.411768, 39.874504],
        [116.411358, 39.874478],
        [116.410034, 39.874414],
        [116.408755, 39.874363],
        [116.408182, 39.874332],
        [116.407259, 39.87431],
        [116.406883, 39.8743],
        [116.406732, 39.877576],
        [116.406254, 39.877576],
        [116.405835, 39.877582],
        [116.40576, 39.877621],
        [116.40574, 39.878041],
        [116.405721, 39.878541],
        [116.404778, 39.878539],
        [116.404748, 39.878529],
        [116.404722, 39.87849],
        [116.404622, 39.878493],
        [116.403535, 39.878467],
        [116.402885, 39.878451],
        [116.402863, 39.879073],
        [116.403702, 39.879094],
        [116.404528, 39.879117],
        [116.404525, 39.879152],
        [116.404636, 39.879157],
        [116.405664, 39.879199],
        [116.405639, 39.879913],
        [116.405593, 39.880618],
        [116.404583, 39.880596],
        [116.404308, 39.880602],
        [116.403795, 39.880609],
        [116.403062, 39.880597],
        [116.402629, 39.880599],
        [116.40199, 39.88061],
        [116.401413, 39.880621],
        [116.400929, 39.880633],
        [116.400889, 39.880849],
        [116.400792, 39.880896],
        [116.400505, 39.880913],
        [116.400405, 39.880918],
        [116.400393, 39.88117],
        [116.400955, 39.881193],
        [116.40089, 39.881923],
        [116.400878, 39.882144],
        [116.400849, 39.882624],
        [116.400794, 39.883245],
        [116.400741, 39.883927],
        [116.400742, 39.884154],
        [116.401057, 39.885182],
        [116.400731, 39.885279],
        [116.400931, 39.885696],
        [116.401043, 39.885883],
        [116.40131, 39.886259],
        [116.401549, 39.886532],
        [116.401668, 39.88664],
        [116.403101, 39.886729],
        [116.403125, 39.886766],
        [116.403145, 39.886835],
        [116.403133, 39.886969],
        [116.403102, 39.887379],
        [116.403144, 39.88749],
        [116.403868, 39.88768],
        [116.404604, 39.887846],
        [116.40549, 39.887973],
        [116.406221, 39.888038],
        [116.40773, 39.888094],
        [116.409536, 39.888147],
        [116.411578, 39.888205],
        [116.413718, 39.888269],
        [116.414653, 39.888295],
        [116.415318, 39.888293],
        [116.41583, 39.888257],
        [116.416241, 39.888216],
        [116.416638, 39.88812],
        [116.416952, 39.88804],
        [116.417343, 39.887944],
        [116.417594, 39.887849],
        [116.417843, 39.887737],
        [116.41803, 39.887623],
        [116.418233, 39.887495],
        [116.418504, 39.887327],
        [116.418719, 39.887187],
        [116.418956, 39.887043],
        [116.419171, 39.886916],
        [116.419415, 39.886666],
        [116.419618, 39.886341],
        [116.42003, 39.885517],
        [116.420323, 39.884945],
        [116.420455, 39.88462],
        [116.420547, 39.884246],
        [116.420558, 39.883975],
        [116.420572, 39.883615],
        [116.420455, 39.883601],
        [116.419832, 39.883562],
        [116.419749, 39.883521],
        [116.41974, 39.88346],
        [116.419763, 39.882967]
    ];
    
    /**
     * 设施列表。
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
`;

export { generic };
