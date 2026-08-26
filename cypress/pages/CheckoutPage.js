class CheckoutPage {

    elements = {
        firstNameInput: '[data-test="firstName"]',
        lastNameInput: '[data-test="lastName"]',
        postalCodeInput: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        cancelButton: '[data-test="cancel"]',
        errorMessage: '[data-test="error"]'
    };

    validarPaginaCheckout() {

        cy.url()
            .should('include', '/checkout-step-one.html');

        cy.get(this.elements.firstNameInput)
            .should('be.visible');

        cy.get(this.elements.lastNameInput)
            .should('be.visible');

        cy.get(this.elements.postalCodeInput)
            .should('be.visible');

    }

    escribirNombre(nombre) {

        cy.get(this.elements.firstNameInput)
            .clear()
            .type(nombre);

    }

    escribirApellido(apellido) {

        cy.get(this.elements.lastNameInput)
            .clear()
            .type(apellido);

    }

    escribirCodigoPostal(codigoPostal) {

        cy.get(this.elements.postalCodeInput)
            .clear()
            .type(codigoPostal);

    }

    continuar() {

        cy.get(this.elements.continueButton)
            .click();

    }

    cancelar() {

        cy.get(this.elements.cancelButton)
            .click();

    }

    validarMensajeError(mensaje) {

    cy.get(this.elements.errorMessage)
        .should('be.visible')
        .and('contain', mensaje);

}

validarPaginaResumen() {

    cy.url()
        .should('include', '/checkout-step-two.html');

}

}

export default CheckoutPage;