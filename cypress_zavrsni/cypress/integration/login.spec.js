/// <reference types="Cypress" />

import { login } from "../page_objects/login.js";


const data = require("../fixtures/data.json");
let token;

describe("Login", () => {

    beforeEach(() => {
        cy.visit("");
    })

    it("Login with valid credentials", () => {
        cy.intercept("POST", "https://gradebook-api.vivifyideas.com/api/login").as("successfulLogin");
        cy.get("h4").should("contain", "Please Login.");
        login.emailInput.should("have.css", "color", "rgb(73, 80, 87)").and("have.css", "background-color", "rgb(255, 255, 255)").and("be.visible");
        login.passwordInput.should("have.css", "border-radius", "10px").and("be.visible");
        login.loginBtn.should("have.css", "border-color", "rgb(0, 123, 255)").and("have.css", "color", "rgb(0, 123, 255)").and("be.visible");
        login.loginClick();
        cy.wait("@successfulLogin").then((intercept) => {
            console.log(intercept);
            expect(intercept.response.statusCode).to.eql(200);
            expect(intercept.request.body.email).to.eql(data.user.email);
            expect(intercept.request.body.password).to.eql(data.user.password);
            token = intercept.response.body.token;
        })
        cy.url().should("contain", "/login");
        cy.get("#__BVID__31").should("be.visible");
        login.emailInput.should("not.exist");
        login.passwordInput.should("not.exist");
        login.loginBtn.should("not.exist");

    })

})