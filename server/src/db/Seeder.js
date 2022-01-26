/* eslint-disable no-console */
import { connection } from "../boot.js"
import Species from "../models/Species.js"
import Pet from "../models/Pet.js"
import Applicant from "../models/Applicant.js"
import Application from "../models/Application.js"

class Seeder {
  static async seed() {
    // include individual seed commands here
    const dog = await Species.query().insert({speciesName: "dog"})
    const cat = await Species.query().insert({speciesName: "cat"})

    const fido = await Pet.query().insert({petName: "Fido", available: false, weight: 20, estimatedAge: 2, speciesId:1})
    const biscuit = await Pet.query().insert({petName: "Biscuit", available: true, weight: 30, estimatedAge: 2, speciesId:1})

    const mittens = await Pet.query().insert({petName: "Mittens", available: true, weight: 12, estimatedAge: 1, speciesId: 2 })
    const buttons = await Pet.query().insert({petName: "Buttons", available: true, weight: 15, estimatedAge:2, speciesId:2})

    const dewey = await Applicant.query().insert({firstName: "Dewey", lastName: "Truman"})
    const amanda = await Applicant.query().insert({firstName: "Amanda", lastName: "Williams"})

    await fido.$relatedQuery("applicants").insert({firstName: "Steve", lastName: "Smith"})
    await mittens.$relatedQuery("applicants").insert({firstName: "Becky", lastName: "Lady"})
    await mittens.$relatedQuery("applicants").insert({firstName: "Joe", lastName: "Guy"})

    await Application.query().insert({petId: 4, applicantId: 5})
    await Application.query().insert({petId: 1, applicantId: 2})
    await Application.query().insert({petId: 3, applicantId: 2})

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder