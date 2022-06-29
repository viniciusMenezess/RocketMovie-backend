const { Router } = require('express')

const routes = Router()

const userRoutes = require("./users.routes")
const notesRoutes = require("./notes.routes")
const tagsRoutes = require("./tags.routes")
const sessionRoutes = require("./sessions.routes")

routes.use("/users", userRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags",tagsRoutes)
routes.use("/sessions",sessionRoutes)

module.exports = routes