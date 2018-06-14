/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

import flagwind from "flagwind-core";
import Type = flagwind.Type;
import Map = flagwind.Map;
import { component, config } from "flagwind-web";
import Component from "../component";
import events from "config/events";
import MapLoader from "common/map-loader";
import MapConvert from "common/map-convert";
import IMapPlugin from "models/map-plugin";
import "./amap.less";

const window: any = global;

/**
 * 事件定义。
 * @private
 * @const
 */
const EVENTS =
[
    "complete",             // 地图图块加载完成后触发事件
    "click",                // 鼠标左键单击事件
    "dblclick",             // 鼠标左键双击事件
    "mapmove",              // 地图平移时触发事件
    "hotspotclick",         // 鼠标点击热点时触发
    "hotspotover",          // 鼠标滑过热点时触发
    "hotspotout",           // 鼠标移出热点时触发
    "movestart",            // 地图平移开始时触发
    "moveend",              // 地图平移结束后触发。如地图有拖拽缓动效果，则在缓动结束后触发
    "zoomchange",           // 地图缩放级别更改后触发
    "zoomstart",            // 缩放开始时触发
    "zoomend",              // 缩放停止时触发
    "mousemove",            // 鼠标在地图上移动时触发
    "mousewheel",           // 鼠标滚轮开始缩放地图时触发
    "mouseover",            // 鼠标移入地图容器内时触发
    "mouseout",             // 鼠标移出地图容器时触发
    "mouseup",              // 鼠标在地图上单击抬起时触发
    "mousedown",            // 鼠标在地图上单击按下时触发
    "rightclick",           // 鼠标右键单击事件
    "dragstart",            // 开始拖拽地图时触发
    "dragging",             // 拖拽地图过程中触发
    "dragend",              // 停止拖拽地图时触发。如地图有拖拽缓动效果，则在拽停止，缓动开始前触发
    "resize",               // 地图容器大小改变事件
    "touchstart",           // 触摸开始时触发事件，仅适用移动设备
    "touchmove",            // 触摸移动进行中时触发事件，仅适用移动设备
    "touchend"              // 触摸停止时触发，仅适用移动设备
];

/**
 * 高德地图组件。
 * @class
 * @version 1.0.0
 */
@component({template: require("./amap.html")})
export default class AMapComponent extends Component
{
    private _loadPromise: Promise<void>;                              // 地图库加载Promise
    private _resolvedPlugins: Array<any>;                             // 解析后的插件
    private _amapPlugins: Map<string, any>;                           // 高德地图真实的插件

    /**
     * 获取或设置组件属性侦听处理程序。
     * @protected
     * @member
     * @returns object
     */
    protected watchHandlers: object =
    {
        city: function(value: string)
        {
            (<any>this).amap.setCity(value);
        },

        zoomEnable: function(value: boolean)
        {
            (<any>this).amap.setStatus({ zoomEnable: value });
        },

        dragEnable: function(value: boolean)
        {
            (<any>this).amap.setStatus({ dragEnable: value });
        },

        doubleClickZoom: function(value: boolean)
        {
            (<any>this).amap.setStatus({ doubleClickZoom: value });
        },

        keyboardEnable: function(value: boolean)
        {
            (<any>this).amap.setStatus({ keyboardEnable: value });
        },

        jogEnable: function(value: boolean)
        {
            (<any>this).amap.setStatus({ jogEnable: value });
        },

        scrollWheel: function(value: boolean)
        {
            (<any>this).amap.setStatus({ scrollWheel: value });
        }
    };

    /**
     * 获取解析后的插件列表。
     * @protected
     * @property
     * @returns Array<any>
     */
    protected get resolvedPlugins(): Array<IMapPlugin>
    {
        if(!this._resolvedPlugins)
        {
            this._resolvedPlugins = this.resolvePlugins(this.plugins);
        }

        return this._resolvedPlugins;
    }

    /**
     * 获取高德地图的DOM节点。
     * @public
     * @property
     * @returns HTMLDivElement
     */
    public get $amap(): HTMLDivElement
    {
        return this.$refs.amap as HTMLDivElement;
    }
    
    /**
     * 获取或设置地图图层数组，数组可以是图层中的一个或多个，默认为普通二维地图。
     * 当叠加多个图层时，普通二维地图需通过实例化一个 TileLayer 类实现。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Array<Object>
     */
    @config({type: Array})
    public layers: Array<object>;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可缩放。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public zoomEnable: boolean;

