/**
 * Created by cdchenjia on 2016/6/13.
 * 保存参照数据
 */
'use strict';
const base = require('./base');
const mongoose = require('mongoose');
const co = require('co');

let referService = function () {
};

/**
 *
 * @param url
 * @param doc localData中的json数据
 */
// referService.prototype.saveSelector = function(url, doc) {
//     base.deleteByUrl(url).then(function () {
//         base.save(doc).then(function() {
//             base.close();
//         });
//     });
// };

referService.prototype.saveSelector = function(url, doc) {
    co(function* (){
        yield base.deleteByUrl(url);
        yield base.save(doc);
        yield base.close();
    });
};

referService.prototype.findSelector = function(url) {
    let doc;
    co(function* () {
        let doc = yield base.findByUrl(url);
        yield base.close();
    });
    // return doc;
};

module.exports = new referService();
