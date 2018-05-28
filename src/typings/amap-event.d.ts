/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMap
{
    /**
     * 实现该接口的类型能提供事件注册、移除、触发功能。
     * @interface
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     */
    interface EventProvider
    {
        /**
         * 注册指定事件。
         * @param  {string} eventName 事件名称。
         * @param  {Function} handler 事件回调函数。
         * @param  {object} context? 事件回调中的上下文（可选，缺省时，handler 中 this 为调用 on 方法的对象本身，否则 this 指向 context 引用的对象）。
         * @description 多次绑定时，当 eventName、handler 函数对象、context 对象有任意一个不一样就会再次绑定。
         * @returns void
         */
        on(eventName: string, handler: Function, context?: object): void;
        
        /**
         * 移除指定事件。
         * @param  {string} eventName 事件名称。
         * @param  {Function} handler 事件回调函数。
         * @param  {object} context? 事件回调中的上下文（可选，缺省时为调用 off 方法的对象本身，否则为 context 引用的对象）
         * @description 只有当 off 与 on 的 eventName、handler 函数对象、context 对象完全一致时才能有效移除监听。
         * @returns void
         */
        off(eventName: string, handler: Function, context?: object): void;
    }

    /**
     * 表示一个事件监听器。
     * 此对象主要由 event.addDomListener()、event.addListener() 方法返回，在需要移除事件监听器时，作为参数传递给 event.removeListener() 方法。
     * @interface
     * @description v1.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     */
    interface EventListener
    {
    }

    /**
     * 此对象用于表示地图、覆盖物、叠加层上的各种鼠标事件参数。
     * @interface
     * @description v1.2 新增
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     */
    interface MapsEvent
    {
        /**
         * 事件类型。
         * @member
         * @returns string
         */
        type?: string;

        /**
         * 发生事件的目标对象。
         * @member
         * @returns object
         */
        target?: object;

        /**
         * 发生事件时光标所在处的经纬度坐标。
         * @member
         * @returns AMap.LngLat
         */
        lnglat?: AMap.LngLat;

        /**
         * 发生事件时光标所在处的像素坐标。
         * @member
         * @returns AMap.Pixel
         */
        pixel?: AMap.Pixel;
    }
}

declare namespace AMap.event
{
    /**
     * 注册 DOM 对象事件：给 DOM 对象注册事件，并返回 EventListener。
     * 运行 AMap.event.removeListener(eventListener) 可以删除该事件的监听器。
     * @param  {object} instance 需注册事件的 DOM 对象。
     * @param  {string} eventName 事件名称。
     * @param  {Function} handler 事件处理函数。
     * @param  {object} context? 事件上下文（可选，缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）。
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     * @returns EventListener
     */
    function addDomListener(instance: object, eventName: string, handler: Function, context?: object): EventListener;
    
    /**
     * 注册对象事件：给对象注册事件，并返回 EventListener。
     * 运行 AMap.event.removeListener(eventListener) 可以删除该事件的监听器。
     * @param  {object} instance 需注册事件的对象。
     * @param  {string} eventName 事件名称。
     * @param  {Function} handler 事件处理函数。
     * @param  {object} context? 事件上下文（可选，缺省时，handler 中 this 指向参数 instance 引用的对象，否则 this 指向 context 引用的对象）。
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     * @returns EventListener
     */
    function addListener(instance: object, eventName: string, handler: Function, context?: object): EventListener;
    
    /**
     * 类似于 addListener 方法，但事件只会被触发一次，之后将自动移除。
     * @param  {object} instance
     * @param  {string} eventName
     * @param  {Function} handler
     * @param  {object} context?
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     * @returns EventListener
     */
    function addListenerOnce(instance: object, eventName: string, handler: Function, context?: object): EventListener;
    
    /**
     * 删除由上述 event.addDomListener 和 event.addListener 传回的指定侦听器。
     * @param  {EventListener} listener
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     * @returns void
     */
    function removeListener(listener: EventListener): void;
    
    /**
     * 触发非 DOM 事件。
     * 触发非 DOM 事件 eventName 时，args 将扩展到事件监听函数（handler）接受到的 event 参数中。
     * 如：在 args 内写入 {m:10,p:2}，eventName 监听函数（handler）可以接收到包含 m,p 两个 key 值的 event 对象。
     * @param  {object} instance 
     * @param  {string} eventName
     * @param  {object} args?
     * @see http://lbs.amap.com/api/javascript-api/reference/event
     * @returns void
     */
    function trigger(instance: object, eventName: string, args?: object): void;
}
