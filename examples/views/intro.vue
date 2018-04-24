<template>
    <l-generic>
        <div class="v-intro">
            <fw-amap :plugins="plugins" @click="onMapClick"></fw-amap>
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
import amap from "src/index";

amap.init
({
    key: "fef37c12ffcfec32fe33d06081430de8",
    plugins: ["ToolBar"]
});

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
     * 演示需要的数据选项。
     * @protected
     * @member
     * @returns any
     */
    // protected options: any = options;

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
}
</script>
