/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const source =
{
    index:
    {
        name: "用户数",
        value: "6.28亿"
    },
    genders:
    [
        {
            value: 55,
            name: "女-55%"
        },
        {
            value: 45,
            name: "男-45%"
        }
    ],
    ages:
    [
        {
            value: 6,
            name: "65以上"
        },
        {
            value: 5,
            name: "50-60岁"
        },
        {
            value: 8,
            name: "35-50岁"
        },
        {
            value: 7,
            name: "25-35岁"
        },
        {
            value: 9,
            name: "19-25岁"
        },
        {
            value: 9,
            name: "0-18岁"
        }
    ]
};

const option =
{
    title:
    {
        text: source.index.name,
        subtext: source.index.value,
        x: "center",
        y: "center",
        textStyle:
        {
            fontWeight: "normal",
            fontSize: 16
        }
    },
    tooltip:
    {
        trigger: "item",
        formatter: "{a} <br/>{b}:({d}%)"
    },
    series:
    [
        {
            name: "性别",
            type: "pie",
            radius: ["20%", "50%"],
            color: ["#FFCCFF", "#59abe1", "#f4cf42", "#3dc6a8"],
            label:
            {
                normal:
                {
                    position: "inner"
                }
            },
            data: source.genders
        },
        {
            name: "年龄结构",
            type: "pie",
            radius: ["54%", "72%"],
            color: ["#a0dca0", "#60bbb6", "#f78db3", "#feadac", "#fae395", "#91d4e5", "#8eb3e8"],
            label:
            {
                normal:
                {
                    formatter: "{b}\n{d}%"
                }
            },
            data: source.ages
        }
    ]
};

export default option;
