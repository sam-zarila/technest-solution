import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com"; // ✅ import emailjs

const AdderalPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    const statusParam = searchParams.get("status");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const product = searchParams.get("product");
    const price = parseInt(searchParams.get("price"));
    const phonenumber = searchParams.get("phonenumber");
    const location = searchParams.get("location");
    const deliveryoption = searchParams.get("deliveryoption");
    const quantity = parseInt(searchParams.get("quantity"));

    const validStatuses = ["successful", "completed", "paid"];

    if (!tx_ref || !validStatuses.includes((statusParam || "").toLowerCase())) {
      setStatus("❌ Payment failed or cancelled.");
      setTimeout(() => {
        navigate("/"); // or a custom fail page
      }, 2000);
      return;
    }

    const purchaseDate = new Date().toISOString();
    const orderData = {
      orderNumber: tx_ref,
      CustomerName: name,
      email,
      product,
      price,
      purchaseDate,
      phonenumber,
      location,
      deliveryoption,
      quantity,
    };

    setOrder(orderData);
    setStatus("✅ Payment successful! Confirmation below:");

    // ✅ Send notification via EmailJS
    emailjs.send(
      "your_service_id",     // Replace with your actual service ID
      "your_template_id",    // Replace with your actual template ID
      {
        customer_name: name,
        customer_email: email,
        customer_phone: phonenumber,
        order_id: tx_ref,
        product_name: product,
        delivery_location: location,
        delivery_option: deliveryoption,
        quantity: quantity,
        amount: price,
        date: new Date(purchaseDate).toLocaleString()
      },
      "your_user_id_or_public_key" // Replace with your EmailJS user/public key
    ).then(
      () => console.log("📧 Payment notification sent successfully"),
      (error) => console.error("❌ EmailJS error:", error)
    );
  }, [searchParams, navigate]);

  const handleDownload = () => {
    if (!order) return;

    const content = `
Order Confirmation for ${order.CustomerName}
------------------------------------------------
Order Number: ${order.orderNumber}
Customer Name: ${order.CustomerName}
Email: ${order.email}
Phone Number: ${order.phonenumber}
Product: ${order.product}
Quantity: ${order.quantity}
Amount Paid: MWK ${order.price}
Delivery Option: ${order.deliveryoption}
Delivery Location: ${order.location}
Purchase Date: ${new Date(order.purchaseDate).toDateString()}

✅ Stay focus🧘🏻 and stay active ,study 📖 overnight and
  save the semester,No side effects,Wishing you nice studies All the best.
    `;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Order-${order.orderNumber}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      fontSize: 18,
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      padding: "2rem",
      textAlign: "center",
    }}>
      <h1>Payment Status</h1>
      <p>{status}</p>

      {order && (
        <div style={{
          marginTop: "2rem",
          backgroundColor: "#f9fafb",
          color: "#111827",
          padding: "1.5rem",
          borderRadius: "10px",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
        }}>
          <h3 style={{ marginBottom: "1rem", color: "#10b981" }}>✅ Order Details</h3>
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Customer Name:</strong> {order.CustomerName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phonenumber}</p>
          <p><strong>Product:</strong> {order.product}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Amount Paid:</strong> MWK {order.price}</p>
          <p><strong>Delivery Option:</strong> {order.deliveryoption}</p>
          <p><strong>Delivery Location:</strong> {order.location}</p>
          <p><strong>Purchase Date:</strong> {new Date(order.purchaseDate).toDateString()}</p>

          <button
            onClick={handleDownload}
            style={{
              marginTop: "1.5rem",
              padding: "0.5rem 1.2rem",
              backgroundColor: "#10b981",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: 16,
            }}
          >
            ⬇️ Download Confirmation
          </button>
        </div>
      )}
    </div>
  );
};

export default AdderalPaymentSuccess;
