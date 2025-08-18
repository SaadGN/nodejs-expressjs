const http = require('http')

// const fs = require('fs')

// const url = require('url')

const express = require('express')
const app = express();

// create server 
//handling URLs
// function myhandler(req,res){
    
//     if (req.url === "/favicon.ico") return res.end();

//     const log = `${Date.now()} : ${req.url}  , ${req.method}  ,  new request recieved\n`

//     const myUrl = url.parse(req.url, true);
//     //  console.log(myUrl)

//     fs.appendFile('log.txt', log, (err, data) => {

//         switch (myUrl.pathname) {
//             case '/':
//                 res.end("HomePage")
//                 break;

//             case '/about':
//                 const username = myUrl.query.myname;
//                 res.end(`Hi from ,${username}`)
//                 break;

//             case '/signup':
//                 if (req.method === 'GET') {
//                     res.end('This is a signup form ')
//                 } else if (req.methond === 'POST') {
//                     //DB query
//                     req.end('Succes form submitted')
//                 }
//                 break;

//             default:
//                 res.end("404 Not Found")
//                 break;
//         }
// })
// }
// const myServer = http.createServer(app);

// myServer.listen(8000, () => console.log("Server Started!!!"))


app.get("/",(req,res) => {
    return res.end("Hello from HomePage"+ "\nHey " + req.query.name)
})
app.get("/about",(req,res) => {
    return res.end("Hello from about Page" + "\nHey " + req.query.name)
})

app.listen(8000 , ()=> console.log("Server Started!!!"))

