const express = require('express')
const { selectAllProfiles, selectByIdProfiles, insertProfiles, updateProfiles, deleteProfiles } = require('../controller')
const {insertProfileSchema} = require('../../validations/insertValidation')
const {updateProfileSchema} = require('../../validations/updateValidation')
const { validation } = require('../../middlewares/validationMiddleware')

const ProfilesRouter = express.Router();

ProfilesRouter.get('/profiles', selectAllProfiles)

ProfilesRouter.get('/profiles/:id', selectByIdProfiles)

ProfilesRouter.post('/profiles', validation(insertProfileSchema), insertProfiles)

ProfilesRouter.patch('/profiles/:id', validation(updateProfileSchema), updateProfiles)

ProfilesRouter.delete('/profiles/:id', deleteProfiles)

module.exports = ProfilesRouter