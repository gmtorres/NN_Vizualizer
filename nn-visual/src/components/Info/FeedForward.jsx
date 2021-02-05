import React from 'react';
import Expression from '../Expression/Expression';



const FeedForward = () => {
    //let expression = [];
    let node_in_expression = String.raw`in_i^l = \sum_{k=1} out_k^{l-1} \times w_{k,i}`;
    let node_out_expression = String.raw`out_i = activation(in_i)`;
    let sigm_expression = String.raw`sig(x)= \frac{1}{1 + e^{-x}}`;
    let tanh_expression = String.raw`tanh(x)= \frac{e^x - e^{-x}}{e^x + e^{-x}}`;
    let relu_expression = String.raw`relu(x)= \cases { x  & if  x >= 0 \cr 0 &  if x < 0  }`;
    //expression.push(node_expression)
    return (
        <div>
            <h3>FeedForward </h3>
            <p>
                First we need to understand how we transform inputs into output, how the processing of data is made throught out our model.
                This process is know as feedforward, so let's see how it works!
                <br/>
                <br/>
                First, in the input layer we place our initial values, we are feeding the input values to the network.
                <br/>
                Now we must foward the input value through the model. Then each node from the next layer will compute its value from the
                previous layer. For this, each node from the previous layer will contribute partly to each neuron on the next layer,
                this contribution is defined by the weight. So the calculation for each node is as follows:
                <Expression expressions={node_in_expression} height={true}/>
                This expression allows us to calculate a value which contains the agregated values of the previous layer, taking into account
                the weight of each edge between the nodes. We take node <i>n</i> and for each node <i>k</i> from the previous layer, we the sum
                of each value of that node multiplied by the weight of the edge connecting <i>k</i> to <i>n</i>. The multiplication of the node
                value of <i>k</i> by the weight of <i>k</i> to <i>n</i> gives us of the node contribution, where that node <i>k</i>,
                has a higher contribution to nodes where the edge is greater, and smaller where the node is smaller. This operation of sum,
                then gives us the total contribution of the previous layer to this node.
                <br/>
                <br/>
                However we need to model how the node will react to this value we have calculated, this operation will transform our in value
                into an out value, which will be what the node is going to fire to the next layer. In some sense, comparing to our brains,
                it decides whether the neuron should activate/fire or not. This operation is helpful in detecting useful patterns in our data,
                allowing a node or a set of nodes, to understand the data behaviour. This process is called activation function.
                <br/> In most cases we use non-linear functions, in order to model more complex and non-linear problems and patterns.
                <br/>The output value of node <i>n</i> takes the following expression:
                <Expression expressions={node_out_expression} height={true}/>
                As we can see, we apply a transformation to our in value we calculated previously, and we get the out value.
                The activation function can take may forms but the most usual are:
                <ul>
                    <li>
                        Sigmoid
                        <Expression expressions={sigm_expression} height={true}/>
                    </li>
                    <li>
                        Tanh
                        <Expression expressions={tanh_expression} height={true}/>
                    </li>
                    <li>
                        RELU
                        <Expression expressions={relu_expression} height={true}/>
                    </li>
                </ul>
                <br/>
                We do the feedfoward through the entire network, from the input layer to the output layer, layer by layer, and the final
                result will be in the output layer.
                This results are the predictions of our network given the correspondent input values.
                <br/>
                This process of computing the out values, from the in values, from the out values of the previous layer can be seen as complex
                multidimensional composite function, because we are applying a function to the result of applying another function and so on.
                <br/>
                <br/>
                To get better results we can implement something known as bias, in which we add to the in values of each layer or even node,
                a constant and fixed amount, which will act as shift in the activation function, allowing us to get a more complex behaviour.
                This shift will be constant to every input values and won't change hte slop or format of the activation function, only 
                moving it to the right or left. In the case of a <i>tanh</i>, when the in value is 0, if we apply a bias of -5, instead of 0,
                we get a value more close to 1.
                <br/>
                This can be achieved by introducing a node in the previous layer with a constant value of 1, and the bias is represented in the
                weights of the the connections between this newly added node and the destination nodes, which means the contribution equals
                to the weight of the connection.
                <br/>
                <br/>
            </p>

            
        </div>
    );
}

export default FeedForward;
