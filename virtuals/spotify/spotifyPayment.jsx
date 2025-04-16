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
      return;
    }

    setLoading(true);

    const tx_ref = "TX-" + Date.now() + "-" + Math.floor(Math.random() * 1000);

    window.PaychanguCheckout({
      public_key: "pub-live-Gdy7z1FBCG44EyGR2C58yWkpOWmRbdzt",
      tx_ref,
      amount: formData.amount,
      currency: "MWK",   
                   ///virtuals/chatgpt
                   callback_url:` https://technestsystems265.site/Virtuals/paymentsuccess?email=${formData.email}&name=${encodeURIComponent(formData.CustomerName)}&product=${encodeURIComponent(formData.product)}&price=${formData.amount}`,
      // callback_url:  `http://localhost:5173/virtuals/paymentsuccess?email=${formData.email}&name=${encodeURIComponent(formData.CustomerName)}&product=${encodeURIComponent(formData.product)}&price=${formData.amount}`,
      customer: {
        email: formData.email,
        first_name: formData.CustomerName.split(" ")[0],
        last_name: formData.CustomerName.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Spotify Premium Payment",
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
    });
  };

  return (
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
              type="text"
              name="amount"
              readOnly
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800 cursor-not-allowed"
              value={formData.amount}
            />
          </div>

          <div>
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

      <div id="wrapper"></div>
    </div>
  );
};

export default PaymentPage;
