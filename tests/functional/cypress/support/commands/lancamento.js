const apiUrl = Cypress.env('API_URL');
const encoded = btoa('Tester:12345');

Cypress.Commands.add('realizarLancamento', (tipo, descricao, data, valor) => {
    cy.get('#tipo').should('be.visible').select(tipo)
    cy.get('#descricao').should('be.visible').clear().type(descricao)
    cy.get('#data').should('be.visible').type(data)
    cy.get('#valor').should('be.visible').type(valor)
    cy.contains('button', 'Adicionar').click()
})

Cypress.Commands.add('DeleteLancamentosAPI', () => {
    cy.request({
        method: 'DELETE',
        url: apiUrl + '/lancamentos',
        headers: {
            Authorization: `Basic ${encoded}`,
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    });
});

Cypress.Commands.add('LancamentoAPI', (tipo, descricao, data, valor) => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}/lancamentos`,
        body: {
            tipo: (tipo),
            descricao: (descricao),
            data: (data),
            valor: (valor)
        },
        headers: {
            Authorization: `Basic ${encoded}`,
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    });
});

