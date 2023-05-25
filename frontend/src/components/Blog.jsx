import { Box, Grid, Typography, Button, IconButton } from "@mui/material";
import { red } from "@mui/material/colors";
import { styled } from "@mui/system";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import gymBackground from "./images/gym-background.jpg";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { NavigationBtn } from "./NavigationBtn";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const theme = createTheme();

const currentPath = window.location.pathname;

const StyledCard = styled(Grid)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  maxWidth: "1000px",
  margin: "auto",
  overflow: "hidden",
  transition: "0.1s",
  scale: "0.85",
  [theme.breakpoints.up("md")]: {
    flexDirection: "row",
    maxHeight: "400px",
  },
}));


const StyledCardMedia = styled(CardMedia)({
  position: "relative",
  width: "100%",
  paddingTop: "56.25%",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    top: 0,
    left: -40,
    width: "40%",
    paddingTop: "40%",
    maxHeight: "300px",
  },
});

const StyledBox = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "1rem",
  backgroundColor: "transparent",
  [theme.breakpoints.up("md")]: {
    marginLeft: "30px",
  },
}));

const StyledImage = styled("img")({
  position: "absolute",
  top: "21px",
  left: 0,
  maxWidth: "500px",
  width: "100%",
  maxHeight: "300px",
  height: "auto",
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1rem", // add some margin to separate the buttons from the text
});

const StyledGrid = styled(Grid)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
});

const StyledIconButton = styled(IconButton)({
  marginLeft: "1rem",
});

const StyledButton = styled(Button)({
  marginLeft: "1rem",
});

const Title = styled(Typography)(({ theme }) => ({
  "&:hover": {
    textDecoration: "underline",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "3rem",
  },
}));
const Blog = ({
  title,
  description,
  image,
  userName,
  category,
  isUser,
  id,
  setBlogs,
}) => {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);


  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/EditBlog/${id}`);
  };
  const handleReading = () => {
    navigate(`/BlogDetails/${id}`);
  };

  const handleDeletion = async (event) => {
    event.preventDefault();
    if (!window.confirm("Are you sure ! you want to delete this blog post?")) {
      return;
    }
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/blog/deleteBlog/${id}`,
        {
          data: {
            user: localStorage.getItem("userId"),
            moveToRecycleBin: true,
          },
        }
      );
      const data = await res.data;
      Swal.fire({
        icon: "success",
        title: "Blog Deleted",
        text: "Blog Deleted successfully! , You can restore it from Recycle Bin till 30 days of deletion.",
      }).then(() => {
        console.log(data);
        // remove the blog from the page immediately
        const blogCard = document.getElementById(`blog-${id}`);
        setBlogs((blogs) => blogs.filter((blog) => blog._id !== id));
        if (blogCard) {
          blogCard.remove();
        }
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error: ${err.message}`,
      });
    }
  };

  console.log(title, isUser);
  const [showFullDescription, setShowFullDescription] = React.useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const getDescription = () => {
    if (showFullDescription) {
      return description;
    } else {
      return `${description.slice(0, 250)}...`;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <StyledCard>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <StyledCardMedia>
              <StyledImage src={image} alt={` image`} />
            </StyledCardMedia>
          </Grid>
          <Grid item xs={12} md={8} >
            <StyledBox sx={{ marginLeft: "30px" }}>
              <Box>
                <Link
                  to={`/BlogDetails/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Title variant="h4" Wrap gutterBottom>
                    {title}
                  </Title>
                </Link>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  dangerouslySetInnerHTML={{ __html: getDescription() }}
                  variant="body1"
                  color="text.secondary"
                  Wrap
                ></Typography>
              </Box>
              <Box >
                <br />
                <hr />
                <Footer >
                  <Grid item xs={12} sm={8}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      noWrap
                    >
                      {currentPath !== "/myBlogs" && userName && (
                        <>By {userName}</>
                      )}
                    </Typography>
                  </Grid>
                  {isUser && isLoggedin && (
                    <StyledGrid item xs={12} sm={6}>
                      <StyledIconButton onClick={handleEdit}>
                        <EditIcon sx={{color:'orange'}} />
                      </StyledIconButton>
                      <StyledIconButton onClick={handleDeletion}>
                        <DeleteIcon sx={{color:'red'}} />
                      </StyledIconButton>
                    </StyledGrid>
                  )}
                  <Grid item xs={12} sm={6}>
                    <StyledButton variant="text" onClick={handleReading}>
                      Read More
                    </StyledButton>
                  </Grid>
                </Footer>
              </Box>
            </StyledBox>
          </Grid>
        </Grid>
      </StyledCard>
    </ThemeProvider>
  );
};

export default Blog;
