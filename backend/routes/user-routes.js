import express from "express";
import { getAllUsers, signup,login ,getUserById} from "../controller/user-controller";
const UserRouter = express.Router();
import User from "../model/User";

UserRouter.get('/',getAllUsers);
UserRouter.get('/getUserById/:id',getUserById);
UserRouter.post('/signup',signup);
UserRouter.post('/login',login);
// UserRouter.get('/getUserRole/:id', getUserRole)

UserRouter.get('/userCount', async (req, res) => {
    const count = await User.countDocuments();
    res.json({ count });
  });
  
export default UserRouter;