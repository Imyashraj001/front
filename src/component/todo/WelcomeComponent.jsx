import { Link, useParams } from "react-router-dom"
import { useState } from "react"
import { retrieveHelloWorldBeanPathVariable } from "./api/HelloWorldApiService"
import { useAuth } from "./security/AuthContext"
function WelcomeComponent() {
    const {username}=useParams()
    const [message,setMessage]=useState(null)
    const authContext=useAuth()
    function callHelloWorldRestApi(){
        console.log("called")
        // axios.get("http://localhost:8080/hello-world")
        // .then(successfullResponse)
        // .catch(errorResponse)
        // retrieveHelloWorldBean()

        // .then(successfullResponse)
        // .catch(errorResponse)

        retrieveHelloWorldBeanPathVariable("Yashraj", authContext.token)
        .then(successfullResponse)
        .catch(errorResponse)


    }
    function successfullResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }
    function errorResponse(error){
        console.log(error)
    }
    return (
        <>
            <div className="Welcome container">
                <h1>Welcome to this page </h1>
                <Link className="btn btn-success" to="/todos">Your Todos</Link>
                <div className="mt-2">
                <button className="btn btn-success" onClick={callHelloWorldRestApi} >Rest Api</button>
                </div>
                <div className="text-info">
                    {message}
                </div>
            </div>
        </>
    )
}
export default WelcomeComponent