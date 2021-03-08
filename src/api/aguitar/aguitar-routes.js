import express from 'express'
const router = express.Router()
import * as controller from './aguitar-controller'

//get all acoustic guitars
router.get('/aguitar', controller.index)

//get single acoustic guitar by id
router.get('/aguitar/:id', controller.show)

export default router
