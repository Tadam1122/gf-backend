import express from 'express'
const router = express.Router()
import * as controller from './eamp-controller'

//get all electric amps
router.get('/eamp', controller.index)

//get single electric amp by id
router.get('/eamp/:id', controller.show)

export default router
