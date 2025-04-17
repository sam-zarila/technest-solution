<<<<<<< HEAD
import React, { useState, useEffect } from 'react';

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    CustomerName: '',
    email: '',
    phone: '',
    amount: '',
    date: ''
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
      });
    };
=======
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const ProductDetails = {
  product: "Spotify Premium",
  price: "MWK 3,000 per month",
};

const numericAmount = "3500"; // Fixed price

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    CustomerName: "",
    email: "",
    amount: numericAmount,
    product: ProductDetails.product,
    date: new Date().toISOString().split("T")[0],
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
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a

    loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
      .then(() => loadScript("https://in.paychangu.com/js/popup.js"))
      .catch((err) => console.error("Script loading failed:", err));

    return () => {
      document
        .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
<<<<<<< HEAD
        .forEach((script) => script.parentNode?.removeChild(script));
=======
        .forEach((script) => document.body.removeChild(script));
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
<<<<<<< HEAD
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === "amount" && value !== "3000") {
      setError("Amount must be exactly 3,000");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.amount !== "3000") {
      setError("Amount must be exactly 3,000");
      return;
    }

    if (!window.PaychanguCheckout) {
      setError("Payment gateway is still loading. Please wait.");
=======
    if (name === "amount") return; // Don't allow amount to change

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      error: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!window.PaychanguCheckout) {
      setFormData((prev) => ({ ...prev, error: "Payment gateway is still loading. Please wait." }));
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
      return;
    }

    setLoading(true);

<<<<<<< HEAD
    window.PaychanguCheckout({
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC",
      tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      amount: formData.amount,
      currency: "MWK",
=======
    const tx_ref = "TX-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    window.PaychanguCheckout({
    //  public_key: "pub-live-Gdy7z1FBCG44EyGR2C58yWkpOWmRbdzt",
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC",
      tx_ref,
      amount: formData.amount,
      currency: "MWK",                ///virtuals/chatgpt
      callback_url:  `https://technestsystems265.site/virtuals/paymentsuccess`,
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
      customer: {
        email: formData.email,
        first_name: formData.CustomerName.split(" ")[0],
        last_name: formData.CustomerName.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Spotify Premium Payment",
<<<<<<< HEAD
        description: formData.CustomerName,
      },
      meta: {
        spotify: formData.amount,
      },
      onclose: async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/create`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              CustomerName: formData.CustomerName,
              email: formData.email,
              product: "Spotify premium",
              purchaseDate: formData.date,
              price: 3000,
              maxPeople: 5
            }),
          });

          const result = await response.json();
          if (response.ok) {
            alert("Order saved successfully!");
            setFormData({
              CustomerName: '',
              email: '',
              phone: '',
              amount: '',
              date: ''
            });
          } else {
            setError(result.message || "Failed to save order.");
          }
        } catch (err) {
          console.error(err);
          setError("Error saving order.");
        } finally {
          setLoading(false);
        }
      }
=======
        description: ProductDetails.product,
      },
      onclose: async () => {
        try {
          const response = await fetch("https://technestbackend-1.onrender.com/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              CustomerName: formData.CustomerName,
              email: formData.email,
              product: formData.product,
              purchaseDate: formData.date,
              price: parseInt(formData.amount),
              maxPeople: 8,
              tx_ref,
            }),
          });

          const contentType = response.headers.get("content-type");
          const result = contentType?.includes("application/json")
            ? await response.json()
            : {};

          if (!response.ok) throw new Error(result.message || "Order failed to save.");

          alert("✅ Payment successful! Order saved.");
          setFormData({
            CustomerName: "",
            email: "",
            amount: numericAmount,
            product: ProductDetails.product,
            date: new Date().toISOString().split("T")[0],
            error: "",
          });
        } catch (err) {
          console.error("🚫 Failed to save order:", err);
          setFormData((prev) => ({
            ...prev,
            error: "Order saving failed. Please contact support.",
          }));
        } finally {
          setLoading(false);
        }
      },
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
    });
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] px-4">
      <div className="w-full max-w-lg bg-[#1e293b] text-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Shop Spotify Premium</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="CustomerName" className="block text-sm font-medium mb-1">Namehyutyujo</label>
            <input
              type="text"
              id="CustomerName"
              name="CustomerName"
              value={formData.CustomerName}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl text-white font-bold mb-8">Buy Spotify Premium</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white">Full Name</label>
            <input
              type="text"
              name="CustomerName"
              placeholder="Enter your full name"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.CustomerName}
              onChange={handleChange}
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
              required
            />
          </div>

          <div>
<<<<<<< HEAD
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
            <label className="block text-white">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.email}
              onChange={handleChange}
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
              required
            />
          </div>

          <div>
<<<<<<< HEAD
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="3000"
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
=======
            <label className="block text-white">Amount (MWK)</label>
            <input
              type="text"
              name="amount"
              readOnly
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800 cursor-not-allowed"
              value={formData.amount}
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
            />
          </div>

          <div>
<<<<<<< HEAD
            <label htmlFor="date" className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
=======
            <label className="block text-white">Product</label>
            <input
              type="text"
              name="product"
              readOnly
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.product}
            />
          </div>

          {formData.error && <p className="text-red-500 mt-1">{formData.error}</p>}
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a

          <button
            type="submit"
            disabled={loading}
<<<<<<< HEAD
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg"
=======
            className={`w-full py-3 text-white rounded-lg text-lg font-bold transition ${
              loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
            }`}
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
<<<<<<< HEAD
      </div>
=======

        <div className="flex justify-center space-x-6 mt-6 text-white">
          <FaFacebook size={24} />
          <FaWhatsapp size={24} />
          <FaTwitter size={24} />
          <FaLinkedin size={24} />
        </div>
      </div>

      <div id="wrapper"></div>
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
    </div>
  );
};

<<<<<<< HEAD
export default PaymentPage;
=======
export default PaymentPage;
>>>>>>> 0ebe1374b1179131b8b805c4b1f384dcebfc920a
