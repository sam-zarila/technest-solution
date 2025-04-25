import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const AdderalPaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    const statusParam = searchParams.get("status");
    const name = searchParams.get("name");
    const Description = searchParams.get("Description");
    const price = parseInt(searchParams.get("price") || "0", 10);
    const phoneNumber = searchParams.get("phoneNumber");
    const location = searchParams.get("location");
    const deliveryOption = searchParams.get("deliveryoption");
    const quantity = parseInt(searchParams.get("Quantity") || "0", 10);

    const validStatuses = ["successful", "completed", "paid"];
    const isStatusValid = statusParam
      ? validStatuses.includes(statusParam.toLowerCase())
      : true;

    if (!tx_ref || !isStatusValid) {
      setStatus("❌ Payment failed or cancelled.");
      setTimeout(() => navigate("/"), 2000);
      return;
    }

    const purchaseDate = new Date().toISOString();
    const orderData = {
      orderNumber: tx_ref,
      customerName: name,
      Description,
      price,
      purchaseDate,
      phoneNumber,
      location,
      deliveryOption,
      quantity,
    };

    setOrder(orderData);
    setStatus("✅ Payment successful! Confirmation below:");

    // Send email
    emailjs
      .send(
        "service_gw5ypqa",
        "template_6m5fwf6",
        {
          name,
          phoneNumber,
          tx_ref,
          deliveryOption: deliveryOption,
          location: location,          
          Description,
          quantity,
          amount: price,
          date: new Date(purchaseDate).toLocaleString(),
        },
        "HlMFIQVluZ-Bfo1qv"
      )
      .then(() => console.log("📧 Payment notification sent"))
      .catch((err) => console.error("❌ EmailJS error:", err));

    // Auto redirect after 10s
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, [searchParams, navigate]);

  const generateDownload = () => {
    if (!order) return;
    const content = `
Adderall Order Confirmation for ${order.customerName}
------------------------------------------------
Order Number: ${order.orderNumber}
Customer Name: ${order.customerName}
Phone Number: ${order.phoneNumber}
Quantity: ${order.quantity}
Description: ${order.Description}
Amount Paid: MWK ${order.price}
Delivery Option: ${order.deliveryOption}
Delivery Location: ${order.location}
Purchase Date: ${new Date(order.purchaseDate).toLocaleString()}

✅ Stay focused and active, study overnight, and save the semester. All the best!
    `;
    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Order-${order.customerName}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        fontSize: 18,
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1>Payment Status</h1>
      <p>{status}</p>

      {order && (
        <div
          style={{
            marginTop: "2rem",
            backgroundColor: "#f9fafb",
            color: "#111827",
            padding: "1.5rem",
            borderRadius: "10px",
            maxWidth: "600px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "left",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "#10b981" }}>
            ✅ Addy Order Details
          </h3>
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Phone:</strong> {order.phoneNumber}</p>
          <p><strong>Description:</strong> {order.Description}</p>
          <p><strong>Quantity:</strong> {order.quantity}</p>
          <p><strong>Amount Paid:</strong> MWK {order.price}</p>
          <p><strong>Delivery Option:</strong> {order.deliveryOption}</p>
          <p><strong>Delivery Location:</strong> {order.location}</p>
          <p><strong>Purchase Date:</strong> {new Date(order.purchaseDate).toLocaleDateString()}</p>

          <button
            onClick={generateDownload}
            style={{
              marginTop: "1.5rem",
              backgroundColor: "#10b981",
              color: "white",
              padding: "0.75rem 1.5rem",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: "bold",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
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
