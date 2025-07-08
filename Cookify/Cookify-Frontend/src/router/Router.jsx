import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router";
import Home from "../pages/Home.jsx";
import Layout from "../components/Layout.jsx";
import About from '../pages/About.jsx';
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import Profile from "../pages/Profile.jsx";
import {ToastContainer} from "react-toastify";
import RequireNoAuth from "./RequireNotAuth.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import Sect3 from "../sections/homepage-Sections/sect3/Sect3.jsx";
import Receipts from "../pages/Receipts.jsx";
import Blog from "../pages/Blog.jsx";
import Soyuducum from "../pages/Soyuducum.jsx";
import AppWrapper from "./AppWrapper.jsx";
import BlogDetail from "../sections/blogs-Sections/blogDetail/BlogDetail.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkAuthThunk} from "../redux/reducers/authReducer.js";
import Favorites from "../pages/Favorites.jsx";
import {getFavoritesThunk} from "../redux/reducers/favoritesReducer.js";
import Admin from "../pages/Admin.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import {Navigate} from "react-router-dom";
import CheckAuth from "../sections/admin-Sections/checkAuth/CheckAuth.jsx";
import CheckBlogs from "../sections/admin-Sections/chechBlogs/CheckBlogs.jsx";
import CheckComponents from "../sections/admin-Sections/checkComponents/checkComponents.jsx";
import CheckReceipts from "../sections/admin-Sections/checkReceipts/CheckReceipts.jsx";
import CheckFeedback from "../sections/admin-Sections/checkFeedback/CheckFeeback.jsx";
import SupporterCheck from "../sections/admin-Sections/supportersCheck/SupporterCheck.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DailyTaskAdmin from "../sections/admin-Sections/dailyTask/DailyTaskAdmin.jsx";


const Router = () => {
    const dispatch = useDispatch();
    const user=useSelector((state) => state.user.user);
    console.log(user)
    useEffect(() => {
        dispatch(checkAuthThunk());
    }, [dispatch]);
    useEffect(() => {
        dispatch(getFavoritesThunk());
    }, [dispatch]);
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);
  return (
    <BrowserRouter>
        <ToastContainer position="top-right" autoClose={3000} />
        <ScrollToTop/>
      <Routes>
        <Route element={<AppWrapper />}>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/feedback" element={<Sect3/>}/>
            <Route path="/receipts" element={<Receipts/>}/>
            <Route path="/blogs" element={<Blog/>}/>
            <Route path="/favorites" element={<Favorites/>}/>
            <Route path="/blog/:id" element={<BlogDetail/>}/>
            <Route path="/soyuducum" element={<Soyuducum/>}/>
        </Route>
          <Route
              path="/admin"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <Admin/>
                  </PrivateRoute>
              }
          />
          <Route
                path="/check/Auth"
                element={
                    <PrivateRoute allowedRoles={['admin']}>
                        <CheckAuth/>
                    </PrivateRoute>
                }
          />
          <Route
              path="/admin/blogs"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <CheckBlogs/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/admin/components"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <CheckComponents/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/admin/receipts"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <CheckReceipts/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/admin/daily-tasks"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <DailyTaskAdmin/>
                  </PrivateRoute>
              }
          />
          <Route
              path="/admin/feedback"
              element={
                  <PrivateRoute allowedRoles={['admin']}>
                      <CheckFeedback/>
                  </PrivateRoute>
              }
          /><Route
          path="/admin/supporters"
          element={
              <PrivateRoute allowedRoles={['admin']}>
                  <SupporterCheck/>
              </PrivateRoute>
          }
      />
          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth/login" element={
              <RequireNoAuth>
                  <Login/>
              </RequireNoAuth>
          }/>
          <Route path="/auth/signup" element={
              <RequireNoAuth>
                  <Signup/>
              </RequireNoAuth>
          }/>

      </Routes>
    </BrowserRouter>

  );
};

export default Router;