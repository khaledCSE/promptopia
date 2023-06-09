import mongoose from "mongoose"

let isConnected = false

export const connectDB = async () => {
  mongoose.set('strict', true)

  if (isConnected) {
    console.log('MongoDB already connected');
    return
  }

  try {
    await mongoose.connect(String(process.env.MONGODB_URI), {
      dbName: 'promptopia',
    })
    isConnected = true
    console.log('DB Connected');

  } catch (err: any) {
    console.error(err);
  }
}