import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const courseDetails = {
  title: "Mobile App Development With Flutter",
  price: "MWK 8,000 per week",
};

const FlutterShoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    course: courseDetails.title,
    error: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null); // Checkout URL state
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      error: name === "amount" && value !== "8000" ? "Amount must be exactly MWK 8000" : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount !== "8,000") {
      setFormData((prev) => ({ ...prev, error: "Amount must be exactly MWK 8000" }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://technestbackend-j9mo.onrender.com/payments/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify({
          amount: formData.amount,
          email: formData.email,
          name: formData.name,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.data?.checkout_url) {
        setCheckoutUrl(data.data.checkout_url);
        setShowModal(true); // Open modal
      } else {
        setFormData((prev) => ({
          ...prev,
          error: "Payment initiation failed. Please try again.",
        }));
      }
    } catch (error) {
      console.error("Payment Error:", error);
      setFormData((prev) => ({
        ...prev,
        error: "An error occurred. Please try again later.",
      }));
    } finally {
      setLoading(false);
    }
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
              placeholder="Enter 8000"
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
              className={`w-full py-3 text-white rounded-lg text-lg font-bold transition ${loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>

        <div className="flex justify-center space-x-6 mt-6 text-white">
          <a href="#" className="hover:text-blue-500" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="#" className="hover:text-blue-500" aria-label="Whatsapp">
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

      {/* Modal for checkout */}
      {showModal && checkoutUrl && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Close
            </button>
            <h2 className="text-center text-xl font-bold mb-4">Complete Payment</h2>
            <iframe
              src={checkoutUrl}
              width="100%"
              height="500px"
              frameBorder="0"
              title="Payment Gateway"
              className="border-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FlutterShoppingPage;
