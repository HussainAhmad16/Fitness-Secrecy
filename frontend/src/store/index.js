import { configureStore, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: { isLoggedin: false },
  reducers: {
    login(state) {
      state.isLoggedin = true;
    },
    logout(state) {
      state.isLoggedin = false;
    }
  }
});

export const authActions = authSlice.actions;

// storing Diet plans

export const fetchDietPlans = createAsyncThunk(
  "dietPlans/fetchDietPlans",
  async () => {
    const response = await axios.get("http://localhost:5000/api/plans");
    return response.data.dietPlans;
  }
);

const dietPlansSlice = createSlice({
  name: "dietPlans",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDietPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDietPlans.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDietPlans.rejected, (state) => {
        state.loading = false;
        state.error = "Network Error";
        console.log('Error Occured in Redux Store while fetching Diet Plans');
      });
  },
});


export const dietPlansActions = dietPlansSlice.actions;






// storing blogs 

export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
    const response = await axios.get("http://localhost:5000/api/blog");
    return response.data.blogs;
  });
  
  const blogSlice = createSlice({
    name: "blogs",
    initialState: {
      data: [],
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchBlogs.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  
  export const blogActions = blogSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    dietPlans: dietPlansSlice.reducer,
    blogs: blogSlice.reducer,
  },
});
