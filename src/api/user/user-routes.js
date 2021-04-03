import express from 'express'
const router = express.Router()

import * as controller from './user-controller'

//update user
router.put('/user', controller.update)

export default router
