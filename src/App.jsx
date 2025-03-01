import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./userContext"; 
import 'sweetalert2/dist/sweetalert2.min.css';
import { SocketProvider } from "./context/SocketContext"; 

import Login from "./core/public/Login";
import Register from "./core/public/Register";
import Home from "./core/public/Home";
import Logout from "./core/public/Logout";


import Admin from "./core/private/Admin/Admin"; 
import AddDoctor from "./core/private/Admin/AddDoctor";
import AddPatient from "./core/private/Admin/AddPatient"; 
import ViewUsers from "./core/private/Admin/ViewPatient"; 
import ViewDoctor from "./core/private/Admin/ViewDoctor"; 
import AddBlog from "./core/private/Admin/AddBlog";
import BlogPage from "./core/private/Admin/BlogPage";

import MessagePage from "./core/private/Message";
import Profile from "./core/private/Profile";
import EditProfile from "./core/private/EditProfile";


import Doctor from "./core/private/Users/Doctor"; 
import Blog from "./core/private/Users/Blog"; 
import AppointmentBooking from "./core/private/Users/Appointment";
import AppointmentPage from "./core/private/Doctor/AppointmentPage";

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux/userSlice';


import ChatSidebar from './components/message/chatSidebar'; // Path to your ChatSidebar
import ViewAppointments from "./core/private/Users/ViewAppointment";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);
  return (
    <UserProvider>
       <SocketProvider>

    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addDoctor" element={<AddDoctor />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/viewDoctor" element={<ViewDoctor />} />
        <Route path="/viewpatient" element={<ViewUsers />} />
        <Route path="/addBlog" element={<AddBlog />} />
        <Route path="/blogpage" element={<BlogPage />} />
        {/* //users */}
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/message" element={<MessagePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/appointments/:doctorId" element={<AppointmentBooking />} />
        <Route path="/viewappointments" element={<ViewAppointments />} />

        {/* doctor */}
        <Route path="/doctor/viewAppointment" element={<AppointmentPage />} />
        
        <Route path="/" element={<ChatSidebar />} />
        {/* <Route path="/message/:userId" element={<MessagePage />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/editprofile" element={<EditProfile />} />

        {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
      </Routes>
    </Router>
    </SocketProvider>
    </UserProvider>

  );
}

export default App;
