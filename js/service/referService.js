/**
 * Created by cdchenjia on 2016/6/13.
 * 保存参照数据
 */
'use strict';
const base = require('./base');
const Config = require('../Config/Config');
let mongoose = require('mongoose');

let referService = function () {
};

/**
 *
 * @param url
 * @param doc localData中的json数据
 */
referService.prototype.saveSelector = function(url, doc) {
    // Schema 结构
    let checkerSchema = new mongoose.Schema({
        name: {type: String},
        url: {type: String},
        count: {type: Number}
    });

    let selectorModel = base.open(Config.serviceInterface.checkerSource, checkerSchema, Config.serviceInterface.selectorCollection);

    base.deleteByUrl(selectorModel, url);
    base.save(selectorModel, doc);
};

module.exports = new referService();
