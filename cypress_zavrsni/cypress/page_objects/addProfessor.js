class AddProfessor {

    get professorFirstNameInput(){
        return cy.get("#input-default");
    }

    get professorLastNameInput(){
        return cy.get("#input-default1");
    }

    get gradeSelector(){
        return cy.get("#__BVID__224");
    }

    get submitBtn(){
        return cy.contains("Submit");
    }

    get addImageBtn(){
        return cy.contains("Add Image");
    }

    get addImageInput(){
        return cy.get("#__BVID__45");
    }

    addProfessorClick(firstName, lastName, image){
        this.professorFirstNameInput.type(firstName);
        this.professorLastNameInput.type(lastName);
        this.addImageBtn.click();
        this.addImageInput.type(image);
        this.submitBtn.click();
    }
}

export const addProfessor = new AddProfessor();