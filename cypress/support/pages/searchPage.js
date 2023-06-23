class SearchPage {
    visit(){
        cy.visit('/#/search')
    }
    
    goToBasket(){
        cy.contains('button', 'Your Basket').click();
    }
    
}  
    export default new SearchPage()