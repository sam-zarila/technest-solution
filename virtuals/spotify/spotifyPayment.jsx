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

    loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
      .then(() => loadScript("https://in.paychangu.com/js/popup.js"))
      .catch((err) => console.error("Script loading failed:", err));

    return () => {
      document
        .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
        .forEach((script) => script.parentNode?.removeChild(script));
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      return;
    }

    setLoading(true);

    window.PaychanguCheckout({
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC",
      tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      amount: formData.amount,
      currency: "MWK",
      customer: {
        email: formData.email,
        first_name: formData.CustomerName.split(" ")[0],
        last_name: formData.CustomerName.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Spotify Premium Payment",
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
    });
  };

  return (
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
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#0f172a] text-white border border-gray-600 px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
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
            />
          </div>

          <div>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold py-2 rounded-lg"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
