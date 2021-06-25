
import {Router} from 'express'
import * as posts from '../controller/posts.controller'
import upload from '../util/upload-helper'
import jwt from '../util/jwt'
import Download from '../controller/download.controller'

const router = Router()

const uploadAvatar = upload.single('avatar')

router.get('/posts', jwt.loginRequireMiddleware(), posts.GetPosts)
router.put('/posts', jwt.loginRequireMiddleware(), uploadAvatar, posts.CreatePost)
router.get('/posts/:id', jwt.loginRequireMiddleware(), posts.GetPostById)
router.patch('/posts/:id', jwt.loginRequireMiddleware(), uploadAvatar, posts.UpdatePost)
router.delete('/posts/:id', jwt.loginRequireMiddleware(), posts.DeletePost)


router.get('/search', posts.SearchPostByLocation)
router.get('/download/:media', Download as any) // download image (all users are allowed to download images from other images)

export default router
