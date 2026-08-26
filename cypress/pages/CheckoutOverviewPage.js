class CheckoutOverviewPage {

    elements = {
        cartItems: '[data-test="inventory-item"]',
        itemName: '[data-test="inventory-item-name"]',
        itemPrice: '[data-test="inventory-item-price"]',
        paymentInformation: '[data-test="payment-info-value"]',
        shippingInformation: '[data-test="shipping-info-value"]',
        subtotal: '[data-test="subtotal-label"]',
        tax: '[data-test="tax-label"]',
        total: '[data-test="total-label"]',
        finishButton: '[data-test="finish"]',
        finishButton: '[data-test="finish"]',
        cancelButton: '[data-test="cancel"]',
        completeHeader: '[data-test="complete-header"]',
        completeText: '[data-test="complete-text"]'
    };

    validarPaginaResumen() {

        cy.url()
            .should('include', '/checkout-step-two.html');

        cy.get(this.elements.cartItems)
            .should('be.visible');

    }

    validarProducto(nombreProducto) {

        cy.get(this.elements.itemName)
            .should('be.visible')
            .and('have.text', nombreProducto);

    }

    validarPrecioProducto(precio) {

        cy.get(this.elements.itemPrice)
            .should('be.visible')
            .and('have.text', precio);

    }

    validarInformacionPago() {

        cy.get(this.elements.paymentInformation)
            .should('be.visible');

    }

    validarInformacionEnvio() {

        cy.get(this.elements.shippingInformation)
            .should('be.visible');

    }

    validarSubtotal(subtotal) {

        cy.get(this.elements.subtotal)
            .should('contain', subtotal);

    }

    validarImpuesto(impuesto) {

        cy.get(this.elements.tax)
            .should('contain', impuesto);

    }

    validarTotal(total) {

        cy.get(this.elements.total)
            .should('contain', total);

    }

    finalizarCompra() {

        cy.get(this.elements.finishButton)
            .click();

    }

obtenerSubtotal() {

    return cy.get(this.elements.subtotal)
        .invoke('text')
        .then((texto) => {

            return this.extraerNumero(texto);

        });

}

obtenerImpuesto() {

    return cy.get(this.elements.tax)
        .invoke('text')
        .then((texto) => {

            return this.extraerNumero(texto);

        });

}

obtenerTotal() {

    return cy.get(this.elements.total)
        .invoke('text')
        .then((texto) => {

            return this.extraerNumero(texto);

        });

}

extraerNumero(texto) {

    return parseFloat(
        texto.replace(/[^0-9.]/g, '')
    );

}


finalizarCompra() {

    cy.get(this.elements.finishButton)
        .click();

}

validarCompraExitosa() {

    cy.url()
        .should('include', '/checkout-complete.html');

    cy.get(this.elements.completeHeader)
        .should('be.visible')
        .and('contain', 'Thank you for your order!');

    cy.get(this.elements.completeText)
        .should('be.visible');

}


}

export default CheckoutOverviewPage;