    /**
     * 获取或设置地图显示的缩放级别。
     * 3D地图下，zoom值，可以设置为浮点数。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Number
     */
    @config({type: Number})
    public zoom: number;

    /**
     * 获取或设置地图显示的缩放级别范围，在PC上，默认范围[3,18]，取值范围[3-18]；在移动设备上，默认范围[3,19]，取值范围[3-19]
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Array<Number>
     */
    @config({type: Array})
    public zooms: [number, number];
    
    /**
     * 获取或设置设置地图显示的中心点[经度，纬度]。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Array<Number>
     */
    @config({type: Array})
    public center: [number, number];
    
    /**
     * 获取或设置一个行政区名称或 adcode，用于设置地图显示的中心点。
     * 注意：不要同时使用 center 属性，如一起使用将以 city 属性作为最终呈现结果。 
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns String
     */
    @config({type: String})
    public city: string;

    /**
     * 获取或设置地图标注显示顺序，大于110可将底图上的默认标注显示在覆盖物（圆、折线、面）之上。。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Number
     */
    @config({type: Number})
    public labelzIndex: number;

    /**
     * 获取或设置地图渲染模式。
     * 取值范围 "2D" 或 "3D"
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default "2D"
     * @returns String
     */
    @config({type: String})
    public viewMode: "2D" | "3D";

