import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

function LoginComponent() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)
    const [showErrorMessage, setShowErrorMessage] = useState(false)
    const navigate = useNavigate()
    const authContext=useAuth()
    function handleUsernameChange(event){
        setUsername(event.target.value)
    }
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }
    async function handleSubmit(){
        if(await authContext.login(username,password)){
            setShowSuccessMessage(true)
            navigate(`/welcome/${username}`)

        }else{
            setShowErrorMessage(true)
        }
    }
    return (
        <div className="Login container mt-2">
            {showErrorMessage && <div className="alert alert-danger">Invalid Credentials</div>}
            <form>
                <div className="mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" onChange={handleUsernameChange} value={username}/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" required value={password} onChange={handlePasswordChange} />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    )
}

export default LoginComponent