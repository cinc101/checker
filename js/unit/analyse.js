/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

const Config = require('./../Config/Config');
const util = require('./util');
const referService = require('./../service/referService');
const cacheOpt = require('./cacheopt');
const LocalData = require('./localData');

const attrType = ["src", "data-original", "data-lazy-img"];

let analyse = function () {
};

analyse.prototype.doAnalyse = function ($, url) {
    let root = $("body");

    findImg(root, url);

    referService.saveSelector(url, LocalData.selectorData);

    function findImg(rt, url) {
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
                let wholeSelector = util.getLocation(selectorStr, childList[i]);

                cacheOpt.find(wholeSelector, function(isExisted, position) {
                    if(isExisted) {
                        cacheOpt.update(position);
                    } else {
                        cacheOpt.insert(wholeSelector, url);
                    }
                });
            }
            else {
                findImg(childList[i], url);
            }
        }
    }
};

analyse.prototype.contrast = function ($, url) {
    referService.findSelector(url, function(doc) {
        contrastImgNum($, doc);
    });
};

function contrastImgNum($, doc) {
    for(let i=0; i<doc.length; i++) {
        let selector = doc[i].name;
        let numInDb = doc[i].count;
        let numInWeb;
        try {
            numInWeb = $(selector).length;
        } catch (e) {
            debugger;
        }

        if(numInDb != numInWeb) {
            console.log("==================================================");
            console.log("number in database: " + numInDb);
            console.log("number in web: " + numInWeb);
            console.log("selector: " + selector);
            console.log("url:" + doc[i].url);
            console.log("==================================================");
        }
    }
}

module.exports = new analyse();