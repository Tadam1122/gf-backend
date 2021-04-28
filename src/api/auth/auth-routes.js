import express from 'express'
const router = express.Router()
import * as controller from './auth-controller'

router.post('/auth', controller.index)

router.get('/confirm/:token', controller.verify)

router.post('/confirm', controller.resend)

export default router
