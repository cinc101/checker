/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';
const util = require('./util');
const analyse = require('./analyse');
const cheerio = require('cheerio');

let url = "http://www.jd.com";
util.get(url, function(html, statusCode) {
    if (statusCode == 200) {
        let domObj = cheerio.load(html);
        analyse.doAnalyse(domObj, url);
    } else {
        console.log(statusCode);
    }
});

