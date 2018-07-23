/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const routes =
[
    {
        path: "/",
        redirect: "/intro"
    },
    {
        path: "/intro",
        component: (resolve: any) => (<any>require)(["views/intro.vue"], resolve)
    },
    {
        path: "/components",
        redirect: "/components/amap"
    },
    {
        path: "/components/amap",
        component: (resolve: any) => (<any>require)(["views/components/amap.vue"], resolve)
    },
    {
        path: "/components/marker",
        component: (resolve: any) => (<any>require)(["views/components/marker.vue"], resolve)
    },
    {
        path: "/components/text-marker",
        component: (resolve: any) => (<any>require)(["views/components/text-marker.vue"], resolve)
    },
    {
        path: "/components/circle-marker",
        component: (resolve: any) => (<any>require)(["views/components/circle-marker.vue"], resolve)
    },
    {
        path: "/components/elastic-marker",
        component: (resolve: any) => (<any>require)(["views/components/elastic-marker.vue"], resolve)
    },
    {
        path: "/components/simple-marker",
        component: (resolve: any) => (<any>require)(["views/components/simple-marker.vue"], resolve)
    },
    {
        path: "/components/polygon",
        component: (resolve: any) => (<any>require)(["views/components/polygon.vue"], resolve)
    },
    {
        path: "/components/circle",
        component: (resolve: any) => (<any>require)(["views/components/circle.vue"], resolve)
    },
    {
        path: "/components/ellipse",
        component: (resolve: any) => (<any>require)(["views/components/ellipse.vue"], resolve)
    },
    {
        path: "/components/rectangle",
        component: (resolve: any) => (<any>require)(["views/components/rectangle.vue"], resolve)
    },
    {
        path: "/components/polyline",
        component: (resolve: any) => (<any>require)(["views/components/polyline.vue"], resolve)
    },
    {
        path: "/components/bezier-curve",
        component: (resolve: any) => (<any>require)(["views/components/bezier-curve.vue"], resolve)
    },
    {
        path: "/components/context-menu",
        component: (resolve: any) => (<any>require)(["views/components/context-menu.vue"], resolve)
    },
    {
        path: "/components/info-window",
        component: (resolve: any) => (<any>require)(["views/components/info-window.vue"], resolve)
    },
    {
        path: "/components/control-bar",
        component: (resolve: any) => (<any>require)(["views/components/control-bar.vue"], resolve)
    },
    {
        path: "/components/tool-bar",
        component: (resolve: any) => (<any>require)(["views/components/tool-bar.vue"], resolve)
    },
    {
        path: "/components/map-type",
        component: (resolve: any) => (<any>require)(["views/components/map-type.vue"], resolve)
    },
    {
        path: "/components/over-view",
        component: (resolve: any) => (<any>require)(["views/components/over-view.vue"], resolve)
    },
    {
        path: "/components/scale",
        component: (resolve: any) => (<any>require)(["views/components/scale.vue"], resolve)
    }
];

export default routes;
