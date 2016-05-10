import mongoose from 'mongoose';
// import relationship from 'mongoose-relationship';
// import User from '../models/user.js';

const Schema = mongoose.Schema;
const configSchema = new Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', childPath: 'githubID' },
  data: { type: String },
});

configSchema.pre('save', (next) => {
  next();
});
// configSchema.plugin(relationship, { relationshipPathName: 'user' });

export default mongoose.model('Config', configSchema);

