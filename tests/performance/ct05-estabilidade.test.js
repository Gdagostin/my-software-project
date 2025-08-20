import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseURL } from './utils/config.js';
import { encodedCredentials } from './helpers/auth.js';

export const options = {
  vus: 100,
  duration: '5m',
  thresholds: {
    http_req_failed: ['rate<0.01']
  }
};

export default function () {
  // Login
  const loginRes = http.post(`${baseURL}/login`, JSON.stringify({
    username: 'Tester',
    password: '12345'
  }), { headers: { 'Content-Type': 'application/json' } });
  check(loginRes, { 'login status é 200': (r) => r.status === 200 });

  // Criar lançamento
  const lancamentoRes = http.post(`${baseURL}/lancamentos`, JSON.stringify({
    tipo: 'receita',
    descricao: 'Teste K6',
    data: '2025-08-17',
    valor: 100.0
  }), { headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${encodedCredentials}` } });
  check(lancamentoRes, { 'lancamento status é 201': (r) => r.status === 201 });

  // Listar lançamentos
  const listRes = http.get(`${baseURL}/lancamentos`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } });
  check(listRes, { 'listagem status é 200': (r) => r.status === 200 });

  // Listar totalizador
  const totalRes = http.get(`${baseURL}/totalizador`, { headers: { 'Authorization': `Basic ${encodedCredentials}` } });
  check(totalRes, { 'totalizador status é 200': (r) => r.status === 200 });

  sleep(1);
}