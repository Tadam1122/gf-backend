import express from 'express'
const router = express.Router()
import * as controller from './wishlist-controller'

//update wishlist
router.put('/wishlist', controller.update)

export default router
