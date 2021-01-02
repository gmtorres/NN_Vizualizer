import React from 'react';
import Node from './Node/Node';
import Edge from './Edge/Edge';

class NN extends React.Component{

    constructor(props){
        super();
        this.height = props.height ? props.height : 300;
        this.width = props.width ? props.width : 500;
        this.layers = [];
        
        this.n_layers = 4;
        let max_height = 0;
        for(let l = 0; l < this.n_layers; l++){
            let layer = [];
            let height = Math.floor(Math.random() * 3) + 2;
            for(let n = 0; n < height; n++){
                layer.push({});
                if(height > max_height) max_height = height;
            }
            this.layers.push(layer);
        }
        let margin = 5;
        let r = 25;
        let dx = (this.width-2*r-margin)/this.n_layers;
        let dy = (this.height-2*r-margin)/max_height;

        let max_h = max_height * dy;
        for(let l = 0; l < this.n_layers ; l++){
            let space = (max_h - dy * this.layers[l].length)/2;
            for(let n = 0; n < this.layers[l].length; n++){
                this.layers[l][n] = {x : margin+ r + dx * l , y : margin+ r + space + dy * n , r : r}
            }
        }
    }

    render(){
        let nn = [];
        for(let l = 0; l < this.layers.length; l++){
            if(l < this.layers.length-1){
                for(let n = 0; n < this.layers[l].length;n++){
                    let node1 = this.layers[l][n];
                    for(let e = 0; e<this.layers[l+1].length;e++){
                        let node2 = this.layers[l+1][e];
                        nn.push(<Edge x1={node1.x} y1={node1.y} x2={node2.x} y2={node2.y} weight={ Math.round(Math.random()*1000)/1000}/>)
                    }
                }
            }
            for(let n = 0; n < this.layers[l].length;n++){
                let node1 = this.layers[l][n];
                nn.push(<Node x={node1.x} y={node1.y} r={node1.r}/>)
            }

        }
        return (
        <svg width={this.width} height={this.height}>
            {nn}
        </svg>
        )

    }

}

export default NN;