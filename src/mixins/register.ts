/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import { component, Component } from "flagwind-web";

/**
 * 一个 Vue 混入类，提供地图组件注册功能。
 * @class
 * @version 1.0.0
 */
@component
export default class RegisterMixin extends Component
{
    protected mounted(): void
    {
        console.log("register mixin");
    }
    
    protected resolveProperties(): void
    {
        // sss
    }
}
