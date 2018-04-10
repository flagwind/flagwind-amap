<template>
    <div class="layout">
        <u-header></u-header>
        
        <div class="layout-wrapper">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { component, Component } from "flagwind-web";
import Header from "examples/components/header.vue";

/**
 * 表示一个包含头部的布局母版。
 * @class
 * @version 1.0.0
 */
@component({components: {"u-header": Header}})
export default class Generic extends Component
{
    
}
</script>
