import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const courseDetails = {
  title: "Frontend Development with Next.js, React, and Tailwind",
  price: "MWK 6,000 per week",
};

const CourseShoppingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    course: courseDetails.title,
    error: "",
  });

  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null); // New state for the checkout URL

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      error: name === "amount" && value !== "6000" ? "Amount must be exactly MWK 6,000" : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount !== "6000") {
      setFormData((prev) => ({ ...prev, error: "Amount must be exactly MWK 6,000" }));
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/payments/pay", {
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
        setCheckoutUrl(data.data.checkout_url); // Store the checkout URL in state
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

  const handleCloseModal = () => {
    setCheckoutUrl(null); // Close the modal by resetting the URL
  };

  return (
    <div className="p-6">
      <h1 className="text-center text-3xl text-white font-bold mb-8">Course Shopping</h1>
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        {/* Form */}
        {!checkoutUrl ? (
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
                placeholder="Enter 6000"
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
        ) : (
          // Modal for checkout
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
              <h2 className="text-center text-xl font-bold text-gray-800">Complete Payment</h2>
              <iframe
                src={checkoutUrl}
                width="100%"
                height="600px"
                frameBorder="0"
                title="Payment Gateway"
                className="mt-4 border-0"
              />
              <button
                onClick={handleCloseModal}
                className="mt-4 w-full py-3 text-white bg-red-600 rounded-lg"
              >
                Cancel Payment
              </button>
            </div>
          </div>
        )}

        {/* Social media icons */}
        <div className="flex justify-center space-x-6 mt-6 text-white">
          <a href="https://www.facebook.com/profile.php?id=61574426800189" className="hover:text-blue-500" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="https://wa.me/265899622111" className="hover:text-blue-500" aria-label="Whatsapp">
            <FaWhatsapp size={24} />
          </a>
          <a href="https://x.com/badboy_trox99" className="hover:text-blue-400" aria-label="Twitter">
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
