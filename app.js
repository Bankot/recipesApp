const express = require("express")
const app = express()
const mainRouter = require("./router/mainRouter")

app.use(express.json())

app.use("/", mainRouter)

app.listen(5000, console.log("listening on port 5000..."))
