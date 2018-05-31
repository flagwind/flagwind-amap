/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

declare namespace AMap
{
    interface Cross
    {
        /**
         * 道路离查询点最近距离。
         * @member
         * @returns number
         */
        distance?: number;

        /**
         * 与查询点的相对方位。
         * @member
         * @returns string
         */
        direction?: string;

        /**
         * 路口经纬度。
         * @member
         * @returns LngLat | [number, number] 
         */
        location?: LngLat | [number, number];

        /**
         * 	第一条道路id。
         * @member
         * @returns string
         */
        first_id?: string;

        /**
         * 第一条道路名称。
         * @member
         * @returns string
         */
        first_name?: string;

        /**
         * 第二条道路id。
         * @member
         * @returns string
         */
        second_id?: string;

        /**
         * 第二条道路名称。
         * @member
         * @returns string
         */
        second_name?: string;
    }

    interface Road
    {
        /**
         * 道路id。
         * @member
         * @returns string
         */
        id?: string;

        /**
         * 道路名称。
         * @member
         * @returns string
         */
        name?: string;

        /**
         * 道路离查询点最近距离。
         * @member
         * @returns number
         */
        distance?: number;

        /**
         * 道路上离查询点最近的点坐标。
         * @member
         * @returns LngLat | [number, number] 
         */
        location?: LngLat | [number, number];

        /**
         * 与查询点的相对方位。
         * @member
         * @returns string
         */
        direction?: string;
    }

    interface BusinessArea
    {
        /**
         * 商圈id。
         * @member
         * @returns string
         */
        id?: string;

        /**
         * 商圈名称。
         * @member
         * @returns string
         */
        name?: string;

        /**
         * 商圈中心点经纬度。
         * @member
         * @returns LngLat | [number, number]
         */
        location?: LngLat | [number, number];
    }

    interface ReGeocodePoi
    {
        /**
         * Poi的唯一标识id。
         * @member
         * @returns string
         */
        id?: string;

        /**
         * Poi名称。
         * @member
         * @returns string
         */
        name?: string;

        /**
         * Poi类型。
         * @member
         * @returns string
         */
        type?: string;

        /**
         * Poi电话。
         * @member
         * @returns string
         */
        tel?: string;

        /**
         * 该Poi到请求坐标的距离，单位：米。
         * @member
         * @returns number
         */
        distance?: number;

        /**
         * 该Poi相对于请求坐标的方向。
         * @member
         * @returns string
         */
        direction?: string;

        /**
         * Poi地址信息。
         * @member
         * @returns string
         */
        address?: string;

        /**
         * Poi坐标。
         * @member
         * @returns string
         */
        location?: LngLat | [number, number];

        /**
         * Poi所在商圈名称。
         * @member
         * @returns string
         */
        businessArea?: string;
    }

    interface AddressComponent
    {
        /**
         * 所在省（省编码在城市编码表中可查询到）。
         * @member
         * @returns string
         */
        province?: string;

        /**
         * 所在城市。
         * @member
         * @returns string
         */
        city?: string;

        /**
         * 所在城市编码。
         * @member
         * @returns string
         */
        citycode?: string;

        /**
         * 所在区。
         * @member
         * @returns string
         */
        district?: string;

        /**
         * 所在区域编码。
         * @member
         * @returns string
         */
        adcode?: string;

        /**
         * 所在乡镇。
         * @member
         * @returns string
         */
        township?: string;

        /**
         * 所在街道。
         * @member
         * @returns string
         */
        street?: string;

        /**
         * 门牌号。
         * @member
         * @returns string
         */
        streetNumber?: string;

        /**
         * 所在社区。
         * @member
         * @returns string
         */
        neighborhood?: string;

        /**
         * 社区类型。
         * @member
         * @returns string
         */
        neighborhoodType?: string;

        /**
         * 所在楼/大厦。
         * @member
         * @returns string
         */
        building?: string;

        /**
         * 楼类型。
         * @member
         * @returns string
         */
        buildingType?: string;

        /**
         * 仅逆地理编码时返回，所属商圈信息。
         * @member
         * @returns Array<BusinessArea>
         */
        businessAreas?: Array<BusinessArea>;
    }

    interface ReGeocode
    {
        /**
         * 地址组成元素。
         * @member
         * @returns AddressComponent
         */
        addressComponent?: AddressComponent;

        /**
         * 格式化地址。
         * 规则：地址信息=基本行政区信息+具体信息；
         * 基本行政信息=省+市+区+乡镇
         * 当给定坐标为poi时直接返回；非poi时，取离给定坐标最近poi返回
         * @member
         * @returns string
         */
        formattedAddress?: string;

        /**
         * 道路信息列表。
         * @member
         * @returns Array<Road>
         */
        roads?: Array<Road>;

        /**
         * 道路路口列表。
         * @member
         * @returns Array<Cross>
         */
        crosses?: Array<Cross>;

        /**
         * 兴趣点列表，包含兴趣点基本信息。
         * @member
         * @returns Array<ReGeocodePoi>
         */
        pois?: Array<ReGeocodePoi>;
    }

