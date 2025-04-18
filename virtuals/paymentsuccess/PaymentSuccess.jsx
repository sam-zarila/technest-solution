import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const PaymentSuccess = () => {
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

    // 🔍 Debug all params
    console.log("SearchParams:", Object.fromEntries(searchParams.entries()));

    // ✅ Accept multiple valid status responses
    const validStatuses = ["successful", "completed", "paid"];
    if (!tx_ref || (statusParam && !validStatuses.includes(statusParam.toLowerCase()))) {
      setStatus("❌ Payment failed or cancelled.");
      return;
    }

    if (!name || !email || !product || isNaN(price)) {
      setStatus("⚠️ Missing data from payment. Cannot proceed.");
      return;
    }

    const saveOrder = async () => {
      try {
        setStatus("💾 Saving order...");

        const response = await fetch("https://technestbackend-1.onrender.com/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            CustomerName: name,
            email,
            product,
            purchaseDate: new Date().toISOString().split("T")[0],
            price,
            tx_ref,
          }),
        });

        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Failed to save order.");

        setStatus("✅ Order saved! Fetching details...");

        const fetchResponse = await fetch(`https://technestbackend-1.onrender.com/orders/email/${email}`);
        const userOrders = await fetchResponse.json();

        if (!Array.isArray(userOrders)) {
          throw new Error("User orders are not in array format");
        }

        console.log(userOrders);

        const userOrder = userOrders.find(order => order.tx_ref === tx_ref) || userOrders[0];
        setOrder(userOrder);

        const password = "techn3St@2635chatPr3m";
        let downloadText = "";

        switch (userOrder.product.toLowerCase()) {
          case "spotify premium":
            downloadText = `
🎧 Spotify Premium Access

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Purchase Date: ${userOrder.purchaseDate}

✅ How to Join:
1. Click this link: https://www.spotify.com/mw/family/join/invite/A8cZ0X1bxCyYYab/
2. Log in with your personal Spotify account (or create one).
3. Enter this address if prompted: Chancellor College, Zomba, Malawi
4. Accept the invitation to join Spotify Premium.

Enjoy your music! TechNest 🎶
`;
            break;

          case "apple music":
            downloadText = `
🎧 Apple Music Premium Access

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Purchase Date: ${userOrder.purchaseDate}

✅ How to Join:
1. Click this link: [Provide link]
2. Log in with your Apple Music account (or create one).
3. Enter this address if prompted: Chancellor College, Zomba, Malawi
4. Accept the invitation.

Enjoy your music! TechNest 🎶
`;
            break;

          case "netflix premium":
            downloadText = `
📺 Netflix Premium Access

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Access Email: patsondamascus@gmail.com
Access Password: ${password}
Purchase Date: ${userOrder.purchaseDate}

✅ How to Use:
1. Visit https://www.netflix.com
2. Log in using the access email and password above.
3. Start streaming!

Enjoy! TechNest 🍿
`;
            break;

          case "chatgpt plus":
            downloadText = `
🤖 ChatGPT Plus Access

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Access Email: patsondamascus@gmail.com
Access Password: ${password}
Purchase Date: ${userOrder.purchaseDate}

✅ How to Use:
1. Visit https://chat.openai.com
2. Log in with the access email and password above.
3. Enjoy ChatGPT Plus features!

Ask away! TechNest 🧠
`;
            break;

          default:
            downloadText = `
📦 Order Details

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Purchase Date: ${userOrder.purchaseDate}

✅ Please check your product-specific instructions or contact support.
`;
        }

        // Download .txt file
        const blob = new Blob([downloadText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userOrder.CustomerName}_order-details.txt`;
        link.click();

        // Send Email via EmailJS
        await emailjs.send(
          "service_s1fphcd",
          "template_sg0uioo",
          {
            customer_name: userOrder.CustomerName,
            customer_email: userOrder.email,
            product: userOrder.product,
            order_number: userOrder.orderNumber,
            amount_paid: userOrder.price,
            purchase_date: userOrder.purchaseDate,
          },
          "HlMFIQVluZ-Bfo1qv"
        );

        setStatus("✅ Payment successful! Order saved, email sent & download ready.");
        setTimeout(() => "", 5000);
      } catch (err) {
        console.error("🚫 Error:", err.message);
        setStatus("⚠️ Payment went through, but there was an error processing your order.");
      }

      setTimeout(() => navigate("/"), 6000);
    };

    saveOrder();
  }, [searchParams, navigate]);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h2>Payment Status</h2>
      <p>{status}</p>

      {order && (
        <div style={{ marginTop: "2rem", backgroundColor: "#f9f9f9", padding: "1rem", borderRadius: "8px" }}>
          <h3>Order Details</h3>
          <p><strong>Customer Name:</strong> {order.CustomerName}</p>
          <p><strong>Product:</strong> {order.product}</p>
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Amount Paid:</strong> MWK {order.price}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Purchase Date:</strong> {order.purchaseDate}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
