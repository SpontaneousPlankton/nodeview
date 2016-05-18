import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
  name: String,
  id: Number,
  encryptedToken: String,
  email: String,
  githubID: String,
}));

