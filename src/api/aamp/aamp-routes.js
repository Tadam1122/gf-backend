import express from 'express'
const router = express.Router()
import * as controller from './aamp-controller'

//get all acoustic amps
router.get('/aamp', controller.index)

//get single acoustic amp by id
router.get('/aamp/:id', controller.show)

export default router
