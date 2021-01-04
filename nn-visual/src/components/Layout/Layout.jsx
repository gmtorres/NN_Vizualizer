import React from 'react';

import NeuralNetwork from '../../NeuralNetwork/NeuralNetwork'
import VisualNN from '../Visual/VisualNN'

import styles from './Layout.module.css'
import InfoPanel from './InfoPanel'

class Layout extends React.Component{

    constructor(props){
        super(props);
        this.nn = new NeuralNetwork()
        this.state = {
            neuralNetwork : this.nn,
        }
    }

    generateNN(){
        this.nn.createRandomNN();
        this.setNN();
    }

    randomizeNN(){
        this.nn.randomize();
        this.setNN();
    }

    feedForward(){
        this.nn.feedforward();
        this.setNN();
    }

    feedForwardStepNode(){
        this.nn.feedforwardStepNode();
        this.setNN();
    }
    feedForwardStepLayer(){
        this.nn.feedforwardStepLayer();
        this.setNN();
    }

    setNN(){
        this.setState({
            neuralNetwork : this.nn,
        })
    }

    render(){
        console.log("a")
        return (
            <div className={styles.splitScreen}>
                <div className={styles.leftPane}>
                    <InfoPanel/>
                </div>
                <div className={styles.rightPane}>
                    <VisualNN neuralNetwork={this.state.neuralNetwork} num={this.state.num}/>
                    <button onClick={this.feedForward.bind(this)}>FeedForward</button>
                    <button onClick={this.feedForwardStepNode.bind(this)}>FeedForward Step Node</button>
                    <button onClick={this.feedForwardStepLayer.bind(this)}>FeedForward Step Layer</button>
                    <button onClick={this.randomizeNN.bind(this)}>Randomize</button>
                    <button onClick={this.generateNN.bind(this)}>Generate</button>
                </div>
            </div>
        )
    }

}

export default Layout;