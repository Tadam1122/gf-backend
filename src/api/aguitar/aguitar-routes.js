import express from 'express'
const router = express.Router()
import * as controller from './aguitar-controller'

//get all acoustic guitars
router.get('/acoustic-guitars', controller.index)

//get single acoustic guitar by id
router.get('/acoustic-guitars/:id', controller.show)

export default router
