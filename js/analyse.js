/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

const myUtil = require('./myUtil');
const mydb = require('./mydb');
const Config = require('./Config');

const attrType = ["src", "data-original", "data-lazy-img"];

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

            Config.ticker += 1;
            mydb.save({
                "name": allSelector,
                "count": i
            }, function() {
                Config.ticker -= 1;
                if(Config.ticker == 0) {
                    mydb.close();
                }
            });
            // console.log(allSelector + "============" + imgUrl);
        } else {
            findImg(childList[i]);
        }
    }
}

module.exports = new analyse();