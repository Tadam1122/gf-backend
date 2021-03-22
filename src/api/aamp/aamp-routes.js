import express from 'express'
const router = express.Router()
import * as controller from './aamp-controller'

//get all acoustic amps
router.get('/acoustic-amps', controller.index)

//get single acoustic amp by id
router.get('/acoustic-amps/:id', controller.show)

export default router
