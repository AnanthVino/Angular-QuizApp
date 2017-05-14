var express=require('express'),
app=express(),
http=require('http'),
bodyParser = require('body-parser'),
server=http.createServer(app);

app.use(express.static(__dirname+'/public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/',function(req,res){
  res.sendfile('views/index.html')
})


server.listen(8080,function () {
    console.log('Server started on port 8080');
 });
