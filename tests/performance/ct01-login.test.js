
import http from 'k6/http';
import { check, sleep } from 'k6';
import { option, baseURL } from './Utils/config.js';
const postLogin = JSON.parse(open('./fixtures/users.json'));

export const options = option;

export default function () {

        const url = baseURL + '/login';

        const payload = JSON.stringify(postLogin);

        const params = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const res = http.post(url, payload, params);    

        check(res, {
            'validar que o status é 200': (r) => r.status === 200
        });

        sleep(1);
    };