import http from "k6/http";
import { check, group } from "k6";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export const options = {
  scenarios: {
    my_scenario: {
      executor: "per-vu-iterations",
      vus: 1000,
      iterations: 3500,
      maxDuration: "2s",
    },
  },
};

export default function () {
  group("K6 POST", () => {
    // POST
    let payload = {
      name: "morpheus",
      job: "leader",
    };

    let res = http.post(
      "https://reqres.in/api/users",
      JSON.stringify(payload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    check(res, {
      "is status 201": (r) => r.status === 201,
    });
    console.log("POST Method: The name is " + res.json().name);
  });

  group("K6 PUT", () => {
    // PUT
    let putPayload = {
      name: "morpheus frank",
      job: "zion resident",
    };

    let resPut = http.put(
      "https://reqres.in/api/users/2",
      JSON.stringify(putPayload),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    check(resPut, {
      "is status 200": (r) => r.status === 200,
    });
    console.log("PUT Method: The new name is " + resPut.json().name);
  });
}

export function handleSummary(data) {
  return {
    "nomor3-result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
