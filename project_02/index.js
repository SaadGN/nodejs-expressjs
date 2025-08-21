const express = require('express')

// const users = require('./MOCK_DATA.json')

const fs = require('fs')

const app = express()
const port = 8000

const mongoose = require('mongoose')
const { timeStamp } = require('console')

//connection
mongoose.connect('mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1')
    // mongodb+srv://test:%23pakistan123@project1.78ta2fh.mongodb.net/project1
    .then(() => {
        console.log("MongoDB Connected")
    })
    .catch((err) => {
        console.log("Err: ", err)
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
}, { timestamps: true });

// Model
const User = mongoose.model('User', userSchema);

//MiddleWare
app.use(express.urlencoded({ extended: false }));





// render html request
app.get('/users', async (req, res) => {
    const allDBUsers = await User.find({})


    const html = `
        <ul>
            ${allDBUsers
            .map((user) => `<li> ${user.first_name} </li>`).join("")}
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

app.get('/api/users', async (req, res) => {
    const allDBUsers = await User.find({})
    // res.setHeaders("X-MyName, expressJS"); // custom header
    return res.json(allDBUsers);
})



app
    .route('/api/users/:id')
    .get(async (req, res) => {
        // const id = Number(req.params.id);
        // const user = users.find((user) => user.id === id)
        const user = await User.findById(req.params.id)
        return res.json(user)
    })
    .patch(async (req, res) => {
        //TODO : update an user with id
        await User.findByIdAndUpdate(req.params.id, {
            last_name: "changed"
        })

        return res.json({ status: "success" })
    })
    .delete(async (req, res) => {


        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "success" });

        // const id = Number(req.params.id);
        // const index = users.findIndex((user) => user.id === id);

        // if (index === -1) {
        //     return res.status(404).json({ error: "User not found" });
        // }

        // // Remove user from array
        // users.splice(index, 1);

        // // Update the JSON file
        // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
        //     if (err) {
        //         return res.status(500).json({ error: "Failed to delete user" });
        //     }
        //     return res.json({ status: "success", id });
        // });
    })



// ***POST /api/users   =>   create new users [JSON]***
app.post('/api/users', async (req, res) => {
    const body = req.body;
    if (
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender
    ) {
        return res.status(400).json({ msg: "ALl fields are required" })
    }

    // users.push({ id: users.length + 1, ...body });

    // fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
    //     if (err) {
    //         return res.status(500).json({ status: "Error", message: "Failed to save user" });
    //     }
    //     return res.status(201).json({ status: "Success", id: users.length });
    // });
    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender
    })
    // console.log("result",result)
    return res.status(201).json({ msg: "success" })
});


app.listen(port, () => console.log('Project Server Started!!!'))