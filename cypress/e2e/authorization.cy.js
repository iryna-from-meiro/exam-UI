import { faker } from "@faker-js/faker"
import loginPage from "../support/pages/loginPage"
import user from "../fixtures/user.json";

describe('Authorization', () => {
    it('test user can authorize with valid credentials', () => {
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

        cy.location('hash').should('eq', '#/search')
    })

    it('test user can not authorize with credentials in vice-verse oorder', () => {
        loginPage.visit();

        cy.log('dismissing modal window');
        cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
            if ($dismissButton) {
                cy.get('.close-dialog').click();
            } else {
                cy.log('No overlay');
            }
        });

        loginPage.submitLoginForm(user.password, user.email);

        cy.location('hash').should('eq', '#/login')
        cy.get('.error').should('have.text', 'Invalid email or password.')
    });


    it('test user can not authorize as unregistered user', () => {
        let email = faker.internet.email();
        let password = faker.internet.password({ length: 20 });

        loginPage.visit();

        cy.log('dismissing modal window');
        cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
            if ($dismissButton) {
                cy.get('.close-dialog').click();
            } else {
                cy.log('No overlay');
            }
        });

        loginPage.submitLoginForm(email, password);

        cy.location('hash').should('eq', '#/login')
        cy.get('.error').should('have.text', 'Invalid email or password.')
    })
})