import express from 'express'
const router = express.Router()

import * as controller from './user-controller'

//update user
router.put('/username', controller.updateName)

router.put('/useremail', controller.updateEmail)

export default router
