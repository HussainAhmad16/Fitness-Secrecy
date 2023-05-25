import React from "react";
import { Box, Typography, Link, Grid, TextField, Button } from "@mui/material";
import { MdEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { Facebook, GitHub, Google, Instagram, LinkedIn, Twitter } from "@mui/icons-material";

const Footer = () => {
  const whatsappLink = "https://wa.me/03497224297";
  const emailLink = "mailto:coderfounded@gmail.com";

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        bgcolor: "#ECEFF1",
        textAlign: "center",
        color: "#212121",
      
        
      }}
    >
      {/* Section: Social media */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 4,
          bgcolor: "#21D192",
          color: "#fff",
        }}
      >
        <Box sx={{ me: 5 }}>
          <Typography sx={{ fontWeight: "bold" }}>
            Get connected with us on social networks:
          </Typography>
        </Box>

        <Box>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <Facebook />
      </Link>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <Twitter />
      </Link>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <Google />
      </Link>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <Instagram />
      </Link>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <LinkedIn />
      </Link>
      <Link href="" color="inherit" underline="none" sx={{ me: 4 }}>
        <GitHub />
      </Link>
    </Box>
  </Box>

      {/* Section: Links */}
      <Box sx={{ mt: 5}}>
        <Grid container spacing={4}  justifyContent='center'>
          <Grid item xs={12} md={3} lg={4} xl={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 4, color: "black", textAlign: "start" }}
            >
             FitnessSecrecy
            </Typography>
            <Typography sx={{ mb: 4, textAlign: "start" }}>
            We strive to deliver the best fitness content and guidance,Stay connected with us on various social networks such as Facebook, Twitter, Google, Instagram, LinkedIn, and GitHub. Follow us to receive updates, fitness tips, and interact with our community.
            </Typography>
          </Grid>

          <Grid item xs={12} md={2} lg={2} xl={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 4, color: "black", textAlign: "start" }}
            >
              Products
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Mass Gainers
              </Link>
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Fat Burner
              </Link>{" "}
              <Link href="#!" color="inherit" underline="none">
                Booster
              </Link>
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                C4
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={3} lg={2} xl={2}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 4, color: "black", textAlign: "start" }}
            >
              Useful links
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Your Account
              </Link>
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Become an Affiliate
              </Link>
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Shipping Rates
              </Link>
            </Typography>
            <Typography sx={{ mb: 1, textAlign: "start" }}>
              <Link href="#!" color="inherit" underline="none">
                Help
              </Link>
            </Typography>
          </Grid>

          <Grid item xs={12} md={4} lg={4} xl={3}>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 4, color: "black", textAlign: "start" }}
            >
              Contact us
            </Typography>
            {/* <Divider
              sx={{
                width: "60px",
                backgroundColor: "#7c4dff",
                height: "2px",
                mb: 4,
                mt: 0,
                display: "inline-block",
              }}
            /> */}

            <Typography sx={{ mb: 2, textAlign: "start" }}>
              <MdEmail sx={{ mr: 1, textAlign: "start" }} />
              <Link href={emailLink} color="inherit" underline="none">
                coderfounded@gmail.com
              </Link>
            </Typography>
            <Typography sx={{ mb: 2, textAlign: "start" }}>
              <FaWhatsapp sx={{ mr: 1, textAlign: "start" }} />
              <Link href={whatsappLink} color="inherit" underline="none">
                +92 349 7224297
              </Link>
            </Typography>
            <TextField
              label="Email address"
              variant="outlined"
              size="small"
              sx={{ width: "100%", mb: 2, textAlign: "start" }}
            />
            <Button
              variant="contained"
              sx={{ width: "100%", textAlign: "start" }}
            >
              Subscribe
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Typography sx={{ color: "#757575" }}>
          © {new Date().getFullYear()} All rights reserved.
        </Typography>
      </Box>
      {/* Section: Copyright */}
    </Box>
  );
};

export default Footer;
