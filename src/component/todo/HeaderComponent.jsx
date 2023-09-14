import { Link } from "react-router-dom"
import { AuthContext, useAuth } from "./security/AuthContext"
import { useContext } from "react"

function HeaderComponent(){
    // const authContext=useContext(AuthContext)
    const authContext=useAuth()
    const isAuthenticated=authContext.isAuthenticated 
    function logout(){
        authContext.logout()
    }   
    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand">Todo Application</a>
                    <ul className="navbar-nav">
                        <li>
                            {isAuthenticated && <Link className="nav-link" to="/welcome/yashraj">Home</Link>}
                        </li>   
                        <li>
                            {isAuthenticated && <Link className="nav-link" to="/todos">Todos</Link>}
                        </li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li>
                            {!isAuthenticated && <Link className="nav-link" to="/login">Login</Link>}
                        </li>
                        <li>
                            {isAuthenticated && <Link className="nav-link" to="/logout" onClick={logout} >Logout</Link>}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
export default HeaderComponent