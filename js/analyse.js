/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

const myUtil = require('./myUtil');
// const mydb = require('./mydb');
const Config = require('./Config');

const attrType = ["src", "data-original", "data-lazy-img"];

let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/checker');

let db = mongoose.connection;

// Schema 结构
let mongooseSchema = new mongoose.Schema({
    name: {type: String},
    count: {type: Number}
});

let mongooseModel = db.model('mongoose', mongooseSchema);

let analyse = function () {
};

analyse.prototype.doAnalyse = function ($) {
    let root = $("body");
    Config.ticker = 0;

    findImg(root);
};

function findImg(rt) {
    let root = rt;
    let childList;

    if (typeof root.children === 'function') {
        childList = root.children();
    } else {
        childList = root.children || {};
    }
    for (let i = 0; i < childList.length; i++) {
        (function (i) {
            if (childList[i].name == "img") {
                let imgUrl = "";
                for (let j = 0; j < attrType.length; j++) {
                    if (childList[i].attribs[attrType[j]]) {
                        imgUrl = childList[i].attribs[attrType[j]];
                        break;
                    }
                }
                let selectorStr = "";
                let allSelector = myUtil.getLocation(selectorStr, childList[i]);

                // Config.ticker += 1;
                // mydb.findAndUpdate({
                //     "name": allSelector
                // }).then(function(data) {
                //     console.log(data);
                //     Config.ticker -= 1;
                //     if (Config.ticker == 0) {
                //         // mydb.close();
                //     }
                // });
                // console.log(Config.tmpNum++);
                // mydb.find({
                //     "name": allSelector
                // });
                mongooseModel.find({"name": allSelector}, function (docs) {
                    if (docs && docs.length > 0 && docs[0].name) {
                        console.log("update");
                    } else {
                        console.log("insert");
                    }
                });
            }
            else {
                findImg(childList[i]);
            }
        })(i);
    }
}

module.exports = new analyse();