'use strict';

// const Errors = require('./errors');
import * as Errors  from "./errors.js";

// exports.array = (val, type, ...args) => {
export function array(val, type, ...args) {

    const result = val.split(',');

    if (!type) {
        return result;
    }

    if (!exports.hasOwnProperty(type)) {
        throw new Errors.ConversionError();
    }

    return result.map((item) => {

        return exports[type](item, ...args);
    });
};

// exports.boolean = (val) => {
export function boolean(val) {

    if (['y', 'yes', 'true', 't', 'on'].includes(val.toLowerCase())) {
        return true;
    }

    if (['n', 'no', 'false', 'f', 'off'].includes(val.toLowerCase())) {
        return false;
    }

    const num = Number(val);
    if (!isNaN(num)) {
        return Boolean(num);
    }

    throw new Errors.ConversionError();
};

// exports.date = (val) => {
export function date(val) {

    let result;
    const num = Number(val);
    if (!isNaN(num)) {
        result = new Date(num);
    }
    else {
        result = new Date(val);
    }

    if (result.toJSON() === null) {
        throw new exports.ConversionError();
    }

    return result;
};

// exports.number = (val) => {
export function number(val) {

    const result = Number(val);
    if (isNaN(result)) {
        throw new exports.ConversionError();
    }

    return result;
};

// exports.object = (val) => {
export function object(val) {

    try {
        return JSON.parse(val);
    }
    catch (err) {
        throw new exports.ConversionError();
    }
};

// exports.regex = (val) => {
export function regex(val) {

    try {
        return new RegExp(val);
    }
    catch (err) {
        throw new exports.ConversionError();
    }
};
