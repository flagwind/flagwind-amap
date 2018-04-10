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
    }
];

export default routes;
