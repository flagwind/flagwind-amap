/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

 /**
  * GeometryUtil为一组空间数据计算的函数库。
  * 支持点线面的空间关系计算、长度、面积计算等等。
  * @namespace
  * @description v1.4.2新增
  */
declare namespace AMap.GeometryUtil
{
    /**
     * 计算两个经纬度点之间的实际距离。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @returns number
     */
    function distance(p1: LngLat | [number, number], p2: LngLat | [number, number]): number;
    
    /**
     * 计算一个经纬度路径围成区域的实际面积。
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns number
     */
    function ringArea(ring: Array<LngLat | [number, number]>): number;
    
    /**
     * 判断一个经纬度路径是否为顺时针。
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function isClockwise(ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 计算一个经纬度路径的实际长度。
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns number
     */
    function distanceOfLine(ring: Array<LngLat | [number, number]>): number;
    
    /**
     * 计算两个经纬度面的交叉区域。
     * @param  {Array<LngLat | [number, number]>} ring1
     * @param  {Array<LngLat | [number, number]>} ring2
     * @returns number
     */
    function ringRingClip(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): number;
    
    /**
     * 判断两个经纬度面是否交叉。
     * @param  {Array<LngLat | [number, number]>} ring1
     * @param  {Array<LngLat | [number, number]>} ring2
     * @returns boolean
     */
    function doesRingRingIntersect(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断经纬度路径和经纬度面是否交叉。
     * @param  {Array<LngLat | [number, number]>} line
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function doesLineRingIntersect(line: Array<LngLat | [number, number]>, ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断两个经纬度路径是否相交。
     * @param  {Array<LngLat | [number, number]>} line1
     * @param  {Array<LngLat | [number, number]>} line2
     * @returns boolean
     */
    function doesLineLineIntersect(line1: Array<LngLat | [number, number]>, line2: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断线段和多个环是否相交。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {Array<Array<LngLat | [number, number]>>} rings
     * @returns boolean
     */
    function doesSegmentPolygonIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>): boolean;
    
    /**
     * 判断线段和一个环是否相交。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function doesSegmentRingIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断线段和一个路径是否相交。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {Array<LngLat | [number, number]>} line
     * @returns boolean
     */
    function doesSegmentLineIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], line: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断两个线段是否相交。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {LngLat | [number, number]} p3
     * @param  {LngLat | [number, number]} p4
     * @returns boolean
     */
    function doesSegmentsIntersect(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number], p4: LngLat | [number, number]): boolean;
    
    /**
     * 判断点是否在环内。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function isPointInRing(p: LngLat | [number, number], ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断环是否在另一个环内。
     * @param  {Array<LngLat | [number, number]>} ring1
     * @param  {Array<LngLat | [number, number]>} ring2
     * @returns boolean
     */
    function isRingInRing(ring1: Array<LngLat | [number, number]>, ring2: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 判断点是否在多个环组成区域内。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<Array<LngLat | [number, number]>>} rings
     * @returns boolean
     */
    function isPointInPolygon(p: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>): boolean;
    
    /**
     * 将一个路径变为顺时针。
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function makesureClockwise(ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 将一个路径变为逆时针。
     * @param  {Array<LngLat | [number, number]>} ring
     * @returns boolean
     */
    function makesureAntiClockwise(ring: Array<LngLat | [number, number]>): boolean;
    
    /**
     * 计算P2、P3上距离P1最近的点。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {LngLat | [number, number]} p3
     * @returns LngLat | [number, number]
     */
    function closestOnSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number]): LngLat | [number, number];
    
    /**
     * 计算line上距离P最近的点。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<LngLat | [number, number]>} line
     * @returns LngLat | [number, number]
     */
    function closestOnLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>): LngLat | [number, number];
    
    /**
     * 计算P2、P3到P1的距离。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {LngLat | [number, number]} p3
     * @returns number
     */
    function distanceToSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number]): number;
    
    /**
     * 计算P到line的距离。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<LngLat | [number, number]>} line
     * @returns number
     */
    function distanceToLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>): number;
    
    /**
     * 判断P1是否在P2、P3上，tolerance为误差范围。
     * @param  {LngLat | [number, number]} p1
     * @param  {LngLat | [number, number]} p2
     * @param  {LngLat | [number, number]} p3
     * @param  {number} tolerance
     * @returns boolean
     */
    function isPointOnSegment(p1: LngLat | [number, number], p2: LngLat | [number, number], p3: LngLat | [number, number], tolerance: number): boolean;
    
    /**
     * 判断P是否在line上，tolerance为误差范围。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<LngLat | [number, number]>} line
     * @param  {number} tolerance
     * @returns boolean
     */
    function isPointOnLine(p: LngLat | [number, number], line: Array<LngLat | [number, number]>, tolerance: number): boolean;
    
    /**
     * 判断P是否在ring的边上，tolerance为误差范围。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<LngLat | [number, number]>} line
     * @param  {number} tolerance
     * @returns boolean
     */
    function isPointOnRing(p: LngLat | [number, number], ring: Array<LngLat | [number, number]>, tolerance: number): boolean;
    
    /**
     * 判断P是否在多个ring的边上，tolerance为误差范围。
     * @param  {LngLat | [number, number]} p
     * @param  {Array<Array<LngLat | [number, number]>>} rings
     * @param  {number} tolerance
     * @returns boolean
     */
    function isPointOnPolygon(p: LngLat | [number, number], rings: Array<Array<LngLat | [number, number]>>, tolerance: number): boolean;
}
