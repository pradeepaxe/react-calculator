import logo from './logo.svg';
import './App.css';
import React ,{ Component } from 'react'
import FirstComponent from './components/learning-examples/FirstComponent';
import SecondComponent from './components/learning-examples/SecondComponent';
import ThirdComponent from './components/learning-examples/ThirdComponent';
import Counter from './components/learning-examples/counter/Counter';

class App extends Component {
  render(){
  return (
    <div className="App">
        <Counter></Counter>
    </div>
  );
 } 
}

class LearningComponent extends Component{
  render(){
    return (
      <div className="App">
            My helo world
            {/* <FirstComponent></FirstComponent>
            <SecondComponent></SecondComponent>
            <ThirdComponent></ThirdComponent> */
            
            }
  
      </div>
    );
   } 
}




// function ThirdComponent(){
//   return (
//     <div className=" ">
//          ThirdComponent1

//     </div>
//   );
 
// }


export default App;
