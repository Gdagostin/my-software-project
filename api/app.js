const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Deleta todos os lançamentos
app.delete('/lancamentos', autenticar, (req, res) => {
  lancamentos = [];
  freeIds = [];
  nextId = 1;
  res.json({ message: 'Todos os lançamentos foram excluídos' });
});

// Usuário fixo para login
const USER = { username: 'Tester', password: '12345' };
let lancamentos = [];
let nextId = 1;
let freeIds = [];

// Autenticação simples
function autenticar(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'Credenciais ausentes' });
    const base64 = authorization.split(' ')[1];
    const [username, password] = Buffer.from(base64, 'base64').toString().split(':');
    if (username === USER.username && password === USER.password) {
        next();
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
}

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === USER.username && password === USER.password) {
        res.json({ message: 'Login realizado com sucesso' });
    } else {
        res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }
});

app.get('/lancamentos', autenticar, (req, res) => {
    res.json(lancamentos);
});

app.post('/lancamentos', autenticar, (req, res) => {
  const { tipo, descricao, data, valor } = req.body;
  let id;
  if (freeIds.length > 0) {
    id = freeIds.shift();
  } else {
    id = nextId++;
  }
  const lancamento = { id, tipo, descricao, data, valor };
  lancamentos.push(lancamento);
  res.status(201).json(lancamento);
});

app.put('/lancamentos/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id);
    const { tipo, descricao, data, valor } = req.body;
    const idx = lancamentos.findIndex(l => l.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
    lancamentos[idx] = { id, tipo, descricao, data, valor };
    res.json(lancamentos[idx]);
});

app.delete('/lancamentos/:id', autenticar, (req, res) => {
    const id = parseInt(req.params.id);
    const idx = lancamentos.findIndex(l => l.id === id);
    if (idx === -1) return res.status(404).json({ message: 'Lançamento não encontrado' });
  freeIds.push(lancamentos[idx].id);
  lancamentos.splice(idx, 1);
  res.json({ message: 'Lançamento excluído' });
});

app.get('/totalizador', autenticar, (req, res) => {
    const total_receitas = lancamentos.filter(l => l.tipo === 'receita').reduce((acc, l) => acc + l.valor, 0);
    const total_despesas = lancamentos.filter(l => l.tipo === 'despesa').reduce((acc, l) => acc + l.valor, 0);
    const saldo = total_receitas - total_despesas;
    res.json({ total_receitas, total_despesas, saldo });
});

const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Controle Financeiro API',
    version: '1.0.0',
    description: 'API para controle financeiro pessoal'
  },
  servers: [{ url: 'http://localhost:3000' }],
  components: {
    securitySchemes: {
      basicAuth: { type: 'http', scheme: 'basic' }
    },
    schemas: {
      Lancamento: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
          tipo: { type: 'string', enum: ['receita', 'despesa'] },
          descricao: { type: 'string' },
          data: { type: 'string' },
          valor: { type: 'number' }
        }
      }
    }
  },
  security: [{ basicAuth: [] }],
  paths: {
    '/login': {
      post: {
        summary: 'Login do usuário',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' }
                }
              }
            }
          }
        },
        responses: {
          '200': { description: 'Login realizado com sucesso' },
          '401': { description: 'Usuário ou senha inválidos' }
        }
      }
    },
    '/lancamentos': {
      get: {
        summary: 'Listar lançamentos',
        security: [{ basicAuth: [] }],
        responses: {
          '200': {
            description: 'Lista de lançamentos',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: '#/components/schemas/Lancamento' } }
              }
            }
          }
        }
      },
      post: {
        summary: 'Criar lançamento',
        security: [{ basicAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Lancamento' }
            }
          }
        },
        responses: {
          '200': { description: 'Lançamento criado' }
        }
      }
    },
    '/lancamentos/{id}': {
      put: {
        summary: 'Editar lançamento',
        security: [{ basicAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Lancamento' }
            }
          }
        },
        responses: {
          '200': { description: 'Lançamento editado' },
          '404': { description: 'Lançamento não encontrado' }
        }
      },
      delete: {
        summary: 'Excluir lançamento',
        security: [{ basicAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          '200': { description: 'Lançamento excluído' },
          '404': { description: 'Lançamento não encontrado' }
        }
      }
    },
    '/totalizador': {
      get: {
        summary: 'Totalizador de saldos',
        security: [{ basicAuth: [] }],
        responses: {
          '200': {
            description: 'Totais de receitas, despesas e saldo',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    total_receitas: { type: 'number' },
                    total_despesas: { type: 'number' },
                    saldo: { type: 'number' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
