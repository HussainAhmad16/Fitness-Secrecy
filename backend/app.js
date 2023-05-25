import express from "express";
import mongoose from "mongoose";
import UserRouter from './routes/user-routes';
import BlogRouter from './routes/blogs-routes';
import PlansRouter from './routes/plans-routes'
import cors from 'cors';



const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


app.use('/api/user', UserRouter);
app.use('/api/blog', BlogRouter);
app.use('/api/plans', PlansRouter);

mongoose
  .connect(
    "mongodb+srv://coderfounded:Coderfounded16@cluster0.bbmsp3a.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(5000, () => {
      console.log("Listening on localhost:5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
  
//user of Cloud mongodb = coderfounded
//pass = Coderfounded16