
export default class NeuralNetwork{
    constructor(){
        
        this.n_layers = 3;
        
        this.layers = [];
        this.max_height = 0;

        this.createRandomNN();
    }

    resetVars(){
        this.step_layer = null;
        this.step_node = null;
    }

    createRandomNN(){
        this.resetVars();
        this.layers = [];
        this.max_height = 0;
        for(let l = 0; l < this.n_layers; l++){
            let layer = [];
            let height = Math.floor(Math.random() * 3) + 2;
            for(let n = 0; n < height; n++){
                layer.push({value : Math.round(Math.random()*1000)/1000, edges : []});
                if(height > this.max_height) this.max_height = height;
            }
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
    }


    feedforward(){
        for(let l = 1; l < this.layers.length; l++){
            let layer = this.layers[l];
            let layer_prev = this.layers[l-1];
            for(let n = 0; n < layer.length; n++){
                let sum = 0;
                for(let prev_n = 0; prev_n < layer_prev.length;prev_n++){
                    sum+= layer_prev[prev_n].value * layer_prev[prev_n].edges[n];
                }
                this.layers[l][n].value = sum;
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
        this.layers[this.step_layer][this.step_node].value = sum;
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
            this.layers[this.step_layer][n].value = sum;
        }
        this.step_layer++;
        this.step_node = null;
        if(this.step_layer >= this.layers.length){
            this.step_layer = null;
        }
    }




    getRepresentation(){
        return {
            representation : this.layers,
            height : this.max_height
        }
    }

}
