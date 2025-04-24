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
      DeliveryOption,
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
          name: name,
          phoneNumber: phoneNumber,
          tx_ref,
          Location: location,
          Deliveryoption: deliveryOption,
          Description:Description,
          quantity,
          amount: price,
          date: new Date(purchaseDate).toLocaleString(),
        },
        "HlMFIQVluZ-Bfo1qv"
      )
      .then(() => console.log("📧 Payment notification sent"))
      .catch((err) => console.error("❌ EmailJS error:", err));

    // Auto download confirmation after 2 seconds
    setTimeout(() => {
      const content = `
Adderall Order Confirmation for ${name}
------------------------------------------------
Order Number: ${tx_ref}
Customer Name: ${name}
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
      link.setAttribute("download", `Order-${name}.txt`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 2000);

    // Redirect to main page after 10 seconds
    setTimeout(() => {
      navigate("/");
    }, 10000);
  }, [searchParams, navigate]);

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
          <p className="text-green-600 mt-3">⬇️ Your confirmation is downloading...</p>
        </div>
      )}
    </div>
  );
};

export default AdderalPaymentSuccess;
