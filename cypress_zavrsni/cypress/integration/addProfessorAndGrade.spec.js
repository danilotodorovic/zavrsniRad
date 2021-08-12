/// <reference types="Cypress" />

import { login } from "../page_objects/login.js";
import { navigation } from "../page_objects/navigation.js";
import { addProfessor } from "../page_objects/addProfessor";
import { addGradebook } from "../page_objects/addGradebook";

const faker = require("faker");
const data = require("../fixtures/data.json");
let token;

let professor = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    image: faker.image.image()
}

let professorName = professor.firstName + " " + professor.lastName;
// console.log("ime", professorName)

let gradebook = {
    profName: professorName,
    gradeName: faker.name.jobTitle()
}

describe("Possitive flow through gradebook", () => {
    beforeEach(() => {
        cy.visit("");
        cy.intercept("POST", "https://gradebook-api.vivifyideas.com/api/login").as("successfulLogin");
        login.loginClick();
        cy.wait("@successfulLogin").then((intercept) => {
        token = intercept.response.body.token;
        })
    })

    it("Create professor", () => {
        cy.intercept("POST", "https://gradebook-api.vivifyideas.com/api/professors/create").as("addedProfessor");
        navigation.addProfessorClick();
        addProfessor.addProfessorClick(professor.firstName, professor.lastName, professor.image);
        cy.wait("@addedProfessor").then((intercept) => {
            console.log(intercept);
            expect(intercept.response.statusCode).to.eql(200);
            expect(intercept.request.body.first_name).to.eql(professor.firstName);
            expect(intercept.request.body.last_name).to.eql(professor.lastName);
        })
        cy.url().should("contain", "/professors");
    })

    // let id;

    // it("Get professor's id", () => {
    //     cy.intercept("GET", " https://gradebook-api.vivifyideas.com/api/professors").as("professorID");
    //     cy.get('a[href="/professors"]').click();
        
    //     cy.wait("@professorID").then((intercept) => {
    //         console.log(intercept);
    //         for(let i = 0; i < intercept.response.body.length; i++){
    //             if(intercept.response.body[i].first_name === professor.firstName){
    //                 id = intercept.response.body[i].id;
    //                 console.log(id);
                    
    //             }
    //         }
    //     })
    // })

    it("Create gradebook", () => {
        cy.intercept("POST", " https://gradebook-api.vivifyideas.com/api/gradebooks/store").as("addedGradebook");
        navigation.addGradebookClick();
        addGradebook.gradebookClick(gradebook.gradeName, gradebook.profName);
        cy.wait("@addedGradebook").then((intercept) => {
            console.log(intercept);
            expect(intercept.response.statusCode).to.eql(201);
            expect(intercept.request.body.name).to.eql(gradebook.gradeName);
        })
        cy.url().should("contain", "/gradebooks");
    })
})