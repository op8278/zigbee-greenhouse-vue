//['2017-06-13 19:54:11', 19],
var colors = ['#d14a61', '#5793f3'];
exports.lineEchartOption = {
    color: colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        // formatter:'{a1}:{b0}:{c0}:{d0}'
    },
    dataZoom:[{
      type: 'inside',
      xAxisIndex: [0],
      filterMode: 'none',
      start: 0,
      end: 100
    },
    {
      type: 'slider',
      xAxisIndex: [0],
      filterMode: 'none',
      showDetail:true,
      bottom:0,
      start: 0,
      end: 100
    }
    ],
    toolbox: {
        feature: {
            mark : {show: true},
            dataView: {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    legend: {
        data:['温度','湿度'],
        textStyle:{
            color:'#fff',
            fontSize:18
        }
    },
    xAxis: [
        {
            type: 'time',
            name: '时间',
            nameLocation:'middle',
            nameGap:30,
            nameTextStyle:{
                color:'#0DF293',
                fontSize:16
            },
            axisTick: {
                alignWithLabel: true,
                interval:0
            },
            boundaryGap : false,
            splitLine: {
                show: true,
                interval:0
            },
            axisLabel: {
                interval: 0
            },
            axisLine:{
                lineStyle:{
                    color:'#fff',
                    fontSize:16
                }
            },
            splitArea:{
              interval:0
            }

        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '温度',
            min: 20,
            max: 40,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[0],
                    width:2
                }
            },            
            axisTick: {
                lineStyle: {
                    color: colors[0],
                    width:2
                }
            },
            axisLabel: {
                formatter: '{value} °C',
                textStyle:{
                    fontSize:16
                }
            },
            splitLine: {
                show: true
            },
        },
        {
            type: 'value',
            name: '湿度',
            min: 0,
            max: 100,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value} %',
                textStyle:{
                    fontSize:16
                }
            },
            splitLine: {
                show: true
            },
        },
    ],
    series: [
        {
            name:'温度',
            type:'line',
            yAxisIndex: 0,
            smooth: true,
            lineStyle:{
                normal:{
                    width:3
                }
            },
            // data:null
        },
        {
            name:'湿度',
            type:'line',
            yAxisIndex: 1,
            smooth: true,
            lineStyle:{
                normal:{
                    width:3
                }
            },
            // data:null
        }

    ]
};

exports.humidityOption = {
    tooltip: {
        show: true
    },
    series: [{
        name:'湿度',
        type: 'liquidFill',
        data: [0.6, 0.5, 0.4, 0.3],

        radius:'90%',
        center:['50%','50%'],
        label:{
            normal:{
                // formatter: '湿度\n{c}%',
                formatter: function(param) {
                    return '湿度' + '\n'
                         + (param.value*100).toFixed(2) +'%';
                },
                textStyle:{
                    fontSize:28
                }
            }
        }
    }]
};

exports.temperatureOption={
    tooltip: {
        show: true,
        formatter: function(item) {
            return ' ' + item.data.rawValue + '°C';
        },
    },
    series:[{
        animation: true,
        waveAnimation: true,
        color: ['rgb(253, 77, 73)'],
        center: ['50%', '50%'],
        radius: '90%',
        type: 'liquidFill',
        shape: 'path://M229.844,151.547v-166.75c0-11.92-9.662-21.582-21.58-21.582s-21.581,9.662-21.581,21.582v166.75c-9.088,6.654-14.993,17.397-14.993,29.524c0,20.2,16.374,36.575,36.574,36.575c20.199,0,36.574-16.375,36.574-36.575C244.838,168.944,238.932,158.201,229.844,151.547z',
        outline: {
            show: false
        },
        amplitude: 1,
        waveLength: '10%',
        backgroundStyle: {
            color: 'none',
            borderColor: '#fff',
            borderWidth: 5
        },
        data: [{
            // -5 到 45 度 
            value: 0.3,
            rawValue: 10
        }],
        itemStyle: {
            normal: {
                shadowBlur: 0
            }
        },
        label: {
            normal: {
                position: 'insideBottom',
                distance: 20,
                formatter: function(item) {
                    return ' ' + item.data.rawValue + '°C';
                },
                textStyle: {
                    color: 'rgb(253, 77, 73)',
                    fontSize: 16
                }
            }
        }
    }]
}


