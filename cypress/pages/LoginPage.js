class LoginPage {

    elements = {
        usernameInput: '[data-test="username"]',
        passwordInput: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        errorMessage: '[data-test="error"]'
    };

    visitar() {
        cy.visit('/');
    }

    escribirUsuario(usuario) {
        cy.get(this.elements.usernameInput).clear();

        if (usuario !== '') {
            cy.get(this.elements.usernameInput)
                .type(usuario);
        }
    }

    escribirPassword(password) {
        cy.get(this.elements.passwordInput).clear();

        if (password !== '') {
            cy.get(this.elements.passwordInput)
                .type(password);
        }
    }

    hacerLogin() {
        cy.get(this.elements.loginButton)
            .click();
    }

    iniciarSesion(usuario, password) {
        this.escribirUsuario(usuario);
        this.escribirPassword(password);
        this.hacerLogin();
    }

    validarMensajeError(mensaje) {
        cy.get(this.elements.errorMessage)
            .should('be.visible')
            .and('contain', mensaje);
    }

    validarPaginaLogin() {
    cy.get(this.elements.usernameInput)
        .should('be.visible');

    cy.get(this.elements.passwordInput)
        .should('be.visible');

    cy.get(this.elements.loginButton)
        .should('be.visible');
}
}

export default LoginPage;