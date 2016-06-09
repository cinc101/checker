/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';
const myUtil = require('./myUtil');
const analyse = require('./analyse');
const cheerio = require('cheerio');

myUtil.get('http://www.jd.hk/', function(html, statusCode) {
    if (statusCode == 200) {
        let domObj = cheerio.load(html);
        analyse.doAnalyse(domObj);
    } else {
        console.log(statusCode);
    }
});
