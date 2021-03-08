import express from 'express'
const router = express.Router()
import * as controller from './pedal-controller'

//get all pedals
router.get('/pedal', controller.index)

//get single pedal by id
router.get('/pedal/:id', controller.show)

export default router
