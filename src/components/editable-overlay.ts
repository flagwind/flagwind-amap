/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import Overlay from "./overlay";

/**
 * 表示一个可编辑的覆盖物。
 * @class
 * @version 1.0.0
 */
export default abstract class EditableOverlay extends Overlay
{
    private _editor: any;                                       // 编辑器实例
    private _editorListeners: Array<AMap.EventListener>;        // 编辑器事件监听器列表

    /**
     * 获取编辑器实例。
     * @property {any}
     */
    protected get editor(): any
    {
        return this._editor;
    }

    protected set editor(value: any)
    {
        if(!this._editor)
        {
            this._editor = value;

            this.registerEditorEvents();
        }
    }

    /**
     * 当销毁组件后调用的钩子方法。
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        if(this._editorListeners)
        {
            for(const listener of this._editorListeners)
            {
                AMap.event.removeListener(listener);
            }

            this.listeners = [];
        }
        
        // 关闭编辑器
        this.editor && this.editor.close();

        super.destroyed();
    }
    
    /**
     * 获取配置属性处理程序列表。
     * @description 当属性值发生变动时调用的函数。
     * @override
     * @returns object
     */
    protected getOptionHandlers(): object
    {
        const self = this;

        const handlers =
        {
            editable(value: boolean)
            {
                value === true ? self.editor.open() : self.editor.close();
            }
        };

        return {...super.getOptionHandlers(), ...handlers};
    }
    
    /**
     * 注册编辑器事件。
     * @returns void
     */
    private registerEditorEvents(): void
    {
        const events = ["addnode", "adjust", "removenode", "end", "move"];

        // 根据传入的事件监听器过滤支持的事件名
        const eventNames = Object.keys(this.$listeners).filter((e: string) => ~events.indexOf(e));

        this._editorListeners = this._editorListeners || [];
        
        for(const eventName of eventNames)
        {
            const listener = AMap.event.addListener(this.editor, eventName, (e: any) =>
            {
                // 基于原生事件参数对象，注入事件源
                e.source = this;
                
                // 通过 Vue 的事件模型转发高德原生事件
                this.$emit(eventName, e);

            }, this);

            this._editorListeners.push(listener);
        }
    }
}
