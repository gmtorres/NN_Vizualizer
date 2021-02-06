import React from 'react';
import Expression from '../Expression/Expression';



const FeedForward = () => {
    //let expression = [];
    let node_in_expression = String.raw`in_i^l = \sum_{k=1} out_k^{l-1} \times w_{k,i}`;
    let node_out_expression = String.raw`out_i^l = activation(in_i^l)`;
    let sigm_expression = String.raw`sig(x)= \frac{1}{1 + e^{-x}}`;
    let tanh_expression = String.raw`tanh(x)= \frac{e^x - e^{-x}}{e^x + e^{-x}}`;
    let relu_expression = String.raw`relu(x)= \cases { x  & if  x >= 0 \cr 0 &  if x < 0  }`;
    //expression.push(node_expression)
    return (
        <div>
            <h3>FeedForward </h3>
            <p>
                First we need to understand how we transform inputs into output, how the processing of data is made throughout our model.
                This process is know as <b>feedforward</b>, so let's see how it works!
                <br/>
                <br/>
                First, in the <b>input layer</b> we place our <b>initial values</b>, we are feeding the input values to the network.
                <br/>
                Now we must <b>foward</b> the input value through the model. For this, each node from the next layer will compute its value from the
                previous layer. So each node from the previous layer will <b>contribute</b> partly to each neuron on the next layer,
                this contribution is defined by the <b>weight</b>. So the calculation for each node is as follows:
                <Expression expressions={node_in_expression} height={true}/>
                This expression allows us to get a representation, a value, which contains the <b>agregated values</b> of the previous layer, taking into account
                the <b>weight</b> of each edge between the nodes. We take node <i>n</i> and for each node <i>k</i> from the previous layer, we the sum
                the multiplication of each value node <i>k</i> by the weight of the edge connecting <i>k</i> to <i>n</i>. The multiplication of the node
                value of <i>k</i> by the weight of <i>k</i> to <i>n</i> gives us of the <b>node contribution</b>, where that node <i>k</i>,
                has a higher contribution to nodes where the edge is greater, and smaller where the node is smaller. This operation of sum,
                then gives us the <b>total contribution</b> of the previous layer to this node.
                <br/>
                <br/>
                However we need to model how the node will react to this value we have calculated. This operation will transform our <b><i>in value </i></b>
                into an <b><i>out value</i></b>, which will be what the node is going to fire to the next layer. In some sense, comparing to our brains,
                it decides whether the neuron should <b>activate/fire</b> or not. This operation is helpful in <b>detecting useful patterns</b> in our data,
                allowing a node or a set of nodes, to understand the data behaviour. This process is makes us of <b>activation functions</b>.
                <br/> In most cases we use non-linear functions, in order to model more complex and non-linear problems and patterns.
                <br/>The <b><i>out value</i></b>, or the output value of node <i>n</i> takes the following expression:
                <Expression expressions={node_out_expression} height={true}/>
                <br/>
                As we can see, we apply a transformation to our <b><i>in value</i></b> we calculated previously, and we get the <b><i>out value</i></b>.
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
                We do the feedfoward through the entire network, from the <b>input layer to the output layer</b>, layer by layer, and the final
                result will be in the output layer.
                This final results are known as <b>predictions</b> of our network given the correspondent input values.
                <br/>
                This process of computing the out values, from the in values, from the out values of the previous layer can be seen as complex
                multidimensional composite function, because we are applying a function to the result of applying another function and so on.
                So we can see our neural network as a <b>composite function</b>.
                <br/>
                <br/>
                To get better results we can implement something known as <b>bias</b>, in which we add to the <b><i>in values</i></b> of each layer or even node,
                a constant, fixed amount, which will act as shift in the activation function, allowing us to get a more complex behaviour.
                This shift will be constant to every input values and won't change the slop or format of the activation function, only 
                moving it to the right or left. In the case of a <i>tanh</i>, when we have an <b><i>in value</i></b> of 0, if we apply a bias of -5, instead of 0,
                we get a <b><i>out value</i></b> very close to 1, shifting the activation function to the left.
                <br/>
                This can be achieved by introducing a node in the previous layer with a <b>constant value of 1</b>, and the bias is represented in the
                <b> weights of the the connections</b> between this newly added node and the destination nodes, which means the contribution, bias, equals
                to the weight of the connection.
                <br/>
                <br/>
            </p>

            
        </div>
    );
}

export default FeedForward;
