/// <reference types="cypress" />
const apiUrl = Cypress.env('API_URL');

describe('POST - Login', () => {
    it('deve autenticar com credenciais válidas', () => {

        cy.LoginAPI('Tester', '12345').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Login realizado com sucesso');
        });
    });

    it('não deve autenticar com credenciais inválidas', () => {

        cy.LoginAPI('Tester', 'senha_incorreta').then((response) => {
            expect(response.status).to.eq(401);
            expect(response.body).to.have.property('message', 'Usuário ou senha inválidos');
        });
    });
});