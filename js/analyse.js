/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

const myUtil = require('./myUtil');
// const mydb = require('./mydb');
const cacheOpt = require('./cacheopt');
const Config = require('./Config');
const LocalData = require('./localData');

const attrType = ["src", "data-original", "data-lazy-img"];

let analyse = function () {
};

analyse.prototype.doAnalyse = function ($) {
    let root = $("body");

    findImg(root);

    console.log(LocalData.selectorData);
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
            let wholeSelector = myUtil.getLocation(selectorStr, childList[i]);
            wholeSelector = wholeSelector.substring(0, wholeSelector.length-1);

            cacheOpt.find(wholeSelector, function(isExisted, position) {
                if(isExisted) {
                    cacheOpt.update(position);
                } else {
                    cacheOpt.insert(wholeSelector);
                }
            });
        }
        else {
            findImg(childList[i]);
        }
    }
}

module.exports = new analyse();