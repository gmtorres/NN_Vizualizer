import React from 'react';
import Node from './Node/Node';
import Edge from './Edge/Edge';

import styles from './VisualNN.module.css'

class NN extends React.Component{

    constructor(props){
        super(props);

        this.ref = React.createRef()

        /*this.height = props.height !== undefined ? props.height : 400;
        this.width = props.width ? props.width : 700;*/
        
        this.buildModel();
        this.key = 0
    }

    buildModel(){

        this.layers = this.props.neuralNetwork_rep.representation;
        this.max_height = this.props.neuralNetwork_rep.height;
        
        this.n_layers = this.props.neuralNetwork_rep.representation.length;

        this.representation = []
        this.buttons = []

        let buttonsDivHeight = 20;

        let marginx = 50;
        let marginy = 10;
        let r = 25;
        
        let usable_height = this.props.height-2*r-2*marginy - 2 * buttonsDivHeight;
        if(usable_height < 0) usable_height = this.props.height;
        if(usable_height === 0) return

        let dx = (this.props.width-2*r-2*marginx)/(this.n_layers-1);
        let dy = (usable_height)/(this.max_height-1);

        let max_h = this.max_height * dy;

        for(let i = 0; i < this.n_layers - 1; i++){
            this.buttons.push(
                <text className={styles.addLayerButton} x={marginx+ r + dx * i + dx/2 - r/5} y={buttonsDivHeight/2} onClick={()=> this.props.func.addLayer(i)}>+</text>
            )
        }
        for(let i = 1; i < this.n_layers - 1; i++){
            this.buttons.push(
                <text className={styles.addLayerButton} x={marginx + r + dx * i - r/5} y={this.props.height - buttonsDivHeight/2} onClick={()=> this.props.func.addNode(i)}>+</text>
            )
        }

        let nn_rep = []

        for(let i = 0; i < this.n_layers ; i++){
            let l = [];
            let space = (max_h - dy * this.layers[i].length)/2;
            for(let n = 0; n < this.layers[i].length; n++){
                let node = this.layers[i][n];
                if(i === this.n_layers-1)
                    l.push({
                        x : marginx+ r + dx * i ,
                        y : marginy+ r + space + dy * n + buttonsDivHeight,
                        r : r ,
                        edges : node.edges, value : node.value, error: node.error})
                else
                    l.push({
                        x : marginx+ r + dx * i ,
                        y : marginy+ r + space + dy * n + buttonsDivHeight,
                        r : r ,
                        edges : node.edges, value : node.value})
            }
            nn_rep.push(l)
        }
        this.representation = nn_rep
    }

    componentDidMount(){
        this.updateRepresentation();
        window.addEventListener('resize', this.updateRepresentation.bind(this));
    }
    updateRepresentation(){
        //if(this.ref == null || this.ref.current == null) return;
        /*this.width = this.ref.current.clientWidth;
        this.forceUpdate()*/
    }


    render(){
        console.log(this.props.height);
        this.buildModel();
        let layers = this.representation
        this.nn = [];
        for(let l = 0; l < layers.length; l++){
            if(l < layers.length-1){
                for(let n = 0; n < layers[l].length;n++){
                    let node1 = layers[l][n];
                    for(let e = 0; e < node1.edges.length;e++){
                        let node2 = layers[l+1][e];
                        this.nn.push(
                            <Edge key={"Edge"+l.toString()+n.toString()+e.toString()} 
                                    x1={node1.x} y1={node1.y}
                                    x2={node2.x} y2={node2.y}
                                    weight={Math.round(node1.edges[e] * 1000)/1000}
                            />
                        )
                    }
                }
            }
            for(let n = 0; n < layers[l].length;n++){
                let node1 = layers[l][n];
                this.nn.push(
                    <Node key={"Node"+l.toString()+n.toString()} 
                        x={node1.x} y={node1.y} r={node1.r} 
                        value={Math.round(node1.value * 1000)/1000}
                        error={Math.round(node1.error * 1000)/1000}
                        />
                    )
            }

        }
        
        return (
            <div className={styles.svgWrapper}>
                <svg width={'100%'} height={'100%'} ref={this.ref} key={"svg" + this.key++}>
                    {this.buttons}
                    {this.nn}
                </svg>
            </div>
        )

    }

}

export default NN;