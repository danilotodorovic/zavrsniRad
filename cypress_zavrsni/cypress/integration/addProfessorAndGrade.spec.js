/// <reference types="Cypress" />

import { login } from "../page_objects/login.js";
import { navigation } from "../page_objects/navigation.js"


const data = require("../fixtures/data.json");
let token;

describe("Possitive flow through gradebook", () => {
    beforeEach(() => {
        cy.visit("");
        cy.intercept("POST", "https://gradebook-api.vivifyideas.com/api/login").as("successfulLogin");
        cy.get("h4").should("contain", "Please Login.");
        login.loginClick();
        cy.wait("@successfulLogin").then((intercept) => {
        token = intercept.response.body.token;
        })
    })

    it("Create professor", () => {
        cy.intercept("POST", "https://gradebook-api.vivifyideas.com/api/professors/create").as("addedProfessor");
        navigation.addProfessorClick();
        cy.wait("@addedProfessor").then((intercept) => {
        console.log(intercept);
        })
    })
})