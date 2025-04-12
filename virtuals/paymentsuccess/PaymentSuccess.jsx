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
        const response = await fetch("http://localhost:3000/orders/create", {
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

        setStatus("✅ Payment successful! Order saved.");
      } catch (err) {
        console.error("🚫 Failed to save order:", err);
        setStatus("⚠️ Payment went through, but saving order failed.");
      }

      setTimeout(() => navigate("/"), 4000);
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
