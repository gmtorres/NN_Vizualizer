import React from 'react';

import NN from '../Visual/NN'

import styles from './VisualNN.module.css'

class VisualNN extends React.Component{

    /*constructor(props){
        super(props);
    }*/

    render(){
        
        return (
            <div className={styles.VisualNN}>
                <NN neuralNetwork_rep={this.props.neuralNetwork.getRepresentation() } num={this.props.num}></NN>
            </div>
            
        )
    }

}

export default VisualNN;