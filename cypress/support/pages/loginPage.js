class LoginPage {
    visit(){
        cy.visit('/#/login')
    }
    
    getEmailField(){
        return cy.get('#email');
    }
    
    getPasswordField(){
        return cy.get('#password');
    }

    getLoginButton(){
        return cy.get('#loginButton')
    }
    submitLoginForm(email, password){
        cy.log(`Auth user with username: ${email} and pass: ${password}`);

        this.getEmailField().type(email)
        this.getPasswordField().type(password)
        this.getLoginButton().click() 
    }
}  
    export default new LoginPage()