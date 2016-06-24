/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let mongoose = require('mongoose');
const Config = require('../Config/Config');

let base = function () {
};

let db = null,
    model = null;

base.prototype.initConnection = function() {
    // Schema 结构
    let checkerSchema = new mongoose.Schema({
        name: {type: String},
        url: {type: String},
        count: {type: Number}
    });

    mongoose.connect("mongodb://localhost/checker");
    db = mongoose.connection;
    model = db.model("selector", checkerSchema);
};

base.prototype.save = function (doc) {
    // 增加记录 基于model操作
    return model.create(doc, function(error) {
        if(error) {
            console.log("save error: " + error);
        } else {
            console.log("save success");
        }
    });
};

base.prototype.deleteByUrl = function (url) {
    return model.remove({"url": url}, function(error) {
        if(error) {
            console.log("delete error: " + error);
        } else {
            console.log("delete success");
        }
    });
};

base.prototype.findByUrl = function (url, callback) {
    return model.find({"url": url}, function(error, data) {
        callback(data);
    });
};

// 关闭数据库链接
base.prototype.close = function () {
    db.close();
};

let baseObj = new base();
baseObj.initConnection();

module.exports = baseObj;

