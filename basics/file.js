console.log('************************************')
console.log('           File Handling')
console.log('************************************')

const fs = require('fs')


//******************* write a file ****************** */
fs.writeFileSync('./text.txt' ,"This is a text (.txt) file")

fs.appendFileSync('./text.txt', '\n appendFileSync : this is the new line')

// fs.writeFileSync('./text.txt' ,"This is a text (.txt) file" ,(err) => {console.log("error")})


console.log("\n************Read File :************ \n")
console.log(fs.readFileSync("./text.txt" , "utf-8") );

// fs.readFile("./text.txt" , "utf-8" , (err , res) => {
//     if(err){
//         console.log("Error")
//     } else {
//         console.log("res : ",res)
//     }
// })


//***************************** copy a file***********************

console.log("\n************Copy File :************ \n")

fs.cpSync('./text.txt' , "newText.txt")
console.log("newText.txt : ")
console.log(fs.readFileSync("newText.txt" , "utf-8") );


 // delete file 
  fs.unlinkSync( "newText.txt")
  fs.unlinkSync( "text.txt")

  console.log("\n \nStatus of text.txt : ")
console.log(fs.statSync("text.txt") );

//********************* Make a folder ***************** */

// fs.mkdirSync("New-folder")