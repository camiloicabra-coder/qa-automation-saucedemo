class CartPage {

    elements = {
        cartContainer: '[data-test="cart-contents-container"]',
        cartItems: '[data-test="inventory-item"]',
        cartItemName: '[data-test="inventory-item-name"]',
        checkoutButton: '[data-test="checkout"]'
    };

    validarPaginaCarrito() {

        cy.url()
            .should('include', '/cart.html');

        cy.get(this.elements.cartContainer)
            .should('be.visible');

    }

    validarProducto(nombreProducto) {

        cy.get(this.elements.cartItems)
            .should('contain', nombreProducto);

    }

    validarCantidadProductos(cantidad) {

        cy.get(this.elements.cartItems)
            .should('have.length', cantidad);

    }

    irAlCheckout() {

        cy.get(this.elements.checkoutButton)
            .click();

    }
}

export default CartPage;