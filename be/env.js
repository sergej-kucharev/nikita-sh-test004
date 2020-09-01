import dotenv from 'dotenv';
import process, { env, } from 'process';

const debug = !['production'].includes(mode) && false;
dotenv.config({
    ...debug && { debug },
});

const modeExpected = env.NODE_ENV_EXPECTED;
const mode = env.NODE_ENV ?? 'development';
if (!modeExpected) {
    const json = JSON.stringify({
        NODE_ENV_EXPECTED: modeExpected,
    });
    throw new Error(`Error: env lacks property ${ json }`);
} else if (Object.is(mode, modeExpected)) {
    const json = JSON.stringify({
        NODE_ENV: mode,
        NODE_ENV_EXPECTED: modeExpected,
    });
    throw new Error(`Error: env properties not match ${ json }`);
}

export {
    dotenv,
    process,
    env,
};
