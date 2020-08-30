import Debug from 'debug';

export default (...loggerKeys) => {
    const debug = Debug(loggerKeys.join(':'));
    const log = (type, data) => debug(`[${ type }]: ${ JSON.stringify(data, null, '\t') }`);
    return {
        warn(message) { log('warn', message); },
        error(message) { log('error', message); },
        deprecate(message) { log('deprecate', message); },
        debug(message) { log('debug', message); },
    };
};
