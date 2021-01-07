import React from 'react';

import NeuralNetwork from '../../NeuralNetwork/NeuralNetwork'
import VisualNN from '../Visual/VisualNN'

import styles from './Layout.module.css'
import InfoPanel from './InfoPanel'
import DataGrid from '../DataGrid/DataGrid';

class Layout extends React.Component{

    constructor(props){
        super(props);

        this.nn = new NeuralNetwork()

        let temp_inp_labels = [];
        let temp_out_labels = [];
        this.input_key = 0;
        this.output_key = 0;

        for(let  i = 0; i < this.nn.getInputLayerSize();i++){
            temp_inp_labels.push("Input_"+this.input_key++);
        }
        for(let  i = 0; i < this.nn.getOutputLayerSize();i++){
            temp_out_labels.push("Output_"+this.output_key++);
        }

        this.state = {
            neuralNetwork : this.nn,
            data : [],
            input_labels: temp_inp_labels,
            output_labels: temp_out_labels,
        }
        this.input_index = 0;
    }

    generateNN(){
        let input_size = null;
        if(this.state.input_labels.length > 0)
            input_size = this.state.input_labels.length
        let output_size = null;
        if(this.state.output_labels.length > 0)
            output_size = this.state.output_labels.length
        this.nn.createRandomNN(input_size,output_size);
        this.setNN();
    }

    randomizeNN(){
        this.nn.randomize();
        this.setNN();
    }

    feedForward(){
        let input_data = null;
        let output_data = null;
        if(this.state.data.length !== 0){
            input_data = this.state.data[this.input_index].slice(0,this.state.input_labels.length);
            output_data = this.state.data[this.input_index].slice(-this.state.output_labels.length);
            this.input_index = (this.input_index+1)%this.state.data.length;
        }
        this.nn.feedforward(input_data,output_data);
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

    backPropagation(){
        let input_data = [];
        let output_data = [];
        this.state.data.forEach(d => {
            input_data.push(d.slice(0,this.state.input_labels.length))
            output_data.push(d.slice(-this.state.output_labels.length))
        })
        this.nn.backpropagation(input_data,output_data);
        this.setNN();
    }

    setNN(){
        this.setState({
            neuralNetwork : this.nn,
        })
    }

    addEntry(){
        let temp = this.state.data;
        let new_entry = [];
        for(let i = 0; i < this.state.input_labels.length + this.state.output_labels.length;i++)
            new_entry.push(0);
        temp.push(new_entry)
        this.setState({data : temp})
    }

    addInput(){
        let temp = this.state.data;
        temp.forEach(t => t.push(0))
        let labels_t = this.state.input_labels
        labels_t.push("Input_"+this.input_key++);
        this.nn.addInputNode();
        this.setState({
            neuralNetwork : this.nn,
            data : temp,
            input_labels : labels_t
        })
    }

    addOutput(){
        let temp = this.state.data;
        temp.forEach(t => t.push(0))
        let labels_t = this.state.output_labels
        labels_t.push("Output_"+this.output_key++);
        this.nn.addOutputNode();
        this.setState({
            neuralNetwork : this.nn,
            data : temp,
            output_labels : labels_t
        })
    }

    removeInput(index){
        let temp = this.state.data;
        temp.forEach(t => t.splice(index,1))
        let labels_t = this.state.input_labels
        labels_t.splice(index,1)
        this.nn.deleteInputNode(index);
        this.setState({
            neuralNetwork : this.nn,
            data : temp,
            input_labels : labels_t
        })
    }
    removeOutput(index){
        let temp = this.state.data;
        temp.forEach(t => t.splice(index,1))
        let labels_t = this.state.output_labels
        labels_t.splice(index,1)
        this.nn.deleteOutputNode(index);
        this.setState({
            neuralNetwork : this.nn,
            data : temp,
            output_labels : labels_t
        })
    }
    changeInputLabels(value,new_value){
        let temp = this.state.input_labels;
        temp[value] = new_value;
        this.setState({
            input_labels : temp
        })
    }
    changeOutputLabels(value,new_value){
        let temp = this.state.output_labels;
        temp[value] = new_value;
        this.setState({
            output_labels : temp
        })
    }
    changeData(entry,value,new_value){
        let temp = this.state.data;
        temp[entry][value] = new_value;
        this.setState({
            data : temp
        })
    }

    render(){
        console.log("a");
        //let input_size = this.state.neuralNetwork.getInputLayerSize();
        let changes = {
            addEntry : this.addEntry.bind(this),
            addInput : this.addInput.bind(this),
            addOutput : this.addOutput.bind(this),
            remove : { 
                in : this.removeInput.bind(this),
                out : this.removeOutput.bind(this),
                },
            changeLabels : { 
                in : this.changeInputLabels.bind(this),
                out : this.changeOutputLabels.bind(this),
                },
            changeData : this.changeData.bind(this),
        }
        return (
            <div className={styles.splitScreen}>
                <div className={styles.leftPane}>
                    <InfoPanel/>
                </div>
                <div className={styles.rightPane}>
                    <DataGrid data={this.state.data} 
                                input_labels={this.state.input_labels} 
                                output_labels={this.state.output_labels} 
                                changes={changes}
                    />
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