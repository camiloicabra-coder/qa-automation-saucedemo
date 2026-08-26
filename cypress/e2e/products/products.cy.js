import LoginPage from '../../pages/LoginPage';
import ProductsPage from '../../pages/ProductsPage';
import CartPage from '../../pages/CartPage';

describe('Products - SauceDemo', () => {

    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const cartPage = new CartPage();

    let usuarios;
    let productos;

    before(() =>{
        cy.fixture('users').then((data)=>{
            usuarios=data;
        })

        cy.fixture('products').then((data)=> {
            productos=data;
        })
    })

    beforeEach(() => {

        loginPage.visitar();

        loginPage.iniciarSesion(
            usuarios.usuarioValido.username,
            usuarios.usuarioValido.password
        );

    });

    it('TC-007 - Debe visualizar correctamente el catálogo de productos', () => {

        productsPage.validarPaginaProductos();

        productsPage.validarProductos();

    });

    it('TC-008 - Cada producto debe mostrar información completa', () => {

    productsPage.validarPaginaProductos();

    productsPage.validarInformacionProductos();

});

it('TC-009 - Debe agregar un producto al carrito', () => {

    productsPage.agregarProducto(productos.productoPrincipal.nombre);

    productsPage.validarCantidadCarrito(1);

});

    it('TC-010 - El producto agregado debe aparecer en el carrito', () => {

        productsPage.agregarProducto(productos.productoPrincipal.nombre);

        productsPage.abrirCarrito();

        cartPage.validarPaginaCarrito();

        cartPage.validarProducto('Sauce Labs Backpack');

        cartPage.validarCantidadProductos(1);

    });

});