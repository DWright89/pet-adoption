import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const SpeciesList = props => {
  const [species, setProject] = useState([])
  const [success, setSuccess] = useState(false)
  debugger

  const getSpecies = async () => {
    try {
      const response = await fetch(`/api/v1/species`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const body = await response.json()
      setProject(body.species)
    } catch(err) {
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  let successMessage 

  if(props.location.state ===true){
    successMessage = <h1>It worked</h1>
  } 

  

  useEffect(() => {
    getSpecies()
  }, [])

  const speciesListItems = species.map(speciesItem => {
    return(
      <li key={speciesItem.id}>
        <Link to={`/species/${speciesItem.id}`}>
          {speciesItem.speciesName}
        </Link>
      </li>
    )
  })

  
  return(
    <div>
      <h1>All Pet Species</h1>
      {successMessage}
      <ul>
        {speciesListItems}
      </ul>
    </div>
  )
}

export default SpeciesList
