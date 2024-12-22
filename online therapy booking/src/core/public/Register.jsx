// import { useContext, useEffect, useState } from 'react';
// import { Button, Form } from 'react-bootstrap';
// import { Navigate, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import UserContext from '../UserContext';

// export default function Register() {
//     const { user } = useContext(UserContext);
//     const navigate = useNavigate();

//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [role, setRole] = useState('user');
//     const [isActive, setIsActive] = useState(false);

//     // Registration handler
//     const registerUser = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:4000/users/register', {
//                 method: 'POST',
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ username, email, password, role }),
//             });

//             if (!response.ok) {
//                 if (response.status === 400) {
//                     throw new Error("User already exists with this email.");
//                 }
//                 throw new Error(`Server error: ${response.status}`);
//             }

//             const data = await response.json();

//             Swal.fire({
//                 title: "Registration Successful",
//                 icon: "success",
//                 text: `Welcome ${data.username}, you can now log in.`,
//             }).then(() => {
//                 navigate('/login'); // Redirect to login page
//             });
//         } catch (error) {
//             console.error('Error during registration:', error);
//             Swal.fire({
//                 title: "Error",
//                 icon: "error",
//                 text: error.message,
//             });
//         }
//     };

//     // Enable/disable submit button based on input
//     useEffect(() => {
//         setIsActive(username !== '' && email !== '' && password !== '');
//     }, [username, email, password]);

//     return (
//         user?.id ? (
//             <Navigate to="/dashboard" replace /> // Redirect if user is logged in
//         ) : (
//             <Form onSubmit={registerUser}>
//                 <h1 className="my-5 text-center">Register</h1>

//                 <Form.Group controlId="username">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type="text"
//                         placeholder="Enter username"
//                         value={username}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="userEmail">
//                     <Form.Label>Email address</Form.Label>
//                     <Form.Control
//                         type="email"
//                         placeholder="Enter email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="password">
//                     <Form.Label>Password</Form.Label>
//                     <Form.Control
//                         type="password"
//                         placeholder="Enter password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="role">
//                     <Form.Label>Role</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                     >
//                         <option value="user">User</option>
//                         <option value="doctor">Doctor</option>
//                     </Form.Control>
//                 </Form.Group>

//                 {isActive ?
//                     <Button variant="primary" type="submit">
//                         Submit
//                     </Button>
//                     :
//                     <Button variant="danger" type="submit" disabled>
//                         Submit
//                     </Button>
//                 }
//             </Form>
//         )
//     );
// }



import { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function Register() {
    const userContext = useContext(UserContext); // Safely access context
    if (!userContext) {
        console.error("UserContext is not provided!");
        return <Navigate to="/" replace />;
    }

    const { user } = userContext;
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [isActive, setIsActive] = useState(false);

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, role }),
            });

            if (!response.ok) {
                if (response.status === 400) {
                    throw new Error("User already exists with this email.");
                }
                throw new Error(`Server error: ${response.status}`);
            }

            const data = await response.json();
            Swal.fire({
                title: "Registration Successful",
                icon: "success",
                text: `Welcome ${data.username}, you can now log in.`,
            }).then(() => {
                navigate("/login"); // Redirect to login page
            });
        } catch (error) {
            console.error("Error during registration:", error);
            Swal.fire({
                title: "Error",
                icon: "error",
                text: error.message,
            });
        }
    };

    useEffect(() => {
        setIsActive(username !== "" && email !== "" && password !== "");
    }, [username, email, password]);

    return user?.id ? (
        <Navigate to="/dashboard" replace />
    ) : (
        <Form onSubmit={registerUser}>
            <h1 className="my-5 text-center">Register</h1>

            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>

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
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="role">
                <Form.Label>Role</Form.Label>
                <Form.Control as="select" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="user">User</option>
                    <option value="doctor">Doctor</option>
                </Form.Control>
            </Form.Group>

            {isActive ? (
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            ) : (
                <Button variant="danger" type="submit" disabled>
                    Submit
                </Button>
            )}
        </Form>
    );
}
