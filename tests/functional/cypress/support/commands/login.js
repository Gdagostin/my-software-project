Cypress.Commands.add('LoginComCredenciaisValidas', () => {
    cy.fixture('credenciais').then((credenciais) => {
        cy.get('#usuario').type(credenciais.valida.usuario)
        cy.get('#senha').type(credenciais.valida.senha)
    })
    cy.contains('button', 'Entrar').click()
})

Cypress.Commands.add('LoginComCredenciaisInvalidas', () => {
    cy.fixture('credenciais').then((credenciais) => {
        cy.get('#usuario').type(credenciais.invalida.usuario)
        cy.get('#senha').type(credenciais.invalida.senha)
    })
    cy.contains('button', 'Entrar').click()
})

const apiUrl = Cypress.env('API_URL');

Cypress.Commands.add('LoginAPI', (usuario, senha) => {
    cy.request({
        method: 'POST',
        url: `${apiUrl}/login`,
        body: {
            username: (usuario),
            password: (senha)
        },
        headers: {
            'Content-Type': 'application/json'
        },
        failOnStatusCode: false
    });
});
