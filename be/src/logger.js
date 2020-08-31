import Debug from 'debug';

export default (...loggerKeys) => {
    const debugInstance = Debug(loggerKeys.join(':'));
    const log = (type, text, data) => debugInstance(`[${ type }]: ${ text } with ${ JSON.stringify(data, null, '\t') }`);
    const error = ({ text, data, }) => log('error', text, data);
    const warn = ({ text, data, }) => log('warn', text, data);
    const deprecate = ({ text, data, }) => log('deprecate', text, data);
    const debug = ({ text, data, }) => log('debug', text, data);
    return {
        error,
        warn,
        deprecate,
        debug,
    };
};