    /**
     * 获取或设置一个布尔值，表示是否允许设置俯仰角度。
     * 3D视图下为true，2D视图下设置无效。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean})
    public pitchEnable: boolean;

    /**
     * 获取或设置地图处于3D渲染模式下的俯仰角度(0°-83°)。
     * 取值范围 0 至 83。
     * @description 动态属性，支持响应式。。
     * @public
     * @config
     * @default 0
     * @returns Number
     */
    @config({type: Number})
    public pitch: number;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可旋转。
     * 3D视图默认为true，2D视图默认false。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean})
    public rotateEnable: boolean;

    /**
     * 获取或设置天空颜色，仅针对3D视图有效，如："#ff0000"。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns String
     */
    @config({type: String})
    public skyColor: string;

    /**
     * 获取或设置一个布尔值，用于控制渲染楼块时是否带动画效果，3D视图有效，PC端默认true，手机端默认false。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean})
    public buildingAnimation: boolean;

    /**
     * 获取或设置地图的语言类型。
     * 可选值：zh_cn(中文简体)，en(英文)，zh_en(中英文对照)。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default zh_cn
     * @returns String
     */
    @config({type: String, default: "zh_cn"})
    public lang: "zh_cn" | "en" | "zh_en";

    /**
     * 获取或设置地图默认鼠标样式。
     * 该参数应符合 CSS 的 cursor 属性规范。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns String
     */
    @config({type: String})
    public defaultCursor: string;
    
    /**
     * 获取或设置地图显示的参考坐标系。
     * 地图显示的参考坐标系，取值范围："EPSG3857"，"EPSG3395"，"EPSG4326"。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns String
     */
    @config({type: String})
    public crs: "EPSG3857" | "EPSG3395" | "EPSG4326";
    
    /**
     * 获取或设置一个布尔值，用于控制地图平移过程中是否使用动画。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public animateEnable: boolean;

    /**
     * 获取或设置一个布尔值，用于控制是否开启地图热点。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default false
     * @returns Boolean
     */
    @config({type: Boolean})
    public isHotspot: boolean;

    /**
     * 获取或设置一个布尔值，用于控制是否监控地图容器尺寸变化。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default false
     * @returns Boolean
     */
    @config({type: Boolean})
    public resizeEnable: boolean;

    /**
     * 获取或设置一个布尔值，表示是否在有矢量底图的时候自动展示室内地图，PC端默认是true，移动端默认是false。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean})
    public showIndoorMap: boolean;

    /**
     * 获取或设置一个布尔值，表示是否支持可以扩展最大缩放级别。
     * 和 zooms 属性配合使用设置为 true 的时候，zooms 的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Boolean
     */
    @config({type: Boolean})
    public expandZoomRange: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可通过鼠标拖拽平移。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public dragEnable: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可通过双击鼠标放大地图。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public doubleClickZoom: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可通过键盘控制。
     * 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+"→"顺时针旋转，Ctrl+"←"逆时针旋转。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public keyboardEnable: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图是否使用缓动效果。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public jogEnable: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图是否可通过鼠标滚轮缩放浏览。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public scrollWheel: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图在移动终端上是否可通过多点触控缩放浏览地图。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public touchZoom: boolean;

    /**
     * 获取或设置触控缩放中心，当 touchZoomCenter = 1 的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Number
     */
    @config({type: Number})
    public touchZoomCenter: number;
    
    /**
     * 获取或设置地图的显示样式。
     * 目前支持官方样式模板，如："amap://styles/grey"。
     * 或用户自定义地图样式，如："amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"。
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @default "amap://styles/normal"
     * @returns String
     */
    @config({type: String})
    public mapStyle: string;

    /**
     * 获取或设置需要加载的地图插件。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @returns Array<String | Object>
     */
    @config({type: Array})
    public plugins: Array<string | object>;

    /**
     * 获取或设置地图上显示的元素种类。
     * 支持"bg"（地图背景）、"point"（POI点）、"road"（道路）、"building"（建筑物）
     * @description 动态属性，支持响应式。
     * @public
     * @config
     * @returns Array<String>
     */
    @config({type: Array})
    public features: Array<"bg" | "point" | "road" | "building">;

    /**
     * 获取或设置一个布尔值，用于控制地图是否显示3D楼块效果，移动端也可使用。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public showBuildingBlock: boolean;

    /**
     * 获取或设置一个布尔值，用于控制地图的预加载模式，开启预加载的地图会在适当时刻提前加载周边和上一级的地图数据，优化使用体验。
     * @description 静态属性，仅支持初始化配置。
     * @public
     * @config
     * @default true
     * @returns Boolean
     */
    @config({type: Boolean, default: true})
    public preloadMode: boolean;
    
    /**
     * 初始化地图组件的新实例。
     * @public
     * @constructor
     */
    public constructor()
    {
        super(EVENTS);
    }

    /**
     * 设置地图的显示状态。
     * 包括是否可鼠标拖拽移动地图、地图是否可缩放、地图是否可旋转（rotateEnable）、是否可双击放大地图、是否可以通过键盘控制地图旋转（keyboardEnable）等。  
     * @public
     * @param  {object} status
     * @returns void
     */
    public setStatus(status: object): void
    {
        if(this.amap)
        {
            this.amap.setStatus(status);
        }
    }
    
    /**
     * 当准备创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected beforeCreate(): void
    {
        // 获取地图库加载器单实例
        const loader = MapLoader.instance;
        
        // 检验地图库是否已经初始化
        if(!loader)
        {
            throw new Error("AMap library is not initialize, please check!");
        }

        // 如果地图配置为懒加载，则在创建组件时进行延迟加载
        this._loadPromise = loader.load();
    }
    
    /**
     * 当创建组件时调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected mounted(): void
    {
        // 调用基类方法
        super.mounted();
        
        // 初始化高德地图
        this.initializeMap();
    }
    
    /**
     * 当销毁组件后调用的钩子方法。
     * @protected
     * @override
     * @returns void
     */
    protected destroyed(): void
    {
        super.destroyed();

        if(this.amap)
        {
            this.amap.destroy();
        }
    }

    /**
     * 初始化高德地图。
     * @private
     * @returns void
     */
    private async initializeMap(): Promise<void>
    {
        if(this.amap)
        {
            return;
        }
        
        // 加载地图库
        await this._loadPromise;

        // 解析配置选项
        const options = this.resolveOptions();

        // 初始化地图实例
        this.amap = this.amapComponent = new window.AMap.Map(this.$amap, options);

        // 通知外部组件高德地图已准备就绪
        this.$emit(events.amapReady, this.amap);

        // 通知所有子组件高德地图已准备就绪
        this.$children.forEach(child =>
        {
            child.$emit(events.amapReady, this.amap);
        });

        // 初始化地图插件
        this.initializePlugins();

        const map: AMap.Map = this.amap;

        map.AmbientLight = new AMap.Lights.AmbientLight([1,1,1],0.5);
        map.DirectionLight = new AMap.Lights.DirectionLight([0,0,1],[1,1,1],1);

        const object3Dlayer = new AMap.Object3DLayer();

        new AMap.DistrictSearch
        ({
            subdistrict: 0,
            extensions: "all",
            level: "city"
        })
        .search("朝阳区", function(status, result: AMap.DistrictSearchResult)
        {
            let bounds = result.districtList[0].boundaries;
            let height = 5000;
            let color = "#0088ffcc";

            console.log(bounds);

            // let prism = new AMap.Object3D.Prism
            // ({
            //     path: bounds,
            //     height: height,
            //     color: color
            // });

            // prism.transparent = true;

            // object3Dlayer.add(prism);

            let text = new AMap.Text
            ({
                text: result.districtList[0].name + "</br>(" + result.districtList[0].adcode + ")",
                verticalAlign: "bottom",
                position: [116.528261,39.934313],
                // height: 5000,
                style:
                {
                    "background-color": "transparent",
                    "-webkit-text-stroke": "red",
                    "-webkit-text-stroke-width": "0.5px",
                    "text-align": "center",
                    "border": "none",
                    "color": "white",
                    "font-size": "24px",
                    "font-weight": 600
                }
            });

            text.setMap(map);
        });

        // map.setLayers([object3Dlayer]);

        // map.add(object3Dlayer);

        // this.amap.plugin("AMap.DragRoute", () =>
        // {
        //     // console.log(AMap.DrivingPolicy.LEAST_TIME);
        // });

        // const auto = new AMap.Autocomplete();
        // console.log(auto);
    }
    
    /**
     * 初始化地图插件。
     * @private
     * @returns void
     */
    private initializePlugins(): void
    {
        if(!this.resolvedPlugins || !this.resolvedPlugins.length)
        {
            return;
        }

        const needInjectPlugins = this.resolvedPlugins.filter(plugin => !window.AMap[plugin.shortName]);
        
        if(!needInjectPlugins || !needInjectPlugins.length)
        {
            this.registerControls();
        }
        else
        {
            this.amap.plugin(needInjectPlugins, this.registerControls);
        }
    }
    
    /**
     * 注册插件至地图控件中。
     * @private
     * @returns void
     */
    private registerControls(): void
    {
        const AMap = window.AMap;
        const plugins = this.resolvedPlugins;

        if(!plugins || !plugins.length)
        {
            return;
        }

        this._amapPlugins = this._amapPlugins || new Map<string, any>();

        for(const plugin of plugins)
        {
            const pluginOptions = this.convertPluginOptions(plugin);
            const pluginInstance = new AMap[plugin.shortName](pluginOptions);
            
            // 将插件实例添加至地图实例中
            this.amap.addControl(pluginInstance);

            // 存储至本地缓存中
            this._amapPlugins.set(plugin.fullName, pluginInstance);
            
            // 处理插件事件
            if(plugin.events)
            {
                for(const key in plugin.events)
                {
                    if(Object.prototype.hasOwnProperty.call(plugin.events, key))
                    {
                        let handler = plugin.events[key];

                        if(key === "init")
                        {
                            handler(pluginInstance);
                        }
                        else
                        {
                            AMap.event.addListener(pluginInstance, key, handler);
                        }
                    }
                }
            }
        }
    }
    
    /**
     * 解析指定插件配置为标准的地图插件。
     * @private
     * @param  {Array<any>} plugins 原始插件列表，列表项可以为字符串或匿名对象配置。
     * @returns Array<IMapPlugin> 标准地图插件。
     */
    private resolvePlugins(plugins: Array<any>): Array<IMapPlugin>
    {
        const amapPrefix = /^AMap./;

        if(!plugins || !plugins.length)
        {
            return [];
        }
        
        // 将插件名称解析为完整名称，例如："AMap.ToolBar"
        const parseFullName = (pluginName: string) =>
        {
            return amapPrefix.test(pluginName) ? pluginName : "AMap." + pluginName;
        };
        
        // 将插件名称解析为短写名称，例如："ToolBar"
        const parseShortName = (pluginName: string) =>
        {
            return pluginName.replace(amapPrefix, "");
        };
        
        return plugins.map((source: any) =>
        {
            let plugin: IMapPlugin;

            if(Type.isString(source))
            {
                plugin =
                {
                    name: source,
                    fullName: parseFullName(source),
                    shortName: parseShortName(source)
                };
            }
            else
            {
                plugin = {...source};
                plugin.fullName = parseFullName(source.name);
                plugin.shortName = parseShortName(source.name);
            }
            
            return plugin;
        });
    }
    
    /**
     * 转换插件的配置项。
     * @private
     * @param  {any} resolvedPlugin 插件实例。
     * @returns any
     */
    private convertPluginOptions(resolvedPlugin: any): any
    {
        switch(resolvedPlugin.fullName)
        {
            case "AMap.ToolBar":
            case "AMap.Scale":
            {
                if(Type.isArray(resolvedPlugin.offset))
                {
                    // 转换偏移量
                    resolvedPlugin.offset = MapConvert.toPixel(resolvedPlugin.offset);
                }
                
                break;
            }
        }

        return resolvedPlugin;
    }
}
