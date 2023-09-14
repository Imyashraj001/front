import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"

function TodoComponenet(){

    const {id}=useParams()
    
    const [description,setDescription]=useState('')

    const [targetDate,setTargetDate]=useState('')

    const authContext=useAuth()

    const navigate=useNavigate()

    const username=authContext.username

    useEffect(()=>
        retrieveTodos()
    ,[id])

    function retrieveTodos(){
        if(id!='-1'){
            retrieveTodoApi(username,id)
            .then(response=>setDescription(response.data.description)
            .then(response=>setTargetDate(response.data.targetDate)))
            .catch(error=>console.log(error))
        }
        
    }

    function onSubmit(values){
        console.log(values)
        const todo={
            id:id,
            username:username,
            description:values.description,
            targetDate:targetDate,
            done:false
        }

        if(id==-1){
            createTodoApi(username,todo)
            .then(response=>navigate('/todos'))
            .catch(error=>console.log(error))
        }else{
            updateTodoApi(username,id,todo)
            .then(response=>navigate('/todos'))
            .catch(error=>console.log(error))
        }

        

    }

    function validate(values){
        let errors={}
        if(!values.description){
            errors.description='Enter a description'
        }else if(values.description.length<5){
            errors.description='Enter atleast 5 characters in description'
        }
        if(!values.targetDate){
            errors.targetDate='Enter a target date'
        }
        return errors
    }

    return (
        <div className="container">
            <h1>Enter details</h1>
            <Formik initialValues={{description,targetDate}}
                enableReinitialize={true}
                onSubmit={onSubmit}
                validate={validate}
            >
                {
                    props=>(
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="mb-3">
                                <label className="form-label">Description</label>
                                <Field type="text" className="form-control" name="description"/>
                            </fieldset>
                            <fieldset className="mb-3">
                                <label className="form-label">Target Date</label>
                                <Field type="date" className="form-control" name="targetDate"/>
                            </fieldset>
                            <button type="submit" className="btn btn-primary">Save</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
}
export default TodoComponenet