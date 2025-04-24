import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const ProductDetails = {
  product: "Adderall",
  price: 3000,
};

const AdderalpayementPage = () => {
  const [formData, setFormData] = useState({
    CustomerName: "",
    phonenumber: "",
    Location: "",
    quantity: 1,
    amount: ProductDetails.price,
    Description: "",
    DeliveryOption: "",
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

    if (name === "quantity") {
      const qty = parseInt(value, 10) || 1;
      const baseAmount = qty * ProductDetails.price;
      const deliveryFee = formData.DeliveryOption === "Delivery" ? 300 : 0;

      setFormData((prev) => ({
        ...prev,
        quantity: qty,
        amount: baseAmount + deliveryFee,
        error: "",
      }));
    } else if (name !== "amount") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        error: "",
      }));
    }
  };

  const handleDeliveryChange = (e) => {
    const value = e.target.value;
    const qty = formData.quantity || 1;
    const baseAmount = qty * ProductDetails.price;
    const deliveryFee = value === "Delivery" ? 300 : 0;

    setFormData((prev) => ({
      ...prev,
      DeliveryOption: value,
      amount: baseAmount + deliveryFee,
      Location: value === "Delivery" ? prev.Location : "", // Keep if delivery, clear if self-pickup
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
     // public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC",
      public_key:"pub-live-Gdy7z1FBCG44EyGR2C58yWkpOWmRbdzt" ,
      tx_ref,
      amount: formData.amount,
      currency: "MWK",
      callback_url: `https://technestsystems265.site/virtuals/adderalpaymentsucess?&name=${encodeURIComponent(formData.CustomerName)}&price=${encodeURIComponent(formData.amount)}&description=${encodeURIComponent(formData.Description)}&Location=${encodeURIComponent(formData.Location)}&Quantity=${encodeURIComponent(formData.quantity)}&phoneNumber=${encodeURIComponent(formData.phonenumber)}&Deliveryoption=${encodeURIComponent(formData.DeliveryOption)}&OrderNumber=${encodeURIComponent(tx_ref)}&Date=${encodeURIComponent(formData.date)}`,
      customer: {
        email: formData.email,
        first_name: formData.CustomerName.split(" ")[0],
        last_name: formData.CustomerName.split(" ").slice(1).join(" "),
      },
      customization: {
        title: "Adderal Payment",
        description: ProductDetails.product,
      },
    });
  };

  return (
    <div className="p-6">
      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-2xl text-white font-bold mb-8">Buy Adderall</h1>

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
            <label className="block text-white">Phone Number</label>
            <input
              type="text"
              name="phonenumber"
              placeholder="Enter Your PhoneNumber"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.phonenumber}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white">Location</label>
            <input
              type="text"
              name="Location"
              placeholder="Mbelwa 15, chilembwe 12, chikanda, Incah, Flats etc"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.Location}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="1"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-white">Description</label>
            <input
              type="text"
              name="Description"
              placeholder="I will collect around 9am today, come at 6pm"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.Description}
              onChange={handleChange}
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
            <label className="block text-white">Delivery Option</label>
            <select
              name="DeliveryOption"
              className="w-full p-3 rounded-lg border border-gray-700 text-white bg-gray-800"
              value={formData.DeliveryOption}
              onChange={handleDeliveryChange}
              required
            >
              <option value="">Select Delivery Option</option>
              <option value="Self Pickup">Self Pickup in Mbelwa 15</option>
              <option value="Delivery">Delivery to my place</option>
            </select>
          </div>

          {formData.DeliveryOption === "Delivery" && (
            <p className="text-red-500 mt-2">
              Delivery will attract a fee of K300. Your delivery address will be used as provided above.
            </p>
          )}

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

export default AdderalpayementPage;
