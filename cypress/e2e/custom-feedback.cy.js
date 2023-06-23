import CustomFeedbackPage from '../support/pages/customFeedbackPage'
import { faker } from "@faker-js/faker"

it('test user can submit feedback', () => {
    let comment = faker.animal.bear.name
    let rating = faker.number.int({ min: 1, max: 5 });

    CustomFeedbackPage.visit();

    cy.log('dismissing modal window');
    cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
        if ($dismissButton) {
            cy.get('.close-dialog').click();
        } else {
            cy.log('No overlay');
        }
    });

    cy.log('Submitting feedback')
    CustomFeedbackPage.submitFeedback(comment, rating);
})