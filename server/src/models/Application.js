const Model = require("./Model")

class Application extends Model {
  static get tableName() {
    return "applications"
  }

  static get relationMappings() {
    const Pet = require("./Pet")
    const Applicant = require("./Applicant")

    return {
      pet: {
        relation: Model.BelongsToOneRelation,
        modelClass: Pet,
        join: {
          from: "applications.petId",
          to: "pets.id"
        }
      },
      applicant: {
        relation: Model.BelongsToOneRelation,
        modelClass: Applicant,
        join: {
          from: "applications.applicantId",
          to: "applicants.id"
        }
      }
    }
  }
}

module.exports = Application