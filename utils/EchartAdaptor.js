// dataPoints/logger is supposed to be a [[][]] : array of 2d vectors

module.exports = {
    format_scatter(){
    },
    format_pie(){
    },
    format_graph(){
    },
    scatter: function () {
        var devices = this.array.toJSON().map(device => (device.toJSON()));
        var data = [];
        devices.forEach(function (e) {
            data.push(e.map(dataPoints => dataPoints.toJSON()))
        });

        var option = {
        title: {
            text: 'Linear Regression',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type: 'cross'
            }
        },
        xAxis:{
            type: 'value',
            splitLine:{
                lineStyle:{
                    type: 'dashed'
                }
            },
        },
        yAxis:{
            type:'value',
            min:1.5,
            splitLine:{
                lineStyle:{
                    type:'dashed'
                }
            },
        },
        series: [
            {
                name: 'device-0',
                type: 'scatter',
                label: {
                    emphasis:{
                        show: true,
                        position: 'left',
                        textStyle:{
                            color: 'black',
                            fontSize: 16
                        }
                    }
                },
                data:data[0]
            },
            {
                name: 'device-1',
                type: 'scatter',
                label: {
                    emphasis:{
                        show: true,
                        position: 'left',
                        textStyle:{
                            color: 'red',
                            fontSize: 16
                        }
                    }
                },
                data:data[1]
            }
        ]
    };
    return option;
    }

}


function format_scatter(dataPoints) {
    var option = {
        title: {
            text: 'Linear Regression',
            subtext: '',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer:{
                type: 'cross'
            }
        },
        xAxis:{
            type: 'value',
            splitLine:{
                lineStyle:{
                    type: 'dashed'
                }
            },
        },
        yAxis:{
            type:'value',
            min:1.5,
            splitLine:{
                lineStyle:{
                    type:'dashed'
                }
            },
        },
        series: [
            {
                name: 'device-0',
                type: 'scatter',
                label: {
                    emphasis:{
                        show: true,
                        position: 'left',
                        textStyle:{
                            color: 'black',
                            fontSize: 16
                        }
                    }
                },
                data:dataPoints[0]
            },
            {
                name: 'device-1',
                type: 'scatter',
                label: {
                    emphasis:{
                        show: true,
                        position: 'left',
                        textStyle:{
                            color: 'red',
                            fontSize: 16
                        }
                    }
                },
                data:dataPoints[1]
            }
        ]
    };
    return option;
}

function format_pie(dataPoints){
    var option = {
        tooltip:{
            trigger: 'item',
            formatter: "{a} <br/>{b}:{c}({d}%)"
        },
        legend:{
            orient: 'vertical',
            x:'left',
            data:['Device-1','Device-2']
        },
        series:[
            {
                name:'Device Distribution',
                type:'pie',
                radius:['50%','70%'],
                avoidLabelOverlap:false,
                label:{
                    normal:{
                        show:false,
                        position:'center'
                    },
                    emphasis:{
                        show:true,
                        textStyle:{
                            fontSize:'30',
                            fontWeight:'bold'
                        }
                    }
                },
                labelLine:{
                    normal:{
                        show:false
                    }
                },
                data:[
                    {value:dataPoints[0].length, name:'M'},
                    {value:dataPoints[1].length, name:'A'}
                ]
            }
        ]
    };
    return option;
}

function format_graph(dataPoints){
    var xArray1 = dataPoints[0].map(e=>{e[0]})
    var xArray2 = dataPoints[1].map(e=>{e[0]})
    var yArray1 = dataPoints[0].map(e=>{e[1]})
    var yArray2 = dataPoints[1].map(e=>{e[1]})

    var option={
        title:{
            text: 'Graph Chart'
        },
        tooltip: {
            trigger: 'none',
            axisPointer:{
                type:'cross'
            }
        },
        legend:{
            data:['Device-1','Device-2']
        },
        grid:{
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel:true
        },
        xAxis:{
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                }
        },
        yAxis:[
            {
                type:'value'
            }
        ],
        series: [
            {
                name: 'device-0',
                type: 'line',
                smooth:true,
                data:dataPoints.sort()[0]
            },
            {
                name: 'device-1',
                type: 'line',
                smooth:true,
                data:dataPoints.sort()[1]
            }
        ]
    }
    return option;
}