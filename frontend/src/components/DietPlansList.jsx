import React, { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchDietPlans } from "../store/index";
import Loader from "./Loader";
import DietPlanCard from "./DietPlanCard";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./Footer";

const DietPlanListContainer = styled("div")({
  marginTop: "80px",
  padding: "50px",
  fontFamily: "Arial",
  width: "100%",
});

const DietPlanList = () => {
  const dietPlans = useSelector((state) => state.dietPlans.data);
  const loading = useSelector((state) => state.dietPlans.loading);
  const error = useSelector((state) => state.dietPlans.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!dietPlans.length) {
      dispatch(fetchDietPlans());
    }
  }, [dispatch, dietPlans.length]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <DietPlanListContainer>
        <h1
          style={{
            padding: "5px",
            color: "#2B4D42",
            textShadow: "2px 2px white",
            textAlign: "center",
            marginTop: "0px",
            marginBottom: "40px",
          }}
        >
          Diet Plans
        </h1>
        {error ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          >
            <Typography color="error" variant="h4">{error}</Typography>
          </Box>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {dietPlans.map((dietPlan, index) => (
              <Grid item xs={12} sm={6} md={4} key={index} id={dietPlan._id}>
                <DietPlanCard
                  title={dietPlan.name}
                  description={dietPlan.description.slice(0, 500)}
                  image={dietPlan.image}
                  id={dietPlan._id}
                  calories={dietPlan.calories}
                  carbs={dietPlan.carbs}
                  protein={dietPlan.protein}
                  fats={dietPlan.fats}
                />
                <Typography variant="h4" sx={{mt:5,ml:13}} color="initial">{dietPlan.name}</Typography>
              </Grid>
            ))}
          </Grid>
        )}
      </DietPlanListContainer>
    </>
  );
};

export default DietPlanList;
