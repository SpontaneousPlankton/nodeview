import mongoose from 'mongoose';
import relationship from 'mongoose-relationship';
// import User from '../models/user.js';

const Schema = mongoose.Schema;
const configSchema = new Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', childPath: 'files' },
  data: String,
});

configSchema.plugin(relationship, { relationshipPathName: 'userID' });

export default mongoose.model('Config', configSchema);

