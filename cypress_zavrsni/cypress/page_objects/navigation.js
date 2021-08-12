class Navigation{

    get addProfessorBtn(){
        return cy.get('a[href="/professors/create"]');
    }

    get addGradebookBtn(){
        return cy.get('a[href="/gradebook/create"]');
    }

    addProfessorClick(){
        this.addProfessorBtn.click();
    }

    addGradebookClick(){
        this.addGradebookBtn.click();
    }
}

export const navigation = new Navigation();