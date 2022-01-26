import React, {useState} from "react"
import { Redirect } from "react-router-dom"
import translateServerErrors from "../services/translateServerErrors"

const newApplicantForm = (props)=>{
  const [name, setName] = useState({
    firstName: "",
    lastName: ""
  })

  const [shouldRedirect, setShouldRedirect] = useState(false)

  const [errors, setErrors] = useState([])

  const inputChangeHandler = (event) => {
      console.log(name)
    setName({
      ...name,
      [event.currentTarget.name] : event.currentTarget.value
    })
  }

  const postNewApplicant = async () =>{
     

    try{
        const response = await fetch("/api/v1/applicants", {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
              }),
            body: JSON.stringify(name)
          })
          setShouldRedirect(true)
        if(!response.ok){
            if(response.status === 422){
                const body = await response.json()
                const newErrors = translateServerErrors(body.errors)
                setErrors(newErrors)
            } else {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw(error)
            }
        }
        setShouldRedirect(true)
      }catch(error){
          console.error("error in new app form", error.message)
      }
      ////////
  }

  const clearForm = () =>{
      setName({
        firstName: "",
        lastName: ""
      })
  }

  const handleSubmit = (event)=>{
      event.preventDefault()
      postNewApplicant()
      clearForm()
     
  }

  if (shouldRedirect) {
    return <Redirect push to={{pathname: "/species",
   state: true }} />
  }

    return(
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={inputChangeHandler}
          value={name.firstName}
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={inputChangeHandler}
          value={name.lastName}
        />
        <input 
          type="submit"
        />
      </form>
        
    )
}

export default newApplicantForm