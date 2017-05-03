// 这句的意思就是引入 `express` 模块，并将它赋予 `express` 这个变量等待使用。
var express = require('express');
var superagent = require('superagent');
var ep = require('eventproxy');
var cheerio = require('cheerio');
var url = require('url');

// 调用 express 实例，它是一个函数，不带参数调用时，会返回一个 express 实例，将这个变量赋予 app 变量
var app = express();

var cnodeurl = 'https://cnodejs.org/';
app.get('/', function (req, res, next) {
    superagent.get(cnodeurl)
    .end(function(err, result){
        if (err) {
            return console.log(err);
        };

        var topicUrls = [];
        var $ = cheerio.load(result.text);
        
        $('#topic_list .topic_title').each(function(ids, el){
           
            var $el = $(el);
            var href = url.resolve(cnodeurl, $el.attr('href'));
            topicUrls.push(href);
        })

        res.send(topicUrls);
    })
});

app.listen(3000, function () {
    console.log('app is listening at port 3000');
});