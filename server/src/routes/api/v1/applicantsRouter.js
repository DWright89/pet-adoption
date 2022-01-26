import express from "express"

import { Applicant } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js"
import { ValidationError } from "objection"

const applicantsRouter = new express.Router()

applicantsRouter.post("/", async (req, res) => {
  try {
    const formInput = cleanUserInput(req.body)
    const applicant = await Applicant.query().insertAndFetch(formInput)
    console.log(applicant)
    return res.status(201).json({applicant})
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({errors: error.data})
    }
    return res.status(500).json({errors:error})
  }
})

export default applicantsRouter