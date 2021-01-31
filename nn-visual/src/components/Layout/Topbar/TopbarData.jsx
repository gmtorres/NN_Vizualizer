import InfoBasic from "../../Info/InfoBasic";
import Feedback from "../../Info/Feedback";
import FeedForward from "../../Info/FeedForward";


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
        component : <Feedback/>
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