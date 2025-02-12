import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./core/public/Login";
import Register from "./core/public/Register";
import Home from "./core/public/Home";
import Admin from "./core/private/Admin/Admin"; // Fix: Corrected relative path
import AddDoctor from "./core/private/Admin/AddDoctor"; // Fix: Corrected relative path
import AddPatient from "./core/private/Admin/AddPatient"; // Fix: Corrected relative path
import ViewUsers from "./core/private/Admin/ViewPatient"; // Fix: Corrected relative path
import ViewDoctor from "./core/private/Admin/ViewDoctor"; // Fix: Corrected relative path
import AddBlog from "./core/private/Admin/AddBlog";
import Doctor from "./core/private/Users/Doctor"; // Fix: Corrected relative path
import Blog from "./core/private/Users/Blog"; // Fix: Corrected relative path
import Message from "./core/private/Users/Message"; // Fix: Corrected relative path
import Profile from "./core/private/Profile"; // Fix: Corrected relative path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addDoctor" element={<AddDoctor />} />
        <Route path="/addPatient" element={<AddPatient />} />
        <Route path="/viewDoctor" element={<ViewDoctor />} />
        <Route path="/viewpatient" element={<ViewUsers />} />
        <Route path="/addBlog" element={<AddBlog />} />
        {/* //users */}
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/message" element={<Message />} />
        <Route path="/profile" element={<Profile />} />



        {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
