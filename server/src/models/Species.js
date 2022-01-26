const Model = require("./Model")

class Species extends Model {
  static get tableName() {
    return "species"
  }

  static get relationMappings() {
    const Pet = require("./Pet")
    
    return {
      pets: {
        relation: Model.HasManyRelation,
        modelClass: Pet,
        join: {
          from: "species.id",
          to: "pets.speciesId"
        }
      }
    }
  }
}

module.exports = Species