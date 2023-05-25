import Blog from "../model/Blog";
import User from "../model/User";
import mongoose from "mongoose";
import DeletedBlogs from "../model/DeletedBlogs";
// fetching Blogs
export const getAllBlogs = async (req, res, next) => {
  let blogs;

  try {
    blogs = await Blog.find().populate('user');
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ Message: "Data not found !" });
  } else {
    return res.status(200).json({ blogs });
  }
};

// posting/adding Blog

export const postBlog = async (req, res, next) => {
  try {
    const { title, description, image,category,user } = req.body;
    let existingUser;
    try {
      existingUser = await User.findById(user);
    } catch (error) {
      return console.log(error);
    }
    if (!existingUser) {
      return res
        .status(404)
        .json({ Message: "Unable to find user by this ID" });
    }
    const blog = new Blog({ title, description, image,category,user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
    res.status(200).json({ Message: "Added Successfully !", blog });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ Message: "Something went wrong !" });
  }
};


// updating Blog

export const updateBlog = async (req, res, next) => {
  const { title, description, image,category  } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
      image,
      category

    });
  } catch (error) {
    return console.log(error);
  }

  if (!blog) {
    return res
      .status(500)
      .json({ Message: "Unable to Update , Please try again !" });
  } else {
    return res.status(200).json({ Message: "Blog Updated Successfully !", blog });
  }
};

// getting a single blog 

export const getByUserId= async (req,res,next)=>{

  const userId = req.params.id;

  let userBlog;

  try {
    userBlog=await User.findById(userId).populate("blogs")
  } catch (error) {
    console.log(error);
  }
if (!userBlog) {
 return res.status(404).json({Message:"Blog Not Found !"})
} else {
  return res.status(200).json({blogs:userBlog})
}
}


export const getBlogByBlogId = async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({message:"Fecthed by blog id successfully", blog });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}


// Deleting Blog / Moving it from Blogs to Deleted blogs document 


export const moveToRecycleBin = async (req, res) => {
  const { id } = req.params;
  const { user, moveToRecycleBin } = req.body;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).send({ error: "Blog not found" });
    }

    if (blog.user.toString() !== user) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    if (moveToRecycleBin) {
      // Create a new document in the DeletedBlog collection with the same details as the deleted blog
      const deletedBlog = new DeletedBlogs({
        title: blog.title,
        description: blog.description,
        image: blog.image,
        category: blog.category,
        user: blog.user,
        deletedAt: new Date()
      });

      // Save the deleted blog to the DeletedBlog collection
      await deletedBlog.save();

      // Remove the blog from the Blog collection
      await Blog.findByIdAndRemove(id);
    } else {
      await Blog.findByIdAndRemove(id);
    }

    res.send({ message: "Blog deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server Error" });
  }
};


