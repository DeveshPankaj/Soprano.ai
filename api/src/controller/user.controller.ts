import {Request, Response} from "express"
import user, {User} from '../models/user.model'
import * as md5 from 'md5'
import { File } from "../util/types"
import jwt from '../util/jwt'


export const Signup = (req: Request | any, res: Response) => {
    const {first_name, last_name, email, password} = req.body as User
    const {filename} = req.file as File
    const userData = {
        first_name,
        last_name,
        password: md5((password||"").toString()),
        email,
        avatar: filename
    }
    user.create(userData).then(result => {
        res.json({...userData, _id: result._id})
    }).catch(error => {
        res.status(400).json(error)
    })
}


export const Login = (req: Request, res: Response) => {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({error: {message: "Email Id and Password is required!"}})
    }

    user.findOne({email}, (error, data) => {

        if(!data) {
            return res.status(400).json({error: {message: "Invalid Email Id or password!"}})
        }


        if(md5(password) !== data.password) {
            return res.status(400).json({error: {message: "Invalid Email Id or password!"}})
        }


        let payload = {
            _id: data._id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar: data.avatar
        }

        var token = jwt.getTocken(payload)
        res.json({token})
    })
}

export const Profile = (req: Request | any, res: Response) => {
    const {email} = req.user
    user.findOne({email}, (error, data) => {

        if(!data) {
            return res.status(400).json({error: {message: "Account does not exist"}})
        }

        let payload = {
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            avatar: data.avatar
        }

        res.json(payload)
    })
}
