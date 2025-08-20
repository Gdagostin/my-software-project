
import http from 'k6/http';
import { check, sleep } from 'k6';
import { baseURL } from '/Utils/config.js';
import { encodedCredentials } from '/helpers/auth.js';

export const options = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['avg < 500'],
    http_req_failed: ['rate<0.01']
  }
};

export default function () {

    const credentials = encodedCredentials;

    const url = baseURL + '/totalizador';

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