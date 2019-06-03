const DEV = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
const logFn = DEV ? console.log : () => {};
const errorFn = DEV ? console.error : () => {};

function info(msg) {
  logFn(`INFO: ${msg}`);
}

function error(err) {
  errorFn('ERROR', err);
}

export { info, error };
