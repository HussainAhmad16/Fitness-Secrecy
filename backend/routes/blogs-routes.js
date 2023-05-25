import express from "express";
import { getAllBlogs, postBlog, updateBlog, getBlogByBlogId, moveToRecycleBin, getByUserId } from '../controller/blog-controller';

const BlogRouter = express.Router();

BlogRouter.get('/', getAllBlogs);
BlogRouter.post('/postBlog', postBlog);
BlogRouter.put('/updateBlog/:id', updateBlog);
BlogRouter.get('/:id', getBlogByBlogId);
BlogRouter.get('/getByUserId/:id', getByUserId);
BlogRouter.delete('/deleteBlog/:id', moveToRecycleBin);

export default BlogRouter;
