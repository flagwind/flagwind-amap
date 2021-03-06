/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import Type = flagwind.Type;

/**
 * 常用数据转换辅助类。
 * @class
 * @version 1.0.0
 */
export default class Convert
{
    /**
     * 将数组转换为像素坐标点。
     * @param  {[number, number]} source
     * @returns AMap.Pixel
     */
    public static toPixel(source: [number, number] | AMap.Pixel): AMap.Pixel
    {
        if(Array.isArray(source) && source.length)
        {
            return new AMap.Pixel(source[0], source[1]);
        }
        else if(source instanceof AMap.Pixel)
        {
            return source;
        }

        return null;
    }
    
    /**
     * 将像素坐标点转换为数组形式。
     * @param  {AMap.Pixel} source
     * @returns [number, number]
     */
    public static pixelTo(source: AMap.Pixel | [number, number]): [number, number]
    {
        if(source instanceof AMap.Pixel)
        {
            return [source.getX(), source.getY()];
        }
        else if(Array.isArray(source))
        {
            return source.slice() as [number, number];
        }

        return null;
    }
    
    /**
     * 将数组转换为像素尺寸。
     * @param  {[number, number]} source
     * @returns AMap.Size
     */
    public static toSize(source: [number, number] | AMap.Size): AMap.Size
    {
        if(Array.isArray(source) && source.length)
        {
            return new AMap.Size(source[0], source[1]);
        }
        else if(source instanceof AMap.Size)
        {
            return source;
        }
        
        return null;
    }
    
    /**
     * 将像素尺寸转换为数组形式。
     * @param  {AMap.Size} source
     * @returns [number, number]
     */
    public static sizeTo(source: AMap.Size | [number, number]): [number, number]
    {
        if(source instanceof AMap.Size)
        {
            return [source.getWidth(), source.getHeight()];
        }
        else if(Array.isArray(source))
        {
            return source.slice() as [number, number];
        }
        
        return null;
    }
    
    /**
     * 将数组转换为经纬度坐标。
     * @param  {[number, number]} source
     * @returns AMap.LngLat
     */
    public static toLngLat(source: [number, number] | AMap.LngLat): AMap.LngLat
    {
        if(Array.isArray(source) && source.length)
        {
            return new AMap.LngLat(source[0], source[1]);
        }
        else if(source instanceof AMap.LngLat)
        {
            return source;
        }

        return null;
    }
    
    /**
     * 将元组数组转换为经纬度坐标数组。
     * @param  {Array<any>} source
     * @returns Array
     */
    public static toLngLatArray(source: Array<any>): Array<AMap.LngLat | Array<AMap.LngLat>>
    {
        const result: Array<AMap.LngLat | Array<AMap.LngLat>> = [];

        for(let item of source)
        {
            // 数组项为元组时，调用转换方法转换为LngLat对象再加入返回列表中
            if(Type.isNumber(item[0]))
            {
                result.push(this.toLngLat(item as [number, number]));
            }
            // 数组项为LngLat对象时，直接加入返回列表中
            else if(item instanceof AMap.LngLat)
            {
                result.push(item);
            }
            // 数组项为为子数组时（多维数组的情况下），则需要递归处理
            else
            {
                result.push(...this.toLngLatArray(item));
            }
        }

        return result;
    }
    
    /**
     * 将经纬度坐标转换为数组。
     * @param  {AMap.LngLat} source
     * @returns [number, number]
     */
    public static lngLatTo(source: AMap.LngLat | [number, number]): [number, number]
    {
        if(source instanceof AMap.LngLat)
        {
            return [source.getLng(), source.getLat()];
        }
        else if(Array.isArray(source))
        {
            return source.slice() as [number, number];
        }
        
        return null;
    }
    
    /**
     * 将经纬度坐标源数组转换为元组数组。
     * @param  {Array<any>} source
     * @returns Array
     */
    public static lngLatToArray(source: Array<any>): Array<[number, number] | Array<[number, number]>>
    {
        const result: Array<[number, number] | Array<[number, number]>> = [];

        for(let item of source)
        {
            // 数组项为LngLat对象时，调用转换方法转换为元组再加入返回列表中
            if(item instanceof AMap.LngLat)
            {
                result.push(this.lngLatTo(item));
            }
            // 数组项为元组时，直接加入返回列表中
            else if(Type.isNumber(item[0]))
            {
                result.push(item);
            }
            // 数组项为为子数组时（多维数组的情况下），则需要递归处理
            else
            {
                result.push(...this.lngLatToArray(item));
            }
        }

        return result;
    }

    /**
     * 将数组转换为经纬度矩形。
     * @param  {[[number, number], [number, number]]} source
     * @returns AMap.Bounds
     */
    public static toBounds(source: [[number, number], [number, number]] | AMap.Bounds): AMap.Bounds
    {
        if(Array.isArray(source) && source.length)
        {
            return new AMap.Bounds(source[0], source[1]);
        }
        else if(source instanceof AMap.Bounds)
        {
            return source;
        }

        return null;
    }
    
    /**
     * 将经纬度矩形转换为数组。
     * @param  {AMap.Bounds | [[number, number], [number, number]]} source
     * @returns [[number, number], [number, number]]
     */
    public static boundsTo(source: AMap.Bounds | [[number, number], [number, number]]): [[number, number], [number, number]]
    {
        if(source instanceof AMap.Bounds)
        {
            return [this.lngLatTo(source.getSouthWest()), this.lngLatTo(source.getNorthEast())];
        }
        else if(Array.isArray(source))
        {
            return source.slice() as [[number, number], [number, number]];
        }

        return null;
    }
    
    /**
     * 将配置项转换为图标实例。
     * @param  {any} options
     * @returns AMap
     */
    public static toIcon(options: any): AMap.Icon
    {
        if(Type.isObject(options))
        {
            if(options.size)
            {
                options.size = Convert.toSize(options.size);
            }
            
            if(options.imageOffset)
            {
                options.imageOffset = Convert.toPixel(options.imageOffset);
            }

            if(options.imageSize)
            {
                options.imageSize = Convert.toSize(options.imageSize);
            }

            return new AMap.Icon(options);
        }
        
        return null;
    }
}
