import express from "express"
import clientRouter from "./clientRouter.js"
import speciesRouter from "./api/v1/speciesRouter.js"
import petsRouter from "./api/v1/petsRouter.js"
import applicantsRouter from "./api/v1/applicantsRouter.js"
const rootRouter = new express.Router()


rootRouter.use("/api/v1/species", speciesRouter)
rootRouter.use("/api/v1/pets", petsRouter)
rootRouter.use("/api/v1/applicants", applicantsRouter)

rootRouter.use("/", clientRouter)

export default rootRouter
