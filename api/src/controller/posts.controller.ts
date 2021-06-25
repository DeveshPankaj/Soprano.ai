import {Request, Response} from "express"
import post, {Post} from '../models/posts.model'
import {User} from '../models/user.model'

import { File } from "../util/types"

export const GetPosts = (req: Request|{user:User}|any, res: Response) => {
    post.find({user_id: req.user._id}).then((result: any) => {
        res.json(result)
    }).catch((error: any) => {
        res.status(401).json(error)
    })
}

// Search is allowed for all user
export const SearchPostByLocation = (req: Request|{user:User}|any, res: Response) => {
    console.log(req.query)
    post.find({location: { $regex: '.*' + req.query.location + '.*' } }).then((result: any) => {
        res.json(result)
    }).catch((error: any) => {
        res.status(401).json(error)
    })
}


export const GetPostById = (req: Request|{user:User}|any, res: Response) => {
    post.findOne({user_id: req.user._id, _id: req.params.id}).then((result: any) => {
        if(!result){
            res.statusMessage = 'No Data'
            res.status(204).json({})
        }
        else res.json(result)
    }).catch((error: any) => {
        res.status(401).json(error)
    })
}


export const CreatePost = (req: Request|{user:User}|any, res: Response) => {
    const {filename, mimetype} = req.file as File
    const {title, location} = req.body
    const payload:Post = {
        user_id: req.user._id,
        media_type: mimetype,
        url: filename,
        title,
        location
    }
    post.create(payload).then(data => {
        res.json({data})
    }).catch(error => {
        res.status(401).json(error)
    })
    
}

export const UpdatePost = (req: Request|{user:User}|any, res: Response) => {
    const {filename, mimetype} = req.file || {} as File
    const {title, location} = req.body
    
    const payload:Post = {
        _id: req.params.id,
        user_id: req.user._id,
        media_type: mimetype,
        url: filename,
        title,
        location
    }

   
    post.findOne({ _id: req.params.id}).then((result: any) => {
        if(!result){
            res.statusMessage = 'No Data'
            res.status(204).json({})
        }
        else {
            if(result.user_id !== req.user._id) {
                return res.status(401).end()
            }

            payload.media_type = mimetype || payload.media_type
            payload.url = filename || payload.url

            post.updateOne(payload).then((data: any) => {
                res.json({data})
            }).catch((error: any) => {
                res.status(401).json(error)
            })
        }
    }).catch((error: any) => {
        res.status(401).json(error)
    })
}

export const DeletePost = (req: Request|{user:User}|any, res: Response) => {
    try {
        post.remove({
            _id: req.params.id, user_id: req.user._id
        }, (_err: any ) => {
            if(_err) res.status(500).send()
            else res.json({status: 'success'})
        })
    } catch (error) {
        res.status(500).send()
    }
}


// TODO:
// -- delete media file on post update or delete
// -- pagination