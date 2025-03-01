import React from "react";

function Form() {
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
    <form>
      {/* Full Name */}
      <div className="mt-4">
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your full name"
        />
      </div>

      {/* Username */}
      <div className="mt-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          type="text"
          id="username"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Choose a username"
        />
      </div>

      {/* Email */}
      <div className="mt-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          onChange={handleChange}
          id="email"
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your email"
        />
      </div>

      {/* Phone Number */}
      <div className="mt-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your phone number"
        />
      </div>

      {/* Address */}
      <div className="mt-4">
        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
          Address
        </label>
        <input
          type="text"
          id="address"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="1234 Main St"
        />
      </div>

      {/* Gender */}
      <div className="mt-4">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <select
          id="gender"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled selected>
            Select your gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Age */}
      <div className="mt-4">
        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          id="age"
          onChange={handleChange}
          className="mt-1 w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your age"
          min="0"
        />
      </div>

      

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}

export default Form;
