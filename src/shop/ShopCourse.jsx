import React, { useState } from "react";

// Basic course details (you can dynamically change this based on the course)
const courseDetails = {
  title: "Frontend Development with Next.js, React, and Tailwind",
  price: "MWK 10,000 per week",
};

const CourseShoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    course: courseDetails.title,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to backend)
    console.log("Form submitted with data: ", formData);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl text-white font-bold mb-8">Course Shopping</h1>
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-white">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
              placeholder="Enter your email address"
            />
          </div>
          <div>
            <label htmlFor="course" className="block text-white">Course</label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              disabled
              className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
            >
              Enroll in Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseShoppingPage;
