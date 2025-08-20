
import http from 'k6/http';
import { check, sleep } from 'k6';
import { option, baseURL } from './Utils/config.js';
import { encodedCredentials } from './helpers/auth.js';

export const options = option;

export default function () {

    const credentials = encodedCredentials;

    const url = baseURL + '/lancamentos';

    const payload = JSON.stringify({
        tipo: "receita",
        descricao: "Descrição da receita",
        data: "10/20/2020",
        valor: 11.00
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`,
        },
    };

    const res = http.post(url, payload, params);

    check(res, {
        'validar que o status é 201': (r) => r.status === 201
    });

    sleep(1);
};