const User = require('../models/user')

async function handleGetAllUsers(req,res){
    const allDBUsers = await User.find({})
    // res.setHeaders("X-MyName, expressJS"); // custom header
    return res.json(allDBUsers);
}

async function handleGetUserbyID(req,res){
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id)
    const user = await User.findById(req.params.id)
    if(!user) return res.status(404).json({error : "user not found "})
    return res.json(user)
}
async function handleUpdateUserbyID(req,res){
        //TODO : update an user with id
        await User.findByIdAndUpdate( req.params.id, { last_name: "changed" } )
        return res.json({status : "success"});
}

async function handleDeleteUserbyID(req,res){

        await User.findByIdAndDelete(req.params.id)
        return res.json({ status: "success" });     
}

async function handleCreateNewUser(req,res){
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
    return res.status(201).json({ msg: "success" , id: result._id});

}

module.exports = {
    handleGetAllUsers,
    handleGetUserbyID,
    handleUpdateUserbyID,
    handleDeleteUserbyID,
    handleCreateNewUser
}