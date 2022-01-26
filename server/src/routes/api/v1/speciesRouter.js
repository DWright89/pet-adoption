import express from "express"

import {Species} from "../../../models/index.js"
import speciesPetsRouter from "./speciesPetsRouter.js"
import SpeciesSerializer from "../../../../serializers/SpeciesSerializer.js"

const speciesRouter = new express.Router()

speciesRouter.get("/", async (req, res)=>{
    try{
        const species = await Species.query()
        res.status(200).json({species: species})
    }catch(error){
        res.status(500).json({errors: error})
    }
})

speciesRouter.get("/:id", async (req, res)=>{
    const {id} = req.params
    try{
        const oneSpecies = await Species.query().findById(id)
        const serializedSpecies = await SpeciesSerializer.getSummary(oneSpecies)
        //this is where the serializer will happen
        
        //oneSpecies.pets = await oneSpecies.$relatedQuery("pets")
   
        res.status(200).json({species: serializedSpecies})
    }catch(error){
        console.log(error)
        res.status(500).json({errors: error})
    }

})

speciesRouter.use("/:speciesId/pets", speciesPetsRouter)

export default speciesRouter