/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

let util = function () {
};

const request = require('request');
const Config = require('../Config/Config');

util.prototype.get = function (url, callback) {
    request(url, function (error, response, body) {
        if (!error) {
            callback(body, response.statusCode);
        } else {
            console.log(error);
        }
    });
};

util.prototype.getLocation = function (selectorStr, $obj) {
    return getAllSelector(selectorStr, $obj);
};

function getAllSelector(selectorStr, $obj) {
    if($obj.name == "body") {
        selectorStr += ">" + "body";
        return changeOrder(selectorStr);
    } else {
        let key = getKey($obj);
        selectorStr += ">" + key;
        return getAllSelector(selectorStr, $obj.parent);
    }
}

function getKey($obj) {
    let selector = "";

    if($obj.attribs["id"]) {
        selector = "#" + $obj.attribs["id"];
    } else {
        if($obj.attribs["class"]) {
            let className = $obj.attribs["class"];
            let classArray = className.split(" ");

            for(let i=0; i<classArray.length; i++) {
                let isExisted = false;
                for(let j=0; j<Config.class_white_list.length; j++) {
                    if(classArray[i].indexOf(Config.class_white_list[j]) > -1) {
                        isExisted = true;
                        break;
                    }
                }
                if(!isExisted) {
                    selector = "." + replaceChar(classArray[i]);
                }
            }

            if(selector == "." || selector == "") {
                selector = $obj.name;
            }
        } else {
            selector = $obj.name;
        }
    }

    return selector;
}

function changeOrder(str) {
    let strArray = str.split(">");
    strArray = strArray.reverse();
    let tmp = strArray.join(">");
    return tmp.substring(tmp, tmp.length-1);
}

/**
 * 将/t,/n等特殊符号替换为""
 * @param str
 * @returns {void|string|XML|*}
 */
function replaceChar(str) {
    str = str.replace(/[\s]/g, "");
    return str;
}

module.exports = new util();