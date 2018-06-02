import React, {Component} from "react";
import {render} from "react-dom";
import {Stage, Layer, Rect, Text, Group, Arrow} from "react-konva";
import Image from "./Image"
import Konva from "konva";

export default class Diagram extends Component {

    constructor(props){
        super(props);
        this.state = {
            nodes: this.props.nodes,
            arrows: this.props.arrows,
            imgSrc: this.props.imgSrc
        }
    }

    drag(param, x, y){
        this.setState(prevState=>({
            ...prevState,
            nodes:{
                ...prevState.nodes,
                [param]: {
                    x: x,
                    y: y,
                    width: 100,
                    height: 100
                }
            }
        }))
    }

    renderArrows(){
        const {arrows, nodes} = this.state;
        let renderHelperArray = [];
        // calculate points first, always from x1,y1 -> x2,y2
        Object.keys(arrows).map(function(key, index) {
            var value = arrows[key];
            if(Array.isArray(value)){
                let x1 = nodes[key].x+nodes[key].width/2;
                let y1 = nodes[key].y+nodes[key].height/2;
                value.map((e)=>{
                    let x2 = nodes[e].x+nodes[e].width/2;
                    let y2 = nodes[e].y+nodes[e].height/2;
                    renderHelperArray.push([].concat(x1,y1,x2,y2));
                });
            } else if (typeof value == "string"){
                let x1 = nodes[key].x+nodes[key].width/2;
                let y1 = nodes[key].y+nodes[key].height/2;
                let x2 = nodes[value].x+nodes[value].width/2;
                let y2 = nodes[value].y+nodes[value].height/2;
                renderHelperArray.push([].concat(x1,y1,x2,y2));
            }
        });
        return (
            <Layer>
                {
                    renderHelperArray.map(e=>{
                        return (<Arrow points={e} pointerLength={10}
                                    pointerWidth={10}
                                    fill='black'
                                    stroke='black'
                                    strokeWidth={4}/>);
                    })
                }
            </Layer>
        )
    }

    renderImages(){
        const {nodes, imgSrc} = this.state;
        let renderHelperArray = [];
        // calculate points first, always from x1,y1 -> x2,y2
        let trigger = this.drag.bind(this);
        return (
            <Layer>
                {
                    Object.keys(nodes).map(function(key, index) {
                        return (<Image ref={key}
                                trigger={trigger}
                                param={key}
                                imgSrc={imgSrc[key]}
                        {...nodes[key]}/>)
                    })
                }
            </Layer>
        )
    }

    render() {
        const {nodes,imgSrc} = this.state;
        return (
            <div>
            <Stage ref="stage" width={window.innerWidth} height={window.innerHeight}>
                {this.renderArrows()}
                {this.renderImages()}
            </Stage>
            </div>
        );
    }
}
