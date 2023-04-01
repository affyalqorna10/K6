import http from "k6/http";
import { check, group } from "k6";

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
