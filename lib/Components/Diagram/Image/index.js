import React, { Component } from "react";
import { render } from "react-dom";
import { Image } from "react-konva";
import Konva from "konva";

export default class ImageWrapper extends Component {

    state = {
        image: null
    };

    componentDidMount() {
        const image = new window.Image();
        image.src = this.props.imgSrc;
        image.onload = () => {
            this.setState({
                image: image
            });
        };
    }

    changeSize(e) {
        const rect = this.refs.img;

        if(e.type === 'dragstart'){
            rect.to({ // to() is a method of `Konva.Node` instances
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 0.2
            });
        } else {
            rect.to({ // to() is a method of `Konva.Node` instances
                scaleX: 1,
                scaleY: 1,
                duration: 0.2
            });
        }
    }

    trigger(e){
        const {param, trigger} = this.props;
        trigger(param, e.target.attrs.x, e.target.attrs.y);
    }

    render() {
        const { ...props} = this.props;
        return (
            <Image
                image={this.state.image}
                {...props}
                draggable="true"
                ref="img"
                onDragEnd={this.changeSize.bind(this)}
                onDragMove={this.trigger.bind(this)}
                onDragStart={this.changeSize.bind(this)
                }
            />
        );
    }
}
