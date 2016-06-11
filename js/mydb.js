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
    count: {type: Number}
});

let mongooseModel = db.model('mongoose', mongooseSchema);

let mydb = function () {
};

mydb.prototype.save = function (doc) {
    // 增加记录 基于model操作
    return mongooseModel.create(doc).then(function () {
        console.log("save");
        return true;
    }, function (error) {
        console.log(error);
        return false;
    });
};

mydb.prototype.update = function (doc) {
    // 增加记录 基于model操作
    return mongooseModel.update({"name": doc.name}, {$set: {"count": doc.count}}).then(function () {
        console.log("update");
        return true;
    }, function (error) {
        console.log(error);
        return false;
    });
};


mydb.prototype.find = function (doc) {
    var self = this;

    // 增加记录 基于model操作
    return mongooseModel.find({"name": doc.name}).then(function (docs) {
        return docs;
        // if (docs.length > 0 && docs[0].name) {
        //     let count = docs[0].count + 1;
        //
        //     let data = {
        //         "name": doc.name,
        //         "count": count
        //     };
        //
        //     return self.update(data);
        // } else {
        //     let data = {
        //         "name": doc.name,
        //         "count": 1
        //     };
        //     return self.save(data);
        // }
    }, function (error) {
        console.log(error);
        return null;
    });
};

// 关闭数据库链接
mydb.prototype.close = function () {
    db.close();
};

module.exports = new mydb();

