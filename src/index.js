const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")
const route = require("./routes/route")
const app = express()

app.use(bodyparser.json())


mongoose.connect("mongodb+srv://BiswajitSwain:EtERzBKu3NLVQlzp@cluster0.xf1eq.mongodb.net/assessment",
    { usenewUrlParser: true })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log(err.message))

app.use("/", route)

app.listen(3001, () => {
    console.log("Express is running on port " + 3001)
})