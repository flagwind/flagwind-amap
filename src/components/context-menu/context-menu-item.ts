/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import Vue, { CreateElement, VNode } from "vue";
import { component, config, Component } from "flagwind-web";

/**
 * 右键菜单项。
 * @class
 * @version 1.0.0
 */
@component
({
    name: "amap-context-menu-item"
})
export default class ContextMenuItem extends Component
{
    private _originalText: string;
    private _currentText: string;

    /**
     * 当渲染组件时调用的钩子方法。
     * @override
     * @returns VNode
     */
    protected render(createElement: CreateElement): VNode
    {
        const slots = this.$slots.default || [];

        if(slots.length)
        {
            const x = createElement("div", slots);

            console.log(x);
        }

        return null;
    }
}
