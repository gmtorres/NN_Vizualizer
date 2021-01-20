import React from 'react';

import NN from '../Visual/NN'

import styles from './VisualNN.module.css'

class VisualNN extends React.Component{

    constructor(props){
        super(props);
        this.state={
            height : 0,
            width : 0
        }
    }

    setHeight(){
        if(!this.divElement) return;
        const height = this.divElement.clientHeight;
        this.setState({ height : height });  
    }
    setWidth(){
        if(!this.divElement) return;
        const width = this.divElement.clientWidth;
        this.setState({ width : width });  
    }

    componentDidMount() {
        this.setHeight();
        this.setWidth();
        window.addEventListener('resize', this.setHeight.bind(this))
        window.addEventListener('resize', this.setWidth.bind(this))
    }

    render(){
        //console.log(this.state.height)
        return (
            <div className={styles.VisualNN} ref={ (divElement) => { this.divElement = divElement }}>
                <NN neuralNetwork_rep={this.props.neuralNetwork.getRepresentation()} 
                    num={this.props.num} 
                    height={this.state.height} width={this.state.width}
                    func={this.props.func}/>
            </div>
            
        )
    }

}
//<NN neuralNetwork_rep={this.props.neuralNetwork.getRepresentation() } num={this.props.num}></NN>
export default VisualNN;