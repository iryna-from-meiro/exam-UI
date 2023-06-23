class BasketPage {
    visit(){
        cy.visit('/#/basket')
    }
    
    getCheckoutButton(){
        return cy.get('#checkoutButton');
    }
}  
    export default new BasketPage()