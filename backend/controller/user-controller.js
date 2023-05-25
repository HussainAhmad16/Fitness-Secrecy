import User from "../model/User";
import bcrypt from 'bcryptjs';
export const getAllUsers = async (req, res, next) => {
  let users;
  users =await User.find();
  try {
                 

} 
  
  catch (err) {
    console.log(err);
  }

  if (!users) {
    return res.status(404).json({ message: "No User Found !" });
  } else {
    return res.status(200).json({ users });
  }
};

export const signup = async (req,res,next)=>{

  const {name, email, password,confirmPassword}= req.body;
let existingUser;
  try {
    
    const existingUser= await User.findOne({email});

  } catch (error) {
  return  console.log(error);
  }
if (existingUser) {
  return res.status(400).json({message:'User Already Exist ! , Login instead '})
} else {

  const hashedPassword=bcrypt.hashSync(password);

  const user=new User({
    name,
    email,
    password:hashedPassword,
    confirmPassword,
    blogs:[],
    dietPlans:[],
    trainingPlans:[]
  })
  
  try {
  await  user.save()
  } catch (error) {
   return console.log(error);
  }
  return res.status(202).json({message:"Account Created Successfully",user})
}

}

export const login=async(req , res,next)=>{

  const { email, password}= req.body;
  let existingUser;
  try {
    
     existingUser= await User.findOne({email});

  } catch (error) {
  return  console.log(error);
  }
if (!existingUser) {
  return res.status(404).json({message:'User Credentials did not Found ! '})
} else {
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({message:'Password did not matched !'})
  } else {
    return res.status(200).json({message:'Login Successfull',user:existingUser})
  }
}

}

export const getUserById = async (req, res, next) => {
  const userId = req.params.id;
  let user;
  try {
    user = await User.findById(userId);
  } catch (err) {
    console.log(err);
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  } else {
    return res.status(200).json({ user });
  }
};


// export const getUserRole = async (req, res) => {
//   try {
//     const  id  = req.params.id;;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const { role } = user;
//     return res.status(200).json({ role });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }



