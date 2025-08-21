const express = require('express')
const router = express.Router();

const {handleGetAllUsers , handleGetUserbyID ,handleUpdateUserbyID , handleDeleteUserbyID ,handleCreateNewUser } = require('../controllers/user')

// routes
// router.get('/', async (req, res) => {
//     const allDBUsers = await User.find({})


//     const html = `
//         <ul>
//             ${allDBUsers
//             .map((user) => `<li> ${user.first_name} </li>`).join("")}
//         </ul>
//     `;
//     res.send(html)
// })


// Routes


/*    ``````request for same paths done separately``````


// Dynamic path parameters
router.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user)
})



// ***PATCH /api/users   =>   update an existing user ***
router.patch('/api/users/:id', (req, res) => {
    //TODO : update an user with id
    return res.json({ status: "pending" })
})


// ***DELETE /api/users   =>   delete an existing user ***
router.delete('/api/users/:id', (req, res) => {
    //TODO : delete an user with id
    return res.json({ status: "pending" })
})


*/


// ***GET /api/users   =>   get all users [JSON]

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)



router
    .route('/:id')
    .get(handleGetUserbyID)
    .patch(handleUpdateUserbyID)
    .delete(handleDeleteUserbyID)

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
    



// ***POST /api/users   =>   create new users [JSON]***



module.exports = router;

