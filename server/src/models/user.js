import mongoose from 'mongoose';
<<<<<<< HEAD
import relationship from 'mongoose-relationship';

=======
>>>>>>> 93550b124c10db3adbfa030c98326717a318d5f7
const Schema = mongoose.Schema;

export default mongoose.model('User', new Schema({
  name: String,
  id: Number,
  encryptedToken: String,
  email: String,
  githubID: String,
}));

