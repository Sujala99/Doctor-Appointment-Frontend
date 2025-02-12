import React from "react";
import Form from "../../../components/form";
import Sidebar from "../../../components/sidebar";

function AddPatient() {


  const [user, setUser] = useState({
      fullName: "",
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
      address: "",
      gender: "",
      age: "",
      
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setUser((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      const token = localStorage.getItem('token');  // Get token from localStorage
    
      // Prepare the doctor data from the form state
      const doctorData = {
        username: user.username,
        email: user.email,
        fullname: user.fullName,
        password: user.password,
        phonenumber: user.phoneNumber,
        gender: user.gender,
        dob: user.age,  // Use age or date of birth depending on your backend's expectation
      };
    
      // Send data to backend API
      fetch('http://localhost:4000/users/addUser', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,  // Ensure you're sending the JWT token for authentication
        },
        body: JSON.stringify(userData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((errorData) => {
              throw new Error(errorData.message || "Failed to add user");
            });
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              icon: "error",
              title: "Unsuccessful Doctor Creation",
              text: data.message,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "Doctor Added Successfully",
            });
            // Optionally navigate to another page after successful submission
            navigate("/doctor");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
          });
        });
    };
    
  
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed on the left) */}
      <Sidebar />

      {/* Main Content (Takes remaining space) */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Add Patient</h2>

        {/* Responsive Form Container */}
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <Form />
        </div>
      </div>
    </div>
  );
}

export default AddPatient;
