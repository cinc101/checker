/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';

let myUtil = function () {
};

const http = require('http');
const request = require('request');

myUtil.prototype.get = function (url, callback) {
    request(url, function (error, response, body) {
        if (!error) {
            callback(body, response.statusCode);
        } else {
            console.log(error);
        }
    });
};

myUtil.prototype.getLocation = function (selectorStr, $obj) {
    return getAllSelector(selectorStr, $obj);
};

function getAllSelector(selectorStr, $obj) {
    if($obj.name == "body") {
        selectorStr += " " + "body";
        return changeOrder(selectorStr);
    } else {
        let key = getKey($obj);
        selectorStr += " " + key;
        return getAllSelector(selectorStr, $obj.parent);
    }
}

function getKey($obj) {
    let selector = "";

    if($obj.attribs["id"]) {
        selector = "#" + $obj.attribs["id"];
    } else if($obj.attribs["class"]) {
        let className = $obj.attribs["class"];
        let classArray = className.split(" ");
        selector = "." + classArray[0];
    } else {
        selector = $obj.name;
    }

    return selector;
}

function changeOrder(str) {
    let strArray = str.split(" ");
    strArray = strArray.reverse();
    return strArray.join(" ");
}

module.exports = new myUtil();