const Model = require("./Model")

class Pet extends Model {
  static get tableName() {
    return "pets"
  }

  static get relationMappings() {
    const Species = require("./Species")
    const Application = require("./Application")
    const Applicant = require("./Applicant")

    return {
      species: {
        relation: Model.BelongsToOneRelation,
        modelClass: Species,
        join: {
          from: "pets.speciesId",
          to: "species.id"
        }
      },
      applicants: {
        relation: Model.ManyToManyRelation,
        modelClass: Applicant,
        join: {
          from: "pets.id",
          through: {
            from: "applications.petId",
            to: "applications.applicantId"
          },
          to: "applicants.id"
        }
      },
      applications: {
        relation: Model.HasManyRelation,
        modelClass: Application,
        join: {
          from: "pets.id",
          to: "applications.petId"
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["petName", "available"],
      properties: {
        petName: {type: "string"},
        available: {type: ["boolean", "string"]},
        weight: {type: ["integer", "string"]},
        estimatedAge: {type: ["integer", "string"]},
        speciesId: {type: ["integer", "string"]}
      }
    }
  }

}

module.exports = Pet