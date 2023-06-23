class CustomFeedbackPage {
    visit(){
        cy.visit('/#/contact')
    }
    
    getCommentField(){
        return cy.get('#comment');
    }

    putRating(rating){
         cy.get('#rating')
         .invoke("val", rating)
        .trigger("change")
        .click({ force: true })
    }

    fillCaptureField(){
        cy.get('#captcha').invoke('text').then((text) => {
            cy.get('#captchaControl').type(eval(text));
        });
    }

    // getCaptureResult(){
    //     return cy.get('#captchaControl');
    // }

    getSubmitButton(){
        return cy.get('#submitButton');
    }

    submitFeedback(comment, rating){
        this.getCommentField().type(comment);
        this.putRating(rating);
        this.fillCaptureField();
        this.getSubmitButton().click();
    }
}  
    export default new CustomFeedbackPage()