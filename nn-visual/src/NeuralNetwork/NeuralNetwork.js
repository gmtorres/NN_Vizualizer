import activation from "./activation"

export default class NeuralNetwork{
    constructor(input_size,output_size){
        
        this.n_layers = 3;

        this.bias = true;

        this.learning_rate = 0.02;
        
        this.layers = [];
        this.layer_activation = []
        this.max_height = 0;

        this.createRandomNN(input_size,output_size);

        this.expression = []
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
        if(l === this.layers.length-1)
            return this.layers[l].length;
        if(this.bias)
            return this.layers[l].length - 1;
        return this.layers[l].length;
    }

    addInputNode(){
        let edges = [];
        for(let i = 0; i < this.getLayerSize(1);i++){
            edges.push(Math.random());
        }
        this.layers[0].splice(this.getLayerSize(0),0,{value : NaN, edges : edges, edges_old : [...edges]});
        if(this.layers[0].length > this.max_height)
            this.max_height = this.layers[0].length;
    }

    addOutputNode(){
        for(let  i = 0; i < this.layers[this.layers.length-2].length;i++){
            this.layers[this.layers.length-2][i].edges.push(Math.random());
        }
        this.layers[this.layers.length-1].push({value : NaN, edges : [1]});
        if(this.layers[this.layers.length-1].length > this.max_height)
            this.max_height = this.layers[this.layers.length-1].length;
    }
    addNode(layer){
        for(let  i = 0; i < this.layers[layer-1].length;i++){
            this.layers[layer-1][i].edges.push(Math.random());
        }
        let edges = [];
        for(let i = 0; i < this.getLayerSize(layer+1); i++){
            edges.push(Math.random());
        }
        this.layers[layer].splice(this.getLayerSize(layer),0,{value : NaN, edges : edges, edges_old : [...edges]});
        if(this.layers[layer].length > this.max_height)
            this.max_height = this.layers[layer].length;
    }

