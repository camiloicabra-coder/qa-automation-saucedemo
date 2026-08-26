class CheckoutFlow {

    constructor(
        loginPage,
        productsPage,
        cartPage,
        checkoutPage
    ) {
        this.loginPage = loginPage;
        this.productsPage = productsPage;
        this.cartPage = cartPage;
        this.checkoutPage = checkoutPage;
    }

    prepararCheckout(usuario, producto) {

        this.loginPage.visitar();

        this.loginPage.iniciarSesion(
            usuario.username,
            usuario.password
        );

        this.productsPage.agregarProducto(
            producto.nombre
        );

        this.productsPage.abrirCarrito();

        this.cartPage.validarPaginaCarrito();

        this.cartPage.irAlCheckout();

    }

}

export default CheckoutFlow;