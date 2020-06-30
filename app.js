var express = require('express');
var http=require('http');

var app = express();

//익스프레스 모듈의 포트지정방법. 프로세스 환경의 포트가 있으면 그 포트로, 없으면 3000번으로 지정하고 있다.
app.set('port', process.env.PORT || 3000);

//바로 전 수업내용인 ch05_test2.js 에서는 createServer와 listen을 두번에 나누어 처리했지만 여기서는 한번에 처리하고 있다.
//createServer의 매개변수로 express를 넣어주면 express로 서버를 만들겠따는 의미이다.
//app.get을 하면 app의 속성을 불러올수 있다. 여기서는 port속성을 불러주어 해당 port를 클라이언트로부터 listen하고 있디(요청을 받을수 있도록 대기).
//listen이 실행되었다면 express서버가 만들어졌다는 의미도 포함되므로 callback함수로 익스프레스 웹서버가 실행되었다는 로그를 찍어주었다. 
var server = http.createServer(app).listen(app.get('port'),function(){
    
   console.log('익스프레스로 웹 서버를 실행함 : '+ app.get('port'));
});