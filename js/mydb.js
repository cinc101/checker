/**
 * Created by chenjia on 2016/6/9.
 */
'use strict';
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checker');

let db = mongoose.connection;

// Schema 结构
let mongooseSchema = new mongoose.Schema({
    name : {type : String},
    count    : {type : Number}
});

let mongooseModel = db.model('mongoose', mongooseSchema);

let mydb = function() {};

mydb.prototype.save = function(doc, callback) {
    // 增加记录 基于model操作
    mongooseModel.create(doc, function(error){
        if(error) {
            console.log(error);
        } else {
            if(typeof callback === "function") {
                callback();
            }
        }
    });
};

// 关闭数据库链接
mydb.prototype.close = function() {
    db.close();
};

module.exports = new mydb();

