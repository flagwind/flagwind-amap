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
         * @member {number}
         */
        distance?: number;

        /**
         * 与查询点的相对方位。
         * @member {string}
         */
        direction?: string;

        /**
         * 路口经纬度。
         * @member {LngLat | [number, number] }
         */
        location?: LngLat | [number, number];

        /**
         * 	第一条道路id。
         * @member {string}
         */
        first_id?: string;

        /**
         * 第一条道路名称。
         * @member {string}
         */
        first_name?: string;

        /**
         * 第二条道路id。
         * @member {string}
         */
        second_id?: string;

        /**
         * 第二条道路名称。
         * @member {string}
         */
        second_name?: string;
    }

    interface Road
    {
        /**
         * 道路id。
         * @member {string}
         */
        id?: string;

        /**
         * 道路名称。
         * @member {string}
         */
        name?: string;

        /**
         * 道路离查询点最近距离。
         * @member {number}
         */
        distance?: number;

        /**
         * 道路上离查询点最近的点坐标。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 与查询点的相对方位。
         * @member {string}
         */
        direction?: string;
    }

    interface BusinessArea
    {
        /**
         * 商圈id。
         * @member {string}
         */
        id?: string;

        /**
         * 商圈名称。
         * @member {string}
         */
        name?: string;

        /**
         * 商圈中心点经纬度。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];
    }

    interface ReGeocodePoi
    {
        /**
         * Poi的唯一标识id。
         * @member {string}
         */
        id?: string;

        /**
         * Poi名称。
         * @member {string}
         */
        name?: string;

        /**
         * Poi类型。
         * @member {string}
         */
        type?: string;

        /**
         * Poi电话。
         * @member {string}
         */
        tel?: string;

        /**
         * 该Poi到请求坐标的距离，单位：米。
         * @member {number}
         * @returns 
         */
        distance?: number;

        /**
         * 该Poi相对于请求坐标的方向。
         * @member {string}
         */
        direction?: string;

        /**
         * Poi地址信息。
         * @member {string}
         * @returns 
         */
        address?: string;

        /**
         * Poi坐标。
         * @member {string}
         */
        location?: LngLat | [number, number];

        /**
         * Poi所在商圈名称。
         * @member {string}
         * @returns 
         */
        businessArea?: string;
    }

    interface AddressComponent
    {
        /**
         * 所在省（省编码在城市编码表中可查询到）。
         * @member {string}
         */
        province?: string;

        /**
         * 所在城市。
         * @member {string}
         */
        city?: string;

        /**
         * 所在城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * 所在区。
         * @member {string}
         */
        district?: string;

        /**
         * 所在区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 所在乡镇。
         * @member {string}
         */
        township?: string;

        /**
         * 所在街道。
         * @member {string}
         */
        street?: string;

        /**
         * 门牌号。
         * @member {string}
         */
        streetNumber?: string;

        /**
         * 所在社区。
         * @member {string}
         */
        neighborhood?: string;

        /**
         * 社区类型。
         * @member {string}
         */
        neighborhoodType?: string;

        /**
         * 所在楼/大厦。
         * @member {string}
         */
        building?: string;

        /**
         * 楼类型。
         * @member {string}
         */
        buildingType?: string;

        /**
         * 仅逆地理编码时返回，所属商圈信息。
         * @member {Array<BusinessArea>}
         */
        businessAreas?: Array<BusinessArea>;
    }

    interface ReGeocode
    {
        /**
         * 地址组成元素。
         * @member {AddressComponent}
         */
        addressComponent?: AddressComponent;

        /**
         * 格式化地址。
         * 规则：地址信息=基本行政区信息+具体信息；
         * 基本行政信息=省+市+区+乡镇
         * 当给定坐标为poi时直接返回；非poi时，取离给定坐标最近poi返回
         * @member {string}
         */
        formattedAddress?: string;

        /**
         * 道路信息列表。
         * @member {Array<Road>}
         */
        roads?: Array<Road>;

        /**
         * 道路路口列表。
         * @member {Array<Cross>}
         */
        crosses?: Array<Cross>;

        /**
         * 兴趣点列表，包含兴趣点基本信息。
         * @member {Array<ReGeocodePoi>}
         */
        pois?: Array<ReGeocodePoi>;
    }

    interface Geocode
    {
        /**
         * 地址组成元素。
         * @member {AddressComponent}
         */
        addressComponent?: AddressComponent;

        /**
         * 格式化地址。
         * 规则：地址信息=基本行政区信息+具体信息；
         * 基本行政信息=省+市+区+乡镇
         * 当给定坐标为poi时直接返回；非poi时，取离给定坐标最近poi返回
         * @member {string}
         */
        formattedAddress?: string;
        
        /**
         * 坐标。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 给定地址匹配级别，返回匹配最详细级别。
         * 如：“北京市海淀区苏州街”匹配级别为“道路”
         * @member {string}
         */
        level?: string;
    }

    interface GeocoderResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;
        
        /**
         * 地理编码结果，仅地理编码返回。
         * @member {Array<Geocode>}
         */
        geocodes?: Array<Geocode>;

        /**
         * 地理编码结果数目，仅地理编码返回。
         * @member {number}
         */
        resultNum?: number;

        /**
         * 逆地理编码结果，仅逆地理编码返回。
         * @member {ReGeocode}
         */
        regeocode?: ReGeocode;
    }

    interface ReGeocodeResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 逆地理编码结果，仅逆地理编码返回。
         * @member {ReGeocode}
         */
        regeocode?: ReGeocode;
    }

    interface GeocodeResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;
        
        /**
         * 地理编码结果，仅地理编码返回。
         * @member {Array<Geocode>}
         */
        geocodes?: Array<Geocode>;

        /**
         * 地理编码结果数目，仅地理编码返回。
         * @member {number}
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
         * @member {string}
         */
        city?: string;

        /**
         * 逆地理编码时，以给定坐标为中心点，单位：米。
         * 取值范围：0-3000
         * 默认值：1000
         * @member {number}
         * @default 1000
         */
        radius?: number;

        /**
         * 设置语言类型。
         * @member {string}
         */
        lang?: string;

        /**
         * 是否批量查询。当值为false时即使传入多个点也只返回第一个点结果。
         * @member {batch}
         */
        batch?: boolean;

        /**
         * 逆地理编码时，返回信息的详略。
         * 默认值：base，返回基本地址信息；
         * 取值为：all，返回地址信息及附近poi、道路、道路交叉口等信息。
         * @member {string}
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
    class Geocoder extends EventDispatcher
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
         * @member {string}
         */
        info?: string;

        /**
         * 返回高德坐标集合。
         * @member {Array<LngLat | [number, number]>}
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
         * @member {string}
         */
        name?: string;

        /**
         * 所属区域。
         * @member {string}
         */
        district?: string;

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;
    }

    interface AutocompleteResult
    {
        /**
         * 查询状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 输入提示条数。
         * @member {number}
         */
        count?: number;

        /**
         * 输入提示列表。
         * @member {Array<Tip>}
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
         * @member {string}
         * @default 所有类别
         */
        type?: string;

        /**
         * 输入提示时限定城市。
         * 可选值：城市名（中文或中文全拼）、citycode、adcode；
         * 默认值：“全国”
         * @member {string}
         * @default 全国
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
         * @member {string}
         */
        datatype?: string;

        /**
         * 是否强制限制在设置的城市内搜索，默认值为：false。
         * @description true：强制限制设定城市，false：不强制限制设定城市
         * @member {boolean}
         * @default false
         */
        citylimit?: boolean;

        /**
         * 用来指定一个input输入框，设定之后，在input输入文字将自动生成下拉选择列表。支持传入输入框DOM对象的id值，或直接传入输入框的DOM对象。
         * @member {string | HTMLInputElement}
         */
        input?: string | HTMLInputElement;

        /**
         * 指定一个现有的div的id或者元素，作为展示提示结果的容器，当指定了input的时候有效，缺省的时候将自动创建一个显示结果面板。
         * @member {string | HTMLDivElement}
         */
        output?: string | HTMLDivElement;

        /**
         * 默认为true，表示是否在input位于页面较下方的时候自动将输入面板显示在input上方以避免被遮挡。
         * @member {boolean}
         * @default true
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
    class Autocomplete extends EventDispatcher
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

    /**
     * PlaceSearch 类配置项。
     * @interface
     */
    interface PlaceSearchOptions
    {
        /**
         * 兴趣点城市。
         * 可选值：城市名（中文或中文全拼）、citycode、adcode
         * 默认值：“全国”
         * @member {string}
         */
        city?: string;

        /**
         * 是否强制限制在设置的城市内搜索，默认值为：false。
         * true：强制限制设定城市，false：不强制限制设定城市
         * @member {boolean}
         * @default false
         */
        citylimit?: boolean;

        /**
         * 是否按照层级展示子POI数据,默认0，children=1，展示子节点POI数据，children=0，不展示子节点数据。
         * @member {number}
         * @default 0
         */
        children?: number;

        /**
         * 兴趣点类别，多个类别用“|”分割，如“餐饮|酒店|电影院”
         * POI搜索类型共分为以下20种：
         * 汽车服务|汽车销售|汽车维修|摩托车服务|餐饮服务|购物服务|生活服务|体育休闲服务|
         * 医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|
         * 交通设施服务|金融保险服务|公司企业|道路附属设施|地名地址信息|公共设施
         * 默认值：餐饮服务、商务住宅、生活服务
         * @member {string}
         */
        type?: string;
        
        /**
         * 检索语言类型。
         * 可选值：
         * zh_cn：中文简体
         * en：英文
         * @member {string}
         * @default zh_cn
         */
        lang?: string;

        /**
         * 单页显示结果条数
         * 默认值：10
         * 取值范围：1-50，超出取值范围按最大值返回
         * @member {number}
         * @default 10
         */
        pageSize?: number;

        /**
         * 页码。（如pageIndex为2，pageSize为10，那么显示的应是第11-20条返回结果）
         * 默认值：1
         * 取值范围：1-100，超过实际页数不返回poi
         * @member {number}
         * @default 1
         */
        pageIndex?: number;

        /**
         * 此项默认值：base，返回基本地址信息
         * 取值：all，返回基本+详细信息
         * @member {string}
         * @default base
         */
        extensions?: string;

        /**
         * AMap.Map对象, 展现结果的地图实例。
         * 当指定此参数后，搜索结果的标注、线路等均会自动添加到此地图上。
         * 可选值
         * @member {Map}
         */
        map?: Map;

        /**
         * 结果列表的HTML容器id或容器元素，提供此参数后，结果列表将在此容器中进行展示。
         * 可选值
         * @member {string | HTMLElement}
         */
        panel?: string | HTMLElement;

        /**
         * 在使用map属性时，是否在地图上显示周边搜索的圆或者范围搜索的多边形，默认为true。
         * @member {boolean}
         * @default true
         */
        showCover?: boolean;

        /**
         * 如使用了map或panel属性，renderStyle可以用来设定绘制的UI风格，缺省为'newpc'
         * 可选值:'newpc'或'default'，'newpc'为带图片展示的新样式，'default'为原有简单样式。
         * @member {string}
         * @default newpc
         */
        renderStyle?: string;

        /**
         * 用于控制在搜索结束后，是否自动调整地图视野使绘制的Marker点都处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;
    }
    
    /**
     * 地点搜索服务，提供某一特定地区的位置查询服务。PlaceSearch构造函数的参数为可选，表达为参数对象PlaceSearchOptions。
     * PlaceSearchOptions允许设置搜索城市、搜索数据类别、搜索结果详略、搜索结果排序规则等。用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.PlaceSearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearch
     */
    class PlaceSearch extends EventDispatcher
    {
        /**
         * 创建地点查询类的实例。
         * @constructor
         * @param  {PlaceSearchOptions} opts?
         */
        constructor(opts?: PlaceSearchOptions);
        
        /**
         * 根据关键字搜索，关键字支持中文|中文全拼、繁体、英文
         * 当status为complete时，result为SearchResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} keyword
         * @param  {Function} callback
         * @returns void
         */
        search(keyword: string, callback: (status: string, result: string | SearchResult) => void): void;
        
        /**
         * 根据中心点经纬度、半径以及关键字进行周边查询
         * radius取值范围：0-50000
         * @param  {string} keyword
         * @param  {LngLat | [number, number]} center
         * @param  {number} radius
         * @param  {Function} callback
         * @returns void
         */
        searchNearBy(keyword: string, center: LngLat | [number, number], radius: number, callback: (status: string, result: string | SearchResult) => void): void;
        
        /**
         * 根据范围和关键词进行范围查询。
         * @param  {string} keyword
         * @param  {Bounds|Polygon} bounds
         * @param  {Function} callback
         * @returns void
         */
        searchInBounds(keyword: string, bounds: Bounds | Polygon, callback: (status: string, result: string | SearchResult) => void): void;
        
        /**
         * 根据POIID 查询POI 详细信息。
         * @param  {string} POIID
         * @param  {Function} callback
         * @returns void
         */
        getDetails(POIID: string, callback: (status: string, result: string | SearchResult) => void): void;
        
        /**
         * 设置查询类别，多个类别用“|”分割。
         * 默认值：所有类别
         * @param  {string} type
         * @returns void
         */
        setType(type: string): void;
        
        /**
         * 设置是否强制限制城市。
         * @param  {boolean} value
         * @returns void
         */
        setCityLimit(value: boolean): void;
        
        /**
         * 设置查询结果特定页数
         * 默认值：1
         * 取值范围：1-100，超过实际页数不返回poi
         * @param  {number} pageIndex
         * @returns void
         */
        setPageIndex(pageIndex: number): void;
        
        /**
         * 设置查询单页结果数
         * 默认值：10
         * 取值范围：1-50，超出取值范围按最大值返回
         * @param  {number} pageSize
         * @returns void
         */
        setPageSize(pageSize: number): void;
        
        /**
         * 设置查询城市。
         * 支持cityname（中文或中文全拼）、citycode、adcode
         * @param  {string} city
         * @returns void
         */
        setCity(city: string): void;
        
        /**
         * 设置检索语言类型。
         * @param  {string} lang
         * @returns void
         */
        setLang(lang: string): void;
        
        /**
         * 获取placeSearch检索语言类型。
         * @returns string
         */
        getLang(): string;
        
        /**
         * 清除搜索结果。
         * @returns void
         */
        clear(): void;
        
        /**
         * 唤起高德地图客户端marker页
         * Object参数形如：
         * {
         *     id: "B000A7BD6C",POIID
         *     name:String, 必要参数
         *     location:LngLat|position属性  必须参数
         * }
         * @param  {object} obj
         * @returns void
         */
        poiOnAMAP(obj: object): void;
        
        /**
         * 唤起高德地图客户端POI详情页
         * Object参数形如：
         * {
         *     id: "B000A7BD6C",POIID
         *     name:String, 必要参数
         *     location:LngLat|position属性  必须参数
         * }
         * @param  {object} obj
         * @returns void
         */
        detailOnAMAP(obj: object): void;
    }

    interface SelectChangeEvent
    {
        /**
         * 事件类别。
         * @member {string}
         */
        type?: string;

        /**
         * 当前选中的 POI 的ID。
         * @member {string}
         */
        id?: string;

        /**
         * 当前选中的 POI 对应的在地图中的 Marker 对象。
         * @member {Marker}
         */
        marker?: Marker;

        /**
         * 当前选中的 POI 在结果面板中对应的列表项。
         * @member {HTMLLIElement}
         */
        listElement?: HTMLLIElement;
        
        /**
         * 当前选中的POI的信息。
         * @member {Poi}
         */
        data?: Poi;
    }

    interface SearchResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 发生事件时返回兴趣点列表。
         * @member {PoiList}
         */
        poiList?: PoiList;

        /**
         * 发生事件且查无此关键字时，返回建议关键字列表，可根据建议关键字查询。
         * @member {Array<string>}
         */
        keywordList?: Array<string>;

        /**
         * 发生事件且查无此关键字且 city 为“全国”时，返回城市建议列表，该列表中每个城市包含一个或多个相关Poi点信息。
         * @member {Array<CityInfo>}
         * @returns 
         */
        cityList?: Array<CityInfo>;
    }

    interface PoiList
    {
        /**
         * Poi 列表。
         * @member {Array<Poi>}
         */
        pois?: Array<Poi>;

        /**
         * 页码。
         * @member {number}
         */
        pageIndex?: number;

        /**
         * 单页结果数。
         * @member {number}
         */
        pageSize?: number;

        /**
         * 查询结果总数。
         * @member {number}
         * @returns 
         */
        count?: number;
    }

    interface CityInfo
    {
        /**
         * 建议城市名称。
         * @member {string}
         */
        name?: string;

        /**
         * 城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * 行政区编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 该城市的建议结果数目。
         * @member {number}
         */
        count?: number;
    }

    interface Poi
    {
        /**
         * 全局唯一ID。
         * @member {string}
         */
        id?: string;

        /**
         * 名称。
         * @member {string}
         */
        name?: string;

        /**
         * 兴趣点类型。
         * @member {string}
         */
        type?: string;

        /**
         * 兴趣点经纬度。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 地址。
         * @member {string}
         */
        address?: string;

        /**
         * 离中心点距离，仅周边查询返回。
         * @member {number}
         */
        distance?: number;

        /**
         * 电话。
         * @member {string}
         */
        tel?: string;

        /**
         * 网址。
         * @member {string}
         */
        website?: string;

        /**
         * poi 所在省份编码。
         * @member {string}
         */
        pcode?: string;

        /**
         * POI 所在城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * POI 所在区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 邮编。
         * @member {string}
         */
        postcode?: string;

        /**
         * POI 所在省份名称。
         * @member {string}
         */
        pname?: string;

        /**
         * POI 所在城市名称。
         * @member {string}
         */
        cityname?: string;

        /**
         * POI 所在区域名称。
         * @member {string}
         */
        adname?: string;

        /**
         * 邮箱。
         * @member {string}
         */
        email?: string;

        /**
         * 入口经纬度，POI点有出入口信息时返回，否则返回空字符串。
         * @member {string | LngLat | [number, number]}
         */
        entr_location?: string | LngLat | [number, number];

        /**
         * 出口经纬度，POI点有出入口信息时返回，否则返回空字符串。
         * @member {string | LngLat | [number, number]}
         */
        exit_location?: string | LngLat | [number, number];

        /**
         * POI 是否有团购信息，true为存在团购信息。
         * @member {boolean}
         */
        groupbuy?: boolean;

        /**
         * POI 是否有优惠信息，true为存在优惠信息。
         * @member {boolean}
         */
        discount?: boolean;

        /**
         * 团购信息。
         * @member {Array<Groupbuy>}
         */
        groupbuys?: Array<Groupbuy>;

        /**
         * 优惠信息。
         * @member {Array<Discount>}
         */
        discounts?: Array<Discount>;

        /**
         * 深度信息类型，返回值为以下中的一个：
         * DINING：餐饮深度信息类型
         * HOTEL：酒店深度信息类型
         * CINEMA：影院深度信息类型
         * SCENIC：景点深度信息类型
         * @member {string}
         */
        deep_type?: string;

        /**
         * 餐饮类深度信息。
         * @member {Dining}
         */
        dining?: Dining;

        /**
         * 酒店类深度信息。
         * @member {Hotel}
         */
        hotel?: Hotel;

        /**
         * 影院类深度信息。
         * @member {Cinema}
         */
        cinema?: Cinema;

        /**
         * 景点类深度信息。
         * @member {Scenic}
         */
        scenic?: Scenic;
    }

    interface Discount
    {
        title?: string;

        detail?: string;

        start_time?: string;

        end_time?: string;

        sold_num?: number;

        photos?: Array<Photo>;

        url?: string;

        provider?: string;
    }

    interface Groupbuy
    {
        title?: string;

        type_code?: string;

        type?: string;

        detail?: string;

        stime?: string;

        etime?: string;

        count?: number;

        sold_num?: number;

        original_price?: number;

        groupbuy_price?: number;

        discount?: number;

        ticket_address?: string;

        ticket_tel?: string;

        photos?: Array<Photo>;

        url?: string;

        provider?: string;
    }

    interface Dining
    {
        cuisines?: string;

        tag?: string;

        intro?: string;

        rating?: string;

        cp_rating?: string;

        deep_src?: string;

        taste_rating?: string;

        environment_rating?: string;

        service_rating?: string;

        cost?: string;

        recommend?: string;

        atmosphere?: string;

        ordering_wap_url?: string;

        ordering_web_url?: string;

        ordering_app_url?: string;

        opentime_GDF?: string;

        opentime?: string;

        addition?: string;

        photos?: Array<Photo>;
    }

    interface Hotel
    {
        rating?: string;

        star?: string;

        intro?: string;

        lowest_price?: string;

        faci_rating?: string;

        health_rating?: string;

        environment_rating?: string;

        service_rating?: string;

        traffic?: string;

        addition?: string;

        deep_src?: string;

        photos?: Array<Photo>;
    }

    interface Cinema
    {
        intro?: string;

        rating?: string;

        deep_src?: string;

        parking?: string;

        opentime_GDF?: string;

        openingtime?: string;

        photos?: Array<Photo>;
    }

    interface Scenic
    {
        intro?: string;

        rating?: string;

        deep_src?: string;

        level?: string;

        price?: string;

        season?: string;

        recommened?: string;

        theme?: string;

        ordering_wap_url?: string;

        ordering_web_url?: string;

        opentime_GDF?: string;

        opentime?: string;

        photos?: Array<Photo>;
    }

    interface Photo
    {
        title?: string;

        url?: string;
    }

    interface Content
    {
        id?: string;

        name?: string;
    }

    interface PlaceSearchLayerOptions
    {
        /**
         * 要叠加该麻点图层的Map对象。
         * @member {Map}
         */
        map?: Map;
        
        /**
         * 搜索关键字，支持中文，此项为必填。
         * @member {string}
         */
        keywords?: string;
    }

    /**
     * 麻点图插件，提供海量搜索结果的辅助显示功能。
     * @class
     * @description 插件类，插件名："AMap.PlaceSearchLayer"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.PlaceSearchLayer
     */
    class PlaceSearchLayer extends EventDispatcher
    {
        /**
         * 构造函数，构造麻点图层类。
         * @constructor
         * @param  {PlaceSearchLayerOptions} opts?
         */
        constructor(opts?: PlaceSearchLayerOptions);
        
        /**
         * 设置添加该图层的地图对象。
         * @param  {Map} map
         * @returns void
         */
        setMap(map: Map): void;
        
        /**
         * 设置查询关键字。
         * @param  {string} keywords
         * @returns void
         */
        setKeywords(keywords: string): void;
    }

    interface DistrictSearchOptions
    {
        /**
         * 关键字对应的行政区级别或商圈，可选值：
         * country：国家
         * province：省/直辖市
         * city：市
         * district：区/县
         * biz_area：商圈
         * @member {string}
         */
        level?: string;

        /**
         * 是否显示商圈，默认值true
         * 可选为true/false，为了能够精准的定位到街道，特别是在快递、物流、送餐等场景下，强烈建议将此设置为false
         * @member {boolean}
         * @default true
         */
        showbiz?: boolean;

        /**
         * 是否返回行政区边界坐标点
         * 默认值：base，不返回行政区边界坐标点
         * 取值：all，返回完整行政区边界坐标点
         * @member {string}
         * @default "base"
         */
        extensions?: string;

        /**
         * 显示下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县4个级别），商圈为区/县下一级                                  可选值：0、1、2、3
         * 0：不返回下级行政区
         * 1：返回下一级行政区
         * 2：返回下两级行政区
         * 3：返回下三级行政区
         * 默认值：1
         * @member {number}
         * @default 1
         */
        subdistrict?: number;
    }

    /**
     * 行政区查询服务，提供行政区相关信息。
     * @class
     * @description 插件类，插件名："AMap.DistrictSearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.DistrictSearch
     */
    class DistrictSearch extends EventDispatcher
    {
        /**
         * 构造函数，实例化一个行政区查询实例。
         * @constructor
         * @param  {DistrictSearchOptions} opts?
         */
        constructor(opts?: DistrictSearchOptions);
        
        /**
         * 根据关键字查询行政区或商圈信息 关键字支持：行政区名、citycode、adcode、商圈名。
         * 默认值："全国"
         * 当status为complete时，result为DistrictSearchResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} keywords
         * @param  {Function} callback
         * @param  {DistrictSearchOptions} opts?
         * @returns void
         */
        search(keywords: string, callback: (status: string, result: string | DistrictSearchResult) => void, opts?: DistrictSearchOptions): void;
        
        /**
         * 设置关键字对应的行政区级别或商圈，可选值：
         * country：国家
         * province：省/直辖市
         * city：市
         * district：区/县
         * biz_area：商圈
         * @param  {string} level
         * @returns void
         */
        setLevel(level: string): void;
        
        /**
         * 设置下级行政区级数（行政区级别包括：国家、省/直辖市、市、区/县4个级别），商圈为区/县下一级，默认值：1
         * 可选值：0、1、2、3
         * 0：不返回下级行政区；
         * 1：返回下一级行政区；
         * 2：返回下两级行政区；
         * 3：返回下三级行政区；
         * @param  {number} district
         * @returns void
         */
        setSubdistrict(district: number): void;
    }

    interface DistrictSearchResult
    {
        /**
         * 成功状态文字描述。
         * @member {string}
         */
        info?: string;

        /**
         * 根据查询条件返回行政区划列表。
         * @member {Array<District>}
         */
        districtList?: Array<District>;
    }

    interface District
    {
        /**
         * 行政区名称。
         * @member {string}
         */
        name?: string;

        /**
         * 城市中心点经纬度坐标。
         * @member {LngLat | [number, number]}
         */
        center?: LngLat | [number, number];

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
         * 行政区划级别。
         * @member {string}
         */
        level?: string;
        
        /**
         * extensions为“all”时，行政区边界坐标集合若行政区包含群岛，则坐标点为各岛的边界，岛间边界经纬度使用"|"分隔。
         * @member {Array<LngLat | [number, number]>}
         */
        boundaries?: Array<LngLat | [number, number]>;

        /**
         * 下级行政区信息列表。
         * subdistrict为 0 时，不返回该对象。
         * @member {Array<District>}
         */
        districtList?: Array<District>;
    }

    interface LineSearchOptions
    {
        /**
         * 页码（如pageIndex为2，pageSize为10，那么显示的应是第11-20条返回结果）
         * 取值范围：1-100，超过取值范围按默认，超出实际页数按最大值返回
         * 默认值：1
         * @member {number}
         * @default 1
         */
        pageIndex?: number;

        /**
         * 单页显示结果条数，默认值：20
         * 取值范围：1-100，超过取值范围按默认
         * @member {number}
         * @default 20
         */
        pageSize?: number;

        /**
         * 公交线路所在城市，默认值：“全国”
         * 可选值：cityname（中文或中文全拼）、citycode、adcode
         * @member {string}
         * @default "全国"
         */
        city?: string;

        /**
         * 此项仅公交路线查询时有效，默认值：base，返回公交路线基本信息，当取值为：all，返回公交路线基本信息+详细信息
         * @member {string}
         */
        extensions?: string;
    }

    /**
     * AMap.LineSearch 公交路线查询类，通过extensions属性控制返回信息详略。
     * 公交线路信息包括起、终点、途径站点，首、末班车时间等信息。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.LineSearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.LineSearch
     */
    class LineSearch extends EventDispatcher
    {
        /**
         * 构造一个公交线路查询实例。
         * @constructor
         * @param  {LineSearchOptions} opts?
         */
        constructor(opts?: LineSearchOptions);
        
        /**
         * 根据给定的公交线路id进行公交站点详情检索，id是公交线路的唯一标识
         * 当status为complete时，result为LineSearchResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} id
         * @param  {Function} callback
         * @returns void
         */
        searchById(id: string, callback: (status: string, result: string | LineSearchResult) => void): void;
        
        /**
         * 根据给定公交线路名称进行公交线路详情查询
         * status说明同上
         * @param  {string} keyword
         * @param  {Function} callback
         * @returns void
         */
        search(keyword: string, callback: (status: string, result: string | LineSearchResult) => void): void;
        
        /**
         * 设置查询结果页码，默认值：1
         * 取值范围：1-100，超过取值范围按默认
         * @param  {number} pageIndex
         * @returns void
         */
        setPageIndex(pageIndex: number): void;
        
        /**
         * 设置单页显示结果条数，默认值：20
         * 取值范围：1-100，超过取值范围按默认
         * @param  {number} pageSize
         * @returns void
         */
        setPageSize(pageSize: number): void;
        
        /**
         * 设置查询城市，默认值：“全国”
         * 可选值：cityname（中文或中文全拼）、citycode、adcode
         * @param  {string} city?
         * @returns void
         */
        setCity(city?: string): void;
    }

    interface LineSearchResult
    {
        /**
         * 成功状态文字描述。
         * @member {string}
         */
        info?: string;

        /**
         * 根据查询条件返回公交路线信息。
         * @member {Array<LineInfo>}
         */
        lineInfo?: Array<LineInfo>;

        /**
         * 查无此公交站时，返回的建议关键字列表，可根据建议关键字查询。
         * @member {Array<string>}
         */
        keywordList?: Array<string>;

        /**
         * 查该城市无此公交站时，返回的建议城市列表。
         * @member {Array<CityInfo>}
         */
        cityList?: Array<CityInfo>;
    }

    interface LineInfo
    {
        /**
         * 公交线路id，该id是唯一标识。
         * @member {string}
         */
        id?: string;

        /**
         * 公交线路名称。
         * @member {string}
         */
        name?: string;

        /**
         * 公交线路经纬度。
         * @member {Array<LngLat | [number, number]>}
         */
        path?: Array<LngLat | [number, number]>;

        /**
         * 公交线路所在城市的城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * 公交类型列表。
         * @member {string}
         */
        type?: string;

        /**
         * 首发站。
         * @member {string}
         */
        start_stop?: string;

        /**
         * 终点站。
         * @member {string}
         */
        end_stop?: string;

        /**
         * 首班车时间。
         * @member {string}
         */
        stime?: string;

        /**
         * 末班车时间。
         * @member {string}
         */
        etime?: string;

        /**
         * 起步票价，单位：元。
         * @member {string}
         */
        basic_price?: string;

        /**
         * 全程票价，单位：元。
         * @member {string}
         */
        total_price?: string;

        /**
         * 途径站，包括首发站和终点站。
         * @member {Array<string>}
         */
        via_stops?: Array<string>;

        /**
         * 全程距离，单位：千米。
         * @member {number}
         */
        distance?: number;

        /**
         * 此公交路线的地理范围。
         * @member {Bounds}
         */
        bounds?: Bounds;

        /**
         * 所属公交公司。
         * @member {string}
         */
        company?: string;
    }

    interface StationSearchOptions
    {
        /**
         * 页码（如pageIndex为2，pageSize为10，那么显示的应是第11-20条返回结果）
         * 取值范围：1-100，超过取值范围按默认，超出实际页数按最大值返回
         * 默认值：1
         * @member {number}
         * @default 1
         */
        pageIndex?: number;

        /**
         * 单页显示结果条数，默认值：20
         * 取值范围：1-100，超过取值范围按默认
         * @member {number}
         * @default 20
         */
        pageSize?: number;

        /**
         * 公交站点所在城市，默认值：“全国”
         * 可选值：cityname（中文或中文全拼）、citycode、adcode
         * @member {string}
         * @default "全国"
         */
        city?: string;
    }

    /**
     * AMap.StationSearch 公交站点查询服务，根据输入关键字、ID查询公交站点信息。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.StationSearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/search#m_AMap.StationSearch
     */
    class StationSearch extends EventDispatcher
    {
        /**
         * 构造一个公交站点查询实例。
         * @constructor
         * @param  {StationSearchOptions} opts?
         */
        constructor(opts?: StationSearchOptions);
        
        /**
         * 根据给定的公交站点id进行公交站点详情检索，id是公交站点的唯一标识
         * 当status为complete时，result为StationSearchResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} id
         * @param  {Function} callback
         * @returns void
         */
        searchById(id: string, callback: (status: string, result: string | StationSearchResult) => void): void;
        
        /**
         * 根据给定公交站点名称进行公交站点详情查询，多个关键字用"|"分割
         * status说明同上
         * @param  {string} keyword
         * @param  {Function} callback
         * @returns void
         */
        search(keyword: string, callback: (status: string, result: string | StationSearchResult) => void): void;
        
        /**
         * 设置查询结果页码，默认值：1
         * 取值范围：1-100，超过取值范围按默认
         * @param  {number} pageIndex
         * @returns void
         */
        setPageIndex(pageIndex: number): void;
        
        /**
         * 设置单页显示结果条数，默认值：20
         * 取值范围：1-100，超过取值范围按默认
         * @param  {number} pageSize
         * @returns void
         */
        setPageSize(pageSize: number): void;
        
        /**
         * 设置查询城市，默认值：“全国”
         * 可选值：cityname（中文或中文全拼）、citycode、adcode
         * @param  {string} city?
         * @returns void
         */
        setCity(city?: string): void;
    }

    interface StationSearchResult
    {
        /**
         * 成功状态文字描述。
         * @member {string}
         */
        info?: string;

        /**
         * 根据查询条件返回公交站点信息。
         * @member {Array<StationInfo>}
         */
        stationInfo?: Array<StationInfo>;

        /**
         * 查无此公交站时，返回的建议关键字列表，可根据建议关键字查询。
         * @member {Array<string>}
         */
        keywordList?: Array<string>;

        /**
         * 查该城市无此公交站时，返回的建议城市列表。
         * @member {Array<CityInfo>}
         */
        cityList?: Array<CityInfo>;
    }

    interface StationInfo
    {
        /**
         * 公交站点id，该id是唯一标识。
         * @member {string}
         */
        id?: string;

        /**
         * 公交站点名称。
         * @member {string}
         */
        name?: string;

        /**
         * 公交站点经纬度。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 城市编码。
         * @member {string}
         */
        citycode?: string;

        /**
         * 途经此站点的公交路线列表。
         * @member {Array<Busline>}
         */
        buslines?: Array<Busline>;
    }

    interface Busline
    {
        /**
         * 公交线路id，该id是唯一标识。
         * @member {string}
         */
        id?: string;

        /**
         * 公交线路名称。
         * @member {string}
         */
        name?: string;

        /**
         * 公交线路途经此站的经纬度。
         * @member {LngLat | [number, number]}
         */
        location?: LngLat | [number, number];

        /**
         * 首发站。
         * @member {string}
         */
        start_stop?: string;

        /**
         * 终点站。
         * @member {string}
         */
        end_stop?: string;
    }

    interface GeolocationOptions
    {
        /**
         * 是否使用高精度。
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        enableHighAccuracy?: boolean;

        /**
         * 超时毫秒数，若在指定时间内未定位成功，返回超时错误信息“TIMEOUT”。
         * 默认值：无穷大
         * @member {number}
         */
        timeout?: number;

        /**
         * 是否禁止使用IP定位，默认值为0，可选值0-3
         * 0: 可以使用IP定位
         * 1: 手机设备禁止使用IP定位
         * 2: PC上禁止使用IP定位
         * 3: 所有终端禁止使用IP定位
         * @member {number}
         * @default 0
         */
        noIpLocate?: number;

        /**
         * 是否禁止使用浏览器Geolocation定位，默认值为0，可选值0-3
         * 0: 可以使用浏览器定位
         * 1: 手机设备禁止使用浏览器定位
         * 2: PC上禁止使用浏览器定位
         * 3: 所有终端禁止使用浏览器定位
         * @member {number}
         * @default 0
         */
        noGeoLocation?: number;

        /**
         * 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位。
         * @member {boolean}
         * @default false
         */
        GeoLocationFirst?: boolean;

        /**
         * 缓存毫秒数。定位成功后，定位结果的保留时间
         * 默认值：0
         * @member {number}
         * @default 0
         */
        maximumAge?: number;

        /**
         * 是否使用坐标偏移，取值true:为高德地图坐标，取值false:为浏览器定位坐标
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        convert?: boolean;

        /**
         * 是否显示定位按钮。
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        showButton?: boolean;

        /**
         * 自定义定位按钮的内容。可支持HTML代码或Dom元素对象，不设置该属性则使用默认按钮样式。
         * @member {string | HTMLElement}
         */
        buttonDom?: string | HTMLElement;

        /**
         * 定位按钮可停靠的位置
         * “LT”：左上角
         * “LB”：左下角
         * “RT”：右上角
         * “RB”：右下角
         * 默认值：“LB”
         * @member {string}
         * @default "LB"
         */
        buttonPosition?: string;

        /**
         * 按钮距离停靠位置的偏移量
         * 默认值：Pixel(10,20)
         * @member {Pixel}
         * @default AMap.Pixel(10,20)
         */
        buttonOffset?: Pixel;

        /**
         * 定位成功时是否在定位位置显示一个 Marker。
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        showMarker?: boolean;

        /**
         * 定位点 Marker 的配置，不设置该属性则使用默认 Marker 样式。
         * @member {MarkerOptions}
         */
        markerOptions?: MarkerOptions;

        /**
         * 定位成功并且有精度信息时，是否用一个圆圈circle表示精度范围
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        showCircle?: boolean;

        /**
         * 定位点Circle的配置，不设置该属性则使用默认Circle样式。
         * @member {CircleOptions}
         */
        circleOptions?: CircleOptions;

        /**
         * 定位成功后，是否把定位得到的坐标设置为地图中心点坐标。
         * 默认值：true
         * @member {boolean}
         * @default true
         */
        panToLocation?: boolean;

        /**
         * 定位成功且显示精度范围时，是否把地图视野调整到正好显示精度范围。
         * 默认值：false
         * @member {boolean}
         * @default false
         */
        zoomToAccuracy?: boolean;

        /**
         * 是否使用安卓定位sdk用来进行定位，默认：false
         * 适用于同时在APP中使用安卓定位sdk并在APP WebView中使用了JSAPI的开发者。
         * 开启后，将优先尝试使用sdk进行定位，失败后依次尝试浏览器定位和IP定位。
         * 注：如果要使用辅助定位的功能，除了需要将useNative属性设置为true以外，还需要调用高德定位sdk中，LocationManagerProxy类的startSocket()方法，开启辅助H5定位功能；如果不用，就调用stopSocket()方法停止辅助H5定位功能。
         * @member {boolean}
         * @default false
         */
        useNative?: boolean;

        /**
         * JSAPI在定位成功的时候会将得到的经纬度进行逆地理编码后获取地址信息，以方便开发者的进一步使用;
         * extensions用来设定是否需要周边POI、道路交叉口等信息，可选值'base'、'all'。
         * 默认为'base',只返回地址信息；
         * 设定为'all'的时候将返回周边POI、道路交叉口等信息。
         * @member {string}
         */
        extensions?: string;
    }

    /**
     * AMap.Geolocation定位服务插件。融合了浏览器定位、高精度IP定位、安卓定位sdk辅助定位等多种手段，提供了获取当前准确位置、获取当前城市信息、持续定位(浏览器定位)等功能。用户可以通过两种当时获得定位的成败和结果，一种是在getCurrentPosition的时候传入回调函数来处理定位结果，一种是通过事件监听来取得定位结果。Geolocation定位常见问题说明
     * 注：默认情况下，PC端优先使用精确IP定位，解决多数浏览器无法完成定位的现状，IP定位失败后使用浏览器定位；手机端优先使用浏览器定位，失败后使用IP定位；对于安卓WebView页面的开发者，可以结合定位sdk进行辅助定位，详细说明见useNative参数。IP定位的精度值为'null'。
     * 由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
     * @class
     * @description 插件类，插件名："AMap.Geolocation"
     * @see http://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation
     */
    class Geolocation extends EventDispatcher
    {
        /**
         * 构造函数，创建浏览器定位实例。
         * @constructor
         * @param  {GeolocationOptions} opts?
         */
        constructor(opts?: GeolocationOptions);
        
        /**
         * 是否支持浏览器定位，当不支持是getCurrentPosition也会使用尝试进行精确IP定位。
         * @returns boolean
         */
        isSupported(): boolean;
        
        /**
         * 获取用户当前的精确位置信息。
         * 当回调函数中的status为complete的时候表示定位成功，result为GeolocationResult对象;。
         * 当回调函数中的status为error的时候表示定位失败，result为GeolocationError对象；
         * callback的方式和事件监听的方式二者选择一种即可。
         * @param  {Function} callback
         * @returns void
         */
        getCurrentPosition(callback: (status: string, result: GeolocationResult | GeolocationError) => void): void;
        
        /**
         * 使用浏览器定位接口监控当前位置，移动端有效。在监控过程中，每隔一段时间会自动调用定位成功或失败的回调函数。
         * 注：由于时间间隔受浏览器限制，如您想自定义时间间隔，建议您使用定时器，每隔一段时间调用一次getCurrentPosition获取当前位置。
         * @returns number
         */
        watchPosition(): number;
        
        /**
         * 取消对当前位置的监控。
         * @param  {number} watchId
         * @returns number
         */
        clearWatch(watchId: number): number;
        
        /**
         * 进行IP城市查询。
         * status为complete的时候表示查询成功，result包含省、市、adcode、citycode、城市中心点center等信息；
         * status为error的时候表示查询失败
         * @param  {Function} callback
         * @returns void
         */
        getCityInfo(callback: (status: string, result: GeolocationResult | GeolocationError) => void): void;
    }

    interface GeolocationResult
    {
        /**
         * 定位结果。
         * @member {LngLat}
         */
        position?: LngLat;

        /**
         * 精度范围，单位：米。
         * @member {number}
         */
        accuracy?: number;

        /**
         * 定位结果的来源，可能的值有:'html5'、'ip'、'sdk'。
         * @member {string}
         */
        location_type?: string;

        /**
         * 形成当前定位结果的一些信息。
         * @member {string}
         */
        message?: string;

        /**
         * 是否经过坐标纠偏。
         * @member {boolean}
         */
        isConverted?: boolean;

        /**
         * 状态信息 "SUCCESS"。
         * @member {string}
         */
        info?: string;

        /**
         * 地址信息，详情参考Geocoder。
         * @member {AddressComponent}
         */
        addressComponent?: AddressComponent;

        /**
         * 地址。
         * @member {string}
         */
        formattedAddress?: string;

        /**
         * 定位点附近的POI信息，extensions等于'base'的时候为空。
         * @member {Array<Poi>}
         */
        pois?: Array<Poi>;

        /**
         * 定位点附近的道路信息，extensions等于'base'的时候为空。
         * @member {Array<Road>}
         */
        roads?: Array<Road>;
        
        /**
         * 定位点附近的道路交叉口信息，extensions等于'base'的时候为空。
         * @member {Array<Cross>}
         */
        crosses?: Array<Cross>;
    }

    interface GeolocationError
    {
        /**
         * 错误信息，参考错误信息列表。
         * @member {string}
         */
        info?: string;

        /**
         * 造成定位失败结果的一些有用信息message说明。
         * @member {string}
         */
        message?: string;
    }
    
    /**
     * AMap.CitySearch 根据IP返回对应城市信息，提供根据输入IP或自动获取IP获取对应城市信息功能。
     * 用户可以通过自定义回调函数取回并显示查询结果。若服务请求失败，系统将返回错误信息。
     * @class
     * @description 插件类，插件名："AMap.CitySearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/location#m_AMap.Geolocation
     */
    class CitySearch extends EventDispatcher
    {
        /**
         * 自动获取用户IP，回调返回当前用户所在城市。
         * 当status为complete时，result为CitySearchResult；
         * 当status为error时，result为错误信息info；
         * 当status为no_data时，代表检索返回0结果
         * @param  {Function} callback
         * @returns void
         */
        getLocalCity(callback: (status: string, result: string | CitySearchResult) => void): void;
        
        /**
         * 根据输入IP地址返回对应城市信息。
         * status同上
         * @param  {string} ip
         * @param  {Function} callback
         * @returns void
         */
        getCityByIp(ip: string, callback: (status: string,  result: string | CitySearchResult) => void): void;
    }

    interface CitySearchResult
    {
        /**
         * 城市名称。
         * @member {string}
         */
        city?: string;

        /**
         * 地图展示该城市时使用的矩形区域。
         * @member {Bounds}
         */
        bounds?: Bounds;
    }

    interface CloudDataSearchOptions
    {
        /**
         * 云检索关键字，仅支持对建立了文本索引的字段进行模糊检索（请在云数据管理平台中管理文本索引）
         * 云数据管理平台默认为_name和_address建立文本索引
         * @member {string}
         */
        keywords?: string;

        /**
         * 云检索的筛选条件
         * 仅支持对建立了排序筛选索引的字段进行筛选（请在云数据管理平台中管理排序筛选索引）；
         * 支持多个筛选条件，支持对文本字段的精确匹配和对数值字段的区间筛选。
         * 筛选条件之间使用“+”代表“与”关系,如：
         * filter:"_name:酒店+star:[3,5]"(等同于SOL语句的：WHERE_name="酒店" AND star BETWEEN 3 AND 5)
         * @member {string}
         */
        filter?: string;

        /**
         * 返回数据的排序规则
         * 1.支持系统预设排序规则：
         * _distance：坐标与中心点距离升序排序（仅对周边检索有效）
         * _weight：权重降序排序：
         * 默认值：
         * 1)当设置了keywords时，默认按"_weight"权重排序；
         * 2)当未设置keywords时，默认按"_distance"距离排序
         * 如：orderBy:"_weight"
         * 2.支持对建立了排序筛选索引的整数或小数字段进行排序（请在云数据管理平台中管理排序筛选索引），
         * 升降序分别为"ASC"、"DESC",若仅填字段不填升降序则默认按升序排列
         * 如：orderBy:"age:ASC"
         * @member {string}
         */
        orderBy?: string;

        /**
         * 单页显示结果数，取值范围[0-100],超过取值范围取默认值
         * 默认：20
         * @member {number}
         * @default 20
         */
        pageSize?: number;

        /**
         * 当前页码，取值>=1，默认1。
         * @default 1
         * @member {number}
         */
        pageIndex?: number;

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
         * 用于控制在搜索结束后，是否自动调整地图视野使绘制的 Marker 点都处于视口的可见范围。
         * @member {boolean}
         */
        autoFitView?: boolean;
    }

    interface CloudDataSearchResult
    {
        /**
         * 成功状态文字描述。
         * @member {string}
         */
        info?: string;

        /**
         * 查询结果总数。
         * @member {number}
         */
        count?: number;
        
        /**
         * 云数据数组，当根据数据id检索时，数据仅包含一个CloudData。
         * @member {Array<object>}
         */
        datas?: Array<object>;
    }

    interface CloudDataSearchError
    {
        info?: string;
    }
    
    /**
     * AMap.CloudDataSearch云数据检索服务，为开发者提供对业务数据的空间检索服务。
     * 云数据检索服务包括周边检索、多边形检索以及根据数据id检索。
     * 注：使用AMap.CloudDataSearch插件之前，请在云图数据管理后台建立存储表格。
     * 具体创建和管理云数据存储表格的方法可以进入云图开发指南查看。
     * @class
     * @description 插件类，插件名："AMap.CloudDataSearch"
     * @see http://lbs.amap.com/api/javascript-api/reference/cloudlayer#CloudDataSearch
     */
    class CloudDataSearch extends EventDispatcher
    {
        /**
         * 构造函数，构造云数据检索示例。
         * @param  {string} tableId
         * @param  {CloudDataSearchOptions} opts
         */
        constructor(tableId: string, opts?: CloudDataSearchOptions);
        
        /**
         * 周边检索，根据指定的中心点和半径检索位置数据
         * radius取值范围[0-50000]，超过取值范围按3000，单位：米
         * 当status为complete时，result为CloudDataSearchResult
         * 当status为error时，result为错误信息info
         * 当status为no_data时，代表检索返回0结果
         * @param  {LngLat | [number, number]} center
         * @param  {number} radius
         * @param  {Function} callback
         * @returns void
         */
        searchNearBy(center: LngLat | [number, number], radius: number, callback: (status: string, result: string | CloudDataSearchResult) => void): void;
        
        /**
         * 多边形检索，根据给定的多边形节点坐标数组，检索位置数据
         * 如果数组只有两个坐标元素，则认为多边形为矩形，这两个点为矩形的左下、右上点
         * 多边形坐标数组的起、终点必须保证多边形闭合（起、终点坐标相同）
         * 当status为complete时，result为CloudDataSearchResult
         * 当status为error时，result为错误信息info
         * 当status为no_data时，代表检索返回0结果
         * @param  {Array<LngLat | [number, number]>} paths
         * @param  {Function} callback
         * @returns void
         */
        searchInPolygon(paths: Array<LngLat | [number, number]>, callback: (status: string, result: string | CloudDataSearchResult) => void): void;
        
        /**
         * 根据行政区划（包括全国/省/市/区县）名称，检索行政区划内位置数据
         * district为“全国”，则对全表搜索
         * 当district非法或不正确时，按照district为“全国”返回
         * 当status为complete时，result为CloudDataSearchResult
         * 当status为error时，result为错误信息info
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} district
         * @param  {Function} callback
         * @returns void
         */
        searchByDistrict(district: string, callback: (status: string, result: string | CloudDataSearchResult) => void): void;
        
        /**
         * 根据数据id检索位置数据，id检索时不需要设置CloudDataSearchOptions
         * 当status为complete时，result为CloudDataSearchResult
         * 当status为error时，result为错误信息info
         * 当status为no_data时，代表检索返回0结果
         * @param  {string} id
         * @param  {Function} callback
         * @returns void
         */
        searchById(id: string, callback: (status: string, result: string | CloudDataSearchResult) => void): void;
        
        /**
         * 设置云数据检索属性。
         * @param  {CloudDataSearchOptions} options
         * @returns void
         */
        setOptions(options: CloudDataSearchOptions): void;
        
        /**
         * 清除搜索结果。
         * @returns void
         */
        clear(): void;
    }

    interface WeatherLiveResult
    {
        /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 省份名。
         * @member {string}
         */
        province?: string;

        /**
         * 城市名。
         * @member {string}
         */
        city?: string;

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 天气预报，详见天气预报列表。
         * @member {string}
         */
        weather?: string;

        /**
         * 实时气温，单位：摄氏度。
         * @member {number}
         */
        temperature?: number;

        /**
         * 风向，风向编码对应描述。
         * @member {string}
         */
        windDirection?: string;

        /**
         * 风力，风力编码对应风力级别，单位：级。
         * @member {number}
         */
        windPower?: number;

        /**
         * 空气湿度（百分比）。
         * @member {string}
         */
        humidity?: string;

        /**
         * 数据发布的时间。
         * @member {string}
         */
        reportTime?: string;
    }

    interface WeatherForecastResult
    {
         /**
         * 成功状态说明。
         * @member {string}
         */
        info?: string;

        /**
         * 省份名。
         * @member {string}
         */
        province?: string;

        /**
         * 城市名。
         * @member {string}
         */
        city?: string;

        /**
         * 区域编码。
         * @member {string}
         */
        adcode?: string;

        /**
         * 数据发布的时间。
         * @member {string}
         */
        reportTime?: string;

        /**
         * 天气预报数组，包括当天至第三天的预报数据。
         * @member {Array<Forecast>}
         */
        forecasts?: Array<Forecast>;
    }

    interface Forecast
    {
        /**
         * 日期，格式为"年-月-日"。
         * @member {string}
         */
        date?: string;

        /**
         * 星期。
         * @member {string}
         */
        week?: string;

        /**
         * 白天天气现象，详见天气现象列表。
         * @member {string}
         */
        dayWeather?: string;
        
        /**
         * 夜间天气现象，详见天气现象列表。
         * @member {string}
         */
        nightWeather?: string;

        /**
         * 白天温度。
         * @member {number}
         */
        dayTemp?: number;

        /**
         * 夜间温度。
         * @member {number}
         */
        nightTemp?: number;

        /**
         * 白天风向。
         * @member {string}
         */
        dayWindDir?: string;

        /**
         * 夜间风向。
         * @member {string}
         */
        nightWindDir?: string;

        /**
         * 白天风力。
         * @member {string}
         */
        dayWindPower?: string;

        /**
         * 夜间风力。
         * @member {string}
         */
        nightWindPower?: string;
    }

    /**
     * AMap.Weather天气查询服务，根据城市名称或区域编码返回城市天气预报信息，包括实时天气信息和4天天气预报。
     * @class
     * @description 插件类，插件名："AMap.Weather"
     * @see http://lbs.amap.com/api/javascript-api/reference/search_plugin#m_AMap.Weather
     */
    class Weather extends EventDispatcher
    {
        /**
         * 查询实时天气信息
         * district支持城市名称/区域编码（如：“杭州市”/“330100”）
         * 当请求成功时ErrorStatus为null，当请求不成功时ErrorStatus为Obj
         * @param  {string} district
         * @param  {Function} callback
         * @returns void
         */
        getLive(district: string, callback: (error: object, result: WeatherLiveResult) => void): void;
        
        /**
         * 查询四天预报天气，包括查询当天天气信息
         * district支持城市名称/区域编码（如：“杭州市”/“330100”）
         * 当请求成功时ErrorStatus为null，当请求不成功时ErrorStatus为Obj
         * @param  {string} district
         * @param  {Function} callback
         * @returns void
         */
        getForecast(district: string, callback: (error: object, result: WeatherForecastResult) => void): void;
    }
}
