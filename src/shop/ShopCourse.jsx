import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp,} from "react-icons/fa";

const courseDetails = {
  title: "Frontend Development with Next.js, React, and Tailwind",
  price: "MWK 10,000 per week",
};

const CourseShoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    course: courseDetails.title,
    error: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      error: name === "amount" && value !== "10000" ? "Amount must be exactly MWK 10,000" : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.amount !== "10000") {
      setFormData((prev) => ({ ...prev, error: "Amount must be exactly MWK 10,000" }));
      return;
    }
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
            <label htmlFor="amount" className="block text-white">Amount (MWK)</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
              placeholder="Enter 10000"
            />
            {formData.error && <p className="text-red-500 mt-2">{formData.error}</p>}
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
              Pay Now
            </button>
          </div>
        </form>
        <div className="flex justify-center space-x-6 mt-6 text-white">
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <FaWhatsapp size={24} />
          </a>
          <a href="#" className="hover:text-blue-400" aria-label="Twitter">
             <FaTwitter size={24} />
           </a>
           <a href="#" className="hover:text-blue-700" aria-label="LinkedIn">
             <FaLinkedin size={24} />
           </a>
        </div>
      </div>
    </div>
  );
};

export default CourseShoppingPage;


// import React, { useState } from "react";
// import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp,} from "react-icons/fa";

// const courseDetails = {
//   title: "Frontend Development with Next.js, React, and Tailwind",
//   price: 10000, // Fixed amount
// };

// const CourseShoppingPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     amount: "",
//     course: courseDetails.title,
//     error: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "amount") {
//       if (parseInt(value) !== courseDetails.price) {
//         setFormData((prev) => ({ ...prev, error: "Amount must be MWK 10,000" }));
//       } else {
//         setFormData((prev) => ({ ...prev, error: "", amount: value }));
//       }
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (formData.error) return;
//     console.log("Form submitted with data: ", formData);
//   };

//   return (
//     <div className="p-6">
//       <h1 className="text-center text-3xl text-white font-bold mb-8">Course Shopping</h1>
//       <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-white">Full Name</label>
//             <input
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter your full name"
//             />
//           </div>
//           <div>
//             <label className="block text-white">Email Address</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter your email address"
//             />
//           </div>
//           <div>
//             <label className="block text-white">Amount (MWK)</label>
//             <input
//               type="number"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter MWK 10,000"
//             />
//             {formData.error && <p className="text-red-500 text-sm mt-2">{formData.error}</p>}
//           </div>
//           <div>
//             <label className="block text-white">Course</label>
//             <input
//               type="text"
//               name="course"
//               value={formData.course}
//               disabled
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//             />
//           </div>

//           <button
//             type="submit"
//             className={`w-full py-3 text-white rounded-lg text-lg font-bold transition ${formData.error ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
//             disabled={formData.error}
//           >
//             Pay Now
//           </button>
//         </form>

//         {/* Social Media Links */}
//         <div className="flex justify-center space-x-6 mt-6 text-white">
//           <a href="#" className="hover:text-blue-500" aria-label="Facebook">
//             <FaFacebook size={24} />
//           </a>
//           <a href="#" className="hover:text-blue-500" aria-label="Facebook">
//             <FaWhatsapp size={24} />
//           </a>
//           <a href="#" className="hover:text-blue-400" aria-label="Twitter">
//             <FaTwitter size={24} />
//           </a>
//           <a href="#" className="hover:text-blue-700" aria-label="LinkedIn">
//             <FaLinkedin size={24} />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseShoppingPage;
