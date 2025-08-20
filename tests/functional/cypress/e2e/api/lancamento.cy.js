/// <reference types="cypress" />
const apiUrl = Cypress.env('API_URL');
const encoded = btoa('Tester:12345');

describe('POST/PUT - Lançamento', () => {

    beforeEach(() => {
        cy.DeleteLancamentosAPI()
    });
    it('Criar lançamento', () => {

        cy.LancamentoAPI('receita', 'Teste API', '2025-08-19', 100.0).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    });

    it('Editar lançamento', () => {

        cy.LancamentoAPI('receita', 'Teste API', '2025-08-19', 100.0).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
    
        cy.request({
            method: 'PUT',
            url: `${apiUrl}/lancamentos/1`,
            body: {
                tipo: 'despesa',
                descricao: 'Teste API edição',
                data: '2025-01-01',
                valor: 101.0
            },
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('descricao', 'Teste API edição');
        });
    });
    it('Excluir lançamento', () => {
        cy.LancamentoAPI('receita', 'Teste API exclusão', '2025-08-19', 100.0).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
        });
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/lancamentos/1`,
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('message', 'Lançamento excluído');
            expect(response.body).not.to.have.property('descricao', 'Teste API exclusão');
        });
    });

    it('Editar lançamento inexistente', () => {
        cy.request({
            method: 'PUT',
            url: `${apiUrl}/lancamentos/99`,
            body: {
                tipo: 'despesa',
                descricao: 'Teste API edição',
                data: '2025-01-01',
                valor: 101.0
            },
            failOnStatusCode: false,
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'Lançamento não encontrado');
        });
    });
    it('Excluir lançamento inexistente', () => {
        cy.request({
            method: 'DELETE',
            url: `${apiUrl}/lancamentos/99`,
            failOnStatusCode: false,
            headers: {
                Authorization: `Basic ${encoded}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body).to.have.property('message', 'Lançamento não encontrado');
        });
    });
});
