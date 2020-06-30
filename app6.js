var express = require('express');
var http = require('http');
   
var app = express();


app.set('port', process.env.PORT || 3000);


app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨');
    
    //요청객체의 header정보중 user-agent정보를 뽑아낸다. 최근에는 mobile 등 요청객체의 플랫폼이 다양해지고 있어서 User-agent의 정보가 중요해지고 있다.
    var userAgent =req.header('User-agent');
    
    //ch04_test1.js에서는 url에 있는 정보를 가지고 query를 구분했지만 express를 이용하면 request객체에 있는 정보로 query구분이 가능하다. 이경우 query속성으로 name의 값을 가지는 것을 뽑아내고 있다.
    var paramName = req.query.name;
    
    res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3><h3>Param Name -> '+paramName+'</h3>');
});
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹서버를 실행함 : '+ app.get('port'));
});
