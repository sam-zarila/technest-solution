import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    const statusParam = searchParams.get("status");

    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const product = searchParams.get("product");
    const price = parseInt(searchParams.get("price"));
    const maxPeople = parseInt(searchParams.get("maxPeople"));

    if (!tx_ref || statusParam !== "successful") {
      setStatus("❌ Payment failed or cancelled.");
      return;
    }
    const saveOrder = async () => {
        try {
          const response = await fetch("https://technestbackend-1.onrender.com/orders/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              CustomerName: name || "Unknown",
              email: email || "Unknown",
              product,
              purchaseDate: new Date().toISOString().split("T")[0],
              price,
              maxPeople: maxPeople || 1,
              tx_ref,
            }),
          });
      
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "Failed to save order.");
      
          setStatus("✅ Payment successful! Saving order...");
      
          // 👉 Fetch the order back using email
          const fetchResponse = await fetch(`https://technestbackend-1.onrender.com/orders/email/${email}`);
          const userOrders = await fetchResponse.json();
      
          if (!fetchResponse.ok) throw new Error(userOrders.message || "Failed to fetch user order.");
      
          const userOrder = userOrders[0]; // Or filter by tx_ref if multiple
          const password = "techn3St@2635chatPr3m" 
      
          // 👉 Download info
          const downloadText = `

      Order Confirmation for ${userOrder.CustomerName}
      ------------------------------------------------
      CustomerName: ${userOrder.CustomerName}
      Product: ${userOrder.product}
      orderNumber: ${userOrder.orderNumber}
      Amount: ${userOrder.price}
      Email: ${userOrder.email}
      Access email: patsondamascus@gmail.com 
      Password: ${password}
      purchaseDate:${userOrder.Date}
      
      NB : use the access email and password to access the product you have purchase Thank you!
      ------------------------------------------------------------------------------------
          `;
      
          const blob = new Blob([downloadText], { type: "text/plain" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download =userOrder.CustomerName+" "+"order-details.txt";
          link.click();
      
          setStatus("✅ Payment successful! Order saved and download ready.");
        } catch (err) {
          console.error("🚫 Failed:", err);
          setStatus("⚠️ Payment went through, but something failed.");
        }
      
        setTimeout(() => navigate("/"), 6000);
      };
      
    saveOrder();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{status}</h1>
        <p>Redirecting you to the homepage...</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
