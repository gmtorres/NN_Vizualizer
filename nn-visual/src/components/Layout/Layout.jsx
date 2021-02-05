import React from 'react';

import NeuralNetwork from '../../NeuralNetwork/NeuralNetwork'
import samples from '../../NeuralNetwork/samplesNN'
import VisualNN from '../Visual/VisualNN'

import styles from './Layout.module.css'
import InfoPanel from './InfoPanel'
import DataGrid from '../DataGrid/DataGrid';
import Expression from '../Expression/Expression';
import RangeBar from '../RangeBar/RangeBar';


class Layout extends React.Component{

    constructor(props){
        super(props);

        this.nn = new NeuralNetwork(2,2)
        this.setNNFromSample("sample1")
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
            data : [[0.05,0.1,0.01,0.99]],
            input_labels: temp_inp_labels,
            output_labels: temp_out_labels,
        }
        this.resetDataIndex();
        //console.log(this.nn.export())
    }
    resetDataIndex(){
        this.current_index = -1;
        this.input_index = 0;
    }

    setNNFromSample(index){
        this.nn.import(samples[index]);
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
    getDataEntry() {
        let input_data = null;
        let output_data = null;
        if(this.state.data.length !== 0){
            input_data = this.state.data[this.input_index].slice(0,this.state.input_labels.length);
            output_data = this.state.data[this.input_index].slice(-this.state.output_labels.length);
        }
        return [input_data, output_data]
    }
    incrementEntryIndex(){
        this.current_index = this.input_index
        if(this.state.data.length > 0)
            this.input_index = (this.input_index+1)%this.state.data.length;
    }
    feedForward(){
        let [input_data, output_data] = this.getDataEntry();
        this.incrementEntryIndex();
        this.nn.feedforward(input_data,output_data);
        this.setNN();
    }

    feedForwardStepNode(){
        this.current_index = this.input_index
        let [input_data, output_data] = this.getDataEntry();
        let next = this.nn.feedforwardStepNode(input_data,output_data);
        if(next) this.incrementEntryIndex();
        this.setNN();
    }
    feedForwardStepLayer(){
        this.current_index = this.input_index
        let [input_data, output_data] = this.getDataEntry();
        let next = this.nn.feedforwardStepLayer(input_data,output_data);
        if(next) this.incrementEntryIndex();
        this.setNN();
    }

    train(){
        this.resetDataIndex();
        let input_data = [];
        let output_data = [];
        this.state.data.forEach(d => {
            input_data.push(d.slice(0,this.state.input_labels.length))
            output_data.push(d.slice(-this.state.output_labels.length))
        })
        this.nn.train(input_data,output_data,100);
        this.setNN();
    }

    backpropagate(){
        this.current_index = this.input_index
        let [input_data, output_data] = this.getDataEntry();
        if(input_data == null && output_data == null) return;
        this.nn.backpropagation(input_data,output_data);
        this.incrementEntryIndex();
        this.setNN();
    }

    backpropagateLayer(){
        this.current_index = this.input_index
        let [input_data, output_data] = this.getDataEntry();
        if(input_data == null && output_data == null) return;
        let next = this.nn.backpropagationLayer(input_data,output_data);
        if(next) this.incrementEntryIndex();
        this.setNN();
    }
    backpropagateNode(){
        this.current_index = this.input_index
        let [input_data, output_data] = this.getDataEntry();
        if(input_data == null && output_data == null) return;
        let next = this.nn.backpropagationNode(input_data,output_data);
        if(next) this.incrementEntryIndex();
        this.setNN();
    }

    addNode(layer){
        this.nn.addNode(layer);
        this.setNN();
    }

    addLayer(layer){
        this.nn.addLayer(layer);
        this.setNN();
    }

    changeActivationLayer(layer,name){
        this.nn.setLayerActivation(layer,name)
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
        temp.forEach(t => t.splice(this.state.input_labels.length,0,0))
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

    removeDataEntry(index){
        let temp = this.state.data;
        temp.splice(index,1);
        this.input_index = (this.input_index+this.state.data.length)%+this.state.data.length;
        if(index === this.current_index)
            this.current_index = -1;
        this.setState({
            data : temp,
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
        //console.log("a");
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
            removeDataEntry : this.removeDataEntry.bind(this),
            changeData : this.changeData.bind(this),
        }
        let NNfunc = {
            addNode : this.addNode.bind(this),
            addLayer : this.addLayer.bind(this),
            changeActivation : this.changeActivationLayer.bind(this)
        }
        return (
            <div className={styles.splitScreen}>
                <div className={styles.leftPane}>
                    <InfoPanel/>
                </div>
                <div className={styles.rightPane}>
                    <div style={{display:'flex',flexDirection:'column',flex:'1 0 auto'}}>
                        <div style={{height:'40%',display:'flex',flexDirection:'column'}}>
                            <DataGrid data={this.state.data} 
                                        input_labels={this.state.input_labels} 
                                        output_labels={this.state.output_labels} 
                                        changes={changes}
                                        currentValue={this.current_index}
                            />
                        </div>
                        <div style={{height:'60%',display:'flex',flexDirection:'column'}}>
                            <VisualNN neuralNetwork={this.state.neuralNetwork} num={this.state.num} func={NNfunc}/>
                            <div className={styles.buttons_container} style={{flex:'0 0 auto'}}>
                                <div className={styles.div_buttons_container}>
                                    <button onClick={this.feedForward.bind(this)}>FeedForward</button>
                                    <button onClick={this.feedForwardStepLayer.bind(this)}>FeedForward Step Layer</button>
                                    <button onClick={this.feedForwardStepNode.bind(this)}>FeedForward Step Node</button>
                                </div> 
                                <div className={styles.div_buttons_container}>
                                    <button onClick={this.backpropagate.bind(this)}>Backpropagate</button>
                                    <button onClick={this.backpropagateLayer.bind(this)}>Backpropagate Step Layer</button>
                                    <button onClick={this.backpropagateNode.bind(this)}>Backpropagate Step Node</button>
                                </div>
                                <div className={styles.div_buttons_container}>
                                    <button onClick={this.randomizeNN.bind(this)}>Randomize</button>
                                    <button onClick={this.generateNN.bind(this)}>Generate</button>
                                    <button onClick={this.train.bind(this)}>Train</button>
                                    <RangeBar 
                                        min={1}
                                        max={5000}
                                        type="linear"
                                        value={this.state.neuralNetwork.getTrainingTimes()} 
                                        callback={(e) => this.state.neuralNetwork.setTrainingTimes(e)}
                                        info="Train iterations"/>
                                    <RangeBar min={-10}
                                        max={0}
                                        step={0.01}
                                        type="log" 
                                        value={this.state.neuralNetwork.getLearningRate()} 
                                        callback={(e) => this.state.neuralNetwork.setLearningRate(e)}
                                        info="Learning rate"/>
                                </div>
                                
                            </div>
                            <div style={{flex:'3 0 auto', overflowY:'auto'}}>
                                <Expression expressions={this.state.neuralNetwork.expression}/>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }

}

export default Layout;


/*

<div className={styles.splitScreen}>
                <div className={styles.leftPane}>
                    <InfoPanel/>
                </div>
                <div className={styles.rightPane}>
                    <div className={styles.rightPane_section}>
                        <DataGrid data={this.state.data} 
                                    input_labels={this.state.input_labels} 
                                    output_labels={this.state.output_labels} 
                                    changes={changes}
                        />
                        <VisualNN neuralNetwork={this.state.neuralNetwork} num={this.state.num}/>
                        <div>
                            <button onClick={this.feedForward.bind(this)}>FeedForward</button>
                            <button onClick={this.feedForwardStepNode.bind(this)}>FeedForward Step Node</button>
                            <button onClick={this.feedForwardStepLayer.bind(this)}>FeedForward Step Layer</button>
                            <button onClick={this.randomizeNN.bind(this)}>Randomize</button>
                            <button onClick={this.generateNN.bind(this)}>Generate</button>
                            <button onClick={this.train.bind(this)}>Train</button>
                        </div>
                    </div>
                </div>
            </div>

*/