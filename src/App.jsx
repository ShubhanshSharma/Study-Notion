import { BrowserRouter, Route , Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Pages/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import { Toaster } from "react-hot-toast";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import ContactFormSection from "./components/Pages/Contact";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/Dashboard/MyProfile";
import PrivateRoute from "./components/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/Dashboard/Settings";
import EnrolledCourses from "./components/Dashboard/EnrolledCourses";
import Cart from "./components/Dashboard/Cart";
import AddCourse from "./components/Dashboard/AddCourse";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/profileAPI";
import { ACCOUNT_TYPE } from "./Utils/constants";
import InstructorSection from "./components/InstructorSection";

function App() {
  return (
    <div className="App w-screen min-h-screen flex flex-col bg-richblack-900">
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

// Move hooks and logic into a component rendered inside BrowserRouter
function AppRoutes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactFormSection />} />
        <Route path="/*" element={<Error />} />

         {/* Private Route - for Only Logged in User */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Route for all users */}
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/Settings" element={<Settings />} />
          {/* <Route path="dashboard/add-course" element={<AddCourse />} /> */}
          {/* Route only for Instructors */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="dashboard/instructor" element={<InstructorSection />} />
              {/* <Route path="dashboard/my-courses" element={<MyCourses />} /> */}
              <Route path="dashboard/add-course" element={<AddCourse />} />
              <Route
                path="dashboard/edit-course/:courseId"
                // element={<EditCourse />}
              />
            </>
          )}
          {/* Route only for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="dashboard/enrolled-courses"
                element={<EnrolledCourses />}
              />
              <Route path="/dashboard/cart" element={<Cart />} />
            </>
          )}
          <Route path="dashboard/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}
          

export default App;
