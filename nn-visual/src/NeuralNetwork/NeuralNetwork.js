
export default class NeuralNetwork{
    constructor(){
        
        this.n_layers = 4;
        
        this.layers = [];
        this.max_height = 0;

        this.createRandomNN();
    }

    getInputLayerSize(){
        return this.layers[0].length;
    }

    getOutputLayerSize(){
        return this.layers[this.layers.length-1].length;
    }

    addInputNode(){
        let edges = [];
        for(let i = 0; i < this.layers[1].length;i++){
            edges.push(Math.random());
        }
        this.layers[0].push({value : Math.round(Math.random()*1000)/1000, edges : edges});
        if(this.layers[0].length > this.max_height)
            this.max_height = this.layers[0].length;
    }

    addOutputNode(){
        for(let  i = 0; i < this.layers[this.layers.length-2].length;i++){
            this.layers[this.layers.length-2][i].edges.push(Math.random());
        }
        this.layers[this.layers.length-1].push({value : Math.round(Math.random()*1000)/1000, edges : []});
        if(this.layers[this.layers.length-1].length > this.max_height)
            this.max_height = this.layers[this.layers.length-1].length;
    }

    deleteInputNode(index){
        this.layers[0].splice(index,1);
        this.max_height = 0;
        for(let i = 0; i < this.layers.length;i++)
            if(this.layers[i].length > this.max_height)
                this.max_height = this.layers[i].length
    }
    deleteOutputNode(index){
        for(let  i = 0; i < this.layers[this.layers.length-2].length;i++){
            this.layers[this.layers.length-2][i].edges.splice(index,1);
        }
        this.layers[this.layers.length-1].splice(index,1);
        this.max_height = 0;
        for(let i = 0; i < this.layers.length;i++)
            if(this.layers[i].length > this.max_height)
                this.max_height = this.layers[i].length
    }

    activationFunction(val){
        return val;
    }

    activationFunction_derivative(val){
        return 1;
    }

    resetVars(){
        this.step_layer = null;
        this.step_node = null;
    }

    createRandomNN(input_size,output_size){
        this.resetVars();
        this.layers = [];
        this.max_height = 0;
        for(let l = 0; l < this.n_layers; l++){
            let layer = [];
            let height = Math.floor(Math.random() * 3) + 2;
            if(l === 0 && input_size !== null && input_size !== undefined)
                height = input_size
            if(l === this.n_layers-1 && output_size !== null && output_size !== undefined)
                height = output_size
            for(let n = 0; n < height; n++){
                layer.push({value : Math.round(Math.random()*1000)/1000, edges : []});
            }
            if(height > this.max_height) this.max_height = height;
            this.layers.push(layer);
        }
        this.randomize()
    }

    randomize(){
        this.resetVars();
        for(let l = 0; l < this.layers.length; l++){
            for(let n = 0; n < this.layers[l].length; n++){
                this.layers[l][n].edges = [];
                if(l === this.layers.length-1)
                    this.layers[l][n].edges.push(1);
                else
                    for(let n2 = 0; n2 < this.layers[l+1].length; n2++)
                        this.layers[l][n].edges.push(Math.random());
            }
        }
        this.clearNodes();
    }

    clearNodes(){
        for(let l = 0; l < this.layers.length; l++){
            for(let n = 0; n < this.layers[l].length; n++){
                this.layers[l][n].value = NaN;
            }
        }
    }


    feedforward(input_data, output_data){
        if(input_data != null){
            for(let i = 0; i < input_data.length;i++){
                this.layers[0][i].value = input_data[i];
            }
        }
        for(let l = 1; l < this.layers.length; l++){
            let layer = this.layers[l];
            let layer_prev = this.layers[l-1];
            for(let n = 0; n < layer.length; n++){
                let sum = 0;
                for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                    sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
                }
                this.layers[l][n].value = this.activationFunction(sum);
            }
        }
        if(output_data != null){
            let last = this.layers.length-1;
            for(let i = 0; i < this.layers[last].length; i++){
                this.layers[last][i].error = this.layers[last][i].value - output_data[i];
            }
        }
    }

    feedforwardStepNode(){
        if(this.step_node == null)
            this.step_node = 0;
        if(this.step_layer == null)
            this.step_layer = 1;

        let layer_prev = this.layers[this.step_layer-1];
        let sum = 0;
        for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
            sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[this.step_node];
        }
        this.layers[this.step_layer][this.step_node].value = this.activationFunction(sum);
        this.step_node++;
        if(this.step_node >= this.layers[this.step_layer].length){
            this.step_node = 0;
            this.step_layer++;
        }
        if(this.step_layer >= this.layers.length){
            this.step_layer = null;
            this.step_node = null;
        }
    }

    feedforwardStepLayer(){
        if(this.step_layer == null)
            this.step_layer = 1;
        let layer = this.layers[this.step_layer];
        let layer_prev = this.layers[this.step_layer-1];
        let n = (this.step_node == null) ? 0 : this.step_node;
        for(; n < layer.length; n++){
            let sum = 0;
            for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
            }
            this.layers[this.step_layer][n].value = this.activationFunction(sum);
        }
        this.step_layer++;
        this.step_node = null;
        if(this.step_layer >= this.layers.length){
            this.step_layer = null;
        }
    }

    backpropagation(){

    }




    getRepresentation(){
        return {
            representation : this.layers,
            height : this.max_height
        }
    }

}
