import { User } from "../models/user.model"
import * as path from 'path'

const Download = (req: Request|{user:User}|any, res: Response) => {
    console.log(req.params)

    // @ts-ignore
    res.download(path.join('./upload', req.params.media))
}


export default Download