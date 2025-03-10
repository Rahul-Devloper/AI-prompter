import { Schema, model, models } from 'mongoose'

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId, // Reference to another document in MongoDB
    ref: 'User', // Refers to the 'User' model
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
})

const Prompt = models.Prompt || model('Prompt', PromptSchema)

export default Prompt
