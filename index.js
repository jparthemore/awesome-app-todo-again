const express = require('express');
const server = express();
const port = 8080;

server.use(express.static(__dirname + '/public'));
server.get('/',(req,resp)=>{
  resp.sendFile('public/html/index.html',{root:__dirname});
});

server.listen(port,()=>{
  console.log('now listening on port',port);
});
