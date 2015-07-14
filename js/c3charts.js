var chart01 = c3.generate({
    bindto: "#chart01",
    data: {
        url: 'data01.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 90  
    },
    legend: {
        position: 'bottom'
    },
    color: {
        pattern: ["#109618", "#ff9900", "#3366cc", "#dc3912", "#990099"]
    },

    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    transition: {
        duration: 500
    }
});

$(function () {
    $('#chart02').highcharts({
        credits: {
            enabled: false
        },
        colors: ["#109618", "#ff9900", "#3366cc", "#dc3912", "#990099"],
        chart: {
            margin: [100, 50, 150, 80],
            type: 'column',
            backgroundColor: 'none'
        },
        title: {
            text: 'Share of request assigned by Google with the respective issue type'
        },
        xAxis: {
            categories: ['Italy','Romania','Hungary','Greece','Bulgaria','Norway','Slovenia','Ireland','United Kingdom','Switzerland','Croatia','Spain','Estonia','Malta','Finland','Iceland','Sweden','Luxembourg','Latvia','Belgium','Denmark','Slovakia','Liechtenstein','Poland','Czech Republic','Lithuania','Germany','Portugal','Austria','Netherlands','France','Cyprus'],
            labels: {
                rotation: 90
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'transparent',
            tickColor: 'black',
            tickLength: 3,
            tickWidth: 1,
            title: {
                text: 'share in per cent'
            },
            labels: {
                format: '{value} %',
                enabled: true
            }
        },
        tooltip: {
            borderRadius    : 2,
            borderWidth     : 0,
            borderColor     : 'transparent',
            shadow          : false,
            shared          : true,
            useHTML         : true,
            yDecimals       : 0,
            valueDecimals   : 0,
            backgroundColor: 'transparent',
            formatter: function() {
                var points='<table id="tip"><caption id="tipcap">'+this.x+'</caption>'
                +'<tbody id="tipbody"><tr id="tipcol">';
                $.each(this.points,function(i,point){
                    points+='<td id="tipname" style="background-color: '+point.series.color+'">'+point.series.name+':</td>'
                    + '<td id="tipnr" style="background-color: '+point.series.color+'">'+ '    ' + point.y + '  ( ' + Highcharts.numberFormat(this.percentage, 0) + '% )' + '</td>'
                });
                '</tr></tbody></table>';
                return points;
            },
            positioner: function () {
                return { x: 80, y: 35 };
            },
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            series: {
                borderWidth: 0
            }
        },
        series: [{
            name: 'private_personal_info',
            data: [14002, 3439, 1936, 1162,  797, 2169,  790, 1914,25598, 5340, 2274,19065, 1509,  154, 3081,  137, 6232,  303,  864, 6625, 2184,  892,   35, 5789, 2209, 1053,36065, 1814, 3969,13341,44397,  160]
        }, {
            name: 'serious_crime',
            data: [1953, 111,  13,   9,  15,  71,   8,  67, 734,  46,  36, 178,  33,   2,  46,   4,  81,   2,  17,  97,  32,   5,   1,  42,   9,  12, 149,  18,  10,  60, 256,   0]
        }, {
            name: 'public_figure',
            data: [171, 83,179, 72, 17, 43, 14, 14,228,145, 38,119,  5,  3, 32,  0, 71,  6,  4, 50,  6, 12,  0, 79, 28,  7,346,  8, 37, 97,191,  0]
        }, {
            name: 'political',
            data: [263,282, 53, 13, 19, 28, 12, 10,118, 36, 31,572, 30,  1, 24,  1, 63,  2,  8, 49, 16,  9,  0, 15, 17,  7,275,  6, 38, 79,224,  2]
        }, {
            name: 'cp',
            data: [88, 17, 30,  5,  4,  5, 14, 22,356, 36,  6, 34,  2,  1, 36,  1, 54,  1,  1, 32, 13,  1,  0, 20,  5,  2, 93, 11,  4, 30,102,  0]
        }]
    });
});


$(function () {
    $('#chart03').highcharts({
        credits: {
            enabled: false
        },
        colors: ["#457DDD","#656565","lightgrey","#77A7F3","#dc3912"],
        chart: {
            margin: [100, 50, 150, 80],
            type: 'column',
            backgroundColor: 'none'
        },
        title: {
            text: "Share of Google's decisions for incoming 'private_personal_info' requests"
        },
        xAxis: {
            categories: ['Bulgaria','Liechtenstein','Malta','Iceland','Romania','Ireland','Portugal','Italy','United Kingdom','Slovenia','Latvia','Croatia','Greece','Hungary','Czech Republic','Sweden','Norway','Lithuania','Slovakia','Spain','Cyprus','Estonia','Denmark','Poland','Netherlands','Finland','Luxembourg','Switzerland','Austria','Belgium','Germany','France'],
            labels: {
                rotation: 90
            }
        },
        yAxis: {
            min: 0,
            max: 100,
            gridLineColor: 'transparent',
            tickColor: 'black',
            tickLength: 3,
            tickWidth: 1,
            title: {
                text: 'share in per cent'
            },
            labels: {
                format: '{value} %',
                enabled: true
            }
        },
        tooltip: {
            borderRadius    : 2,
            borderWidth     : 0,
            borderColor     : 'transparent',
            shadow          : false,
            shared          : true,
            useHTML         : true,
            yDecimals       : 0,
            valueDecimals   : 0,
            backgroundColor: 'transparent',
            formatter: function() {
                var points='<table id="tip"><caption id="tipcap">'+this.x+'</caption>'
                +'<tbody id="tipbody"><tr id="tipcol">';
                $.each(this.points,function(i,point){
                    points+='<td id="tipname" style="background-color: '+point.series.color+'">'+point.series.name+':</td>'
                    + '<td id="tipnr" style="background-color: '+point.series.color+'">'+ '    ' + point.y + '  ( ' + Highcharts.numberFormat(this.percentage, 0) + '% )' + '</td>'
                });
                '</tr></tbody></table>';
                return points;
            },
            positioner: function () {
                return { x: 80, y: 35 };
            },
        },
        plotOptions: {
            column: {
                stacking: 'percent'
            },
            series: {
                borderWidth: 0
            }
        },
        series: [{
            name: 'granted',
            data: [221,   10,   45,   41, 1052,  624,  641, 5036, 9570,  301,  332,  881,  475,  816,  972, 2769,  965,  473,  401, 8628,   74,  706, 1041, 2799, 6548, 1524,  151, 2735, 2075, 3490,19553,24620
]
        }, {
            name: 'need more info',
            data: [126,   4,  28,  20, 520, 286, 330,2350,4160, 118, 133, 335, 235, 237, 298, 996, 406, 172, 127,2517,  30, 204, 340, 871,1595, 416,  42, 751, 563, 909,4195,5897
]
        }, {
            name: 'pending',
            data: [29,  1,  4,  5, 49, 55, 16,247,524, 13, 21, 32, 15, 35, 14,111, 42, 23,  2,300,  1, 27, 41, 64,129, 75,  5, 71, 50, 58,489,522
]
        }, {
            name: 'rejected',
            data: [421,   20,   77,   71, 1780,  942,  825, 6314,11299,  357,  376, 1026,  432,  842,  921, 2344,  755,  385,  360, 7585,   54,  570,  759, 2047, 5053, 1059,  104, 1772, 1268, 2161,11715,13240
]
        }, {
            name: 'undefined',
            data: [0,  0,  0,  0, 38,  7,  2, 55, 45,  1,  2,  0,  5,  6,  4, 12,  1,  0,  2, 35,  1,  2,  3,  8, 16,  7,  1, 11, 13,  7,113,118
]
        }]
    });
});




$(function () {
    $('#chart04').highcharts({
        credits: {
            enabled: false
        },
        colors: ["#457DDD"],
        chart: {
            margin: [100, 50, 150, 80],
            type: 'column',
            backgroundColor: 'none'
        },
        title: {
            text: "Number of request per one million citizens in the associated (*) country"
        },
        xAxis: {
            categories: ['Austria','Belgium','Bulgaria','Croatia','Cyprus','Czech Republic','Denmark','Estonia','Finland','France','Germany','Greece','Hungary','Iceland','Ireland','Italy','Latvia','Liechtenstein','Lithuania','Luxembourg','Malta','Netherlands','Norway','Poland','Portugal','Romania','Slovakia','Slovenia','Spain','Sweden','Switzerland','United Kingdom'],
            labels: {
                rotation: 90
            }
        },
        yAxis: {
            min: 0,
            gridLineColor: 'transparent',
            tickColor: 'black',
            tickLength: 3,
            tickWidth: 1,
            title: {
                text: 'requests per mill'
            },
            labels: {
                enabled: true
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            borderRadius    : 2,
            borderWidth     : 0,
            borderColor     : 'transparent',
            shadow          : false,
            shared          : true,
            useHTML         : true,
            yDecimals       : 0,
            valueDecimals   : 0,
            backgroundColor: 'transparent',
            formatter: function() {
                var points='<table id="tip"><caption id="tipcap">'+this.x+'</caption>'
                +'<tbody id="tipbody"><tr id="tipcol">';
                $.each(this.points,function(i,point){
                    points+='<td id="tipname" style="background-color: '+point.series.color+'">'+point.series.name+':</td>'
                    + '<td id="tipnr" style="background-color: '+point.series.color+'">'+point.y+'</td>'
                });
                '</tr></tbody></table>';
                return points;
            },
            positioner: function () {
                return { x: 80, y: 35 };
            },
        },
        plotOptions: {
            series: {
                borderWidth: 0
            }
        },
        series: [{
            name: 'Requests per 1 million citizens',
            data: [479, 612, 117, 561, 142, 216, 401,1192, 592, 684, 458, 114, 223, 443, 441, 275, 444, 975, 366, 578, 380, 810, 456, 154, 178, 197, 170, 407, 428, 678, 693, 422
]
        }]
    });
});


var chart06 = c3.generate({
            bindto: '#chart06',
            data: {
                x : 'Issue',
                url: 'data06.csv',
                order: null,
                type: 'bar',
                groups: [
                    ['granted','need more info','pending','rejected','undefined']
                ]
            },
            color: {
                pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
            },
            axis: {
                rotated: true,
                x: {
                    type: 'category' ,
                    tick: {
                        rotate: 90,
                        multiline: false
                    }
                },
                y: {
                    tick: {
                        format: d3.format('%') 
                        },
                    max: 1,
                    padding: {
                        top: 0,
                        bottom: 100
                    } 
                }
            },
            legend: {
                position: 'bottom'
            },
            tooltip: {
                format: {
                    value: function (value)  {
                        return d3.format("%")(value);
                    }
                }
            },
            transition: {
                duration: 0
            }
});


var chart06_cp = c3.generate({
    bindto: "#chart06_cp",
    data: {
        url: 'data06_cp.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 50  
    },
    legend: {
        show: false
    },
    color: {
        pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
    },
    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    size: {
        height: 200
    },
    transition: {
        duration: 500
    }
});
   

var chart06_sc = c3.generate({
    bindto: "#chart06_sc",
    data: {
        url: 'data06_sc.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 50  
    },
    legend: {
        show: false
    },
    color: {
        pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
    },
    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    size: {
        height: 200
    },
    transition: {
        duration: 500
    }
});

var chart06_po = c3.generate({
    bindto: "#chart06_po",
    data: {
        url: 'data06_po.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 50  
    },
    legend: {
        show: false
    },
    color: {
        pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
    },
    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    size: {
        height: 200
    },
    transition: {
        duration: 500
    }
});

var chart06_pu = c3.generate({
    bindto: "#chart06_pu",
    data: {
        url: 'data06_pu.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 50  
    },
    legend: {
        show: false
    },
    color: {
        pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
    },
    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    size: {
        height: 200
    },
    transition: {
        duration: 500
    }
});


var chart06_pp = c3.generate({
    bindto: "#chart06_pp",
    data: {
        url: 'data06_pp.csv',
        type : 'donut',
    },
    donut: {
        label: {
            format: function (value, ratio, id) {
                return d3.format("%")(ratio);
            }
        },
        width: 50  
    },
    legend: {
        show: false
    },
    color: {
        pattern: ["#457DDD","#656565","lightgrey","#77A7F3","red"]
    },
    tooltip: {
        format: {
            value: function (value, ratio, id)  {
                return d3.format("g")(value);
            }
        }
    },
    size: {
        height: 200
    },
    transition: {
        duration: 500
    }
});

