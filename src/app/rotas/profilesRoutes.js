const express = require('express')
const ProfilesController = require('../controller/ProfilesController')
const { insertProfileSchema } = require('../../validations/insertValidation')
const { updateProfileSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProfilesRouter = express.Router();

ProfilesRouter
    .get('/profiles', ProfilesController.selectAllProfiles)
    .get('/profiles/:id', ProfilesController.selectByIdProfiles)
    .post('/profiles', validation(insertProfileSchema), ProfilesController.insertProfiles)
    .patch('/profiles/:id', validation(updateProfileSchema), ProfilesController.updateProfiles)
    .delete('/profiles/:id', ProfilesController.deleteProfiles)

module.exports = ProfilesRouter