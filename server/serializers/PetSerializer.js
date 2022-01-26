class PetSerializer {
    static async summarizePets(pet){
        const allowedAttributes = ["id", "petName", "available",  "weight", "estimatedAge"]
        const serializedPet = {}
        for(const attribute of allowedAttributes){
            serializedPet[attribute] = pet[attribute]
        }
        serializedPet.applicants = await pet.$relatedQuery('applicants')
        return serializedPet
    }

    
}

export default PetSerializer