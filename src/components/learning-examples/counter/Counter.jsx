import React ,{ Component } from  'react';
import './Counter.css'
import propTypes from 'prop-types'



class Counter extends Component {

  constructor(){
    super();
    this.state={
        counter:0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset  = this.reset.bind(this);
  }

  render(){
    return (
      <div className="counter">
          <CounterButton  by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
          <CounterButton by={10} incrementMethod={this.increment}  decrementMethod={this.decrement}></CounterButton>
          <CounterButton by={25} incrementMethod={this.increment}  decrementMethod={this.decrement}></CounterButton>

          <span  style={{padding:"15px  30px",fontSize : "50px"}}className='count'>{this.state.counter}</span>                  <div> <button className='reset' onClick={this.reset}>reset</button> </div>
</div>
          
    );
   } 

   increment(by){
    console.log(`increment from child-${by}`)
    console.log(`by - ${by}`)
    console.log(this.state.counter)
    this.setState(()=>
    {
      return {counter : this.state.counter + by}
     })
  }

  decrement(by){
    console.log(`decrement from child-${by}`)
    console.log(`by - ${by}`)
    console.log(this.state.counter)
    this.setState(()=>
    {
      return {counter : this.state.counter - by}
     })
  }

  reset(){
  
    
    this.setState(()=>
    {
      return {counter : 0}
     })
  }
}

class  CounterButton extends Component{

    constructor(){
      super();
      this.state={
          counter:0
      }
      this.increment = this.increment.bind(this);
      this.decrement=this.decrement.bind(this);
    }
    render(){  
    return (
      <div className="counter">
           <button onClick={this.increment}>{this.props.by}</button>
           <button onClick={this.decrement}>{this.props.by}</button>

            <span  style={{padding:"15px  30px",fontSize : "50px"}}className='count'>{this.state.counter}</span>

        </div>
    );
    }
     increment(){
       console.log(`initial from child -increment ${this.props.by}`)
      this.setState({
       counter : this.state.counter + this.props.by
      })
      this.props.incrementMethod(this.props.by);
    }

    decrement(){
      console.log(`initial from child -decrement ${this.props.by}`)

      this.setState({
       counter : this.state.counter - this.props.by
      })
      this.props.decrementMethod(this.props.by);
    }
  }

  CounterButton.defaultProps={
    by :1
  }

  CounterButton.propTypes={
    by: propTypes.number
  }

export default Counter;