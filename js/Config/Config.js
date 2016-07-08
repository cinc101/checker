/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let Config = {
    "firstFetch": false, //true，采集数据， false: 对比
    "ticker": null //计数器，用来控制何时关闭数据库连接
};

Config.serviceInterface = {
    checkerSource: 'mongodb://localhost/checker',
    selectorCollection: "selector"
};

Config.urls = [
    "http://www.jd.hk"
];

Config.class_white_list = [
    "active","curr","hover","fore","style","lazy","hide"
];

module.exports = Config;