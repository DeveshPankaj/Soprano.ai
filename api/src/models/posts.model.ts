import * as mongoose from 'mongoose'

export interface Post {
    _id?: string
    user_id: string
    media_type:	string
    url: string
    title: string
    location: string
}

export const postSchema = new mongoose.Schema<Post>({
    user_id: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    // set: setPassword
  },
  location: {
      type: String,
      required: true
  }
})


export default mongoose.model('Post', postSchema)