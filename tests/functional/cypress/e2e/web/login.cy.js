/// <reference types="cypress" />
const webUrl = Cypress.env('WEB_URL');
describe('Login', () => {
    beforeEach(() => {
        cy.visit(`${webUrl}/login.html`)
    })

    it('Login com credenciais válidas', () => {

        cy.LoginComCredenciaisValidas()

        cy.url().should('eq', 'http://localhost:4000/lancamentos.html')
        cy.contains('Lançamento').should('be.visible');
    })

    it('Login com credenciais inválidas', () => {

        cy.LoginComCredenciaisInvalidas()

        cy.url().should('eq', 'http://localhost:4000/login.html')
        cy.get('#loginMsg').should('have.text', 'Usuário ou senha inválidos');
    })
})