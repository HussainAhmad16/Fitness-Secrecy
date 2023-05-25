import { margin } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Blog from "./Blog";

import { Box, List, ListItem, ListItemText } from "@mui/material";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import SubNavigations from "./SubNavigation";

const UserBlogs = () => {
  const [blogs, setblogs] = useState([]);
  const id = localStorage.getItem("userId");
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:5000/api/blog/getByUserId/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setblogs(data.blogs.blogs));
  }, []);
  console.log(blogs);



  return (
    <div style={{ fontFamily: "Open Sans", display: "flex" }}>
   
      <div style={{ flex: "1", padding: "10px" }}>
        <div style={{ fontFamily: "Open Sans", marginTop: "100px" }}>
          <h1
            style={{
              padding: "5px",
              color: "#2B4D42",
              textShadow: "2px 2px white",
              textAlign: "center",
              marginTop: "120px",
              marginBottom: "40px",
            }}
          >
            My Blogs
          </h1>
        </div>
        <Box
          sx={{
            // display: "flex",
            // flexWrap:"wrap",
            // justifyContent: "center",
            // flexDirection:'row'

            width: "100%",
          }}
        >
          {blogs &&
            blogs.map((blog, index) => (
              <Blog
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                userName={blog.user.name}
                setBlogs={setblogs}
              />
            ))}
        </Box>
      
      </div>
    </div>
  );
};

export default UserBlogs;
