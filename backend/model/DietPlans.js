import { Schema, model } from 'mongoose';

const dietPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  
  },
  calories: {
    type: String,
    required: true,
  },
  carbs: {
    type: String,
    required: true,
  },
  protein: {
    type: String,
    required: true,
  },
  fats: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default model('DietPlans', dietPlanSchema);
