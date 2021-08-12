class AddGradebook{
    get gradebookNameInput(){
        return cy.get("#name");
    }

    get selectProfessor(){
        return cy.get("#__BVID__40");
    }

    get submitBtn(){
        return cy.contains("Submit");
    }

    gradebookClick(gradebookName, selectProfessor){
        this.gradebookNameInput.type(gradebookName);
        this.selectProfessor.select(selectProfessor);
        this.submitBtn.click();
    }
}

export const addGradebook = new AddGradebook();