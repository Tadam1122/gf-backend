import express from 'express'
const router = express.Router()
import * as controller from './eguitar-controller'

//get all electric guitars
router.get('/eguitar', controller.index)

//get single electric guitar by id
router.get('/eguitar/:id', controller.show)

export default router
