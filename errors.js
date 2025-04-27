'use strict';

export class ConversionError extends Error {
    constructor(name, type, err) {

        let message = 'Unable to convert environment variable';
        if (name &&
            type) {

            const vowel = ['a', 'e', 'i', 'o', 'u', 'y'].includes(type[0].toLowerCase());
            message += ` $${name} to a${vowel ? 'n' : ''} ${type}`;
        }

        super(message);
        if (err) {
            // horrible reformat of the stack trace to keep our error message but preserve their trace
            this.stack = [this.stack.split('\n')[0]].concat(err.stack.split('\n').slice(1)).join('\n');
        }
    }

    get code() {

        return 'ECONVERSION';
    }
};

export class DirNotFoundError extends Error {
    constructor() {

        super('Unable to find a config directory');
    }

    get code() {

        return 'EDIRNOTFOUND';
    }
};

export class FileNotFoundError extends Error {
    constructor() {

        super('No config files found');
    }

    get code() {

        return 'EFILENOTFOUND';
    }
};

export class InvalidTypeError extends Error {
    constructor(type) {

        super(`Invalid type specified: ${type}`);
    }

    get code() {

        return 'EINVALIDTYPE';
    }
};

export class UnsetEnvVarError extends Error {
    constructor(name) {

        super(`Unable to resolve environment variable $${name}`);
    }

    get code() {

        return 'EUNSETENVVAR';
    }
};

export class MissingPropertyError extends Error {
    constructor(name) {

        super(`The requested property ${name} is not set`);
    }

    get code() {

        return 'EMISSINGPROPERTY';
    }
};
