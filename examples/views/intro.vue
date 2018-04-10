<template>
    <l-generic>
        <div class="v-intro">
            amap...
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
import * as codes from "examples/codes";
import * as options from "examples/options";

@component
export default class Intro extends View
{
    /**
     * 演示需要的代码。
     * @protected
     * @member
     * @returns any
     */
    protected codes: any = codes;

    /**
     * 演示需要的数据选项。
     * @protected
     * @member
     * @returns any
     */
    protected options: any = options;
}
</script>
