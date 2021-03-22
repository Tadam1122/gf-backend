import express from 'express'
const router = express.Router()
import * as controller from './eguitar-controller'

//get all electric guitars
router.get('/electric-guitars', controller.index)

//get single electric guitar by id
router.get('/electric-guitars/:id', controller.show)

export default router
