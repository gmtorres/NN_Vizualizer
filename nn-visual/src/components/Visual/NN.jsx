import React from 'react';
import Node from './Node/Node';
import Edge from './Edge/Edge';

class NN extends React.Component{

    constructor(props){
        super(props);

        this.ref = React.createRef()

        this.height = props.height ? props.height : 500;
        this.width = props.width ? props.width : 700;
        
        this.buildModel();
        this.k = 0
    }

    buildModel(){

        this.layers = this.props.neuralNetwork_rep.representation;
        this.max_height = this.props.neuralNetwork_rep.height;
        
        this.n_layers = this.props.neuralNetwork_rep.representation.length;

        this.representation = []
        
        let marginx = 50;
        let marginy = 20;
        let r = 25;
        let dx = (this.width-2*r-2*marginx)/(this.n_layers-1);
        let dy = (this.height-2*r-2*marginy)/this.max_height;

        let max_h = this.max_height * dy;

        let nn_rep = []

        for(let i = 0; i < this.n_layers ; i++){
            let l = [];
            let space = (max_h - dy * this.layers[i].length)/2;
            for(let n = 0; n < this.layers[i].length; n++){
                let node = this.layers[i][n];
                l.push({x : marginx+ r + dx * i , y : marginy+ r + space + dy * n , r : r , edges : node.edges, value : node.value})
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
        this.width = this.ref.current.clientWidth;
        this.forceUpdate()
    }


    render(){
        this.buildModel();
        let layers = this.representation
        this.nn = [];
        for(let l = 0; l < layers.length; l++){
            if(l < layers.length-1){
                for(let n = 0; n < layers[l].length;n++){
                    let node1 = layers[l][n];
                    for(let e = 0; e < layers[l+1].length;e++){
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
                        value={Math.round(node1.value * 1000)/1000}/>
                    )
            }

        }
        console.log("c")
        return (
            <div>
                <svg width={'100%'} height={this.height} ref={this.ref} key={"svg" + this.k++}>
                    {this.nn}
                </svg>
            </div>
        )

    }

}

export default NN;