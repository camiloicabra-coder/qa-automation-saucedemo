import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import CheckoutOverviewPage from '../../pages/CheckoutOverviewPage';
import CheckoutFlow from '../../flows/CheckoutFlow';

describe('Checkout - SauceDemo', () => {

    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();
    const checkoutOverviewPage = new CheckoutOverviewPage();

    const checkoutFlow = new CheckoutFlow(
    loginPage,
    productsPage,
    cartPage,
    checkoutPage
);

    let usuarios;
    let productos;
    let checkoutData;

    before(() => {

        cy.fixture('users').then((data) => {
            usuarios = data;
        });

        cy.fixture('products').then((data) => {
            productos = data;
        });

        cy.fixture('checkout').then((data)=> {
            checkoutData = data;
        })

    });
beforeEach(() => {

    checkoutFlow.prepararCheckout(
        usuarios.usuarioValido,
        productos.productoPrincipal
    );

});

    it('TC-011 - Debe permitir acceder al checkout', () => {

        checkoutPage.validarPaginaCheckout();

    });

    it('TC-012 - No debe permitir continuar con campos vacíos', () => {

    checkoutPage.continuar();

    checkoutPage.validarMensajeError(
        'Error: First Name is required'
    );

});

it('TC-013 - Debe validar que el apellido sea obligatorio', () => {

    checkoutPage.escribirNombre(checkoutData.datosValidos.firstName);

    checkoutPage.escribirCodigoPostal(checkoutData.datosValidos.postalCode);

    checkoutPage.continuar();

    checkoutPage.validarMensajeError(
        'Error: Last Name is required'
    );

});

it('TC-014 - Debe validar que el código postal sea obligatorio', () => {

    checkoutPage.escribirNombre(checkoutData.datosValidos.firstName);

    checkoutPage.escribirApellido(checkoutData.datosValidos.lastName);

    checkoutPage.continuar();

    checkoutPage.validarMensajeError(
        'Error: Postal Code is required'
    );

});

it('TC-015 - Debe permitir continuar con información válida', () => {
    checkoutPage.escribirNombre(checkoutData.datosValidos.firstName);
    checkoutPage.escribirApellido(checkoutData.datosValidos.lastName);
    checkoutPage.escribirCodigoPostal(checkoutData.datosValidos.postalCode);
    checkoutPage.continuar();

    checkoutPage.validarPaginaResumen();
});

it('TC-016 - Debe mostrar correctamente el resumen de la compra', () => {

    checkoutPage.escribirNombre(
        checkoutData.datosValidos.firstName
    );

    checkoutPage.escribirApellido(
        checkoutData.datosValidos.lastName
    );

    checkoutPage.escribirCodigoPostal(
        checkoutData.datosValidos.postalCode
    );

    checkoutPage.continuar();

    checkoutOverviewPage.validarPaginaResumen();

    checkoutOverviewPage.validarProducto(
        productos.productoPrincipal.nombre
    );

    checkoutOverviewPage.validarPrecioProducto(
        productos.productoPrincipal.precio
    );

});

it('TC-017 - Debe mostrar información de pago y envío', () => {

    checkoutPage.escribirNombre(
        checkoutData.datosValidos.firstName
    );

    checkoutPage.escribirApellido(
        checkoutData.datosValidos.lastName
    );

    checkoutPage.escribirCodigoPostal(
        checkoutData.datosValidos.postalCode
    );

    checkoutPage.continuar();

    checkoutOverviewPage.validarPaginaResumen();

    checkoutOverviewPage.validarInformacionPago();

    checkoutOverviewPage.validarInformacionEnvio();

});

it('TC-018 - Debe calcular correctamente el total de la compra', () => {

    checkoutPage.escribirNombre(
        checkoutData.datosValidos.firstName
    );

    checkoutPage.escribirApellido(
        checkoutData.datosValidos.lastName
    );

    checkoutPage.escribirCodigoPostal(
        checkoutData.datosValidos.postalCode
    );

    checkoutPage.continuar();

    checkoutOverviewPage.validarPaginaResumen();

    checkoutOverviewPage.obtenerSubtotal()
        .then((subtotal) => {

            checkoutOverviewPage.obtenerImpuesto()
                .then((impuesto) => {

                    checkoutOverviewPage.obtenerTotal()
                        .then((total) => {

                            const totalEsperado =
                                subtotal + impuesto;

                            expect(total)
                                .to.be.closeTo(
                                    totalEsperado,
                                    0.01
                                );

                        });

                });

        });

});

it('TC-019 - Debe finalizar correctamente la compra', () => {

    checkoutPage.escribirNombre(
        checkoutData.datosValidos.firstName
    );

    checkoutPage.escribirApellido(
        checkoutData.datosValidos.lastName
    );

    checkoutPage.escribirCodigoPostal(
        checkoutData.datosValidos.postalCode
    );

    checkoutPage.continuar();

    checkoutOverviewPage.validarPaginaResumen();

    checkoutOverviewPage.finalizarCompra();

    checkoutOverviewPage.validarCompraExitosa();

});

});