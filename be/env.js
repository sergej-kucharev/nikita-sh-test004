import dotenv from 'dotenv';
import process, { env, } from 'process';

dotenv.config({
    // debug: true,
});

const modeExpected = env.NODE_ENV_EXPECTED;
const mode = env.NODE_ENV ?? 'development';
if (!mode || !modeExpected || !Object.is(mode, modeExpected)) {
    const json = JSON.stringify({
        ...mode && { NODE_ENV: mode },
        ...modeExpected && { NODE_ENV_EXPECTED: modeExpected },
    });
    throw new Error(`Error: env conflict properties ${ json }`);
}

export {
    dotenv,
    process,
    env,
};
