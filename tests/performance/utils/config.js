export const option = {
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_duration: ['avg < 1000'],
    http_req_failed: ['rate<0.01']
  }
};

export const baseURL = 'http://localhost:3000';
