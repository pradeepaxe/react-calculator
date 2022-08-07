import axios from "axios"

class HelloWorldService{
executeHelloWorldService(){
    //console.log("retruning hello-world -service")
 return   axios.get(
        'http://localhost:8080/helloworld')
}

executeHelloWorldBeanService(){
    //console.log("retruning hello-world -service")
 return   axios.get(
        'http://localhost:8080/helloworld-bean')
}
executeHelloWorldBeanService(name){
    //console.log("retruning hello-world -service")
    console.log(name); 
 return   axios.get(
        `http://localhost:8080/helloworld-bean/path-variable/${name}`)
}
}

export default new HelloWorldService