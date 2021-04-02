import express from 'express'
const router = express.Router()
import * as controller from './search-controller'

//search products given a query
router.get('/search/:query', controller.show)

export default router
