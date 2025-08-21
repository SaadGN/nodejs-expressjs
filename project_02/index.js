const express = require('express')

const users = require('./MOCK_DATA.json')

const fs = require('fs')

const app = express()
const port = 8000

const mongoose = require('mongoose')

//connection
mongoose.connect('mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1')
// mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1
.then(()=> {
    console.log("MongoDB Connected")
})
.catch((err)=> {
    console.log("Err: ",err)
})


// Schema
const userSchema = new mongoose.Schema({
    first_name: { 
        type: String, required: true
     },
    last_name: {
         type: String 
        },
    email: { 
        type: String, required: true, unique: true
     },
    gender: { 
        type: String 
    }
});

// Model
const User = mongoose.model('User', userSchema);

//MiddleWare
app.use(express.urlencoded({ extended:false }));

// render html request
app.get('/users', (req, res) => {
    const html = `
        <ul>
            ${users.map((users) => `<li> ${users.first_name} </li>`).join("")}
        </ul>
    `;
    res.send(html)
})


    // Routes


/*    ``````request for same paths done separately``````


// Dynamic path parameters
app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user)
})



// ***PATCH /api/users   =>   update an existing user ***
app.patch('/api/users/:id', (req, res) => {
    //TODO : update an user with id
    return res.json({ status: "pending" })
})


// ***DELETE /api/users   =>   delete an existing user ***
app.delete('/api/users/:id', (req, res) => {
    //TODO : delete an user with id
    return res.json({ status: "pending" })
})


*/


// ***GET /api/users   =>   get all users [JSON]

app.get('/api/users', (req, res) => {
    return res.json(users);
})



app
    .route('/api/users/:id')
    .get((req, res) => {
        const id = Number(req.params.id);
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .patch((req, res) => {
        //TODO : update an user with id
        return res.json({ status: "pending" })
    })
    .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    // Remove user from array
    users.splice(index, 1);

    // Update the JSON file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to delete user" });
        }
        return res.json({ status: "success", id });
    });
})



// ***POST /api/users   =>   create new users [JSON]***
app.post('/api/users', (req, res) => {
    const body = req.body;

    users.push({ id: users.length + 1, ...body });

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        if (err) {
            return res.status(500).json({ status: "Error", message: "Failed to save user" });
        }
        return res.status(201).json({ status: "Success", id: users.length });
    });
});


app.listen(port, () => console.log('Project Server Started!!!'))