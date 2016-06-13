/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let Config = {
    "firstFetch": true
};

Config.serviceInterface = {
    checkerSource: 'mongodb://localhost/checker',
    selectorCollection: "selector"
};

Config.urls = [
    "http://www.jd.hk"
];

module.exports = Config;