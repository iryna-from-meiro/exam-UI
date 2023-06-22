class RegistrationPage {
    visit(){
        cy.visit('/#/register')
    }
    
    getEmailField(){
        return cy.get('#emailControl');
    }
    
    getPasswordField(){
        return cy.get('#passwordControl');
    }

    getRepeatPasswordField(){
        return cy.get('#repeatPasswordControl');
    }

    getSecurityQuestionField(){
        return cy.get('.mat-form-field-infix.ng-tns-c119-10');
    }

    selectSecurityQuestionOption(question){
        this.getSecurityQuestionField().click();
        cy.get(`[id="mat-option-${question}"]`, {timeout: 5000}).click();
    }

    getAnswerField(){
        return cy.get('#securityAnswerControl');
    }

    getRegisterButton(){
        return cy.get('#registerButton');
    }

    submitRegistration(email, password, question, text){
        this.getEmailField().type(email);
        this.getPasswordField().type(password);
        this.getRepeatPasswordField().type(password);
        this.selectSecurityQuestionOption(question);
        this.getAnswerField().type(text);
        this.getRegisterButton().click();
    }
}  
    export default new RegistrationPage()