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
    const location = searchParams.get("Location");
    const deliveryOption = searchParams.get("Deliveryoption");
    const quantity = parseInt(searchParams.get("Quantity") || "0", 10);

    // Treat as success if tx_ref exists, or if statusParam indicates success
    const validStatuses = ["successful", "completed", "paid"];
    const isStatusValid =
      statusParam
        ? validStatuses.includes(statusParam.toLowerCase())
        : true; // assume success if no status provided

    if (!tx_ref || !isStatusValid) {
      setStatus("❌ Payment failed or cancelled.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
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

    // Send EmailJS notification
    emailjs
      .send(
        "your_service_id",
        "your_template_id",
        {
          customer_name: name,
          customer_phone: phoneNumber,
          order_id: tx_ref,
          delivery_location: location,
          delivery_option: deliveryOption,
          quantity,
          amount: price,
          date: new Date(purchaseDate).toLocaleString(),
        },
        "your_user_id"
      )
      .then(
        () => console.log("📧 Payment notification sent successfully"),
        (error) => console.error("❌ EmailJS error:", error)
      );
  }, [searchParams, navigate]);

  const handleDownload = () => {
    if (!order) return;

    const {
      orderNumber,
      customerName,
      phoneNumber,
      quantity,
      price,
      deliveryOption,
      location,
      purchaseDate,
    } = order;

    const content = `
Adderall Order Confirmation for ${customerName}
------------------------------------------------
Order Number: ${orderNumber}
Customer Name: ${customerName}
Phone Number: ${phoneNumber}
Quantity: ${quantity}
Amount Paid: MWK ${price}
Delivery Option: ${deliveryOption}
Delivery Location: ${location}
Purchase Date: ${new Date(purchaseDate).toLocaleString()}

✅ Stay focused and active, study overnight, and save the semester. All the best!
    `;

    const blob = new Blob([content], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Order-${customerName}.txt`);
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
            ✅Addy Order Details
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
