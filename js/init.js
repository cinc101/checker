/**
 * Created by cdchenjia on 2016/6/6.
 */
'use strict';
const Config = require('./Config/Config');
const util = require('./unit/util');
const analyse = require('./unit/analyse');
const LocalData = require('./unit/localData');
const ptmFn = require('./phantomjs/ptmFn');
const cheerio = require('cheerio');

let url = Config.urls[0];

let checker = {
    init: function(option) {
        let self = this;
        //初始化本地临时数据
        LocalData.selectorData = [];

        // self.getHtml(option.firstFetch);
        self.getPtmHtml(option.firstFetch);
    },
    getHtml: function(firstFetch = false) {
        util.get(url, function(html, statusCode) {
            if (statusCode == 200) {
                let domObj = cheerio.load(html);
                if(firstFetch) {
                    //第一次抓取参照数据存放在数据库
                    analyse.doAnalyse(domObj, url);
                } else {
                    //和参照数据作对比
                    analyse.contrast(domObj, url);
                }
            } else {
                console.log(statusCode);
            }
        });
    },
    getPtmHtml: function (firstFetch = false) {
        ptmFn.getDom(url).then(function(html) {
            let domObj = cheerio.load(html);
            if(firstFetch) {
                //第一次抓取参照数据存放在数据库
                analyse.doAnalyse(domObj, url);
            } else {
                //和参照数据作对比
                analyse.contrast(domObj, url);
            }
        });
    }
};

checker.init({
    "firstFetch": false
});
