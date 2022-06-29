const { Router } = require('express')

const uploadConfig = require("../configs/uploads")
const multer = require("multer")

const UsersController = require("../controllers/UsersController")
const UserAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const userRoutes = Router()
const upload = multer(uploadConfig.MULTER)

userRoutes.post("/", usersController.create)
userRoutes.put("/", ensureAuthenticated, usersController.update)
userRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

module.exports = userRoutes
