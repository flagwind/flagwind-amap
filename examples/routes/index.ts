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
        path: "/components/rectangle",
        component: (resolve: any) => (<any>require)(["views/components/rectangle.vue"], resolve)
    }
];

export default routes;
