import { it } from "mocha";
import registrationPage from "../support/pages/registrationPage";
import { faker } from "@faker-js/faker"

let email = faker.internet.email();
let password = faker.internet.password({ length: 20 });
let question = faker.number.int({ min: 0, max: 13 });
let text = faker.lorem.sentence();

describe('Registration', () => {

  it('should register a new user', () => {
    registrationPage.visit();
    cy.wait(2000);

    cy.log('dismissing modal window');
    cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
      if ($dismissButton) {
        cy.get('.close-dialog').click();
      } else {
        cy.log('No overlay');
      }
    });

    cy.log('sumbitting registration form');
    registrationPage.submitRegistration(email, password, question, text);

    cy.wait(2000);
    cy.location('hash').should('include', '#/login');
  });

  it('should not register a new user with an existing email', () => {
    registrationPage.visit();
    cy.wait(2000);

    cy.log('dismissing modal window');
    cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
      if ($dismissButton) {
        cy.get('.close-dialog').click();
      } else {
        cy.log('No overlay')
      }
    });

    cy.log('sumbitting registration form');
    registrationPage.submitRegistration(email, password, question, text);

    cy.get('.error').should('contain.text', 'Email must be unique');
  });


  it('should not register a new user with an invalid email', () => {
    let email = faker.animal.bear.name;

    registrationPage.visit();
    cy.wait(2000);

    cy.log('dismissing modal window');
    cy.get('#cdk-overlay-1', { timeout: 10000, failOnStatusCode: false }).then(($dismissButton) => {
      if ($dismissButton) {
        cy.get('.close-dialog').click();
      } else {
        cy.log('No overlay')
      }
    });

    cy.log('sumbitting registration form');
    registrationPage.getEmailField().type(email);
    registrationPage.getPasswordField().type(password);
    registrationPage.getRepeatPasswordField().type(password);
    registrationPage.selectSecurityQuestionOption(question);
    registrationPage.getAnswerField().type(text);

    cy.get('#mat-error-5').should('contain.text', 'Email address is not valid.');
    registrationPage.getRegisterButton('should.be', 'disabled');
  });
})