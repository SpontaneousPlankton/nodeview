import mongoose from 'mongoose';
<<<<<<< HEAD
=======
import relationship from 'mongoose-relationship';
>>>>>>> eec6392555610177ed56504866439e29e99d71c7

const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
  name: String,
  id: Number,
  encryptedToken: String,
  email: String,
  githubID: String,
}));

