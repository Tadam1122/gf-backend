import express from 'express'
const router = express.Router()
import * as controller from './pedal-controller'

//get all pedals
router.get('/effect-pedals', controller.index)

//get single pedal by id
router.get('/effect-pedals/:id', controller.show)

export default router
