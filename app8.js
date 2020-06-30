var http = require('http');
var static = require('serve-static');
var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.set('port', process.env.PORT || 3000);

app.use('/public',static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



//미들웨어로 하는것이 응답을 보내주는것이다 라고 하면 route함수가 각 요청에 따라 다른 응답을 보낼수 있으므로 route함수를 쓴다.
/*app.use(function(req,res,next){
    console.log(' 미들웨어 호출');
    var userAgent = req.header('user-agent');
    
    var paramId = req.body.id || req.query.id;
    
    res.send(userAgent + paramId);
});*/

//express가 갖고있는 Router()함수
var router = express.Router();

//process/login 으로 post요청이 들어오면 아래와 같은 응답을 보내준다. 
router.route("/process/login").post(function(req,res){
    console.log('/process/login 라우팅 함수에서 받음');
    
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    
    res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
    res.write("<h1>서버에서 로그인 응답</h1>");
    res.write("<div><p>"+paramId+"</p></div>");
    res.write("<div><p>"+paramPassword+"</p></div>");
    res.end();
});


//route함수를 쓰고나서는 항상 app.use('/',router);를 써야한다.
app.use('/',router);

//모든 요청에 대해서 처리할때는 all이라는 함수를 쓴다.
app.all('*', function(req,res){
    res.status(404).send('<h1>요청하신 페이지는 없습니다.</h1>')
});
 
var server = http.createServer(app).listen(app.get('port'),function(){
    console.log('익스프레스로 웹서버 실행' + app.get('port'));
    
});