const express = require('express')
const { selectAllProfiles, selectByIdProfiles, insertProfiles, updateProfiles, deleteProfiles } = require('../controller')
const { insertProfileSchema } = require('../../validations/insertValidation')
const { updateProfileSchema } = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProfilesRouter = express.Router();

ProfilesRouter
    .get('/profiles', selectAllProfiles)
    .get('/profiles/:id', selectByIdProfiles)
    .post('/profiles', validation(insertProfileSchema), insertProfiles)
    .patch('/profiles/:id', validation(updateProfileSchema), updateProfiles)
    .delete('/profiles/:id', deleteProfiles)

module.exports = ProfilesRouter