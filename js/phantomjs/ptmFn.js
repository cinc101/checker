/**
 * Created by cdchenjia on 2016/6/24.
 */
'use strict';

const phantom = require('phantom');

let ptm = function() {};

ptm.prototype.getDom = function(url) {
    let sitepage = "";
    let phInstance = null;
    return phantom.create()
        .then(instance => {
            phInstance = instance;
            return instance.createPage();
        })
        .then(page => {
            page.property("viewportSize", { width: 1300, height: 10000 });
            sitepage = page;
            return page.open(url);
        })
        .then(status => {
            console.log(status);
            let html = sitepage.evaluate(function() {
                window.scrollTo(0,10000);//滚动到底部
                return document.getElementsByTagName("html")[0].outerHTML;
            });
            phInstance.exit();
            return html;
        })
        .catch(error => {
            console.log(error);
            phInstance.exit();
        });
};

module.exports = new ptm();