import express from 'express'
const router = express.Router()
import * as controller from './auth-controller'

router.post('/auth', controller.index)

router.get('/auth/:token', controller.verify)

router.put('/auth', controller.resend)

export default router
