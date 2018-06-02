import React, {Component} from "react";
import {render} from "react-dom";
import {Stage, Layer, Rect, Text, Group, Arrow} from "react-konva";
import {Image, Panel, Diagram} from "Components"
import Konva from "konva";
import cloud from "Components/img/cloud.png"
import switcher from "Components/img/switch.png"
import device from "Components/img/device.png"

export default class demo extends Component {
    render() {
        let diagramProps = {
            nodes:{
                cloud:{
                    x: 600,
                    y: 50,
                    width: 100,
                    height: 100
                },
                cloud2:{
                    x: 200,
                    y: 50,
                    width: 100,
                    height: 100
                },
                switch:{
                    x: 300,
                    y: 300,
                    width: 100,
                    height: 100
                },
                device:{
                    x: 800,
                    y: 400,
                    width: 100,
                    height: 100
                },
                device1:{
                    x: 300,
                    y: 500,
                    width: 100,
                    height: 100
                },
                device2:{
                    x: 100,
                    y: 500,
                    width: 100,
                    height: 100
                }
            },
            arrows:{
                cloud: ['switch','device'],
                switch: ['device1', 'device2'],
                cloud2: 'switch'
            },
            imgSrc:{
                cloud: cloud,
                cloud2: cloud,
                switch: switcher,
                device: device,
                device1: device,
                device2: device
            }
        }
        return (
            <Diagram {...diagramProps}/>
        );
    }
}
