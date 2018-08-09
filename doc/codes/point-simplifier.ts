const generic = `
<template>
    <amap class="point-simplifier-example" mapStyle="amap://styles/darkblue" :zoom="4" @initialized="onMapInitialized">
        <amap-point-simplifier ref="pointSimplifier"
            :zIndex="115"
            :data="data"
            :getPosition="options.getPosition"
            :getHoverTitle="options.getHoverTitle"
            renderEngine="group"
            :renderOptions="options.renderOptions">
        </amap-point-simplifier>
    </amap>
</template>

<style lang="less">
.point-simplifier-example
{
    height: 800px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";

/**
 * 海量点组件示例。
 * @class
 * @version 1.0.0
 */
@component
export default class PointSimplifierView extends View
{
    private _colors: Array<string> = ["#3366cc", "#dc3912", "#ff9900", "#109618", "#990099"];

    /**
     * 演示需要的代码。
     * @member {object}
     */
    protected code: object = code;

    /**
     * 海量点组件需要渲染的数据。
     * @member {Array<any>}
     */
    protected data: Array<any> = [];

    /**
     * 海量点组件的配置项。
     * @member {Array<any>}
     */
    protected options: object =
    {
        renderOptions:
        {
            getGroupId(item: any, index: number)
            {
                return item.groupId;
            },

            groupStyleOptions: (groupId: number) =>
            {
                const options =
                {
                    pointStyle:
                    {
                        fillStyle: this._colors[groupId]
                    }
                };

                return options;
            }
        },

        getPosition(item: any)
        {
            return item.position;
        },

        getHoverTitle(item: any, index: number)
        {
            return "序号：" + index};
        }
    };
    
    /**
     * 当地图初始化完成后触发。
     * @param  {e} any
     * @returns void
     */
    protected onMapInitialized(e: any): void
    {
        AMapUI.load(["lib/$"], ($: any) =>
        {
            // 加载 10 万个点
            $.get("https://a.amap.com/amap-ui/static/data/10w.txt", (csv: string) =>
            {
                const lines = csv.split("\n");
                const data = [];

                for(let i = 0, len = lines.length; i < len; i++)
                {
                    const line = lines[i];
                    
                    if(!line)
                    {
                        continue;
                    }

                    const parts = line.split(",");

                    data.push
                    ({
                        groupId: i % 5,
                        position: [parseFloat(parts[0]), parseFloat(parts[1])]
                    });
                }

                this.data = data;
            });
        });
    }
}
</script>
`;

export { generic };
