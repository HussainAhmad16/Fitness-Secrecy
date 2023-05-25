import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Container } from "@mui/material";
import Loader from "./Loader";
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Footer from "./Footer";
import SubNavigation from "./SubNavigation";
const BlogTitle = styled(Typography)`
  margin: auto;
  margin-top: 70px;
  color: #37474f;
  font-size: 30px; /* or any other suitable size */
text-transform:Uppercase;
  @media (max-width: 768px) {
    font-size: 28px;
    margin-top: 10px;
  }
`;


const BlogAuthor = styled(Typography)`
  font-weight: 800;
  font-style: italic;
  color: #a9a9a9;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: start
`;

const AuthorAvatar = styled(Avatar)`
  margin-right: 10px;
`;

const BlogImage = styled.img`
  width: 100%;
  max-width: 1600px;
  height: 400px;

  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  object-fit: cover;
  object-position: center;
`;


const BlogImageCaption = styled(Typography)`
  font-style: italic;
  color: #546e7a;
  margin-top: -10px;
  margin-bottom: 20px;
  display: block;
`;

const BlogDescription = styled(Typography)`
  color: #37474f;
  line-height: 1.6;
  margin-bottom: 20px;
`;


const BlogContainer = styled(Container)`
  margin-top: 40px;
`;

const BlogBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const BlogContent = styled.div`
  max-width: 800px;
  width: 60%;
  padding: 20px;
  padding-top: 0px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
  @media (max-width: 768px) {
    width: 90%;
    margin-top: 10px;
  }
};

`;






const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;


const BlogDate = styled(Typography)`
  color: #546e7a;
  margin: 10px 0;
`;

const BlogReadTime = styled(Typography)`
  color: #546e7a;
  margin: 10px 0;
`;

const BlogTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const BlogCategory = styled(Typography)`
  background-color: #f1f1f1;
  color: #546e7a;
  margin-bottom: 10px;
  margin-right: 10px;
  font-weight: bold;

  &:hover {
    background-color: #546e7a;
    color: #fff;
  }
`;

const BlogTag = styled(Chip)`
  background-color: #f1f1f1;
  color: #546e7a;
  margin-right: 10px;
  margin-bottom: 10px;
  font-weight: bold;

  &:hover {
    background-color: #546e7a;
    color: #fff;
  }
`;


const BlogDetail = ({ subnavLinks }) => {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({});
  const { id } = useParams();

  const fetchBlog = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog/${id}`);
      const data = await res.data;
      setBlog(data.blog);
      setLoading(false);

      // Fetch the user details associated with the blog post
      const userRes = await axios.get(
        `http://localhost:5000/api/user/getUserById/${data.blog.user}`
      );
      const userData = await userRes.data;
      setUser(userData.user);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography color="error" variant="h4">
          {error}
        </Typography>
      </Box>
    );
  }
  // const blogDescription = blog.description.split('\n');
  // const firstDescription = blogDescription[0];
  // const restDescription = blogDescription.slice(1).join('\n');
  return (
    <BlogContent>
      <SubNavigation links={subnavLinks} />
      <Box >
        <BlogContainer maxWidth="lg">
         
          <Box sx={{ display: "flex",flexDirection:"row", alignItems: "start", mb: 2 }}>
            <BlogTitle variant="h4">{blog.title}</BlogTitle>
          </Box>
          <Box><BlogAuthor variant="subtitle1">By {user.name}</BlogAuthor></Box>
          <BlogCategory variant="">
              Category: {blog.category}
            </BlogCategory>
          
        
          <hr /><hr />
        </BlogContainer>
       
      </Box>
      <BlogContainer maxWidth="md" sx={{ mt: 4 }}>
        <BlogBox>
        <Box> 
            <BlogImage src={blog.image} alt={blog.title} />
               <Box sx={{ p: 3 }}>
                    <BlogImageCaption variant="caption">
                           {blog.imageCaption}
                   </BlogImageCaption>
             
            </Box>
          </Box>

        </BlogBox>
       
          <BlogDescription variant="body1" dangerouslySetInnerHTML={{ __html: blog.description }}
          >

          </BlogDescription>
      
      </BlogContainer>
    
    </BlogContent>
  );
};

export default BlogDetail;
