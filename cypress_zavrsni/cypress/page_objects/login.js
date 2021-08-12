const data = require("../fixtures/data.json");

class Login{

    get emailInput(){
        return cy.get("#email");
    }

    get passwordInput(){
        return cy.get("#userPassword");
    }

    get loginBtn(){
        return cy.get('button[type="submit"]');
    }

    loginClick(){
        this.emailInput.type(data.user.email);
        this.passwordInput.type(data.user.password);
        this.loginBtn.click();
    }
}

export const login = new Login();