import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
    required: false,
    default:""
  },
  role: {
    type: String,
    default: 'user'
  },
  blogs: [{ type: mongoose.Types.ObjectId, ref: "Blog" }],
  trainingPlans: [{ type: mongoose.Types.ObjectId, ref: "TrainingPlan", default: [] }],
  dietPlans: [{ type: mongoose.Types.ObjectId, ref: "DietPlan", default: [] }],
  
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("User", userSchema);
