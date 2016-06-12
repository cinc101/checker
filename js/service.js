/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checker');

let db = mongoose.connection;

// Schema 结构
let mongooseSchema = new mongoose.Schema({
    name: {type: String},
    url: {type: String},
    count: {type: Number}
});

let mongooseModel = db.model('mongoose', mongooseSchema);

let service = function () {
};

service.prototype.save = function (doc) {
    // 增加记录 基于model操作
    mongooseModel.create(doc, function (error) {
        if(error) {
            console.log("save error:" + error);
        } else {
            console.log("save success");
        }
        db.close();
    });
};

service.prototype.deleteByUrl = function (url) {
    mongooseModel.remove({"url": url}, function(error) {
       if(error) {
           console.log("delete error: " + error);
       } else {
           console.log("delete success");
       }
    });
};

// 关闭数据库链接
service.prototype.close = function () {
    db.close();
};

module.exports = new service();