    interface Geocode
    {
        /**
         * 地址组成元素。
         * @member
         * @returns AddressComponent
         */
        addressComponent?: AddressComponent;

        /**
         * 格式化地址。
         * 规则：地址信息=基本行政区信息+具体信息；
         * 基本行政信息=省+市+区+乡镇
         * 当给定坐标为poi时直接返回；非poi时，取离给定坐标最近poi返回
         * @member
         * @returns string
         */
        formattedAddress?: string;
        
        /**
         * 坐标。
         * @member
         * @returns LngLat | [number, number] 
         */
        location?: LngLat | [number, number];

        /**
         * 区域编码。
         * @member
         * @returns string
         */
        adcode?: string;

        /**
         * 给定地址匹配级别，返回匹配最详细级别。
         * 如：“北京市海淀区苏州街”匹配级别为“道路”
         * @member
         * @returns string
         */
        level?: string;
    }

    interface GeocoderResult
    {
        /**
         * 成功状态说明。
         * @member
         * @returns string
         */
        info?: string;
        
        /**
         * 地理编码结果，仅地理编码返回。
         * @member
         * @returns Array<Geocode>
         */
        geocodes?: Array<Geocode>;

        /**
         * 地理编码结果数目，仅地理编码返回。
         * @member
         * @returns number
         */
        resultNum?: number;

        /**
         * 逆地理编码结果，仅逆地理编码返回。
         * @member
         * @returns ReGeocode
         */
        regeocode?: ReGeocode;
    }

    interface ReGeocodeResult
    {
        /**
         * 成功状态说明。
         * @member
         * @returns string
         */
        info?: string;

        /**
         * 逆地理编码结果，仅逆地理编码返回。
         * @member
         * @returns ReGeocode
         */
        regeocode?: ReGeocode;
    }

    interface GeocodeResult
    {
        /**
         * 成功状态说明。
         * @member
         * @returns string
         */
        info?: string;
        
        /**
         * 地理编码结果，仅地理编码返回。
         * @member
         * @returns Array<Geocode>
         */
        geocodes?: Array<Geocode>;

        /**
         * 地理编码结果数目，仅地理编码返回。
         * @member
         * @returns number
         */
        resultNum?: number;
    }

    /**
     * Geocoder 类配置项。
     * @interface
     */
    interface GeocoderOptions
    {
        /**
         * 城市，地理编码时，设置地址描述所在城市，可选值：城市名（中文或中文全拼）、citycode、adcode；
         * 默认值："全国"
         * @member
         * @returns string
         */
        city?: string;

        /**
         * 逆地理编码时，以给定坐标为中心点，单位：米。
         * 取值范围：0-3000
         * 默认值：1000
         * @member
         * @default 1000
         * @returns number
         */
        radius?: number;

        /**
         * 设置语言类型。
         * @member
         * @returns string
         */
        lang?: string;

        /**
         * 是否批量查询。当值为false时即使传入多个点也只返回第一个点结果。
         * @member
         * @returns batch
         */
        batch?: boolean;

        /**
         * 逆地理编码时，返回信息的详略。
         * 默认值：base，返回基本地址信息；
         * 取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息。
         * @member
         * @returns string
         */
        extensions?: string;
    }

    /**
     * AMap.Geocoder 地理编码与逆地理编码类，用于地址描述与坐标之间的转换。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.Geocoder"
     * @see http://lbs.amap.com/api/javascript-api/reference/lnglat-to-address#m_AMap.Geocoder
     */
    class Geocoder extends EventProvider
    {
        /**
         * 构造函数，提供地理编码或逆地理编码功能。
         * @param  {GeocoderOptions} opts
         */
        constructor(opts?: GeocoderOptions);
        
        /**
         * 根据给定的地址描述进行解析，支持中文、拼音
         * 当status为complete时，result为GeocodeResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果 
         * @param  {string} address
         * @param  {Function} callback
         * @see http://lbs.amap.com/api/javascript-api/example/geocoder/geocoding/
         * @returns void
         */
        getLocation(address: string, callback: (status: string, result: string | GeocodeResult) => void): void;
        
        /**
         * 地理编码时，设置地址描述所在城市。
         * @param  {string} city
         * @returns void
         */
        setCity(city: string): void;
        
        /**
         * 根据给定坐标进行解析
         * 当status为complete时，result为ReGeocodeResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * 批量逆地理编码时，最多支持20个坐标点，超过20个坐标点，按20处理
         * @param  {LngLat | [number, number]} location
         * @param  {Function} callback
         * @see http://lbs.amap.com/api/javascript-api/example/geocoder/regeocoding/
         * @returns void
         */
        getAddress(location: LngLat | [number, number] | Array<LngLat | [number, number]>, callback: (status: string, result: string | ReGeocodeResult) => void): void;
    }

    interface ConvertorResult
    {
        /**
         * 成功状态文字描述。
         * @member
         * @returns string
         */
        info?: string;

        /**
         * 返回高德坐标集合。
         * @member
         * @returns Array<LngLat | [number, number]>
         */
        locations?: Array<LngLat | [number, number]>;
    }
    
