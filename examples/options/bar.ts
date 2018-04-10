/*!
 * Authors:
 *      jason <jasonsoop@gmail.com>
 * 
 * Licensed under the MIT License.
 * Copyright (C) 2010-present Flagwind Inc. All rights reserved. 
 */

const source =
{
    months: ["1月", "2月", "3月"],
    provinces: ["湖南", "四川", "云南", "贵州", "广西"],
    data:
    [
        [145, 130, 917, 142, 665],
        [341, 413, 282, 741, 300],
        [441, 513, 672, 441, 500]
    ]
};

const option =
{
    timeline:
    {
        axisType: "category",
        show: true,
        autoPlay: false,
        playInterval: 1000,
        data: []
    },
    options: []
};

for(let i = 0, len = source.months.length; i < len; i++)
{
    option.timeline.data.push(source.months[i]);
    
    option.options.push
    ({
        title:
        {
            show: true,
            text: source.months[i]
        },
        tooltip:
        {
            trigger: "axis"
        },
        grid:
        {
            y: 80,
            y2: 100
        },
        xAxis:
        [
            {
                type: "category",
                axisLabel:
                {
                    interval: 0,
                    rotate: 45
                },
                data: source.provinces
            }
        ],
        yAxis:
        [
            {
                type: "value",
                name: "上客量(人)"
            }
        ],
        series:
        [
            {
                name: "上客量",
                yAxisIndex: 0,
                type: "bar",
                itemStyle:
                {
                    normal:
                    {
                        color:
                        {
                            type: "linear",
                            x: 0,
                            y: 1,
                            x2: 0,
                            y2: 0,
                            colorStops:
                            [
                                {
                                    offset: 0,
                                    color: "#2af598"
                                },
                                {
                                    offset: 1,
                                    color: "#009efd"
                                }
                            ]
                        },
                        barBorderRadius: 4
                    }
                },
                barWidth: 40,
                label:
                {
                    normal:
                    {
                        show: true,
                        position: "top",
                        formatter: "{c}"
                    }
                },
                data: source.data[i]
            }
        ]
    });
}

export default option;
