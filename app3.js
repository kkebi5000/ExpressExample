var express = require('express');
var http=require('http');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use(function(req,res,next){
    console.log('첫번째 미들웨어 호출됨');
    
    req.user = 'mike';
    
    //next()함수를 쓰면 미들웨어를 떠나게 되어 그다음 미들웨어가 요청을 받아서 처리가 됨
    next();
});

//두번째 미들웨어. 첫번째 미들웨어에서 지정한 req.user를 두번째 미들웨어에서 사용가능하다.
app.use(function(req,res,next){
    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
    res.end('<h1>서버에서 응답한 결과입니다. : ' +req.user+'</h1>');
});

var server = http.createServer(app).listen(app.get('port'),function(){
    
   console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});