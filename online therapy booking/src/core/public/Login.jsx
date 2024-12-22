import { useContext, useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';

export default function Login() {
     const { user, setUser } = useContext(UserContext);
     const navigate = useNavigate();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [isActive, setIsActive] = useState(false);

     // Login handler
     const loginUser = async (e) => {
          e.preventDefault();

          try {
               const response = await fetch('http://localhost:4000/users/login', {
                    method: 'POST',
                    headers: {
                         "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
               });

               if (!response.ok) {
                    if (response.status === 401) {
                         throw new Error("Invalid login credentials. Please check your email and password.");
                    }
                    throw new Error(`Server error: ${response.status}`);
               }

               const data = await response.json();

               if (data.token) {
                    localStorage.setItem('token', data.token); // Store token in local storage
                    retrieveUserDetails(data.token);

                    Swal.fire({
                         title: "Login Successful",
                         icon: "success",
                    }).then(() => {
                         navigate('/home'); // Redirect to dashboard
                    });
               } else {
                    Swal.fire({
                         title: "Authentication failed",
                         icon: "error",
                         text: "Check your login details and try again.",
                    });
               }
          } catch (error) {
               console.error('Error during login:', error);
               Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: error.message,
               });
          }
     };

     // Retrieve user details after successful login
     const retrieveUserDetails = async (token) => {
          try {
               const response = await fetch('http://localhost:4000/users/details', {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });

               if (!response.ok) {
                    throw new Error('Failed to retrieve user details.');
               }

               const data = await response.json();
               setUser({
                    id: data.user?._id,
                    email: data.user?.email,
                    role: data.user?.role,
               });
          } catch (error) {
               console.error('Error retrieving user details:', error);
               Swal.fire({
                    title: "Error",
                    icon: "error",
                    text: "Unable to retrieve user details.",
               });
          }
     };

     // Enable/disable submit button based on input
     useEffect(() => {
          setIsActive(email !== '' && password !== '');
     }, [email, password]);

     // Redirect if the user is logged in
     if (user?.id) {
          return <Navigate to="/dashboard" replace />;
     }

     return (
          <Form onSubmit={loginUser}>
               <h1 className="my-5 text-center">Login</h1>

               <Form.Group controlId="userEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                         type="email"
                         placeholder="Enter email"
                         value={email}
                         onChange={(e) => setEmail(e.target.value)}
                         required
                    />
               </Form.Group>

               <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                         type="password"
                         placeholder="Password"
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         required
                    />
               </Form.Group>

               <Button variant={isActive ? "primary" : "danger"} type="submit" disabled={!isActive}>
                    Submit
               </Button>
          </Form>
     );
}
