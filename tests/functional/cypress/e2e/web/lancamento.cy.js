/// <reference types="cypress" />
import dayjs from 'dayjs';
const webUrl = Cypress.env('WEB_URL');

describe('Cadastro de lançamentos', () => {
    beforeEach(() => {
        cy.visit(`${webUrl}/login.html`)
        cy.LoginComCredenciaisValidas()
        cy.DeleteLancamentosAPI()
    })

    it('Cadastro de receita', () => {

        cy.realizarLancamento('receita', 'Venda de produto', '2025-08-18', '150.53')

        cy.get('#tabelaLancamentos').should('contain', 'Venda de produto')
            .and('contain', '2025-08-18')
            .and('contain', '150,53');

    })

    it('Cadastro de despesa', () => {

        cy.realizarLancamento('despesa', 'Academia', '2025-08-01', '90.00')

        cy.get('#tabelaLancamentos').should('contain', 'Academia')
            .and('contain', '2025-08-01')
            .and('contain', '90,00');

    })

    it.skip('Cadastro sem descrição', () => {
        // Cenário com bug

        cy.realizarLancamento('despesa', '', '2025-07-01', '95.00')

        cy.get('#tabelaLancamentos td.descricao-col').each(($el) => {
            cy.wrap($el).should('not.have.text', '');
        });
        cy.on('window:alert', (msg) => {
            expect(msg).to.equal('Preencha todos os campos corretamente!');
        });

    })
})

describe('Edição e exclusão de lançamento', () => {
    beforeEach(() => {
        cy.visit(`${webUrl}/login.html`)
        cy.LoginComCredenciaisValidas()
    })
    it('Edição de lançamento', () => {
        
        cy.realizarLancamento('despesa', 'Lancamento edicao', '2025-08-01', '90.00')

        cy.get('#tabelaLancamentos td.descricao-col').contains('Lancamento edicao')
            .parent('tr')
            .find('button').contains('Editar')
            .click();

        cy.get('#tipo').should('have.value', 'despesa')
        cy.get('#descricao').should('have.value', 'Lancamento edicao')
        cy.get('#data').should('have.value', '2025-08-01')
        cy.get('#valor').should('have.value', '90,00')

        cy.realizarLancamento('despesa', 'Farmácia', '2025-08-15', '25.00')

        cy.get('#tabelaLancamentos').should('not.contain', 'Lancamento edicao')
        cy.get('#tabelaLancamentos').should('contain', 'Farmácia')
        cy.get('#tabelaLancamentos').should('contain', '2025-08-15')
        cy.get('#tabelaLancamentos').should('contain', '25,00')

    })
    it('Exclusão de lançamento', () => {

        cy.realizarLancamento('despesa', 'Despesa a Excluir', '2025-08-01', '90.00')

        cy.get('#tabelaLancamentos td.descricao-col').contains('Despesa a Excluir')
            .parent('tr')
            .find('button').contains('Excluir')
            .click();

        cy.get('#tabelaLancamentos').should('not.contain', 'Despesa a Excluir')

    })
})

describe.skip('Campo data padrão', () => {
    // Cenário com bug
    it('Validação de campo data padrão hoje', () => {
        cy.visit(`${webUrl}/login.html`)

        cy.get('#usuario').type('Tester')
        cy.get('#senha').type('12345')
        cy.contains('button', 'Entrar').click()

        const hoje = dayjs().format('YYYY-MM-DD');
        cy.get('#data').should('have.value', hoje);
    })
})

describe('Tabela Listagem', () => {

    beforeEach(() => {
        cy.visit(`${webUrl}/login.html`)
        cy.LoginComCredenciaisValidas()
    })
    // Cenário com bug
    it('Campos da Tabela Listagem', () => {

        cy.get('#tabelaLancamentos th')
            .should('contain', 'Tipo')
            .and('contain', 'Descrição')
            .and('contain', 'Data')
            .and('contain', 'Valor')
            .and('contain', 'Ações')
    })
})

describe('Interface em tema escuro', () => {
    it('Cor da interface #181818', () => {
        cy.visit(`${webUrl}/login.html`)
        cy.get('body').should('have.css', 'background-color', 'rgb(24, 24, 24)');
        cy.LoginComCredenciaisValidas()

        cy.url().should('eq', `${webUrl}/lancamentos.html`)
        cy.get('body').should('have.css', 'background-color', 'rgb(24, 24, 24)');

    })
})

describe.skip('Restrição de acesso', () => {
    // Cenário com bug
    it('Restrição de acesso sem login, deve redirecionar para login', () => {
        cy.visit(`${webUrl}/lancamentos.html`)
        cy.url().should('eq', `${webUrl}/login.html`)
    })
})