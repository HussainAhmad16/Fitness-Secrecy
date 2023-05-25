import { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Loader from "./Loader";



function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const sendRequest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blog");
      const data = res.data;
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  useEffect(() => {
    sendRequest()
      .then((data) => {
        if (data && data.blogs) {
          setBlogs(data.blogs);
          setLoading(false); // set loading state to false
        }
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setLoading(false); // set loading state to false in case of error
      });
  }, []);
  
 

  if (loading) {
    return (
      <Loader/>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
        <Typography color="error" variant="h4">{error}</Typography>
      </Box>
    );
  }
  return (
   
    
      <div >
       
        <h1
          style={{
            padding: "5px",
            color: "#2B4D42",
            textShadow: "2px 2px white",
            textAlign: "center",
            marginTop: "120px",
            marginBottom:'40px'
          }}
        >
          Most Recent Articles
        </h1>
        <Box
          sx={{
            width:'100%'
          }}
        >
          {blogs &&
            blogs.map((blog, index) => (
              <Blog
                id={blog._id}
                isUser={localStorage.getItem("userId")===blog.user._id}
                key={index}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                userName={blog.user.name}
                category={blog.category}
                setBlogs={setBlogs} // for immediately removing the blog from the screen when delete
              />
            ))}
        </Box>
      </div>
   
  );
}

export default Blogs;
