import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import "../assets/scss/main.scss"

import SpeciesList from "./SpeciesList"
import SpeciesShow from "./SpeciesShow"
import PetShow from "./PetShow"
import NavBar from "./NavBar"

const App = props => {
  return(
    <BrowserRouter>
      
      <Route path="/" component={NavBar}/>
      
    </BrowserRouter>
  )
}

export default hot(App)
