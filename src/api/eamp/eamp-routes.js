import express from 'express'
const router = express.Router()
import * as controller from './eamp-controller'

//get all electric amps
router.get('/electric-amps', controller.index)

//get single electric amp by id
router.get('/electric-amps/:id', controller.show)

export default router
