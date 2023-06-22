import loginPage from "../support/pages/loginPage"
import user from "../fixtures/user.json";
import { faker } from "@faker-js/faker"
import searchPage from "../support/pages/searchPage";
import basketPage from "../support/pages/basketPage";
import addNewAddressPage from "../support/pages/addNewAddressPage";
import PaymentOptionPage from "../support/pages/PaymentOptionPage";

describe('Making order on store', () => {

    it('test user can authorize with valid credentials', () => {
        let number = faker.number.int({ min: 0, max: 8 });
        let country = faker.location.country();
        let name = faker.person.firstName();
        let mobileNumber = faker.phone.number("##########");
        let zipCode = faker.location.zipCode('#######');
        let address = faker.location.street();
        let city = faker.location.city();
        let cardNumber = faker.finance.accountNumber(16);
        let month = faker.number.int({ min: 0, max: 11 });
        let year = faker.number.int({ min: 0, max: 18 });

        loginPage.visit();

        cy.log('dismissing modal window');
        cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
            if ($dismissButton) {
                cy.get('.close-dialog').click();
            } else {
                cy.log('No overlay');
            }
        });

        loginPage.submitLoginForm(user.email, user.password);

        cy.log('Adding any product to basket');
        cy.get('button:contains("Add to Basket")').eq(number).click();
        searchPage.goToBasket();

        cy.log('Start checkout process');
        basketPage.getCheckoutButton().click();
        cy.contains('button', 'Add New Address').click();

        cy.log(`Adding new address with name: '${name}'`)
        addNewAddressPage.submitNewAddress(country, name, mobileNumber, zipCode, address, city);
        cy.get('.mat-radio-outer-circle').eq(0).click({ force: true });
        cy.contains('button', 'Continue').click();
        cy.get('.mat-radio-outer-circle').eq(0).click({ force: true });
        cy.contains('button', 'Continue').click();


        cy.log(`Adding new card with number: '${cardNumber}`);
        PaymentOptionPage.addNewCard();
        PaymentOptionPage.submitNewCard(name, cardNumber, month, year);
        cy.get('.mat-radio-outer-circle').eq(0).click({ force: true });
        PaymentOptionPage.submitPaymentform();

        cy.log('Placing order');
        cy.get('#checkoutButton').click();

        cy.log('Checking order status');
        cy.get('.confirmation').should('exist').and('have.text', 'Thank you for your purchase!');
    })
})
