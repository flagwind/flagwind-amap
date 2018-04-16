<template>
    <l-generic>
        <div class="v-intro">
            <amap></amap>
        </div>
    </l-generic>
</template>

<style lang="less" scoped>
.v-intro
{
    padding: 20px 25px;
}
</style>

<script lang="ts">
import { component, View } from "flagwind-web";
import amap from "src/index";

amap.init
({
    key: "fef37c12ffcfec32fe33d06081430de8"
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
}
</script>
