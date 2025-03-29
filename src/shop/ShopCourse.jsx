// import React, { useState } from "react";
// import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// const courseDetails = {
//   title: "Frontend Development with Next.js, React, and Tailwind",
//   price: "MWK 6,000 per week",
// };

// const CourseShoppingPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     amount: "",
//     course: courseDetails.title,
//     error: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [checkoutUrl, setCheckoutUrl] = useState(null); // Checkout URL state
//   const [showModal, setShowModal] = useState(false); // Modal visibility state

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//       error: name === "amount" && value !== "6000" ? "Amount must be exactly MWK 6,000" : "",
//     }));
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   if (formData.amount !== "6000") {
//   //     setFormData((prev) => ({ ...prev, error: "Amount must be exactly MWK 6,000" }));
//   //     return;
//   //   }

//   //   setLoading(true);

//   //   try {
//   //     const response = await fetch("https://technestbackend-j9mo.onrender.com/payments/pay", {
//   //       method: "POST",
//   //       headers: {
//   //         "Content-Type": "application/json",
//   //         Accept: "*/*",
//   //       },
//   //       body: JSON.stringify({
//   //         amount: formData.amount,
//   //         email: formData.email,
//   //         name: formData.name,
//   //       }),
//   //     });

//   //     const data = await response.json();

//   //     if (response.ok && data?.data?.checkout_url) {
//   //       setCheckoutUrl(data.data.checkout_url);
//   //       setShowModal(true); // Open modal
//   //     } else {
//   //       setFormData((prev) => ({
//   //         ...prev,
//   //         error: "Payment initiation failed. Please try again.",
//   //       }));
//   //     }
//   //   } catch (error) {
//   //     console.error("Payment Error:", error);
//   //     setFormData((prev) => ({
//   //       ...prev,
//   //       error: "An error occurred. Please try again later.",
//   //     }));
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   return (
//     <div className="p-6">
//       <h1 className="text-center text-3xl text-white font-bold mb-8">Course Shopping</h1>
//       <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label htmlFor="name" className="block text-white">Full Name</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter your full name"
//             />
//           </div>
//           <div>
//             <label htmlFor="email" className="block text-white">Email Address</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter your email address"
//             />
//           </div>
//           <div>
//             <label htmlFor="amount" className="block text-white">Amount (MWK)</label>
//             <input
//               type="number"
//               id="amount"
//               name="amount"
//               value={formData.amount}
//               onChange={handleChange}
//               required
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//               placeholder="Enter 6000"
//             />
//             {formData.error && <p className="text-red-500 mt-2">{formData.error}</p>}
//           </div>
//           <div>
//             <label htmlFor="course" className="block text-white">Course</label>
//             <input
//               type="text"
//               id="course"
//               name="course"
//               value={formData.course}
//               disabled
//               className="w-full p-3 mt-2 rounded-lg border border-gray-700 text-white bg-gray-800"
//             />
//           </div>
//           <div>
//             <button
//               type="submit"
//               className={`w-full py-3 text-white rounded-lg text-lg font-bold transition ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
//               disabled={loading}
//             >
//               {loading ? "Processing..." : "Pay Now"}
//             </button>
//           </div>
//         </form>

//         <div className="flex justify-center space-x-6 mt-6 text-white">
//           <a href="#" className="hover:text-blue-500" aria-label="Facebook">
//             <FaFacebook size={24} />
//           </a>
//           <a href="#" className="hover:text-blue-500" aria-label="Whatsapp">
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

//       {/* Modal for checkout */}
//       {showModal && checkoutUrl && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
//             <button
//               onClick={() => setShowModal(false)}
//               className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Close
//             </button>
//             <h2 className="text-center text-xl font-bold mb-4">Complete Payment</h2>
//             <iframe
//               src={checkoutUrl}
//               width="100%"
//               height="500px"
//               frameBorder="0"
//               title="Payment Gateway"
//               className="border-0"
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CourseShoppingPage;
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const courseDetails = {
  title: "Frontend Development with Next.js, React, and Tailwind",
  price: "MWK 6,000 per week",
};

const CourseShoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "6000",
    course: courseDetails.title,
    error: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadScript = (src) =>
      new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });

    loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
      .then(() => loadScript("https://in.paychangu.com/js/popup.js"))
      .catch((err) => console.error("Script loading failed:", err));

    return () => {
      document
        .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
        .forEach((script) => document.body.removeChild(script));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      error: name === "amount" && value !== "6000" ? "Amount must be exactly MWK 6,000" : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.amount !== "6000") {
      setFormData((prev) => ({ ...prev, error: "Amount must be exactly MWK 6,000" }));
      return;
    }

    if (!window.PaychanguCheckout) {
      setFormData((prev) => ({ ...prev, error: "Payment gateway is still loading. Please wait." }));
      return;
    }

    setLoading(true);

    window.PaychanguCheckout({
      public_key: "pub-test-Z2fK1oH31qEvBjtf7FnBhp6CtMZ0vpMW", // replace this
      tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      amount: formData.amount,
      currency: "MWK",
      callback_url: "https://technestsystems.netlify.app/", // replace this
      customer: {
        email: formData.email,
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Course Payment",
        description: courseDetails.title,
      },
      meta: {
        course: formData.course,
      },
    });

    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl text-white font-bold mb-8">Course Shopping</h1>
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white">Amount (MWK)</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter 6000"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            {formData.error && <p className="text-red-500 mt-1">{formData.error}</p>}
          </div>

          <div>
            <label className="block text-white">Course</label>
            <input
              type="text"
              name="course"
              disabled
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.course}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-lg text-lg font-bold transition ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>

        <div className="flex justify-center space-x-6 mt-6 text-white">
          <FaFacebook size={24} />
          <FaWhatsapp size={24} />
          <FaTwitter size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>

      {/* Required Paychangu element */}
      <div id="wrapper"></div>
    </div>
  );
};

export default CourseShoppingPage;
