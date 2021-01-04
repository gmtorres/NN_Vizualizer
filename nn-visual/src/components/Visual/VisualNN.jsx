import React from 'react';

import NN from '../Visual/NN'


class VisualNN extends React.Component{

    /*constructor(props){
        super(props);
    }*/

    render(){
        console.log("b")
        return (
            <div>
                <NN neuralNetwork_rep={this.props.neuralNetwork.getRepresentation() } num={this.props.num}></NN>
            </div>
            
        )
    }

}

export default VisualNN;