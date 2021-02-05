import InfoBasic from "../../Info/InfoBasic";
//import Feedback from "../../Info/Feedback";
import FeedForward from "../../Info/FeedForward";
import Backpropagation from "../../Info/Backpropagation";


export const TopbarData = [
    {
        title: 'Introduction',
        component : <InfoBasic/> 
    },
    {
        title: 'Feedforward',
        component : <FeedForward/>
    },
    {
        title: 'Backpropagation',
        component : <Backpropagation/>  
    },
    /*{
        title: 'Activation Functions',
        component : <Feedback/>
    },
    {
        title: 'Data',
        component : <Feedback/>
    },*/

]