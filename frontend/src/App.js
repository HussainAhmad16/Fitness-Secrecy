// App.js
import React from 'react';
import { Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import EditBlog from './components/EditBlog';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useSelector } from 'react-redux';
import GymHome from './components/GymHome';
import SubNavigation from './components/SubNavigation'; // Import the SubNavigation component
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import { CreatePlan } from './components/CreatePlan';
import TrainingPlans from './components/TrainingPlans';
import { NavigationBtn } from './components/NavigationBtn';
import AdminDashboard from './components/AdminDashboard';
import DietPlansList from './components/DietPlansList';
import BuyDietPlan from './components/BuyDietPlan'
import UsersList from './components/UsersList';

import FitnessPlans from './components/FitnessPlans';

function App() {
  const isLoggedin = useSelector(state => state.auth.isLoggedin);
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';
  const isSignupPage = location.pathname === '/Signup';
  const shouldRenderHeaderAndFooter = !isLoginPage && !isSignupPage;
  let userRole = localStorage.getItem("userRole");
  
  const { id } = useParams();
  const matchBlogDetails = useMatch(`/BlogDetails/:id`);

//   These are for Mini drawer on the page through these links it will dynamically change the sub navigations 
  
  const linksByRoute = {
    "/blogs": [
      { label: "Blogs", url: "/blogs" },
     ...(isLoggedin ? [{ label: "My Blogs", url: "/UserBlogs" }]:[]),
      ...(isLoggedin ? [{ label: "Create Blogs", url: "/AddBlog" }] : []),
    ],
    "/UserBlogs": [
      { label: "Blogs", url: "/blogs" },
    ...(isLoggedin ? [ { label: "My Blogs", url: "/UserBlogs" }]:[]),
      ...(isLoggedin ? [{ label: "Create Blogs", url: "/AddBlog" }] : []),
    ],
    "/AddBlog": [
      { label: "Blogs", url: "/blogs" },
     ...(isLoggedin ? [{ label: "My Blogs", url: "/UserBlogs" }]:[]),
      ...(isLoggedin ? [{ label: "Create Blogs", url: "/AddBlog" }] : []),
    ],
    "/FitnessPlans": [
      { label: "Diet Plans", url: "/DietPlans" },
      { label: "Training Plans", url: "/TrainingPlans" },
      ...(isLoggedin  && userRole =='admin' ? [{ label: "Create Plan", url: "/CreatePlan" }] : []),
    ],
    "/DietPlans": [
      { label: "Diet Plans", url: "/DietPlans" },
      { label: "Training Plans", url: "/TrainingPlans" },
      ...(isLoggedin  && userRole =='admin' ? [{ label: "Create Plan", url: "/CreatePlan" }] : []),
    ],
    "/TrainingPlans": [
      { label: "Diet Plans", url: "/DietPlans" },
      { label: "Training Plans", url: "/TrainingPlans" },
      ...(isLoggedin  && userRole =='admin' ? [{ label: "Create Plan", url: "/CreatePlan" }] : []),
    ],
    "/CreatePlan": [
      { label: "Diet Plans", url: "/DietPlans" },
      { label: "Training Plans", url: "/TrainingPlans" },
      ...(isLoggedin  && userRole =='admin' ? [{ label: "Create Plan", url: "/CreatePlan" }] : []),
    ],

    "/BlogDetails/:id": [
      { label: "Diet Plans", url: "/DietPlans" },
      { label: "Training Plans", url: "/TrainingPlans" },
      ...(isLoggedin  && userRole ==='admin' ? [{ label: "Create Plan", url: "/CreatePlan" }] : []),
    ],
  };

  

  const currentRoute = location.pathname;
  const links = linksByRoute[currentRoute] || [];
  const blogDetailsLinks = linksByRoute["/BlogDetails/:id"] || [];
  

  useEffect(() => {
    if (localStorage.getItem("userId")||localStorage.getItem("userRole")) {
      
    } 
  
  }, [dispatch])
  
  return (
    <React.Fragment>
      {shouldRenderHeaderAndFooter && <Header />}
      <main>
        <Routes>
          {!isLoggedin ?
          <>
          <Route path='/Login' element={<Login />} /> 
          <Route path='/Signup' element={<Signup />} />
          <Route path='/' element={<GymHome />} /> 
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/DietPlans' element={<DietPlansList />} />
          <Route path='/FitnessPlans' element={<FitnessPlans />} />
          <Route path='/TrainingPlans' element={<TrainingPlans />} />
          <Route path='/BlogDetails/:id'element={<BlogDetails subnavLinks={blogDetailsLinks} />} />
          <Route path='/BuyDietPlan/:id' element={<BuyDietPlan />} />
         
          </>
          :
          <>
            <Route path='/' element={<GymHome />} /> 
          <Route path='/Login' element={<Login />} />
          <Route path='/Signup' element={<Signup />} />
          <Route path='/blogs' element={<Blogs />} />
          <Route path='/UserBlogs' element={<UserBlogs />} />
          <Route path='/EditBlog/:id' element={<EditBlog />} />
          <Route
            path='/BlogDetails/:id'
            element={<BlogDetails subnavLinks={blogDetailsLinks} />} 
          />
          <Route path='/blogs/add' element={<AddBlog />} />
          <Route path='/AddBlog' element={<AddBlog />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/TrainingPlans' element={<TrainingPlans />} />
          <Route path='/CreatePlan' element={<CreatePlan />} />
          <Route path='/AdminDashboard' element={<AdminDashboard />} />
          <Route path='/DietPlans' element={<DietPlansList />} />
          <Route path='/BuyDietPlan/:id' element={<BuyDietPlan />} />
          <Route path='/UsersList' element={<UsersList />} />
          <Route path='/FitnessPlans' element={<FitnessPlans />} />
          </> }
        </Routes>
      </main>
      {shouldRenderHeaderAndFooter && (
  <React.Fragment>
    {matchBlogDetails && blogDetailsLinks.length > 0 ? (
      <SubNavigation links={blogDetailsLinks} footerHeight={20} />
    ) : (
      <SubNavigation links={links} footerHeight={20} />
    )}
    <Footer />
  </React.Fragment>
)}


    </React.Fragment>
  );
}

export default App;
