export interface Creator {
  _id: string
  email: string
  username: string
  image: string
}


export interface IPrompt {
  _id: string
  creator: Creator
  prompt: string
  tag: string
}