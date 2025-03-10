import { Schema, model, models } from 'mongoose'

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: [true, 'Username is required!'],
  },
  image: {
    type: String,
  },
})

//in NextJs, there is no need to define the model every single time
//like how it works in Express.
//So, first check if the model already exists in the models object.
//If it does, use that. Otherwise, create a new model.
// this prevents it from being redefined every single time when the particular route gets called.

const User = models.User || model('User', UserSchema)

export default User
