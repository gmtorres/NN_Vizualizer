import React from 'react';

class Edge extends React.Component{

    constructor(props){
        super();
        this.x1 = props.x1 ? props.x1 : 50;
        this.y1 = props.y1 ? props.y1 : 50;
        this.x2 = props.x2 ? props.x2 : 100;
        this.y2 = props.y2 ? props.y2 : 100;
        this.weight = props.weight ? props.weight : undefined;
    }

    render(){
        let r = Math.hypot(this.y1-this.y2,this.x1-this.x2);
        let angle = Math.atan2(this.y2-this.y1,this.x2-this.x1)
        let inter = function(a,b,r1,r2,t){ 
                        return r1 + (t-a)/(b-a)*(r2-r1)
                    }
        let n_r = inter(-Math.PI/2, Math.PI/2,0,r, angle)
        let middle = {x : this.x1 + n_r*Math.cos(angle), y : this.y1 + n_r*Math.sin(angle)}
        angle = angle * 180 / Math.PI;
        console.log(n_r,middle,angle);
        let transform = `rotate(${angle}, ${middle.x}, ${middle.y})`;
        return (
            <g>
                <line x1={this.x1} y1={this.y1} x2={this.x2} y2={this.y2} stroke="black" />
                <text x={middle.x} y={middle.y - 10} text-anchor="middle" font-size="smaller" transform={transform} >{this.weight}</text>
            </g>
            
            
        )

    }

}

export default Edge;