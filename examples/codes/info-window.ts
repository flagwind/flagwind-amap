const generic = `
<template>
    <amap class="info-window-example" mapStyle="amap://styles/whitesmoke" :zoom="15" :center="center">
        <amap-simple-marker iconTheme="fresh" iconStyle="green" :label="point1.label" :position="point1.position" @click="onPoint1Click"></amap-simple-marker>

        <amap-info-window v-model="point1.visible" :position="point1.position">
            <i-circle :size="250"
                :trail-width="4"
                :stroke-width="5"
                :percent="75"
                stroke-linecap="square"
                stroke-color="#43a3fb">
                <div class="circle">
                    <h1>42,001,776</h1>
                    <p>消费人群规模</p>
                    <span>总占人数<i>75%</i></span>
                </div>
            </i-circle>
        </amap-info-window>
        
        <amap-simple-marker iconTheme="fresh" iconStyle="orange" :label="point2.label" :position="point2.position" @click="onPoint2Click"></amap-simple-marker>
        
        <amap-info-window v-model="point2.visible" :isCustom="true" :position="point2.position">
            <i-card style="width:350px">
                <p slot="title"><i-icon type="ios-film-outline"></i-icon> Classic film</p>
                <a href="javascript:void(0);" slot="extra" @click.prevent="onWindow2Close"><i-icon type="close"></i-icon> Close</a>
                <ul>
                    <li v-for="item in movieList" :key="item.name">
                        <a :href="item.url" target="_blank">{{ item.name }}</a>
                        <span><i-icon type="ios-star" v-for="n in 4" :key="n"></i-icon><i-icon type="ios-star" v-if="item.rate >= 9.5"></i-icon><i-icon type="ios-star-half" v-else></i-icon>{{ item.rate }}</span>
                    </li>
                </ul>
            </i-card>
        </amap-info-window>
    </amap>
</template>

<style lang="less">
.info-window-example
{
    height: 800px;

    .amap-marker-label
    {
        font-size: 13px;
        border: 1px solid #b8b8b8;
        background: #fff;
        border-radius: 6px 0 6px 0;
        color: #666;
        line-height: 130%;
    }

    .circle
    {
        h1
        {
            color: #3f414d;
            font-size: 28px;
            font-weight: normal;
        }

        p
        {
            color: #657180;
            font-size: 14px;
            margin: 10px 0 15px;
        }

        span
        {
            display: block;
            padding-top: 15px;
            color: #657180;
            font-size: 14px;

            &:before
            {
                content: '';
                display: block;
                width: 50px;
                height: 1px;
                margin: 0 auto;
                background: #e0e3e6;
                position: relative;
                top: -15px;
            };
        }

        span i
        {
            font-style: normal;
            color: #3f414d;
        }
    }
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 信息窗体组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class InfoWindowView extends View
{
    /**
     * 地图中心点。
     * @member {[number, number]}
     */
    protected center: [number, number] = [113.972976, 22.534607];
    
    /**
     * 默认窗体标注点位信息。
     * @member {object}
     */
    protected point1: any =
    {
        visible: false,

        position: [113.972976, 22.534607],

        label:
        {
            content: "默认窗体",

            offset: [-10, 50]
        }
    };

    /**
     * 自定义窗体标注点位信息。
     * @member {object}
     */
    protected point2: any =
    {
        visible: false,

        position: [113.980606, 22.539449],

        label:
        {
            content: "自定义窗体",

            offset: [-15, 50]
        }
    };

    /**
     * 自定义窗体数据。
     * @member {object}
     */
    protected movieList: Array<object> =
    [
        {
            name: "The Shawshank Redemption",
            url: "https://movie.douban.com/subject/1292052/",
            rate: 9.6
        },
        {
            name: "Leon:The Professional",
            url: "https://movie.douban.com/subject/1295644/",
            rate: 9.4
        },
        {
            name: "Farewell to My Concubine",
            url: "https://movie.douban.com/subject/1291546/",
            rate: 9.5
        },
        {
            name: "Forrest Gump",
            url: "https://movie.douban.com/subject/1292720/",
            rate: 9.4
        },
        {
            name: "Life Is Beautiful",
            url: "https://movie.douban.com/subject/1292063/",
            rate: 9.5
        }
    ];

    /**
     * 默认窗体标注点击时调用。
     * @param {any} e
     * @returns void
     */
    protected onPoint1Click(e: any): void
    {
        this.point1.visible = true;
    }

    /**
     * 自定义窗体标注点击时调用。
     * @param {any} e
     * @returns void
     */
    protected onPoint2Click(e: any): void
    {
        this.point2.visible = true;
    }

    /**
     * 自定义窗体关闭时调用。
     * @param {any} e
     * @returns void
     */
    protected onWindow2Close(): void
    {
        this.point2.visible = false;
    }
}
</script>`;

export { generic };
