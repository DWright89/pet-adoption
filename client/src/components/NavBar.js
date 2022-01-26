import  {Link, Switch, Route} from "react-router-dom"
import React, {useState} from "react"
import SpeciesList from "./SpeciesList"
import SpeciesShow from "./SpeciesShow"
import PetShow from "./PetShow"
import newApplicantForm from "./newApplicantForm"


const NavBar = (props) =>{
  





    return(     
    
        <div>
    
        <Link to="/species">Species for Adoption</Link>
        <Link to="/newApplicant">Become Applicant</Link>
        <Switch>
        <Route exact path="/species" component={SpeciesList} />
        <Route exact path="/newApplicant" component={newApplicantForm} />
        <Route exact path="/species/:id" component={SpeciesShow} />
        <Route exact path="/pets/:id" component={PetShow} />
        </Switch>

        </div>
   
   
      
      
      )
}

export default NavBar