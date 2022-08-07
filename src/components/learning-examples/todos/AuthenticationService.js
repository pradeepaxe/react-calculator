class AuthenticationService{
    registerSuccessfulLogin(username,password){
        console.log('register sucesful login')
        sessionStorage.setItem('authenticatedUser',username)
    }
    logout(){
        sessionStorage.removeItem('authenticatedUser')
    }
    isUserLoggedIn(){
        let isLogged = sessionStorage.getItem('authenticatedUser')
        console.log('isLogged')

        if(isLogged===null) return false
        if(isLogged)return true
    }

    getUserName(){
        let user = sessionStorage.getItem('authenticatedUser')
        if(user===null) return null
        return user
    }
}
export default new AuthenticationService