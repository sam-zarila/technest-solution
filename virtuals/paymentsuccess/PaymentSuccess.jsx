import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const navigate = useNavigate();

  useEffect(() => {
    const tx_ref     = searchParams.get("tx_ref");
    const statusParam= searchParams.get("status");

    // Quick guards
    if (!tx_ref) {
      setStatus("❌ No transaction reference found.");
      return;
    }
    if (statusParam === "failed") {
      setStatus("❌ Payment failed or cancelled.");
      return;
    }

    // At this point we have a tx_ref (and no explicit failure flag) → proceed
    const name      = searchParams.get("name")   || "Unknown";
    const email     = searchParams.get("email")  || "Unknown";
    const product   = searchParams.get("product")|| "Unknown product";
    const price     = parseInt(searchParams.get("price"), 10) || 0;
    const maxPeople = parseInt(searchParams.get("maxPeople"), 10) || 1;

    const saveOrder = async () => {
      try {
        // 1️⃣ Save to your backend
        const resp = await fetch(
          "https://technestbackend-1.onrender.com/orders/create",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              CustomerName:  name,
              email,
              product,
              purchaseDate: new Date().toISOString().split("T")[0],
              price,
              maxPeople,
              tx_ref,
            }),
          }
        );
        const result = await resp.json();
        if (!resp.ok) throw new Error(result.message || "Failed to save order.");

        setStatus("✅ Payment successful! Saving order...");

        // 2️⃣ Fetch back the saved order
        const fetchResp  = await fetch(
          `https://technestbackend-1.onrender.com/orders/email/${email}`
        );
        const userOrders = await fetchResp.json();
        if (!fetchResp.ok) throw new Error(userOrders.message);

        // pick the right order (you could filter by tx_ref here)
        const userOrder = userOrders.find(o => o.tx_ref === tx_ref) || userOrders[0];
        const password  = "techn3St@2635chatPr3m";

        // 3️⃣ Build download text
        let downloadText = "";
        switch (userOrder.product.toLowerCase()) {
          case "spotify premium":
            downloadText = `
🎧 Spotify Premium Access

Order Number: ${userOrder.orderNumber}
Name:         ${userOrder.CustomerName}
Amount Paid:  MWK ${userOrder.price}
Date:         ${userOrder.Date}

✅ Join via:
https://www.spotify.com/mw/family/join/invite/A8cZ0X1bxCyYYab/
`;
            break;

          case "netflix premium":
            downloadText = `
📺 Netflix Premium Access

Order Number: ${userOrder.orderNumber}
Name:         ${userOrder.CustomerName}
Email:        ${userOrder.email}
Password:     ${password}
Date:         ${userOrder.Date}

✅ Visit https://www.netflix.com and log in with the above credentials.
`;
            break;

          case "chatgpt plus":
            downloadText = `
🤖 ChatGPT Plus Access

Order Number: ${userOrder.orderNumber}
Email:        patsondamascus@gmail.com
Password:     ${password}
Date:         ${userOrder.Date}

✅ Visit https://chat.openai.com and log in with the above credentials.
`;
            break;

          default:
            downloadText = `
📦 Order Details

Order Number: ${userOrder.orderNumber}
Name:         ${userOrder.CustomerName}
Product:      ${userOrder.product}
Amount Paid:  MWK ${userOrder.price}
Date:         ${userOrder.Date}

✅ Please check your email for complete access instructions.
`;
        }

        // 4️⃣ Trigger download of the details text file
        const blob = new Blob([downloadText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userOrder.CustomerName}-order.txt`;
        link.click();

        // 5️⃣ Send email receipt via EmailJS
        await emailjs.send(
          "service_s1fphcd",
          "template_sg0uioo",
          {
            customer_name:  userOrder.CustomerName,
            customer_email: userOrder.email,
            product:         userOrder.product,
            order_number:    userOrder.orderNumber,
            amount_paid:     userOrder.price,
            purchase_date:   userOrder.Date,
          },
          "HlMFIQVluZ-Bfo1qv"
        );

        setStatus(
          "✅ Payment processed, order saved, download ready, and email sent!"
        );
      } catch (err) {
        console.error("🚫 Error in saveOrder:", err);
        setStatus(
          "⚠️ Payment succeeded, but an error occurred. Check console for details."
        );
      }

      // 6️⃣ Redirect home after showing status
      setTimeout(() => navigate("/"), 6000);
    };

    saveOrder();
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">{status}</h1>
        <p>Redirecting you to the homepage…</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
