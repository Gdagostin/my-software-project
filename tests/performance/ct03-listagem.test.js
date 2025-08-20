
import http from 'k6/http';
import { check, sleep } from 'k6';
import { option, baseURL } from '/Utils/config.js';
import { encodedCredentials } from '/helpers/auth.js';

export const options = option;

export default function () {

    const credentials = encodedCredentials;

    const url = baseURL + '/lancamentos';

    const res = http.get(url, {
        headers: {
            'Authorization': `Basic ${credentials}`
        }
    });

    check(res, {
        'validar que o status é 200': (r) => r.status === 200
    });

    sleep(1);
};