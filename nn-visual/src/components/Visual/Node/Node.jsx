import React from 'react';

import styles from './Node.module.css'

class Node extends React.Component{

    constructor(props){
        super(props);
        this.x = props.x ? props.x : 50;
        this.y = props.y ? props.y : 50;
        this.r = props.r ? props.r : 25;
    }


    render(){
        let value_text = "";
        if((this.props.value && !isNaN(this.props.value)) || this.props.value === 0)
            value_text = <text /*className={styles.node_data}*/ x={this.x} y={this.y} 
                            textAnchor="middle" fontSize="smaller">v:{this.props.value}</text>
        let error_text = "";
        if(this.props.error && !isNaN(this.props.error))
            error_text = <text /*className={styles.node_data}*/ x={this.x} y={this.y+this.r/2} 
                            textAnchor="middle" fontSize="smaller">e:{this.props.error}</text>
        let isActiveClass = styles.circle + " " + (this.props.active ? styles.isActive : "")
        return (
            <g className={styles.node}>
                <circle className={isActiveClass} cx={this.x} cy={this.y} r={this.r} stroke="black" strokeWidth="2" fill="white" />
                {value_text}
                {error_text}
            </g>
        )
    }
}

export default Node;