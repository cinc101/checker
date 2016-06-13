/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let mongoose = require('mongoose');

let base = function () {
};

let db = null;

base.prototype.open = function (source, schema, collection) {
    mongoose.connect(source);
    db = mongoose.connection;
    return db.model(collection, schema);
};

base.prototype.save = function (model, doc) {
    // 增加记录 基于model操作
    model.create(doc, function (error) {
        if (error) {
            console.log("save error:" + error);
        } else {
            console.log("save success");
        }
        db.close();
    });
};

base.prototype.deleteByUrl = function (model, url) {
    model.remove({"url": url}, function (error) {
        if (error) {
            console.log("delete error: " + error);
        } else {
            console.log("delete success");
        }
        db.close();
    });
};

// 关闭数据库链接
base.prototype.close = function () {
    db.close();
};

module.exports = new base();

