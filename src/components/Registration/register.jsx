import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const StudentCourseRegistrationForm = () => {
  // Optionally, extract the transaction reference from the URL query parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const txRef = queryParams.get("tx_ref");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    course: "Frontend Development with Next.js, React, and Tailwind",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation: check if required fields are filled
    if (!formData.fullName || !formData.email || !formData.phone) {
      setError("Please fill in all the required fields.");
      return;
    }

    setError("");
    // Here you can add your API call or any further processing logic
    // For now, we simulate a successful registration:
    setSuccess("Registration successful! We will get in touch soon.");
  };

  return (
    <div className="p-6 mt-10 flex justify-center items-center min-h-screen bg-gray-900">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Student Registration</h1>
        {txRef && (
          <p className="text-sm text-center text-gray-600">
            Transaction Reference: {txRef}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="w-full border border-gray-300 p-3 rounded-lg mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full border border-gray-300 p-3 rounded-lg mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 p-3 rounded-lg mt-1"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="w-full border border-gray-300 p-3 rounded-lg mt-1"
            />
          </div>
          <div>
            <label className="block text-gray-700">Course</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              disabled
              className="w-full border border-gray-300 p-3 rounded-lg mt-1 bg-gray-200"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-bold mt-4"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentCourseRegistrationForm;
