import http from 'k6/http';
import { sleep, check } from 'k6';

// One can avoid having to type --vus 10 and --duration 30s each time test is called by defining as options parameters
// options.stages === ramping behaviour of the VU level ramp up/down
// the following is init code. options to the whole test, how to run the test, distribute it on the cloud,
export let options = {

  //INIT TEST
  //vus: 10,
  //duration: '30s',

  //STRESS Verifying stability, reliability of system under extreme conditions. (Use case: Black Friday) NOTE: per leslie, scale, 1, 10, 100, 1000 RPS
  stages: [
    { duration: '1m', target: 1 }, // below normal load
    { duration: '3m', target: 1 },
    { duration: '1m', target: 10 }, // normal load
    { duration: '3m', target: 10 },
    { duration: '1m', target: 100 }, // around breaking point of 200 users / second
    { duration: '3m', target: 100 },
    { duration: '1m', target: 1000 }, // beyond the breaking point
    { duration: '3m', target: 1000 },
    { duration: '1m', target: 100 }, // scale down. Recovery stage.
    { duration: '3m', target: 100 },
    { duration: '1m', target: 10 },
    { duration: '3m', target: 10 },
    { duration: '1m', target: 1 },
    { duration: '3m', target: 1 },
  ],

  //SPIKE Immediately overwhelm the system. (Use case: Kate Middleton's purse puppy seen wearing sweater from Petco)
  // stages: [
  //   { duration: '10s', target: 100 }, // below normal load
  //   { duration: '1m', target: 100 },
  //   { duration: '10s', target: 1000 }, // spike to 1400 users
  //   { duration: '3m', target: 1000 }, // stay at 1400 for 3 minutes
  //   { duration: '10s', target: 100 }, // scale down. Recovery stage.
  //   { duration: '3m', target: 100 },
  //   { duration: '10s', target: 0 },
  // ],


  // LOAD Using thresholds to set a limit at which all requests are below a given value. Requests per second (RPS)
  // stages: [
  //   { duration: '5m', target: 100 }, // simulate ramp-up of traffic from 1 to 100 users over 5 minutes.
  //   { duration: '10m', target: 100 }, // stay at 100 users for 10 minutes
  //   { duration: '5m', target: 0 }, // ramp-down to 0 users
  // ],

  thresholds: {
    http_req_duration: ['p(99)<500'], // 99% of requests must complete below 500ms
    'stores returned successfully': ['p(99)<500'], // 99% of requests must complete below 1s
  }
}
//default function defines the entry point for my VUs
//following is Vu code, ran over and over inside each VU as long as test is run, aggregrated results reported by k6
export default function () {
  let randomItemNum = Math.ceil(Math.random() * 10000000);
  let res = http.get(`http://127.0.0.1:3006/availableAt/${randomItemNum}`);
  check(res,
    {
      'status was 201': r => r.status == 201,
      'status was 404': r => r.status === 404,
      'status was 500': r => r.status === 500,
      'transaction time OK': r => r.timings.duration < 500
    });
  sleep(1);
}

/*
OTHER NOTES:
Groups: Can organize my load script around common logic
Tags: Can categorize my checks, thresholds, custom metrics and requests for in-depth filtering

Example from tutorial/tech docs:

export default function() {
  group('v1 API testing', function() {
    group('heart-beat', function() {
      let res = http.get("https://httpbin.org/get");
      check(res, { "status is 200": (r) => r.status === 200 });
    });

    group('login', function() {
      let res = http.get("https://httpbin.org/bearer", {
        headers: { "Authorization": "Bearer da39a3ee5e6b4b0d3255bfef95601890afd80709" }
      });
      check(res, {
        "status is 200": (r) => r.status === 200,
        "is authenticated": (r) => r.json()["authenticated"] === true
      });
    });

    group('access an endpoint', function() {
      let res = http.get("https://httpbin.org/base64/azYgaXMgYXdlc29tZSE=");
      check(res, {
        "status is 200": (r) => r.status === 200,
        "k6 is awesome!": (r) => r.body === "k6 is awesome!"
      });
    });
  });
  sleep(1);
}
*/