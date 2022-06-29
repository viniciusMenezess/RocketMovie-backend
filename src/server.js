require("express-async-errors")
require("dotenv/config")

const migrationsRun = require("./database/sqlite/migrations")
const uploadConfig = require("./configs/uploads")
const AppError = require("./utils/AppError")

const cors = require("cors")
const express = require('express');
const routes = require("./routes")


migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error,request,response,next) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.log(error)

  return response.status(500).json({
    status:"error",
    message: "Internal Server Error"
  })
})

const PORT = process.env.SERVER_PORT || 3000
app.listen(PORT, () => console.log(`This server is running at http://localhost:${PORT}`))