    addLayer(layer){
        for(let i = 0; i < this.layers[layer].length;i++){
            this.layers[layer][i].edges = [];
        }
        this.layers.splice(layer+1,0,[]);
        if(this.bias){
            let edges = [];
            for(let i = 0; i < this.getLayerSize(layer+2); i++){
                edges.push(Math.random());
            }
            this.layers[layer+1].push({value : 1, edges : edges , edges_old : [...edges]});

        }
        this.layer_activation.splice(layer+1,0,null);
        this.setLayerActivation(layer+1,"sigm");
        this.addNode(layer+1);
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

    setLayerActivation(layer,name){
        if(!activation.hasOwnProperty(name)) return;
        this.layer_activation[layer] = {name : name, activation : activation[name]}
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
            this.setLayerActivation(l,"sigm");
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
                    this.layers[l][n].edges_old = this.layers[l][n].edges
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
    setInputLayer(input_data){
        if(input_data != null){
            for(let i = 0; i < input_data.length;i++){
                this.layers[0][i].value = parseFloat(input_data[i]);
            }
        }
    }

    feedforward(input_data, output_data){
        this.setInputLayer(input_data)
        for(let l = 1; l < this.layers.length; l++){
            //let layer = this.layers[l];
            let layer_prev = this.layers[l-1];
            let activation = this.layer_activation[l].activation.func
            for(let n = 0; n < this.getLayerSize(l); n++){
                let sum = 0;
                for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                    sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
                }
                this.layers[l][n].value = activation(sum);
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

    }

    feedforwardStepNode(input_data, output_data){
        this.expression = []
        if(this.step_node == null){
            this.step_node = 0;
            this.clearNodes();
            this.setInputLayer(input_data);
            if(this.step_layer == null)
                this.step_layer = 1;
            return false;
        }

        let layer_prev = this.layers[this.step_layer-1];
        let sum = 0;

        let in_expression = '';
        in_expression += "in="

        for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
            in_expression += layer_prev[prev_n].value.toFixed(4) + "*" + layer_prev[prev_n].edges[this.step_node].toFixed(4)
            if(prev_n !== layer_prev.length - 1)
                in_expression +="+"
            sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[this.step_node];
        }
        in_expression += " = " + sum.toFixed(4);
        this.expression.push(String.raw`${in_expression}`)

        let out_expression = ""
        this.layers[this.step_layer][this.step_node].value = this.layer_activation[this.step_layer].activation.func(sum);
        out_expression += "out=activation(in)="+ this.layer_activation[this.step_layer].name +"(" + sum.toFixed(4) + ")=" + this.layers[this.step_layer][this.step_node].value.toFixed(4)

        this.expression.push(String.raw`${out_expression}`)

        this.step_node++;
        if(this.step_node >= this.getLayerSize(this.step_layer)){
            this.step_node = 0;
            this.step_layer++;
        }
        if(this.step_layer >= this.layers.length){
            this.step_layer = null;
            this.step_node = null;
            return true;
        }
        return false;
    }

    feedforwardStepLayer(input_data, output_data){
        if(this.step_layer == null){
            this.step_layer = 1;
            this.clearNodes();
            this.setInputLayer(input_data);
            return false;
        }
        //let layer = this.layers[this.step_layer];
        let layer_prev = this.layers[this.step_layer-1];
        let n = (this.step_node == null) ? 0 : this.step_node;
        let activation = this.layer_activation[this.step_layer].activation.func
        for(; n < this.getLayerSize(this.step_layer); n++){
            let sum = 0;
            for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
            }
            this.layers[this.step_layer][n].value = activation(sum);
        }
        this.step_layer++;
        this.step_node = 0;
        if(this.step_layer >= this.layers.length){
            this.step_layer = null;
            this.step_node = null;
            return true;
        }
        return false;
    }

    train(input_data, output_data, times = 1){
        for(let t = 0; t < times; t++)
            for(let i = 0; i < input_data.length; i++)
                this.backpropagation(input_data[i],output_data[i]);
    }

    backpropagation(input_data, output_data){
        this.feedforward(input_data,output_data);
        let last = this.layers.length-1;
        for(let i = 0; i < this.layers[last].length;i++){
            let node = this.layers[last][i];
            node.derivative = this.layer_activation[0].activation.deriv(node.value) * node.error;
        }
        for(let l = last-1; l >= 0; l--){
            let size_layer = this.layers[l].length;
            let derivative = this.layer_activation[l].activation.deriv
            for(let i = 0; i < size_layer; i++){
                let node = this.layers[l][i];
                let d_sum = 0;
                for(let a = 0; a < node.edges.length;a++){
                    d_sum += this.layers[l][i].edges[a] * this.layers[l+1][a].derivative;
                }
                node.derivative = d_sum * derivative(node.value);
            }
        }
        for(let l = last-1; l >= 0; l--){
            let size_layer = this.layers[l].length;
            for(let i = 0; i < size_layer; i++){
                let node = this.layers[l][i];
                for(let a = 0; a < node.edges.length;a++){
                    if(!isFinite(node.edges[a])) continue;
                    node.edges[a] -= node.value * this.layers[l+1][a].derivative * this.learning_rate;
                    console.log(node.edges[a]);
                }
            }   
        }
    }

    backpropagationLayer(input_data, output_data){
        if(this.step_layer == null){
            this.feedforward(input_data,output_data);
            this.step_layer = this.layers.length-1;
            return false;
        }
        
        let prev_layer = this.step_layer - 1;

        if(this.step_layer === this.layers.length-1){
            for(let i = 0; i < this.layers[this.step_layer].length;i++){
                let node = this.layers[this.step_layer][i];
                node.derivative = this.layer_activation[0].activation.deriv(node.value) * node.error;
            }
        }else{
            let size_layer = this.layers[this.step_layer].length;
            let derivative = this.layer_activation[this.step_layer].activation.deriv
            for(let i = 0; i < size_layer; i++){
                let node = this.layers[this.step_layer][i];
                let d_sum = 0;
                for(let a = 0; a < node.edges.length;a++){
                    d_sum += this.layers[this.step_layer][i].edges_old[a] * this.layers[this.step_layer+1][a].derivative;
                }
                node.derivative = d_sum * derivative(node.value);
            }
        }

        let size_layer = this.layers[prev_layer].length;
        for(let i = 0; i < size_layer; i++){
            let node = this.layers[prev_layer][i];
            for(let a = 0; a < node.edges.length;a++){
                if(!isFinite(node.edges[a])) continue;
                node.edges_old[a] = node.edges[a];
                node.edges[a] -= node.value * this.layers[this.step_layer][a].derivative * this.learning_rate;
                console.log(node.edges[a])
            }
        }

        this.step_layer--;
        this.step_node = 0;
        if(this.step_layer <= 0){
            this.step_layer = null;
            this.step_node = null;
            return true;
        }
        return false;
    }

    backpropagationNode(input_data, output_data){
        this.expression = []
        if(this.step_node == null){
            this.feedforward(input_data,output_data);
            this.step_node = 0;
            if(this.step_layer == null)
                this.step_layer = this.layers.length-1;
            return false;
        }

        let node_expression = String.raw`\Delta `;
        node_expression += `node^${this.step_layer}_${this.step_node} = `

        let prev_layer = this.step_layer - 1;

        if(this.step_layer === this.layers.length-1){
            
            let node = this.layers[this.step_layer][this.step_node];
            node.derivative = this.layer_activation[0].activation.deriv(node.value) * node.error;
            node_expression += this.layer_activation[0].activation.deriv(node.value).toFixed(4) + "*" + node.error.toFixed(4)
            node_expression += "=" + node.derivative.toFixed(4)
        }else{
            let derivative = this.layer_activation[this.step_layer].activation.deriv
            
            let node = this.layers[this.step_layer][this.step_node];
            let d_sum = 0;
            for(let a = 0; a < node.edges.length;a++){
                d_sum += this.layers[this.step_layer][this.step_node].edges_old[a] * this.layers[this.step_layer+1][a].derivative;
                node_expression += this.layers[this.step_layer][this.step_node].edges_old[a].toFixed(4) + "*" + this.layers[this.step_layer+1][a].derivative.toFixed(4)
                if(a != node.edges.length - 1) node_expression += "+"
            }
            node.derivative = d_sum * derivative(node.value);
            node_expression += "=" + node.derivative.toFixed(4)
        }
        this.expression.push(node_expression)
        
        let size_layer = this.layers[prev_layer].length;
        for(let i = 0; i < size_layer; i++){
            let weight_expression = "";
            let node = this.layers[prev_layer][i];
            
            if(!isFinite(node.edges[this.step_node])) continue;
            node.edges_old[this.step_node] = node.edges[this.step_node];
            node.edges[this.step_node] -= node.value * this.layers[this.step_layer][this.step_node].derivative * this.learning_rate;
            console.log(node.edges[this.step_node])
            weight_expression += `weight_{${i},${this.step_node}}^${prev_layer}=` + node.edges_old[this.step_node].toFixed(4) + "-" + node.value.toFixed(4) + "*" + this.layers[this.step_layer][this.step_node].derivative.toFixed(4) + "*" + this.learning_rate.toFixed(4)
            weight_expression += "=" + node.edges[this.step_node].toFixed(4)
            this.expression.push(weight_expression)
        }
        

        this.step_node++;
        if(this.step_node >= this.getLayerSize(this.step_layer)){
            this.step_node = 0;
            this.step_layer--;
        }
        if(this.step_layer <= 0){
            this.step_layer = null;
            this.step_node = null;
            return true;
        }
        return false;

    }


    getRepresentation(){
        return {
            representation : this.layers,
            height : this.max_height,
            activation : Object.keys(activation),
            layer_act : this.layer_activation
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
                let node = {edges:edges,edges_old:[...edges]};
                if(this.bias && l.length === layer.length-1 && this.layers.length !== obj.weights.length-1)
                    node.value = 1;
                l.push(node)
            })
            this.layers.push(l)
            if(layer.length > this.max_height) this.max_height = layer.length
        })
        this.n_layers = this.layers.length
    }


}
