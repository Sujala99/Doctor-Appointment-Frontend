import React from "react";

function Form() {
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
