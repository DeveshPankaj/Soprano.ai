import {Router} from 'express'
import * as user from '../controller/user.controller'
import upload from '../util/upload-helper'
import jwt from '../util/jwt'

const router = Router()
const uploadAvatar = upload.single('avatar')

router.post('/signup', jwt.loginRequireMiddleware(), uploadAvatar, user.Signup)
router.post('/login', user.Login)
router.get('/profile', jwt.loginRequireMiddleware(), user.Profile)

export default router
