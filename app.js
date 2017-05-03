var express = require('express');
var utility = require('utility');
var superagent = require('superagent');
var cheerio = require('cheerio');

var app = express();

app.get('/index', function (req, res, next) {
    superagent.get('https://cnodejs.org/')
    .end(function(err, sres){
        //异常处理
        if (err) {
            return next(err);
        };

        // 拿到网页内容存为$
        var $ = cheerio.load(sres.text);

        var items = [];
        $('#topic_list .topic_title').each(function(idx, element){
            var $element = $(element);
            items.push({
                title: $element.attr('title'),
                href: $element.attr('href')
            })
        })

        $('#topic_list .user_avatar img').each(function(idx, element){
            var $element = $(element);

            for (var i = 0; i < items.length; i++) {
                items[i].author = $element.attr('title')
            };
            
        })

        res.send(items);
    })
})

app.listen(3000, function(){
    console.log('listen port 3000');
})