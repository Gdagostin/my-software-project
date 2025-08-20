/// <reference types="cypress" />
const apiUrl = Cypress.env('API_URL');
const encoded = btoa('Tester:12345');

describe('GET - Totalizador', () => {
    it('Obter Totalizador de saldos', () => {
        cy.request({
            method: 'GET',
            url: `${apiUrl}/totalizador`,
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.all.keys('total_receitas', 'total_despesas', 'saldo');
            expect(response.body.total_receitas).to.be.a('number');
            expect(response.body.total_despesas).to.be.a('number');
            expect(response.body.saldo).to.be.a('number');
            expect(response.headers).to.have.property('content-type').and.contains('application/json');
        });
    });
});