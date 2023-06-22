export function search(productName) {
    cy.get('.mat-search_icon-search').click()
    cy.get('#mat-input-0').type(productName + '{enter}');
}