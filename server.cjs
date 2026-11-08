const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const files={'/':'index.html','/index.html':'index.html','/app.js':'app.js','/pdf.js':'pdf.js','/style.css':'style.css'};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8'};
http.createServer((req,res)=>{const file=files[req.url.split('?')[0]];if(!file){res.writeHead(404);res.end('Not found');return;}fs.readFile(path.join(__dirname,file),(err,data)=>{if(err){res.writeHead(500);res.end('Could not read app');return;}res.writeHead(200,{'Content-Type':types[path.extname(file)],'Cache-Control':'no-store'});res.end(data);});}).listen(8080,'127.0.0.1',()=>console.log('Paperlight is ready: http://localhost:8080\nPress Ctrl+C to stop.'));
