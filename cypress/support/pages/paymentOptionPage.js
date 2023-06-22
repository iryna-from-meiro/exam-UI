class PaymentOptionPage {
    visit() {
        cy.visit('/#/payment/shop')
    }

    addNewCard() {
        cy.get('#mat-expansion-panel-header-0').click();
    }

    getNameField() {
        return cy.get('#mat-input-10');
    }

    getCardNumberField() {
        return cy.get('#mat-input-11');
    }

    selectExpiryMonthField(month) {
        cy.get('#mat-input-12').select(month);
    }

    selectExpiryYearField(year) {
        cy.get('#mat-input-13').select(0);
    }

    getSubmitButton() {
        return cy.get('#submitButton');
    }

    submitNewCard(name, cardNumber, month, year) {
        this.getNameField().type(name);
        this.getCardNumberField().type(cardNumber);
        this.selectExpiryMonthField(month);
        this.selectExpiryYearField(year);
        this.getSubmitButton().click();
    }

    submitPaymentform() {
        cy.contains('button', 'Continue').click();
    }
}
export default new PaymentOptionPage()