class addNewAddressPage {
    visit(){
        cy.visit('/#/address/create')
    }
    
    getCountryField(){
        return cy.get('#mat-input-3');
    }

    getNameField(){
        return cy.get('#mat-input-4');
    }

    getMobileNumberField(){
        return cy.get('#mat-input-5');
    }

    getZipCodeField(){
        return cy.get('#mat-input-6');
    }

    getAddressField(){
        return cy.get('#address');
    }

    getCityField(){
        return cy.get('#mat-input-8');
    }
    
    getSubmitButton(){
       return  cy.get("#submitButton")
    }

    submitNewAddress(country, name, mobileNumber, zipCode, address, city){
        this.getCountryField().type(country);
        this.getNameField().type(name);
        this.getMobileNumberField().type(mobileNumber);
        this.getZipCodeField().type(zipCode);
        this.getAddressField().type(address);
        this.getCityField().type(city);
        this.getSubmitButton().click();
    }
}  

    export default new addNewAddressPage()