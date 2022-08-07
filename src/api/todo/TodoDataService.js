import axios from "axios"
import {API_URL,JPA_API_URL} from '../../components/learning-examples/todos/constants.js'

class TodoDataService{

    retrieveAllTodos(name){
        //console.log("retruning hello-world -service")
        console.log(name); 
     return   axios.get(
            `${JPA_API_URL}/${name}/todos`)
    }

    retrieveTodos(name,id){
        //console.log("retruning hello-world -service")
        console.log(name);
        console.log('came here axios') 
     let x=   axios.get(
            `${JPA_API_URL}/${name}/todos/${id}`)
            console.log(x)
            return x
    }

    deleteAllToDos(id,name){
        //console.log("retruning hello-world -service")
        console.log('name',name); 
        console.log('id',id)
     return   axios.delete(
            `${JPA_API_URL}/${name}/todos/${id}`)
    }
    putAllToDos(id,name,todos){
        //console.log("retruning hello-world -service")
        console.log('name',name); 
        console.log('id',id)
     return   axios.put(
            `${JPA_API_URL}/${name}/todos/${id}`,todos)
    }

    AddToDos(name,todos){
        //console.log("retruning hello-world -service")
        console.log('name',name); 
     return   axios.post(
            `${JPA_API_URL}/${name}/todos`,todos)
    }
}
export default new TodoDataService