import DietPlans from "../model/DietPlans";
import User from "../model/User";
import mongoose from "mongoose";

export const addDietPlan = async (req, res) => {
  const {
    name,
    description,
    image,
    calories,
    carbs,
    protein,
    fats,
    user,
  } = req.body;

  try {
    const newDietPlan = new DietPlans({
      name,
      description,
      image,
      calories,
      carbs,
      protein,
      fats,
      user,
    });

    const session = await mongoose.startSession();

    session.startTransaction();
    await newDietPlan.save({ session });
    const existingUser = await User.findById(user).session(session);

    if (!existingUser) {

      await session.abortTransaction();
      session.endSession();
      throw new Error("Unable to find user by this ID");

    }

    existingUser.dietPlans.push(newDietPlan);
    await existingUser.save({ session });
    await session.commitTransaction();
    console.log(`Diet plan '${name}' has been created.`);
    res.send(newDietPlan);

  } catch (err) {
    console.error(`Error creating diet plan: ${err.message}`);
    res.status(500).send({ error: err.message });
  }
};


// export const createDietPlan = async (req, res, next) => {
//   try {
//     const { name, description, image, calories, carbs, protein, fats, user } = req.body;
     
//     let existingUser;

//     try {
//       existingUser = await User.findById(user);
//     } catch (error) {
//       return console.log(error);
//     }

//     if (!existingUser) {
//       return res
//         .status(404)
//         .json({ message: "Unable to find user by this ID" });
//     }

//     const dietPlan = new DietPlan({
//       name,
//       description,
//       image,
//       calories,
//       carbs,
//       protein,
//       fats,
//       user,
//     });
    
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     await dietPlan.save({ session });
//     existingUser.dietPlans.push(dietPlan);
//     await existingUser.save({ session });
//     await session.commitTransaction();
//     res
//       .status(200)
//       .json({ message: "Diet plan created successfully!", dietPlan });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Something went wrong!" });
//   }
// };

// Handle a GET request to get all diet plans
export const getDietPlans = async (req, res, next) => {
  let dietPlans;

  try {
    dietPlans = await DietPlans.find().populate('user');
  } catch (error) {
    return console.log(error);
  }
  if (!dietPlans) {
    return res.status(404).json({ Message: "Data not found !" });
  } else {
    return res.status(200).json({ dietPlans });
  }
};

// Handle request for getting single plan 

export const getDietPlanById = async (req, res, next) => {
  const dietPlanId = req.params.id;

  try {
    const dietPlan = await DietPlans.findById(dietPlanId);

    if (!dietPlan) {
      return res.status(404).json({ message: "Diet plan not found" });
    }

    return res.status(200).json({ message: "Fetched by diet plan id successfully", dietPlan });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}




// Handle a PUT request to update a diet plan by ID
export const updateDietPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDietPlan = await DietPlans.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedDietPlan) {
      return res
        .status(404)
        .json({ success: false, error: `Diet plan with ID ${id} not found` });
    }
    res.status(200).json({ success: true, data: updatedDietPlan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// Handle a DELETE request to delete a diet plan by ID
export const deleteDietPlanById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDietPlan = await DietPlans.findByIdAndDelete(id);
    if (!deletedDietPlan) {
      return res
        .status(404)
        .json({ success: false, error: `Diet plan with ID ${id} not found` });
    }
    res.status(200).json({ success: true, data: deletedDietPlan });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
