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
     * 驾车策略。
     * @enum
     */
    enum DrivingPolicy
    {
        /**
         * 最快捷模式。
         * @member {number}
         */
        LEAST_TIME,

        /**
         * 最经济模式。
         * @member {number}
         */
        LEAST_FEE,

        /**
         * 最短距离模式。
         * @member {number}
         */
        LEAST_DISTANCE,

        /**
         * 考虑实时路况。
         * @member {number}
         */
        REAL_TRAFFIC
    }

    interface DrivingOptions
    {
        /**
         * 驾车路线规划策略。
         * @member {DrivingPolicy}
         */
        policy?: DrivingPolicy;

        /**
         * 默认值：base，返回基本地址信息。
         * 当取值为：all，返回DriveStep基本信息+DriveStep详细信息。
         * @member {DrivingPolicy}
         * @default "base"
         */
        extensions?: string;

        /**
         * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * @member {Map}
         */
        map?: Map;

        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;

        /**
         * 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标                                
         * 默认值为：false
         * @member {boolean}
         */
        hideMarkers?: boolean;

        /**
         * 设置是否显示实时路况信息，默认设置为true。
         * 显示绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息。
         * @member {boolean}
         * @default true
         */
        showTraffic?: boolean;

        /**
         * 车牌省份的汉字缩写，用于判断是否限行，与number属性组合使用。
         * @member {string}
         */
        province?: string;
        
        /**
         * 除省份之外车牌的字母和数字，用于判断限行相关，与province属性组合使用。
         * @member {string}
         */
        number?: string;

        /**
         * 使用map属性时，绘制的规划线路是否显示描边。
         * @member {boolean}
         * @default true
         */
        isOutline?: boolean;

        /**
         * 使用map属性时，绘制的规划线路的描边颜色。
         * 缺省为"white"
         * @member {string}
         * @default "white"
         */
        outlineColor?: string;

        /**
         * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;
    }

    interface DrivingResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 驾车规划起点坐标。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 驾车规划终点坐标。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 驾车规划起点。
         * @member {Poi}
         */
        start?: Poi;

        /**
         * 驾车规划终点。
         * @member {Poi}
         */
        end?: Poi;

        /**
         * 驾车规划途经点。
         * @member {Poi}
         */
        waypoints?: Poi;

        /**
         * 打车费用，仅 extensions 为 "all" 时返回。
         * 单位：元。
         * @member {number}
         */
        taxi_cost?: number;

        /**
         * 驾车规划路线列表。
         * @member {DriveRoute}
         */
        routes?: Array<DriveRoute>;
    }

    interface DriveRoute
    {
        /**
         * 起点到终点的驾车距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 时间预计，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 驾车规划策略。
         * @member {string}
         */
        policy?: string;

        /**
         * 此驾车路线收费金额，单位：元。
         * @member {number}
         */
        tolls?: number;

        /**
         * 收费路段长度，单位：米。
         * @member {number}
         */
        tolls_distance?: number;

        /**
         * 子路段DriveStep集合。
         * @member {DriveStep}
         */
        steps?: Array<DriveStep>;

        /**
         * 限行结果。
         * 0 代表限行已规避或未限行，即该路线没有限行路段
         * 1 代表限行无法规避，即该线路有限行路段
         * @member {number}
         */
        restriction?: number;
    }

    interface DriveStep
    {
        /**
         * 此路段起点。
         * @member {LngLat | [number, number]}
         */
        start_location?: LngLat | [number, number];

        /**
         * 此路段终点。
         * @member {LngLat | [number, number]}
         */
        end_location?: LngLat | [number, number];

        /**
         * 此路段说明，如“沿北京南站路行驶565米右转”。
         * @member {string}
         */
        instruction?: string;

        /**
         * 本驾车子路段完成后动作。
         * @member {string}
         */
        action?: string;

        /**
         * 驾车子路段完成后辅助动作，一般为到达某个目的地时返回。
         * @member {string}
         */
        assist_action?: string;

        /**
         * 驾车方向。
         * @member {string}
         */
        orientation?: string;

        /**
         * 道路。
         * @member {string}
         */
        road?: string;

        /**
         * 此路段距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 此段收费，单位：元。
         * @member {number}
         */
        tolls?: number;

        /**
         * 收费路段长度，单位：米。
         * @member {number}
         */
        tolls_distance?: number;

        /**
         * 主要收费道路。
         * @member {string}
         */
        toll_road?: string;

        /**
         * 此路段预计使用时间，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 此路段坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 途径城市列表。
         * @member {Array<ViaCity>}
         */
        cities?: Array<ViaCity>;

        /**
         * 实时交通信息列表。
         * @member {Array<TMC>}
         */
        tmcs?: Array<TMC>;
    }

    interface ViaCity
    {
        /**
         * 途径名称。
         * @member {string}
         */
        name?: string;

        /**
         * 城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 途径行政区列表。
         * @member {Array<District>}
         */
        districts?: Array<District>;
    }

    interface TMC
    {
        /**
         * 路况信息对应的编码
         * 如果direction是正向 lcode返回值大于0；否则lcode，返回值小于0；
         * 如果返回0则说明此路段无lcode
         * @member {string}
         */
        lcode?: string;

        /**
         * 此lcode对应的路段长度，单位: 米。
         * @member {number}
         */
        distance?: number;

        /**
         * 路况状态，可能的值有：未知，畅通，缓行，拥堵。
         * @member {string}
         */
        status?: string;
    }

    /**
     * 驾车路线规划服务，提供起、终点坐标的驾车导航路线查询功能。
     * AMap.Driving构造函数的参数为 DrivingOptions 对象。
     * DrivingOptions 允许设置驾车策略和返回信息详略。用户可以通过自定义回调函数取回并显示查询结果。
     * 若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.Driving"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.Driving
     */
    class Driving extends EventDispatcher
    {
        /**
         * 构造函数，创建驾车路线规划实例。
         * @constructor
         * @param  {DrivingOptions} opts?
         */
        constructor(opts?: DrivingOptions);
        
        /**
         * 根据起点、终点和途经点（可选）坐标或名称，实现驾车路线规划，途经点通过opts设定，最多支持16个途径点，opts:{waypoints:Array.<LngLat>}；
         * status为complete时，result为DrivingResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果。
         * @param  {LngLat | [number, number]} origin
         * @param  {LngLat | [number, number]} destination
         * @param  {object} opts
         * @param  {Function} callback
         * @returns void
         */
        search(origin: LngLat | [number, number], destination: LngLat | [number, number], opts: { waypoints?: Array<LngLat | [number, number]> }, callback:(status: string, result: string | DrivingResult) => void): void;
        
        /**
         * 以名称关键字查询时，points为起点、终点和途经点（可选）名称及对应城市的数组，例如：
         * [
         *     {keyword: "北京南站", city: "北京市"},
         *     {keyword: "广东大厦", city: "北京市"},
         *     {keyword: "北京西站", city: "北京市"}
         * ]
         * 系统取数组第一个元素和最后一个元素作为起点和终点，中间元素为途经点；
         * @param  {Array<object>} points
         * @param  {Function} callback
         * @returns void
         */
        search(points: Array<{ keyword?: string, city?: string }>, callback: (status: string, result: string | DrivingResult) => void): void;
        
        /**
         * 设置驾车路线规划策略。
         * @param  {DrivingPolicy} policy
         * @returns void
         */
        setPolicy(policy: DrivingPolicy): void;
        
        /**
         * 设置避让区域，最大支持三个避让区域，参数为LngLat的二维数组。
         * @param  {Array<Array<LngLat | [number, number]>>} path
         * @returns void
         */
        setAvoidPolygons(path: Array<Array<LngLat | [number, number]>>): void;
        
        /**
         * 设置避让道路名称，只支持一条避让道路。
         * 注：避让道路和避让区域不能同时使用。
         * @param  {string} road
         * @returns void
         */
        setAvoidRoad(road: string): void;
        
        /**
         * 清除避让道路。
         * @returns void
         */
        clearAvoidRoad(): void;
        
        /**
         * 清除避让区域。
         * @returns void
         */
        clearAvoidPolygons(): void;
        
        /**
         * 获取避让区域，返回LngLat的二维数组。
         * @returns Array<Array<LngLat | [number, number]>>
         */
        getAvoidPolygons(): Array<Array<LngLat | [number, number]>>;
        
        /**
         * 获取避让道路。
         * @returns string
         */
        getAvoidRoad(): string;
        
        /**
         * 清除搜索结果。
         * @returns void
         */
        clear(): void;
        
        /**
         * 唤起高德地图客户端驾车路径规划。
         * obj参数形如：
         * {
         *     origin: LngLat,              // 起点坐标
         *     originName: "清华大学",       // 起点名称
         *     destination: LngLat,         // 终点坐标
         *     destinationName: "首开广场"   // 终点名称
         * }
         * @param  {object} obj
         * @returns void
         */
        searchOnAMAP(obj: object): void;
        
        /**
         * 设置车牌的汉字首字符和首字后的号码，设置后路线规划的结果将考虑该车牌在当前时间的限行路段。
         * @param  {string} province
         * @param  {string} number
         * @returns void
         */
        setProvinceAndnumber(province: string, number: string): void;
    }

    interface TruckDrivingOptions
    {
        /**
         * 路线规划策略，1-9。
         * @member {number}
         */
        policy?: number;

        /**
         * 车型大小，必填，1-4 分别对应小型至大型。
         * @member {number}
         */
        size?: number;

        /**
         * 宽度，缺省2.5米
         * @member {number}
         * @default 2.5
         */
        width?: number;

        /**
         * 高度，缺省1.6米。
         * @member {number}
         * @default 1.6
         */
        height?: number;

        /**
         * 载重，缺省0.9t。
         * @member {number}
         * @default 0.9
         */
        load?: number;

        /**
         * 自重，缺省10t。
         * @member {number}
         * @default 10
         */
        weight?: number;

        /**
         * 轴数，缺省 2 轴。
         * @member {number}
         * @default 2
         */
        axlesNum?: number;

        /**
         * 默认值：base，返回基本地址信息。
         * 当取值为：all，返回DriveStep基本信息+DriveStep详细信息。
         * @member {string}
         * @default "base"
         */
        extensions?: string;

        /**
         * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * @member {Map}
         */
        map?: Map;
        
        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;
        
        /**
         * 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标。
         * 默认值为：false
         * @member {boolean}
         * @default false
         */
        hideMarkers?: boolean;

        /**
         * 设置是否显示实时路况信息，默认设置为true。
         * 显示绿色代表畅通，黄色代表轻微拥堵，红色代表比较拥堵，灰色表示无路况信息。
         * @member {boolean}
         * @default true
         */
        showTraffic?: boolean;

        /**
         * 使用map属性时，绘制的规划线路是否显示描边。
         * 缺省为true。
         * @member {boolean}
         * @default true
         */
        isOutline?: boolean;

        /**
         * 使用map属性时，绘制的规划线路的描边颜色。缺省为"white"。
         * @member {string}
         * @default "white"
         */
        outlineColor?: string;

        /**
         * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;

        /**
         * 车辆牌照省份，如 "京"。
         * @member {string}
         */
        province?: string;

        /**
         * 车牌号，如 "111111"。
         * @member {string}
         */
        number?: string;
    }

    /**
     * 货车路线规划，数据返回结果与Driving一致。
     * @class
     * @description v1.4.4 新增，插件类，插件名："AMap.TruckDriving"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#truck
     */
    class TruckDriving extends EventDispatcher
    {
        /**
         * 构造函数，创建驾车路线规划实例。
         * @constructor
         * @param  {TruckDrivingOptions} opts?
         */
        constructor(opts?: TruckDrivingOptions);
        
        /**
         * 根据路径，实现货车路线规划。path支持两种格式：
         * 第一种,使用经纬度：
         * @example
         * var path = [];
         * // 起点
         * path.push
         * ({
         *     lnglat: [116.303843, 39.983412]       // 位置必填
         *     pid: "XXXX",                          // POI ID,可缺省
         *     type: "YYY"                           // POI类型，可缺省
         * });
         * // 途径
         * path.push({lnglat:[116.321354, 39.896436]});
         * // 终点
         * path.push({lnglat:[116.407012, 39.992093]});
         * truckdriving.search(path, function(status, result) { });
         * 第二种，使用关键字自动匹配：
         * @example
         * var path = 
         * [
         *     {keyword:"北京站", city:"010"},       // 起点
         *     {keyword:"北京西站", city:"010"},     // 途径
         *     {keyword:"北京大学", city:"010"}      // 终点
         * ];
         * truckdriving.search(path, function(status, result) { });
         * @param  {Array<object>} path
         * @param  {Function} callback
         * @returns void
         */
        search(path: Array<object>, callback: (status: string, result: string | DrivingResult) => void): void;
        
        /**
         * 清除搜索结果。
         * @returns void
         */
        clear(): void;
        
        /**
         * 修改车牌号。
         * @param  {string} province
         * @param  {string} number
         * @returns void
         */
        setProvinceAndnumber(province: string, number: string): void;
    }

    enum TransferPolicy
    {
        /**
         * 最快捷模式。
         * @member {number}
         */
        LEAST_TIME,

        /**
         * 最经济模式。
         * @member {number}
         */
        LEAST_FEE,

        /**
         * 最少换乘模式。
         * @member {number}
         */
        LEAST_TRANSFER,

        /**
         * 最少步行模式。
         * @member {number}
         */
        LEAST_WALK,

        /**
         * 最舒适模式。
         * @member {number}
         */
        MOST_COMFORT,

        /**
         * 不乘地铁模式。
         * @member {number}
         */
        NO_SUBWAY
    }

    interface TransferOptions
    {
        /**
         * 公交换乘的城市，支持城市名称、城市区号、电话区号，此项为必填。
         * @member {string}
         */
        city?: string;

        /**
         * 公交换乘策略。
         * @member {TransferPolicy}
         */
        policy?: TransferPolicy;

        /**
         * 是否计算夜班车，默认为不计算
         * true：计算，false：不计算
         * @member {boolean}
         */
        nightflag?: boolean;

        /**
         * 终点城市，跨城公交路径规划时为必填参数。
         * @member {string}
         */
        cityd?: string;

        /**
         * 返回结果控制。
         * 可选值：base/all
         * base:返回基本信息
         * all:返回全部信息
         * 默认值 ：base
         * @member {string}
         */
        extensions?: string;

        /**
         * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * 可选参数
         * @member {Map}
         */
        map?: Map;

        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * 可选参数。
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;

        /**
         * 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标 默认值为：false。
         * @member {boolean}
         */
        hideMarkers?: boolean;

        /**
         * 使用map属性时，绘制的规划线路是否显示描边。
         * 缺省为true。
         * @member {boolean}
         */
        isOutline?: boolean;

        /**
         * 使用map属性时，绘制的规划线路的描边颜色。
         * 缺省为"white"。
         * @member {string}
         */
        outlineColor?: string;

        /**
         * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;
    }

    interface TransferResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 公交换乘起点坐标。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 公交换乘终点坐标。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 公交换乘起点。
         * @member {Poi}
         */
        start?: Poi;

        /**
         * 公交换乘终点。
         * @member {Poi}
         */
        end?: Poi;

        /**
         * 出租车费用，单位：元。
         * @member {number}
         */
        taxi_cost?: number;

        /**
         * 换乘方案列表。
         * @member {Array<TransferPlan>}
         */
        plans?: Array<TransferPlan>;
    }

    interface TransferPlan
    {
        /**
         * 此换乘方案价格，单位：元。
         * @member {number}
         */
        cost?: number;

        /**
         * 预期时间，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 此换乘方案全程距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 是否夜间线路。
         * @member {boolean}
         */
        nightLine?: boolean;

        /**
         * 此方案总步行距离，单位：米。
         * @member {number}
         */
        walking_distance?: number;

        /**
         * 此方案公交行驶距离，单位：米。
         * @member {number}
         */
        transit_distance?: number;

        /**
         * 此方案火车行驶距离，单位：米。
         * @member {number}
         */
        railway_distance?: number;

        /**
         * 此方案出租车行驶距离，单位：米。
         * @member {number}
         */
        taxi_distance?: number;

        /**
         * 此换乘方案的路径坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 换乘路段列表，以每次换乘动结束作为分段点，将整个换乘方案分隔成若干 Segment（换乘路段）。
         * @member {Array<Segment>}
         */
        segments?: Array<Segment>;
    }

    interface Segment
    {
        /**
         * 此换乘段的文字描述。
         * 规则：当 transit_mode 为“WALK”时，步行 distance 到 on_station/全程终点；
         * 当 transit_mode 为“SUBWAY/BUS/METRO_RAIL”时，乘坐 line ，途径 via_num 站到 off_station/全程终点
         * @member {string}
         */
        instruction?: string;

        /**
         * 换乘动作类型，包括 BUS、SUBWAY、WALK、METRO_RAIL、RAILWAY、TAXI。
         * @member {string}
         */
        transit_mode?: string;

        /**
         * 此换乘段预期用时，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 此换乘段导航信息，当 transit_mode 为 “WALK” 时返回 WalkDetails，为 “BUS” 或 “SUBWAY/METRO_RAIL” 时返回 TransitDetails，当transit_mode为“RAILWAY”时，返回RailwayDetails，当transit_mode为“TAXI”时，返回TaxiDetails
         * @member {TransitDetails | WalkDetails}
         */
        transit?: TransitDetails | WalkDetails;

        /**
         * 此换乘段距离。
         * @member {number}
         */
        distance?: number;
    }

    interface TransitDetails
    {
        /**
         * 此换乘段的上车站。
         * @member {Stop}
         */
        on_station?: Stop;

        /**
         * 此换乘段的下车站。
         * @member {Stop}
         */
        off_station?: Stop;

        /**
         * 此换乘段公交路线。
         * @member {TransitLine}
         */
        lines?: Array<TransitLine>;

        /**
         * 途径公交站点数（不包括上车站和下车站）。
         * @member {number}
         */
        via_num?: number;

        /**
         * 途径公交站点集合（不包括上车站和下车站）。
         * @member {Array<Stop>}
         */
        via_stops?: Array<Stop>;

        /**
         * 此换乘段公交部分（上车站-下车站）坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 地铁站入口。
         * @member {SubwayEntrance}
         */
        entrance?: SubwayEntrance;

        /**
         * 地铁站出口。
         * @member {SubwayEntrance}
         */
        exit?: SubwayEntrance;
    }

    interface RailwayDetails
    {
        /**
         * 线路名称。
         * @member {string}
         */
        name?: string;

        /**
         * 线路id编码。
         * @member {string}
         */
        id?: string;

        /**
         * 线路车次类型，参考火车路线类型列表。
         * @member {string}
         */
        type?: string;

        /**
         * 线路车次号。
         * @member {number}
         */
        trip?: number;

        /**
         * 该线路车段耗时。
         * @member {number}
         */
        time?: number;

        /**
         * 火车始发站信息。
         * @member {Rail_Stop}
         */
        departure_stop?: Rail_Stop;

        /**
         * 聚合的备选方案，extensions=all时返回。
         * @member {Alter}
         */
        alters?: Array<Alter>;

        /**
         * 火车到站信息。
         * @member {Rail_Stop}
         */
        arrival_stop?: Rail_Stop;

        /**
         * 途经站点信息，extensions=all时返回。
         * @member {Array<Via_Stop>}
         */
        via_stops?: Array<Via_Stop>;

        /**
         * 仓位及价格信息。
         * @member {Array<Space>}
         */
        spaces?: Array<Space>;

        /**
         * 该换乘段的行车总距离。
         * @member {number}
         */
        distance?: number;
    }

    interface TaxiDetails
    {
        /**
         * 打车起点坐标。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 打车终点坐标。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 该方案的总距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 耗时，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 起点名称。
         * @member {string}
         */
        sname?: string;

        /**
         * 终点名称。
         * @member {string}
         */
        tname?: string;
    }

    interface TransitLine
    {
        /**
         * 公交路线名。
         * @member {string}
         */
        name?: string;

        /**
         * 公交路线ID。
         * @member {string}
         */
        id?: string;

        /**
         * 公交类型，参考公交类型列表。
         * @member {string}
         */
        type?: string;

        /**
         * 公交路线首班车时间。
         * @member {string}
         */
        stime?: string;

        /**
         * 公交路线末班车时间。
         * @member {string}
         */
        etime?: string;
    }

    interface SubwayEntrance
    {
        /**
         * 地铁口名称。
         * @member {string}
         */
        name?: string;

        /**
         * 地铁口经纬度坐标。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];
    }

    interface Stop
    {
        /**
         * 公交站点名称。
         * @member {string}
         */
        name?: string;

        /**
         * 公交站点ID。
         * @member {string}
         */
        id?: string;

        /**
         * 站点经纬度信息。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];
    }

    interface Via_Stop
    {
        /**
         * 途径车站点名称。
         * @member {string}
         */
        name?: string;

        /**
         * 途径车站点ID。
         * @member {string}
         */
        id?: string;

        /**
         * 站点经纬度信息。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 途径站点的停靠时间，单位：分钟。
         * @member {number}
         */
        wait?: number;

        /**
         * 途径站点的进站时间，如大于24:00,则表示跨天。
         * @member {number}
         */
        time?: number;
    }

    interface Rail_Stop
    {
        /**
         * 上、下车站点名称。
         * @member {string}
         */
        name?: string;

        /**
         * 上、下车站点ID。
         * @member {string}
         */
        id?: string;

        /**
         * 上、下站点经纬度信息。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 上、下车站点所在城市的adcode。
         * @member {number}
         */
        adcode?: number;

        /**
         * 上下车点发车时间。
         * @member {number}
         */
        time?: number;
    }

    interface Space
    {
        /**
         * 仓位编码，参考仓位级别表。
         * @member {number}
         */
        type?: number;

        /**
         * 仓位费用。
         * @member {number}
         */
        cost?: number;
    }

    interface Alter
    {
        /**
         * 备选方案ID。
         * @member {number}
         */
        id?: number;

        /**
         * 备选线路名称。
         * @member {string}
         */
        name?: string;
    }

    /**
     * 公交换乘服务，提供起始点公交路线规划服务，目前公交换乘仅支持同一城市的公交路线规划，跨城市出行规划请参考驾车导航查询。
     * 公交换乘查询返回结果整合步行信息，若换乘路段（Segment）换乘类型为地铁 “SUBWAY”，则至少包含一条地铁口信息（SubwayEntrance）。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.Transfer"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferPolicy
     */
    class Transfer extends EventDispatcher
    {
        /**
         * 构造函数，提供公交换成查询功能。
         * @constructor
         * @param  {TransferOptions} opts?
         */
        constructor(opts?: TransferOptions);
        
        /**
         * 根据起点和终点坐标进行公交换乘查询。
         * @param  {LngLat | [number, number]} origin
         * @param  {LngLat | [number, number]} destination
         * @param  {Function} callback
         * @returns void
         */
        search(origin: LngLat | [number, number], destination: LngLat | [number, number], callback: (status: string, result: string | TransferResult) => void): void;
        
        /**
         * 根据起、终点名称查询时，point为包含起点、终点的数组，例：
         * [
         *     {keyword: "北京南站"},
         *     {keyword: "北京西站"}
         * ]
         * 当数组超过两个元素时，取前两个元素为起点、终点，其余元素忽略；
         * @param  {Array<object>} point
         * @param  {Function} callback
         * @returns void
         */
        search(point: [{keyword: string}, {keyword: string}], callback: (status: string, result: string | TransferResult) => void): void;
        
        /**
         * 设置公交换乘策略
         * @param  {TransferPolicy} policy
         * @returns void
         */
        setPolicy(policy: TransferPolicy): void;
        
        /**
         * 设置公交换乘查询的城市
         * @param  {string} city
         * @returns void
         */
        setCity(city: string): void;
        
        /**
         * 设置公交换乘查询的城市
         * @param  {string} city
         * @returns void
         */
        setCityd(city: string): void;
        
        /**
         * 设置公交路径规划出发时间
         * @param  {string} time
         * @param  {string} data
         * @returns void
         */
        leaveAt(time: string, data: string): void;
        
        /**
         * 清除结果显示
         * @returns void
         */
        clear(): void;
        
        /**
         * 唤起高德地图客户端公交路径规划
         * obj参数形如：
         * {
         *     origin: LngLat,                   // 起点坐标
         *     originName: "清华大学",            // 起点名称
         *     destination: LngLat,              // 终点坐标
         *     destinationName: "首开广场"       // 终点名称
         * }
         * @param  {object} obj
         * @returns void
         */
        searchOnAMAP(obj: object): void;
    }

    interface WalkingOptions
    {
        /**
         * AMap.Map对象, 展现结果的地图实例。当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * 可选参数
         * @member {Map}
         */
        map?: Map;

        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * 可选参数。
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;

        /**
         * 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标。
         * 默认值为：false。
         * @member {boolean}
         * @default false
         */
        hideMarkers?: boolean;

        /**
         * 使用map属性时，绘制的规划线路是否显示描边。
         * 缺省为true。
         * @member {boolean}
         * @default true
         */
        isOutline?: boolean;

        /**
         * 使用map属性时，绘制的规划线路的描边颜色。
         * 缺省为"white"。
         * @default "white"
         * @member {string}
         */
        outlineColor?: string;

        /**
         * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围。
         * @member {string}
         */
        autoFitView?: string;
    }

    interface WalkingResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 步行导航起点坐标。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 步行导航终点坐标。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 步行导航起点。
         * @member {Poi}
         */
        start?: Poi;

        /**
         * 步行导航终点。
         * @member {Poi}
         */
        end?: Poi;

        /**
         * 步行导航路段数目。
         * @member {number}
         */
        count?: number;

        /**
         * 步行规划路线列表。
         * @member {Array<WalkRoute>}
         */
        routes?: Array<WalkRoute>;
    }

    interface WalkRoute
    {
        /**
         * 起点到终点总步行距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 步行时间预计，单位：秒。
         * @member {number}
         */
        time?: number;
        
        /**
         * 路段列表，以道路名称作为分段依据，将整个步行导航方案分隔成若干路段。
         * @member {Array<WalkStep>}
         */
        steps?: Array<WalkStep>;
    }

    interface WalkDetails
    {
        /**
         * 此换乘段的步行起点。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 此换乘段的步行终点。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 步行子路段 WalkStep 列表。
         * @member {Array<WalkStep>}
         */
        steps?: Array<WalkStep>;

        /**
         * 此换乘段坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;
    }

    interface WalkStep
    {
        /**
         * 本路段的起点坐标。
         * @member {LngLat | [number, number]}
         */
        start_location?: LngLat | [number, number];

        /**
         * 本路段的终点坐标。
         * @member {LngLat | [number, number]}
         */
        end_location?: LngLat | [number, number];

        /**
         * 步行方向。
         * @member {string}
         */
        orientation?: string;

        /**
         * 步行子路段描述。
         * 规则：沿 road步行 distance 米 action，例：”沿北京站街步行351米”
         * @member {string}
         */
        instruction?: string;

        /**
         * 步行子路段距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 步行子路段预计使用时间，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 步行子路段坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 道路。
         * @member {string}
         */
        road?: string;

        /**
         * 本步行子路段完成后动作。
         * @member {string}
         */
        action?: string;

        /**
         * 步行子路段完成后辅助动作，一般为到达某个公交站点或目的地时返回。
         * @member {string}
         */
        assist_action?: string;
    }

    /**
     * AMap.Walking 步行导航服务，提供起始、终点步行路线查询服务。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.Walking"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.Walking
     */
    class Walking extends EventDispatcher
    {
        /**
         * 构造函数，提供步行路径规划功能。
         * @constructor
         * @param  {WalkingOptions} opts?
         */
        constructor(opts?: WalkingOptions);
        
        /**
         * 根据起点和终点坐标，实现步行导航规划。
         * @param  {LngLat | [number, number]} origin
         * @param  {LngLat | [number, number]} destination
         * @param  {Function} callback
         * @returns void
         */
        search(origin: LngLat | [number, number], destination: LngLat | [number, number], callback: (status: string, result: string | WalkingResult) => void): void;
        
        /**
         * 按起点、终点名称时，point为包含起点、终点的数组。
         * 例：
         * [
         *     {keyword: "方恒国际中心A座"},
         *     {keyword: "望京站"}
         * ]
         * 当数组超过两个元素时，取前两个元素为起点、终点，其余元素忽略；
         * 当status为complete时，result为WalkingResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果。
         * @param  {Array<object>} point
         * @param  {Function} callback
         * @returns void
         */
        search(point: Array<[{keyword: string}, {keyword: string}]>, callback: (status: string, result: string | WalkingResult) => void): void;
        
        /**
         * 清除搜索的结果。
         * @returns void
         */
        clear(): void;
    }

    interface RidingOptions
    {
        /**
         * AMap.Map对象, 展现结果的地图实例。
         * 当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * 可选参数
         * @member {Map}
         */
        map?: Map;

        /**
         * 骑行路线规划策略；可选值为：
         * 0：推荐路线及最快路线综合
         * 1：推荐路线
         * 2：最快路线
         * 默认值：0
         * @member {number}
         * @default 0
         */
        policy?: number;

        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * 可选参数
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;

        /**
         * 设置隐藏路径规划的起始点图标，设置为true：隐藏图标；设置false：显示图标 默认值为：false
         * @member {boolean}
         * @default false
         */
        hideMarkers?: boolean;

        /**
         * 使用map属性时，绘制的规划线路是否显示描边。缺省为true。
         * @member {boolean}
         * @default true
         */
        isOutline?: boolean;

        /**
         * 使用map属性时，绘制的规划线路的描边颜色。缺省为"white"。
         * @member {string}
         * @default "white"
         */
        outlineColor?: string;

        /**
         * 用于控制在路径规划结束后，是否自动调整地图视野使绘制的路线处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;
    }
    
    interface RidingResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 骑行导航起点坐标。
         * @member {LngLat | [number, number]}
         */
        origin?: LngLat | [number, number];

        /**
         * 骑行导航终点坐标。
         * @member {LngLat | [number, number]}
         */
        destination?: LngLat | [number, number];

        /**
         * 骑行导航起点。
         * @member {Poi}
         */
        start?: Poi;

        /**
         * 骑行导航终点。
         * @member {Poi}
         */
        end?: Poi;

        /**
         * 骑行导航路段数目。
         * @member {number}
         */
        count?: number;

        /**
         * 骑行规划路线列表。
         * @member {Array<RideRoute>}
         */
        routes?: Array<RideRoute>;
    }

    interface RideRoute
    {
        /**
         * 起点到终点总步行距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 步行时间预计，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 路段列表，以道路名称作为分段依据，将整个骑行导航方案分隔成若干路段。
         * @member {Array<RideStep>}
         */
        steps?: Array<RideStep>;
    }

    interface RideStep
    {
        /**
         * 本路段的起点坐标。
         * @member {LngLat | [number, number]}
         */
        start_location?: LngLat | [number, number];

        /**
         * 本路段的终点坐标。
         * @member {LngLat | [number, number]}
         */
        end_location?: LngLat | [number, number];
        
        /**
         * 此路段说明，如“沿北京南站路骑行565米右转”。
         * @member {string}
         */
        instruction?: string;

        /**
         * 此路段距离，单位：米。
         * @member {number}
         */
        distance?: number;

        /**
         * 此路段预计使用时间，单位：秒。
         * @member {number}
         */
        time?: number;

        /**
         * 此路段坐标集合。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 本骑行子路段完成后动作。
         * @member {string}
         */
        action?: string;

        /**
         * 本骑行子路段完成后辅助动作，一般为到达某个目的地时返回。
         * @member {string}
         */
        assist_action?: string;

        /**
         * 步行方向。
         * @member {string}
         */
        orientation?: string;

        /**
         * 道路。
         * @member {string}
         */
        road?: string;
    }

    /**
     * AMap.Riding骑行路径规划服务，提供起始、终点骑行路线查询服务。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.Riding"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#AMap.Riding
     */
    class Riding extends EventDispatcher
    {
        /**
         * 构造函数，提供步行路径规划功能。
         * @constructor
         * @param  {RidingOptions} opts?
         */
        constructor(opts?: RidingOptions);

        /**
         * 根据起点和终点坐标，实现骑行路径规划。
         * @param  {LngLat | [number, number]} origin
         * @param  {LngLat | [number, number]} destination
         * @param  {Function} callback
         * @returns void
         */
        search(origin: LngLat | [number, number], destination: LngLat | [number, number], callback: (status: string, result: string | RidingResult) => void): void;
        
        /**
         * 根据起点和终点名称，实现骑行路径规划。
         * point为包含起点、终点的数组，例：
         * [
         *     {keyword: "方恒国际中心A座"},
         *     {keyword: "望京站"}
         * ]
         * 当数组超过两个元素时，取前两个元素为起点、终点，其余元素忽略；
         * 当status为complete时，result为WalkingResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果。
         * @param  {Array<object>} point
         * @param  {Function} callback
         * @returns void
         */
        search(point: Array<[{keyword: string}, {keyword: string}]>, callback: (status: string, result: string | RidingResult) => void): void;
        
        /**
         * 清除搜索的结果。
         * @returns void
         */
        clear(): void;
    }

    interface DragRouteOptions
    {
        /**
         * 设置拖拽路线插件的路线属性对象，包括线样式、宽度、颜色等，参考PolylineOptions列表。
         * @member {PolylineOptions}
         */
        polyOptions?: PolylineOptions;

        /**
         * 设置拖拽路线插件起点点标记属性对象，包括点标记样式、大小等，参考MarkerOptions列表。
         * @member {MarkerOptions}
         */
        startMarkerOptions?: MarkerOptions;

        /**
         * 设置拖拽路线插件途经点点标记属性对象，包括点标记样式、大小等，参考MarkerOptions列表列表。
         * @member {MarkerOptions}
         */
        midMarkerOptions?: MarkerOptions;
        
        /**
         * 设置拖拽路线插件终点点标记属性对象，包括点标记样式、大小等，参考MarkerOptions列表列表。
         * @member {MarkerOptions}
         */
        endMarkerOptions?: MarkerOptions;

        /**
         * 设置拖拽路线插件终点点标记属性对象，包括点标记样式、大小等，参考MarkerOptions列表列表。
         * @member {boolean}
         */
        showTraffic?: boolean;
    }
    
    /**
     * 拖拽导航插件。
     * 通过鼠标拖拽已有导航路径上的任一点，可以实现导航起点、途经点、终点的调整，系统根据调整后的起点、途经点、终点信息，实时查询拖拽后的导航路径并在地图上同步显示。
     * 支持驾车策略。建议途径点个数不超过16个，以保证良好的体验效果。
     * @class
     * @description 插件类，插件名："AMap.DragRoute"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#AMap.DragRoute
     */
    class DragRoute extends EventDispatcher
    {
        /**
         * DragRoute构造函数。
         * 参数Map为指定的地图对象，path指定导航的起点、途经点、终点的经纬度坐标数组，policy指定驾车策略。
         * 目前仅支持桌面浏览器。
         * @param  {Map} map
         * @param  {Array<LngLat | [number, number]} path
         * @param  {DrivingPolicy} policy
         * @param  {DragRouteOptions} opts?
         */
        constructor(map: Map, path: Array<LngLat | [number, number]>, policy: DrivingPolicy, opts?: DragRouteOptions);
        
        /**
         * 开始路径导航。
         * 支持鼠标拖拽导航路径节点，更改途经点时，系统实时重新计算并显示导航路径。
         * @returns void
         */
        search(): void;
        
        /**
         * 返回除了起点和终点之外的所有点。
         * @returns Array
         */
        getWays(): Array<LngLat | [number, number]>;
        
        /**
         * 返回当前导航路径，即导航路径的经纬度坐标数组，需要在complete回调中执行。
         * @returns Array
         */
        getRoute(): Array<LngLat | [number, number]>;
        
        /**
         * 销毁拖拽导航插件。
         * @returns void
         */
        destroy(): void;
    }

    interface ArrivalRangeOptions
    {
        /**
         * 公交出行策略,可选为：
         * 只坐地铁：SUBWAY, 
         * 只坐公交：BUS，缺省时为公交+地铁,BUS,SUBWAY
         * @member {string}
         */
        policy?: string;

        /**
         * 结果返回样式：polygon：返回多边形边界值，coverage：判断设定的终点坐标是否在到达圈范围内
         * @member {string}
         */
        resultType?: string;

        /**
         * 选择一个想到达的目的地坐标，最多支持5个目的地坐标。
         * @member {LngLat | [number, number] | Array<LngLat | [number, number]>}
         */
        destination?: LngLat | [number, number] | Array<LngLat | [number, number]>;
    }

    interface ArrivalRangeResult
    {
        /**
         * 查询状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 输出方式选择polygon时，返回到达圈边界坐标点。
         * @member {Array<LngLat | [number, number]>}
         */
        bounds?: Array<LngLat | [number, number]>;

        /**
         * 输出方式选择coverage时，返回提供的终点坐标是否在到达圈内。
         * @member {boolean}
         */
        inRange?: boolean;
    }
    
    /**
     * AMap.ArrivalRange根据输入的起点坐标和设定的时间范围，可以计算出用户在你设定的时间段内按公交出行方式，可以到达的距离范围。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.ArrivalRange"
     * @see http://lbs.amap.com/api/javascript-api/reference/route-search#m_AMap.ArrivalRange
     */
    class ArrivalRange extends EventDispatcher
    {
        /**
         * 计算某个时间段内用户通过公交出行可到达的距离范围。
         * @param  {LngLat | [number, number]} origin
         * @param  {number} time
         * @param  {Function} callback
         * @param  {ArrivalRangeOptions} opts?
         * @returns void
         */
        search(origin: LngLat | [number, number], time: number, callback: (status: string, result: string | ArrivalRangeResult) => void, opts?: ArrivalRangeOptions): void;
    }
}
