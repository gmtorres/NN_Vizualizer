import React from 'react';

//import styles from './Node.module.css'

class Node extends React.Component{

    constructor(props){
        super();
        this.x = props.x ? props.x : 50;
        this.y = props.y ? props.y : 50;
        this.r = props.r ? props.r : 25;
    }

    render(){
         
        return (
            <g /*className={styles.node}*/>
                <circle cx={this.x} cy={this.y} r={this.r} stroke="black" strokeWidth="2" fill="white" />
                <text /*className={styles.node_data}*/ x={this.x} y={this.y} textAnchor="middle" fontSize="smaller">{this.props.value}</text>
            </g>
            
            
        )

    }

}

export default Node;