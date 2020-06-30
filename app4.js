var express = require('express');
var http = require('http');

var app = express();


app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next){
    console.log('첫번째 미들웨어 호출됨');
    req.user = 'mike'; 
    next();
});

//res.send() 메서드는 res.writeHead()를 쓰지 않고 바로 응답을 보낼수 있다.
//res.send()메서드는 자바스크립트 객체를 보낼수도 있다.
//객체를 보내는것은 res.writeHead(), res.write(),res.end()메서드도 가능하다.
//JSON.stringify()를 이용하면 좀더 안전하게 데이터를 보낼수 있다. 왜냐하면 자바스크립트 객체를 json으로 명시적으로 변경해서 보낼수 있기 때문이다.
//JSON.parse()를 이용하면 json을 다시 자바스크립트 객체로 변경할수 있다.
app.use(function(req,res,next){
    console.log('두번째 미들웨어 호출됨');
    //res.send('<h1>서버에서 응답한 결과입니다. : '+req.user+'</h1>');
    var person = {name:"소녀시대",age:20};
    //res.send(person);
    
    var personStr = JSON.stringify(person);
    //res.send(personStr);
    res.writeHead(200,{"Content-Type":"application/json;charset=utf8"});
    res.write(personStr);
    res.end();
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스로 웹서버를 실행함 : '+ app.get('port'));
});
