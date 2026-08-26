import LoginPage from "../../pages/LoginPage";

describe('Login-Saudemo', ()=> {

    const loginPage = new LoginPage();

    let usuarios;

        before (()=> {
        cy.fixture('users').then((data)=> {
            usuarios=data;
        })
    })
    
    beforeEach(()=>{
        loginPage.visitar();
        loginPage.validarPaginaLogin();
    })


    it('TC-001 - Debe iniciar sesión correctamente', () => {
        //loginPage.visitar();
        loginPage.iniciarSesion(usuarios.usuarioValido.username, 
            usuarios.usuarioValido.password)

        cy.url().should('include', '/inventory.htm')
    });

    it('TC-002 - No debe permitir iniciar sesión con usuario bloqueado', () => {
       // loginPage.visitar();
        loginPage.iniciarSesion(usuarios.usuarioBloqueado.username, usuarios.usuarioBloqueado.password)

        loginPage.validarMensajeError('Epic sadface: Sorry, this user has been locked out.');
    });

    it('TC-003 - Debe mostrar error con contraseña incorrecta', () => {
        //loginPage.visitar();
        loginPage.iniciarSesion(usuarios.usuarioValido.username, 'contraseña_incorrecta')

        loginPage.validarMensajeError('Epic sadface: Username and password do not match any user in this service');
    });

    it('TC-004 - No debe permitir iniciar sesion comn usuario vacio', () => {
       // loginPage.visitar();
        loginPage.iniciarSesion(usuarios.usuarioVacio.username, usuarios.usuarioVacio.password)

        loginPage.validarMensajeError('Epic sadface: Username is required');
    });

    it('TC-005 - No debe permitir iniciar sesion con contraseña vacia', () => {
       // loginPage.visitar();
        loginPage.iniciarSesion(usuarios.passwordVacia.username,
             usuarios.passwordVacia.password)
        loginPage.validarMensajeError('Epic sadface: Password is required');
    });

    it('TC-006 - Debe mostrar error con usuario inexistente', () => {

    //loginPage.visitar();

    loginPage.escribirUsuario('usuario_inexistente');

    loginPage.escribirPassword('secret_sauce');

    loginPage.hacerLogin();

    loginPage.validarMensajeError(
        'Epic sadface: Username and password do not match any user in this service'
    );

});
})