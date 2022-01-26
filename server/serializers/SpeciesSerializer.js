import PetSerializer from "./PetSerializer.js"

class SpeciesSerializer {
  static async getSummary(species) {
    const allowedAttributes = ["id", "speciesName"]
    const serializedSpecies = {}
    for (const attribute of allowedAttributes) {
      serializedSpecies[attribute] = species[attribute]
    }

    const relatedPets = await species.$relatedQuery("pets")
    //serializedSpecies.pets = await species.$relatedQuery("pets")

    // const serializedPets = relatedPets.map((pet)=> PetSerializer.summarizePets(pet))
    
    const serializedPets = await Promise.all(relatedPets.map(async (pet)=> await PetSerializer.summarizePets(pet)))

    serializedSpecies.pets = serializedPets
    return serializedSpecies
  }
}

export default SpeciesSerializer