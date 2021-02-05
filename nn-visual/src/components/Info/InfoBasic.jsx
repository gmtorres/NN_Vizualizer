import React from 'react';


const InfoBasic = () => {

    return (
        <div>
            <h3>Neural Networks </h3>
            <p> <b>Neural Networks</b> (NN) are inspired by our brains and how they work. Just like our brains NN are composed
            by series of layers of interconnected (artificial) neurons that send their signals to the next neurons and so on.
            The artificial neurons process the signals it receives and then forwards the processed value to the neurons in the next layer.
            The first layer in known as the <b>input layer</b> where we supply the initial values,
            whereas the last layer is known as the <b>output layer</b> where we get the final values. The intermediate layers are known as 
             <b> hidden layers</b>.
            <br/>
            <br/>
            A Neural Networks can be consisted of several layer of different number of neurons. Neurons or nodes are connected by <b>edges</b> and each edge
            has a <b>weight</b> associated, which represent how much the value of the origin neuron influences the value in the end neuron. This
            weight is adjusted during the training phase and by adjusting the weights we can make our inputs match the correspondent outputs,
            or at least make a <b>prediction</b>.
            <br/>
            <br/>
            Neural Networks are mainly used in <b>supervised learning</b> tasks, where we give the input and the correspondent output and our model
            tries to fit the training data, so our model will be a function that maps the input values to output values. Our goal is that our
            model can generalize even to unseen data and correctly predict the output. It is called supervised learning because we feed the input
            and we supervise the output, adjusting until we can achieve an acceptable performance.
            <br/>
            <br/>
            In the Neural Network model we try to achieved nodes or a set of nodes that can recognize certain patterns in our data and activate uppon that.
            This behaviour arise throught the complex interactions between the previous nodes by the edges connecting them.
            <br/>
            <br/>
            The process of transforming and processing the inputs into outputs is called <b>feedforward</b>, where we feed our neural network
            with the input values. Each value is passed to the nodes in the next layer through the edges, stronger edges have greater influence
            in the next nodes. However a neuron might not be activated by small enough values of the predecessors, which means that neuron will
            not contribute to the next layer, to accomplish this when need to process the values recevied, this is known as activation function.
            <br/>More on feedforward on the next section.
            <br/>
            <br/>
            To make our inputs match the outputs we have to adjust the weights in each edge, by strengthening or weakening the edge, thus changing
            the contribution of each node in order to achieve the desired result. We do this with a method called <b>backpropagation</b>,
            where we try to minimize the error between the predicted value and the output one, in the last layer, and make small, incremental changes
            in the weights so that the error is a little smaller than previously. We then propagate backwards this calculation.
            <br/>
            <br/>
            Here we are going to focus on the basis of neural networks and on the most commum and basic layouts. 
            More details in a next sections.
            <br/>
            <br/>
            </p>
        </div>
    );
}

export default InfoBasic;
