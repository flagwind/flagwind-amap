<template>
    <l-generic>
        <div class="v-intro">
            <!--<fw-amap ref="fwAmap" :plugins="plugins" @click="onMapClick">
                <fw-amap-marker v-for="(marker, index) in markers" :key="index" vid="vid" :position="marker"></fw-amap-marker>
            </fw-amap>
            -->
            <i-button @click="onHiddenMarker2">移除marker2</i-button>
        </div>
    </l-generic>
</template>

<style lang="less" scoped>
.v-intro
{
    padding: 20px 25px;
}

.fw-amap
{
    width:100%;
    height:600px;
    margin:0 auto;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
// import { IMapLngLat } from "models";

// import AMap from "src/components/amap";
// import * as codes from "examples/codes";
// import * as options from "examples/options";

// @component
// ({
//     components:
//     {
//         "fw-amap": AMap
//     }
// })
@component
export default class Intro extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns any
     */
    // protected codes: any = codes;

    /**
     * 标记点
     * @protected
     * @member
     * @returns any
     */
    protected markers: any = [
        [114.04962, 22.56671],
        [114.0062427521, 22.548470663]
    ];

    /**
     * 地图插件列表。
     * @protected
     * @member
     * @returns Array<any>
     */
    protected plugins: Array<any> =
    [
        {
            name: "ToolBar"
        }
    ];

    protected onMapClick(e: any)
    {
        console.log(e);
    }

    /**
     * 移除点位2
     * @protected
     * @returns void
     */
    protected onHiddenMarker2(): void
    {
        this.markers.splice(1, 1);
    }
}
</script>
