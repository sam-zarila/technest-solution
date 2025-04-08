import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    PaychanguCheckout?: (options: any) => void;
  }
}

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    date: ''
  });
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  
  // Dynamically load jQuery and Paychangu checkout scripts
  useEffect(() => {
    const loadScript = (src: string): Promise<void> => {
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
      
    // Cleanup the scripts on component unmount
    return () => {
      document
        .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
        .forEach((script) => script.parentNode?.removeChild(script));
    };
  }, []);
  
  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "amount" && value !== "20,000") {
      setError("Amount must be exactly 20,000");
    } else {
      setError("");
    }
  };
  
  // Submit form and trigger the checkout
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.amount !== "20,000") {
      setError("Amount must be exactly 20,000");
      return;
    }
    
    if (!window.PaychanguCheckout) {
      setError("Payment gateway is still loading. Please wait.");
      return;
    }
    
    setLoading(true);
    
    window.PaychanguCheckout({
      public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC", // Replace with your public key
      tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
      amount: formData.amount,
      currency: "MWK",
      callback_url: "https://technestsystems.netlify.app/", // Replace with your callback URL
      customer: {
        email: formData.email,
        first_name: formData.name.split(" ")[0],
        last_name: formData.name.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Course Payment",
        description: formData.name,
      },
      meta: {
        spotify: formData.amount,
      },
    });
    
    setLoading(false);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Shop Spotify</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          
          {/* Phone Field */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 mb-1">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          
          {/* Amount Field */}
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-1">
              Amount (must be exactly 20,000)
            </label>
            <input 
              type="text" 
              id="amount" 
              name="amount" 
              value={formData.amount}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              placeholder="20,000"
              required
            />
          </div>
          
          {/* Date Field */}
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 mb-1">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              required
            />
          </div>
          
          {/* Display error messages */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
