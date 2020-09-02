import dotenv from 'dotenv';
import process, { env, } from 'process';

dotenv.config({
    // debug: true,
});

const modeExpected = env.NODE_ENV_EXPECTED;
const mode = env.NODE_ENV;
const envs = [ 'development', 'production', 'stage', 'test' ];
if (envs.includes(mode) && [ 'none' ].includes(modeExpected)) {
    const json = JSON.stringify({
        NODE_ENV: mode,
        NODE_ENV_EXPECTED: modeExpected,
    });
    console.info(`env ${ json }`);
} else if (!envs.includes(mode) || !envs.includes(modeExpected) || !Object.is(mode, modeExpected)) {
    const json = JSON.stringify({
        NODE_ENV: mode,
        NODE_ENV_EXPECTED: modeExpected,
    });
    throw new Error(`Error: env conflict properties ${ json }`);
}

export {
    dotenv,
    process,
    env,
};
