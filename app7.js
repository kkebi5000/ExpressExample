var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var path = require('path');
var static = require('serve-static');

var app = express();


app.set('port', process.env.PORT || 3000);

//미들웨어를 만드는데 우리가 만드는것이 아니라 미리 만들어진 함수를 이용한다.(serve-static) __dirname은 현재 파일의 디렉토리 경로를 뜻한다. path.join()함수를 이용하면 경로를 이어주는 역할을 한다.아래 path.join(__dirname,'public')의 결과는  C:\reactNative\nodejs\ExpressExample\public이다. 아래와 같이 설정해 놓으면 localhost:3000/public/해당 사진명 으로 들어가면 사진을 볼 수 있다.앞의 파라미터를 없애면 localhost:3000/해당 사진명 으로 볼 수 있다.아래와 같은경우는 get방식
app.use('/public',static(path.join(__dirname,'public')));

//post방식. 내부적으로 파일에 접근할수 있도록 따로 코딩해야한다. post방식으로 요청하기위한 툴이 있는데 그중 하나가 postman이다.
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨');
    
   
    var userAgent =req.header('user-agent');
    
    //post로 파라미터가 넘어올지, get으로 넘어올지 모를땐 이렇게 한다.
    var paramId = req.body.id || req.query.id;
    
    res.send('<h3>서버에서 응답. User-Agent -> ' + userAgent + '</h3><h3>Param Id -> '+paramId+'</h3>');
});
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹서버를 실행함 : '+ app.get('port'));
});
