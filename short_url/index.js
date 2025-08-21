const express = require('express')

const path = require("path")

const { connectToMongoDB } = require('./connect')

const staticRoute = require('./routes/staticRouter')

const urlRoute = require('./routes/url');


const URL = require("./models/url")

const app = express()

const PORT = 8001

connectToMongoDB('mongodb+srv://saadgn789:Y7wlOfYGEMT08t81@task2.oatn6bb.mongodb.net/')
    .then(() => console.log("MongoDB connected"))

app.set("view engine","ejs")

app.set("views",path.resolve('./views') )

app.use(express.json())
app.use(express.urlencoded({extended : false    }))
// app.get('/test', async (req,res) => {
//     const allUrls = await URL.find({});
//     return res.render("home",{
//         urls : allUrls
//     })
// })

app.use("/url", urlRoute)

app.use("/",staticRoute)

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()  },
            },
        },
       { new: true } // return updated doc);
    );
     if (!entry) {
        return res.status(404).json({ error: "Short URL not found" });
    }
    res.redirect(entry.redirectURL)
});

app.listen(PORT, () => console.log("Server started at PORT 8001"))

