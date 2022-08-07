import React , {Component} from 'react'
import moment from 'moment'
import {Form,Formik,Field,ErrorMessage} from 'formik'
import AuthenticationService from './AuthenticationService'
import TodoDataService from '../../../api/todo/TodoDataService'

class TodoComponent extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            id: this.props.match.params.id,
            description : 'larn to react',
            date : moment(new Date()).format('YYYY-MM-DD')
        }
        this.onSubmit=this.onSubmit.bind(this)
        this.validate=  this.validate.bind(this)
    }   

    componentDidMount(){
        if (this.state.id === -1) {
            return
        }
        console.log('compoennt')
        let username = AuthenticationService.getUserName()
        console.log('username===>')
        TodoDataService.retrieveTodos(username,this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate: moment(response.data.targetDate).format('YYYY-MM-DD')
        }))
        console.log(this.state.description)

    }


    onSubmit(values){


      let  todo={
            id:this.state.id,
            description:values.description,
            targetDate: values.targetDate

        }

        if(this.state.id===-1){
        let username = AuthenticationService.getUserName()
        TodoDataService.AddToDos(username,todo).then(()=>this.props.history.push(`/todos`))
        console.log(values)
        }else{
        let username = AuthenticationService.getUserName()
        TodoDataService.putAllToDos(this.state.id,username,todo).then(()=>this.props.history.push(`/todos`))
        console.log(values)
        }
    }
    validate(values){
        let errors = {}
        if (!values.description) {
            errors.description = 'Enter a Description'
        } else if (values.description.length < 5) {
            errors.description = 'Enter atleast 5 Characters in Description'
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = 'Enter a valid Target Date'
        }

        return errors

    }

    render(){
        let description =this.state.description;
        let targetDate = this.state.targetDate;
        console.log(description)
        return (
        <div>
        <div className="container"> 
        <h1>todo</h1>
       
            <Formik
                initialValues={{description,targetDate}}
                onSubmit={this.onSubmit}
                validate={this.validate}
                validateOnBlur={false}
                validateOnChange={false}
                enableReinitialize={true}
                    >
                {
                    (props)=>

                    (
                        <Form>
                            <ErrorMessage name='description' component='div' className='alert alert-warning'/>
                                <fieldset className='form-group'>
                                    <label>Description</label>
                                    <Field className='form-control' type='text' name='description'/>
                                </fieldset>
                                <fieldset className='form-group'>
                                    <label>Target date</label>
                                    <Field className='form-control' type='date' name='targetDate'/>
                                </fieldset>
                                <button type="submit" className='btn btn-success'>save</button>
                        </Form>
                        
                        )
                }
            </Formik>
            
        </div></div>)
    }
}


export default TodoComponent