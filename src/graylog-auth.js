function resolveBasicAuth(index, env = process.env) {
    const username = env[`GRAYLOG_USERNAME_INSTANCE_${index}`]
                  ?? (index === 1 ? env.GRAYLOG_USERNAME : null)
                  ?? null;
    const password = env[`GRAYLOG_PASSWORD_INSTANCE_${index}`]
                  ?? (index === 1 ? env.GRAYLOG_PASSWORD : null)
                  ?? null;

    const hasCompleteCredentials = Boolean(username && password);
    if (!hasCompleteCredentials) {
        return null;
    }

    return { username, password };
}

function resolveInstanceAuth(index, env = process.env) {
    const apiToken = env[`GRAYLOG_API_TOKEN_INSTANCE_${index}`]
                  ?? (index === 1 ? env.API_TOKEN : null)
                  ?? null;

    if (apiToken) {
        return {
            authMode: "token",
            username: apiToken,
            password: "token",
        };
    }

    const basicAuth = resolveBasicAuth(index, env);
    if (!basicAuth) {
        return null;
    }

    return {
        authMode: "basic",
        ...basicAuth,
    };
}

function loadInstances(env = process.env) {
    const declaredNumbers = Object.keys(env)
        .map(key => key.match(/^GRAYLOG_BASE_URL_INSTANCE_(\d+)$/))
        .filter(Boolean)
        .map(match => parseInt(match[1], 10))
        .sort((a, b) => a - b);

    const numbers = declaredNumbers.includes(1) ? declaredNumbers : [1, ...declaredNumbers];

    const instances = [];

    for (const i of numbers) {
        const baseUrl = env[`GRAYLOG_BASE_URL_INSTANCE_${i}`]
                     ?? (i === 1 ? env.BASE_URL : null)
                     ?? null;
        const label = env[`GRAYLOG_LABEL_INSTANCE_${i}`]
                   ?? `instance_${i}`;
        const auth = resolveInstanceAuth(i, env);

        if (baseUrl && auth) {
            instances.push({ label, baseUrl, ...auth });
        }
    }

    return instances;
}

export {
    loadInstances,
    resolveBasicAuth,
    resolveInstanceAuth,
};
