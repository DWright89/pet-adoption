import express from "express"
import { ValidationError } from "objection"

import { Pet } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"

const speciesPetsRouter = new express.Router({ mergeParams: true })

speciesPetsRouter.post("/", async (req, res) => {
    console.log("before cleaning", req.body)
  const formInput = cleanUserInput(req.body)
  console.log("cleaned form input:", formInput)
  const { petName, available, weight, estimatedAge } = formInput
  const speciesId = req.params.speciesId

  try {
    const pet = await Pet.query().insertAndFetch({ petName, available, weight, estimatedAge, speciesId })
    console.log("In the try block", pet)
    return res.status(201).json({ pet:pet })
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data })
    } 
    return res.status(500).json({ errors: error })
  }
})

export default speciesPetsRouter