import React, { useEffect, useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const courseDetails = {
  title: "Backend Development with NestJS, Python, and Firebase",
  price: "MWK 10,000 per week",
};

const BackendhoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    course: courseDetails.title,
    error: "",
  });
  const [loading, setLoading] = useState(false);
 // Modal visibility state
 useEffect(()=>{
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
    }
   
 },[])

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
    if (formData.amount!== "10000") {
      setFormData((prev) => ({...prev, error: "Amount must be exactly MWK 10,000" }));
      return;
    }
   if (!window.PaychanguCheckout) {
      setFormData((prev) => ({ ...prev, error: "Payment gateway is still loading. Please wait." }));
      return;
    }
    setLoading(true);

    window.PaychanguCheckout({
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC", // replace this
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
  }

  



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
                placeholder="Enter 10000"
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
    )
};

export default BackendhoppingPage;
