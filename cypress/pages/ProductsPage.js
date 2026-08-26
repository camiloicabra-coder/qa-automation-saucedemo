class ProductsPage {

    elements = {
        inventoryContainer: '[data-test="inventory-container"]',
        inventoryItems: '[data-test="inventory-item"]',
        productName: '[data-test="inventory-item-name"]',
        addToCartButton: 'button',
        shoppingCart: '[data-test="shopping-cart-link"]',
        shoppingCartBadge: '[data-test="shopping-cart-badge"]'
    };

    validarPaginaProductos() {

        cy.url()
            .should('include', '/inventory.html');

        cy.get(this.elements.inventoryContainer)
            .should('be.visible');

    }

    validarProductos() {

        cy.get(this.elements.inventoryItems)
            .should('have.length.greaterThan', 0);

    }

    abrirCarrito() {

        cy.get(this.elements.shoppingCart)
            .click();

    }

    validarInformacionProductos() {

    cy.get(this.elements.inventoryItems)
        .each(($producto) => {

            cy.wrap($producto)
                .find('[data-test="inventory-item-name"]')
                .should('be.visible');

            cy.wrap($producto)
                .find('[data-test="inventory-item-price"]')
                .should('be.visible');

            cy.wrap($producto)
                .find('img')
                .should('be.visible');

            cy.wrap($producto)
                .find('button')
                .should('be.visible');

        });

}

agregarProducto(nombreProducto) {

    cy.get(this.elements.inventoryItems)
        .contains(
            this.elements.productName,
            nombreProducto
        )
        .parents(this.elements.inventoryItems)
        .find(this.elements.addToCartButton)
        .click();

}

validarCantidadCarrito(cantidad) {

    cy.get(this.elements.shoppingCartBadge)
        .should('be.visible')
        .and('have.text', cantidad.toString());

}

}

export default ProductsPage;