
export default class NeuralNetwork{
    constructor(input_size,output_size){
        
        this.n_layers = 3;

        this.bias = true;

        this.learning_rate = 0.5;
        
        this.layers = [];
        this.max_height = 0;

        this.createRandomNN(input_size,output_size);
    }

    getInputLayerSize(){
        if(this.bias)
            return this.layers[0].length - 1;
        return this.layers[0].length;
    }

    getOutputLayerSize(){
        return this.layers[this.layers.length-1].length;
    }

    getLayerSize(l){
        if(l == this.layers.length-1)
            return this.layers[l].length;
        if(this.bias)
            return this.layers[l].length - 1;
        return this.layers[l].length;
    }

    addInputNode(){
        let edges = [];
        for(let i = 0; i < this.layers[1].length;i++){
            edges.push(Math.random());
        }
        this.layers[0].push({value : 0, edges : edges});
        if(this.layers[0].length > this.max_height)
            this.max_height = this.layers[0].length;
    }

    addOutputNode(){
        for(let  i = 0; i < this.layers[this.layers.length-2].length;i++){
            this.layers[this.layers.length-2][i].edges.push(Math.random());
        }
        this.layers[this.layers.length-1].push({value : 0, edges : [1]});
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
        //return val;
        return 1 / (1 + Math.exp(-val));
    }

    activationFunction_derivative(val){
        //return 1;
        return val * (1-val)
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
            //let height = 2;
            if(l === 0 && input_size !== null && input_size !== undefined)
                height = input_size
            if(l === this.n_layers-1 && output_size !== null && output_size !== undefined)
                height = output_size
            for(let n = 0; n < height; n++){
                layer.push({value : Math.round(Math.random()*1000)/1000, edges : []});
            }
            if(this.bias && l !== this.n_layers-1)
                layer.push({value : 1, edges : []});
            if(layer.length > this.max_height) this.max_height = layer.length;
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
                else{
                    let size = this.layers[l+1].length;
                    if(l+1 < this.layers.length - 1 && this.bias) size -= 1
                    for(let n2 = 0; n2 < size; n2++)
                        this.layers[l][n].edges.push(Math.random());
                }
            }
        }
        this.clearNodes();
    }

    clearNodes(){
        for(let l = 0; l < this.layers.length; l++){
            let size = this.layers[l].length;
            if(l < this.layers.length-1 && this.bias) size -= 1
            for(let n = 0; n < size; n++){
                this.layers[l][n].value = NaN;
                this.layers[l][n].error = NaN;
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
            for(let n = 0; n < this.getLayerSize(l); n++){
                let sum = 0;
                for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                    sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
                }
                //console.log(sum);
                this.layers[l][n].value = this.activationFunction(sum);
            }
        }
        //let error = 0;
        if(output_data != null){
            let last = this.layers.length-1;
            for(let i = 0; i < this.layers[last].length; i++){
                this.layers[last][i].error = this.layers[last][i].value - output_data[i];
                //error += this.layers[last][i].error * this.layers[last][i].error;
            }
        }
        //error /= 2;
        //console.log(error);
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
        if(this.step_node >= this.getLayerSize(this.step_layer)){
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
        for(; n < this.getLayerSize(this.step_layer); n++){
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

    train(input_data, output_data){
        for(let i = 0; i < input_data.length; i++){
            this.backpropagation(input_data[i],output_data[i]);
        }
    }

    backpropagation(input_data, output_data){
        this.feedforward(input_data,output_data);
        let last = this.layers.length-1;
        for(let i = 0; i < this.layers[last].length;i++){
            let node = this.layers[last][i];
            node.derivative = this.activationFunction_derivative(node.value) * node.error;
        }
        for(let l = last-1; l >= 0; l--){
            let size_layer = this.layers[l].length;
            for(let i = 0; i < size_layer; i++){
                let node = this.layers[l][i];
                let d_sum = 0;
                for(let a = 0; a < node.edges.length;a++){
                    d_sum += this.layers[l][i].edges[a] * this.layers[l+1][a].derivative;
                }
                node.derivative = d_sum * this.activationFunction_derivative(node.value);
            }
        }
        for(let l = last-1; l >= 0; l--){
            let size_layer = this.layers[l].length;
            for(let i = 0; i < size_layer; i++){
                let node = this.layers[l][i];
                for(let a = 0; a < node.edges.length;a++){
                    if(!isFinite(node.edges[a])) continue;
                    node.edges[a] -= node.value * this.layers[l+1][a].derivative * this.learning_rate;
                }
            }   
        }
    }




    getRepresentation(){
        return {
            representation : this.layers,
            height : this.max_height
        }
    }

    export(){
        let obj = {
            learning_rate : this.learning_rate,
            bias : this.bias
        };
        let weights = [];
        this.layers.forEach(layer =>{
            let l = [];
            layer.forEach(node => l.push(node.edges))
            weights.push(l);
        })
        obj.weights = weights
        return obj;
    }

    import(obj){
        this.layers = []
        this.max_height = 0;
        this.bias = obj.bias
        this.learning_rate = obj.learning_rate
        obj.weights.forEach(layer =>  {
            let l = [];
            layer.forEach(edges =>{
                let node = {edges:edges};
                if(this.bias && l.length == layer.length-1 && this.layers.length != obj.weights.length-1)
                    node.value = 1;
                l.push(node)
            })
            this.layers.push(l)
            if(layer.length > this.max_height) this.max_height = layer.length
        })
        this.n_layers = this.layers.length
    }

}
