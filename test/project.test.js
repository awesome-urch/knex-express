const { update } = require("../server/controllers/project_controller.ts")
const { expect } = require("chai")
const { Project } = require("../server/models")
const sinon = require("sinon")

describe("Project Unit Tests", function () {
  this.afterEach(() => {
    console.log("restored");
    sinon.restore();
  })
    describe("Save Project functionality", function () {
      it("should successfully add a user if the number of users in the DB with the same profiled is zero", async function () {
      });
      it("should throw an error if the project with the id does not exist", async function () {
        const projectId = 200000;
        const editedProject = {
          name: "Name1",
          description: "Description1",
        }

        sinon.stub(Project, 'findById').returns(0)
        await update(
          projectId,
          editedProject
        ).catch((error) => {
          expect(error.message).to.equal("Project does not exist")
        });
      });
    });
  });