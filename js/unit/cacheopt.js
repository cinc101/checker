/**
 * Created by cdchenjia on 2016/6/12.
 */
'use strict';
const LocalData = require('./localData');

let cacheOpt = function() {
};

cacheOpt.prototype.insert = function(keyword, url) {
    let newObj = {
        "name": keyword,
        "url": url,
        "count": 1
    };
    try {
        LocalData.selectorData.push(newObj);
    } catch(error) {
        console.log(error);
    }
};

cacheOpt.prototype.update = function(position) {
    try {
        let thisObj = LocalData.selectorData[position];
        thisObj.count += 1;
    } catch(error) {
        console.log(error);
    }
};

cacheOpt.prototype.find = function(keyword, callback) {
    let position = 0,
        isExisted = false;

    for(let i=0; i<LocalData.selectorData.length; i++) {
        if(LocalData.selectorData[i].name && LocalData.selectorData[i].name === keyword) {
            position = i;
            isExisted = true;
            break;
        }
    }

    if(typeof callback === "function") {
        callback(isExisted, position);
    }
};

module.exports = new cacheOpt();