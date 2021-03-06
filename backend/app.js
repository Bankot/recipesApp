const express = require("express")
const app = express()
const cors = require("cors")
const mainRouter = require("./router/mainRouter")
const errorHandlerMiddleware = require("./middleware/error-handler")

app.use(express.json())
app.use(cors())
app.use("/", mainRouter)

app.use(errorHandlerMiddleware)
app.listen(5000, console.log("listening on port 5000..."))
