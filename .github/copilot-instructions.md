# Instruções do Projeto

Este projeto é um sistema de controle financeiro para portfólio pessoal, composto por uma API (FastAPI) e uma aplicação web (HTML/JS simples).

## Requisitos

| ID  | Título do Requisito           | Descrição do Requisito                                                                                   |
|-----|-------------------------------|----------------------------------------------------------------------------------------------------------|
| 1   | Login de Usuário              | O site deve exibir um menu de login, onde o usuário informa nome e senha para acessar o sistema.         |
| 2   | Tela de Lançamento            | Após o login, o usuário visualiza uma tela para criar lançamentos de receitas e despesas.                |
| 3   | Cadastro de Lançamento        | O usuário pode cadastrar receitas ou despesas informando descrição, data e valor.                        |
| 4   | Listagem de Lançamentos       | Abaixo da tela de cadastro, deve ser exibida uma lista com todos os lançamentos já efetuados.            |
| 5   | Edição de Lançamento          | O usuário pode editar qualquer lançamento já cadastrado.                                                  |
| 6   | Exclusão de Lançamento        | O usuário pode excluir qualquer lançamento já cadastrado.                                                 |
| 7   | Totalizador de Saldos         | Abaixo da listagem, deve ser exibido o total de receitas, despesas e o saldo final (Receitas - Despesas).|
| 8   | Armazenamento em Memória      | Todos os dados devem ser armazenados em variáveis, sem uso de banco de dados ou arquivos.                |
| 9   | Aplicação em HTML Único       | Toda a lógica e interface devem estar em um único arquivo HTML, funcionando como site simples.           |

## Estrutura do Projeto
- API: FastAPI, lógica de autenticação e lançamentos em memória
- Web: HTML/JS, interface de login, lançamentos, listagem e totalizador
- Requisitos detalhados acima
