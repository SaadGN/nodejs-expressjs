const http = require('http')

const fs = require('fs')


const myServer = http.createServer((req, res) => {

    let log = `${Date.now()} : ${req.url} :  new requewst recieved\n`

    fs.appendFile('log.txt', log, (err, data) => {
        switch(req.url){
            case '/' : res.end("HomePage")
            break;
            case '/about' : res.end("HTTP SERVER using nodejs")
            break;
            default:
                res.end("Hello from Server windows")
                break;
        }
    });

});


myServer.listen(8000, () => console.log("Server started"))
