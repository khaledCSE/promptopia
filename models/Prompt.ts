import { Document, Schema, model, models } from "mongoose";

interface IPromptDocument extends Document {
  prompt: string
  tag: string
  creator?: Schema.Types.ObjectId | string
}

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required'],
  },
})

const Prompt = models.Prompt || model<IPromptDocument>("Prompt", PromptSchema);

export default Prompt;