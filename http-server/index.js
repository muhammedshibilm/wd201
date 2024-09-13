const http = require("http");
const fs = require("node:fs");
const argc = process.argv;

//port number
const port = parseInt(argc[3]);

let  regcontent="";
let  projectcontent="";
let homecontent="";

fs.readFile("registration.html",(err,data)=>{
    if(err) throw err;
    regcontent=data;
})

fs.readFile("project.html",(err,data)=>{
    if(err) throw err;
    projectcontent=data;
})

fs.readFile("home.html",(err,data)=>{
    if(err) throw err;
    homecontent=data;
})

http.createServer((req,res)=>{
    let url=req.url;
    res.writeHead(200,{"Content-Type":"text/html"})
    switch(url){
        case "/project":
            res.write(projectcontent)
            res.end();
            break;
        case "/registration":
            res.write(regcontent)
            res.end();
            break;
        case "/":
            res.write(homecontent)
            res.end();
            break;
        default:
            res.end("page is not found"); 
    } 
}).listen(port)