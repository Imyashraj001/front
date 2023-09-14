import { useState } from "react"
import { deleteTodoApi, retrieveAllTodosForUsername } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useNavigate } from "react-router-dom"

function ListTodosComponent(){
    const [todos, setTodos]=useState([])

    const authContext=useAuth()

    const username=authContext.username

    const navigate=useNavigate()
    
    retrieveAllTodosForUsername(username)
    .then(response=>setTodos(response.data))
    .catch(error=>console.log(error))

    

    function deleteTodo(id){
        console.log('Delete'+id)
        deleteTodoApi(username,id)
        .then(response=>{
            setTodos(todos.filter(todo=>todo.id!==id))
        })
        .catch(error=>console.log(error))
    }
    
    function updateTodo(id){
        console.log('Update',id)
        navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        navigate(`/todo/-1`)
    }


    return (
        <>
            <div className="ListTodos container">
                <h1>List Todos</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            {/* <th>Target Date</th> */}
                            <th>Delete</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todos.map(
                                todo=>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        {/* <td>{todo.targetDate.toString()}</td> */}
                                        <td><button className="btn btn-warning" onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                                        <td><button className="btn btn-success" onClick={()=>updateTodo(todo.id)}>Update</button></td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
                <button className="btn btn-success" onClick={addNewTodo}>Add Todo</button>
            </div>
        </>
    )
}
export default ListTodosComponent