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
         * @member {Array<object>}
         */
        groupbuys?: Array<object>;

        /**
         * 优惠信息。
         * @member {Array<object>}
         */
        discounts?: Array<object>;

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
         * @member {object}
         */
        dining?: object;

        /**
         * 酒店类深度信息。
         * @member {object}
         */
        hotel?: object;

        /**
         * 影院类深度信息。
         * @member {object}
         */
        cinema?: object;

        /**
         * 景点类深度信息。
         * @member {object}
         */
        scenic?: object;
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
        info?: string;

        districtList?: Array<District>;
    }

    interface District
    {
        /**
         * 行政区名称。
         * @member
         * @returns string
         */
        name?: string;

        /**
         * 城市中心点经纬度坐标。
         * @member
         * @returns LngLat | [number, number]
         */
        center?: LngLat | [number, number];

        /**
         * 城市编码。
         * @member
         * @returns string
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
         * @member
         * @returns Array<LngLat | [number, number]>
         */
        boundaries?: Array<LngLat | [number, number]>;

        /**
         * 下级行政区信息列表。
         * subdistrict为 0 时，不返回该对象。
         * @member
         * @returns Array<District>
         */
        districtList?: Array<District>;
    }
}