    /**
     * 将其他地图服务商的坐标批量转换成高德地图经纬度坐标。
     * 最多支持40对坐标。
     * @param  {LngLat | [number, number]} lnglat
     * @param  {string} type 用于说明是哪个服务商的坐标,可选值有：gps:GPS原始坐标；baidu：百度经纬度；mapbar：图吧经纬度；
     * @param  {Function} callback
     * @returns void
     */
    function convertFrom(lnglat: LngLat | [number, number] | Array<LngLat | [number, number]>, type: "gps" | "baidu" | "mapbar", callback: (status: string, result: string | ConvertorResult) => void): void;

    interface Tip
    {
        /**
         * 名称。
         * @member
         * @returns string
         */
        name?: string;

        /**
         * 所属区域。
         * @member
         * @returns string
         */
        district?: string;

        /**
         * 区域编码。
         * @member
         * @returns string
         */
        adcode?: string;
    }

    interface AutocompleteResult
    {
        /**
         * 查询状态说明。
         * @member
         * @returns string
         */
        info?: string;

        /**
         * 输入提示条数。
         * @member
         * @returns number
         */
        count?: number;

        /**
         * 输入提示列表。
         * @member
         * @returns Array<Tip>
         */
        tips?: Array<Tip>;
    }

    /**
     * Autocomplete 类配置项。
     * @interface
     */
    interface AutocompleteOptions
    {
        /**
         * 输入提示时限定POI类型，多个类型用“|”分隔，POI相关类型请在网站“相关下载”处下载
         * 目前只支持Poi类型编码如“050000”
         * 默认值：所有类别
         * @member
         * @default 所有类别
         * @returns string
         */
        type?: string;

        /**
         * 输入提示时限定城市。
         * 可选值：城市名（中文或中文全拼）、citycode、adcode；
         * 默认值：“全国”
         * @member
         * @default 全国
         * @returns string
         */
        city?: string;

        /**
         * 返回的数据类型
         * 可选值：
         * all-返回所有数据类型、
         * poi-返回POI数据类型、
         * bus-返回公交站点数据类型、
         * busline-返回公交线路数据类型
         * 目前暂时不支持多种类型
         * @member
         * @returns string
         */
        datatype?: string;

        /**
         * 是否强制限制在设置的城市内搜索，默认值为：false。
         * @description true：强制限制设定城市，false：不强制限制设定城市
         * @member
         * @default false
         * @returns boolean
         */
        citylimit?: boolean;

        /**
         * 用来指定一个input输入框，设定之后，在input输入文字将自动生成下拉选择列表。支持传入输入框DOM对象的id值，或直接传入输入框的DOM对象。
         * @member
         * @returns string | HTMLInputElement
         */
        input?: string | HTMLInputElement;

        /**
         * 指定一个现有的div的id或者元素，作为展示提示结果的容器，当指定了input的时候有效，缺省的时候将自动创建一个显示结果面板。
         * @member
         * @returns string | HTMLDivElement
         */
        output?: string | HTMLDivElement;

        /**
         * 默认为true，表示是否在input位于页面较下方的时候自动将输入面板显示在input上方以避免被遮挡。
         * @member
         * @default true
         * @return boolean
         */
        outPutDirAuto?: boolean;
    }

    /**
     * 根据输入关键字提示匹配信息，可将Poi类型和城市作为输入提示的限制条件。
     * 用户可以通过自定义回调函数取回并显示查询结果。
     * 若服务请求失败，系统将返回错误信息。最多支持10条建议，不可翻页。
     * @class
     * @description 插件类，插件名："AMap.Autocomplete"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.Autocomplete
     */
    class Autocomplete extends EventProvider
    {
        /**
         * 构造函数，提供输入提示功能。
         * @constructor
         * @param  {AutocompleteOptions} opts?
         */
        constructor(opts?: AutocompleteOptions);

        /**
         * 根据输入关键字提示匹配信息，支持中文、拼音
         * 当status为complete时，result为AutocompleteResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} keyword
         * @param  {Function} callback
         * @returns void
         */
        search(keyword: string, callback: (status: string, result: string | AutocompleteResult) => void): void;
        
        /**
         * 设置提示Poi类型，多个类型用“|”分隔，POI相关类型请在网站“相关下载”处下载
         * 目前只支持Poi类型编码如“050000”
         * 默认值：所有类别
         * @param  {string} type
         * @returns void
         */
        setType(type: string): void;
        
        /**
         * 设置城市。
         * @param  {string} city
         * @returns void
         */
        setCity(city: string): void;
        
        /**
         * 设置是否强制限制城市。
         * @param  {boolean} value
         * @returns void
         */
        setCityLimit(value: boolean): void;
    }

    interface PlaceSearchOptions
    {
        city?: string;

        citylimit?: boolean;

        children?: number;

        type?: string;

        lang?: string;

        pageSize?: number;

        pageIndex?: number;

        extensions?: string;

        map?: Map;

        panel?: string | HTMLElement;
    }

    class PlaceSearch extends EventProvider
    {
    }
}
