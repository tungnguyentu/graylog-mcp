import test from "node:test";
import assert from "node:assert/strict";
import {
    loadInstances,
    resolveBasicAuth,
    resolveInstanceAuth,
} from "./src/graylog-auth.js";

test("resolveBasicAuth returns credentials only when both values exist", () => {
    const env = {
        GRAYLOG_USERNAME_INSTANCE_2: "user-2",
        GRAYLOG_PASSWORD_INSTANCE_2: "pass-2",
    };

    assert.deepEqual(resolveBasicAuth(2, env), {
        username: "user-2",
        password: "pass-2",
    });
    assert.equal(resolveBasicAuth(3, env), null);
});

test("resolveInstanceAuth prefers API token when both auth modes exist", () => {
    const env = {
        GRAYLOG_API_TOKEN_INSTANCE_1: "token-1",
        GRAYLOG_USERNAME_INSTANCE_1: "user-1",
        GRAYLOG_PASSWORD_INSTANCE_1: "pass-1",
    };

    assert.deepEqual(resolveInstanceAuth(1, env), {
        authMode: "token",
        username: "token-1",
        password: "token",
    });
});

test("loadInstances supports basic auth and skips incomplete credentials", () => {
    const env = {
        GRAYLOG_BASE_URL_INSTANCE_1: "http://graylog-a",
        GRAYLOG_USERNAME_INSTANCE_1: "user-a",
        GRAYLOG_PASSWORD_INSTANCE_1: "pass-a",
        GRAYLOG_LABEL_INSTANCE_1: "primary",
        GRAYLOG_BASE_URL_INSTANCE_2: "http://graylog-b",
        GRAYLOG_USERNAME_INSTANCE_2: "user-b",
    };

    assert.deepEqual(loadInstances(env), [
        {
            authMode: "basic",
            baseUrl: "http://graylog-a",
            label: "primary",
            password: "pass-a",
            username: "user-a",
        },
    ]);
});
