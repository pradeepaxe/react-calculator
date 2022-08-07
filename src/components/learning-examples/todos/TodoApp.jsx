import React, {Component}  from 'react'
import {BrowserRouter as Router, Route  ,  Switch , Link} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js';
import AuthenticatedRoute  from './AuthenticatedRoute.jsx';
import HelloWorldService from '../../../api/todo/HelloWorldService.js';
import TodoDataService from '../../../api/todo/TodoDataService.js';
import TodoComponent from './TodoComponent.jsx';
import moment from 'moment'







class ListToDosComponent extends Component{

    constructor(props){
        super(props)
        this.updateTodoClicked = this.updateTodoClicked.bind(this);

   

        this.state = {
            todos:
            [],
            message: null,
            page: 1

        }
        

        this.deleteToDoClick=this.deleteToDoClick.bind(this);
        this.refreshToDos = this.refreshToDos.bind(this);
        this.addToClick=this.addToClick.bind(this)
    }

componentDidMount(){
    console.log('componentdid mount')
    this.refreshToDos();
    
}

updateTodoClicked(id) {
    console.log('update ' + id)
    this.props.history.push(`/todos/${id}`)
    

}


componentWillUnmount(){
    console.log('componentwillunmount')
    if(this.state.id===-1){
        return
    }
}
shouldComponentUpdate(nextprops,state){
    console.log('shoudl component update')
    console.log(nextprops)
    console.log(state)
    return true
}

    refreshToDos(){
        let username = AuthenticationService.getUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(response=>
            {
            console.log(response)
            this.setState({todos: response.data})
            }
            )
    }

    deleteToDoClick(id){
        let username = AuthenticationService.getUserName()
        console.log(username,id);
        TodoDataService.deleteAllToDos(id,username)
        .then(response=>{
            this.setState({message: `message deleted successully for ${id}`})
            this.refreshToDos()
        })
    }

    addToClick(id){
        this.props.history.push(`/todos/${id}`)
    }
    render(){
        return <div>
                <br/>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <h1>list todos</h1>
                <div className='container'>
                <table className='table'>
                <thead>
                    <tr>
                    <th>td</th>
                    <th>description</th>
                    <th>done</th>
                    <th>completed?</th>
                    <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                   this.state.todos.map(
                    todo=>
                    <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.description}</td>
                    <td>{todo.done.toString()}</td>
                    <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                    <td><button className="btn btn-success" onClick={()=>this.updateTodoClicked(todo.id)}>update</button></td>
                    <td><button className="btn btn-warning" onClick={()=>this.deleteToDoClick(todo.id)}>delete</button></td>

               
                </tr>
                
                   )
                    
               
                }
                <div className='container'>
                    <button className='btn btn-success' onClick={()=>this.addToClick(-1)}>add</button>
                    </div>
                </tbody>
                </table>
                
                </div>
        </div>
    }
}




class HeaderComponent extends Component{

    render(){
        const isLoggedIn = AuthenticationService.isUserLoggedIn();
        console.log('isLogged[1]' + isLoggedIn)

        return (
            <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                <ul className="navbar-nav">
                    {isLoggedIn && <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/todos">Todos</Link></li>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    { isLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                    {isLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}
                </ul>
                
            </nav>
        </header>
        )
    }
}


class FooterComponent extends Component{
    render(){
        return (
            <footer className='footer'>
                <span className='text-muted'>All Rights Reserved</span>
            </footer>
        )
    }
}

class LogoutComponent extends Component{
    render(){
        return (
            <>
                <h1>You are logged out</h1>
                <div className='container'>
                    Thank you for using app
                </div>
            </>
        )
    }
}

class TodoApp extends Component{
    render(){
       
 

        return(
            <div className='todoapp'>
              <Router>
                    <>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <AuthenticatedRoute path="/welcome/:name" component={WelComeComponent}/>
                            <AuthenticatedRoute path="/todos/:id" component={TodoComponent}/>
                            <AuthenticatedRoute path="/todos" component={ListToDosComponent}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            
                            <Route component={ErrorHandling}/>
                        </Switch>
                        <FooterComponent/>
                    </>
                </Router>
            </div>
        )
    }
}



function ErrorHandling(){
    return <div>THIS IS AN ERROR PAGE</div>
}
class WelComeComponent extends Component{

    constructor(props){
    

        super(props)
        this.retrieveWelcomeMsg=this.retrieveWelcomeMsg.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.handleError = this.handleError.bind(this);

        this.state = {
            welcomeMessage: ''
        }
    }


    retrieveWelcomeMsg()
    {
    HelloWorldService.executeHelloWorldBeanService(this.props.params.name)
    .then(response => this.handleSuccessfulResponse(response))
    .catch(error=>this.handleError(error)) 
        }

    handleSuccessfulResponse(response){
        console.log("hit success")

        console.log("respo==>" , response)
        this.setState({ welcomeMessage: response.data.message })
    }

    handleError(error){
        console.log("hit here")
        console.log("respo==>" , error)
        this.setState({ welcomeMessage: error.response.data.message })

       // this.setState({ welcomeMessage: response.data.message })
    }
    render(){
        return(
            <>
            <h1>Welcome!</h1>
             <div>This is the list {this.props.match.params.name}.
              <Link to="/todos">click there</Link></div>

            
                <div className='container' >
                 Click here to get customized message.
                   <button className='btn btn-success' onClick={this.retrieveWelcomeMsg}>get welcome message</button></div>
                   <div className='container' >
                    {this.state.welcomeMessage}
                </div>                
             </>

           // <div>welcome to {this.props.params.name} . This is the list to dos page. <Link>Click here</Link></div>

            )
    }


}

class LoginComponent extends Component{

    constructor(props){
        super(props);


        this.state = {
            username : 'in28minutes',
            password : '',
            hasLoginFailed:false,
            showSuccessMessage:false
        }
        this.handleChange= this.handleChange.bind(this);
        this.LoginClicked = this.LoginClicked.bind(this);
    }

     handleChange(event){
        console.log(event.target.value);
        this.setState({[event.target.name] : event.target.value})

    }

  LoginClicked(){
    //console.log(this.scope)
    if(this.state.username==='in28minutes' &&  this.state.password==='dummy'){
       console.log('successful')
       AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password);
     this.setState({hasLoginFailed:false})
    this.setState({showSuccessMessage:true})
    console.log('navigate..')
    this.props.history.push(`/welcome/${this.state.username}`)
    console.log('navigated..')

   //this.props.navigate(`/welcome/${this.state.username}`)

    // this.props.navigate("/welcome")
    }
    else{
        this.setState({hasLoginFailed:true})
        this.setState({showSuccessMessage:false})
        this.props.history.push("/login")

    }

    
  }

    render(){
        return(
            <div>
               {this.state.hasLoginFailed &&  <div className='alert alert-warning'>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Login Success</div>}
                <ShowValidCredentials showSuccessMessage={this.state.showSuccessMessage}/>
                Username<input type="text" name='username' onChange={this.handleChange} value={this.state.username}></input>
                Password<input type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>
                <button onClick={this.LoginClicked}>Login</button>
            </div>
        )
    }


}

function ShowValidCredentials(props){
    if(props.showSuccessMessage)
        return <div>Login success</div>
    else
      return null
}
function ShowInvalidCredentials(props)
{
    if(props.hasLoginFailed){    
        return  <div>Login fail</div>
    }
    else
    return null
}

export default TodoApp