const Model = require("./Model")

class Applicant extends Model{

    static get tableName(){
        return "applicants"
    }

    static get relationMappings(){
        const Pet = require("./Pet")
        const Application = require("./Application")

        return{
            pets: {
                relation: Model.ManyToManyRelation,
                modelClass: Pet,
                join: {
                    from: "applicants.id",
                    through:{
                        from: "applications.applicantId",
                        to: "applications.petId"
                    },
                    to: "pets.id"
                }
            },
            applications: {
                relation: Model.HasManyRelation,
                modelClass: Application,
                join: {
                    from: "applicants.id",
                    to: "applications.applicantId"
                }
            }
        }
    }
    static get jsonSchema(){
        return{
            type: "object",
            required: ["firstName", "lastName"],
            properties: {
                firstName: { type: "string" },
                lastName: { type: "string" }
            }
        }
    }
}

module.exports = Applicant