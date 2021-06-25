import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'
// const bcrypt = require("bcrypt")

// function setPassword(value) {
//   return bcrypt.hashSync(value, 10)
// }
export interface User {
    _id?: string
    first_name: string
    last_name: string
    email: string
    password: string
    avatar?: string
}

export const userSchema = new mongoose.Schema<User>({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // set: setPassword
  },
  avatar: {
      type: String,
      required: true
  }
})


userSchema.plugin(uniqueValidator)

export default mongoose.model('User', userSchema)