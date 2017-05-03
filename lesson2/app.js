var express = require('express');
var utility = require('utility');

var app = express();

app.get('/index', function (req, res) {
    var name = req.query.name;
    var md5name = utility.md5(name);
    res.send(name)
})

app.listen(3300, function(){
    console.log('listen port 3300');
})