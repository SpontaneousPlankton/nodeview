import mongoose from 'mongoose';
import User from '../models/user.js';

const Schema = mongoose.Schema;

const configSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User' },
  data: {
    serverType: String,
    appName: String,
    serverSettings: {
      port: String,
    },
    routers: [{
      id: String,
      startPoint: String,
      endpoints: [{}],
      name: String,
    }],
  },
});

configSchema.pre('save', (next) => {
  next();
});

export default mongoose.model('Config', configSchema);

