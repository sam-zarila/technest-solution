import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
// ... [same imports]
import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("Verifying payment...");
  const [order, setOrder] = useState(null);
  const [downloadText, setDownloadText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const tx_ref = searchParams.get("tx_ref");
    const statusParam = searchParams.get("status");
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const product = searchParams.get("product");
    const price = parseInt(searchParams.get("price"));

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
        setStatus("💾 Saving orders...");

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

        setStatus("✅ Payment Done! Order saved.");

        const fetchResponse = await fetch(`https://technestbackend-1.onrender.com/orders/email/${email}`);
        const userOrders = await fetchResponse.json();

        let userOrder;
        if (Array.isArray(userOrders)) {
          userOrder = userOrders.find(order => order.tx_ref === tx_ref) || userOrders[0];
        } else if (userOrders && typeof userOrders === "object") {
          userOrder = userOrders;
        } else {
          throw new Error("Unexpected format for user orders.");
        }

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
1. [Provide Apple Music link]
2. Log in or sign up.
3. Use the provided family invite.
4. Set your address to Chancellor College, Zomba, Malawi.

Enjoy the beats! TechNest 🍏🎶
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
Access Email:technestsystem265@gmail.com
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

✅ Please contact support for usage instructions.
`;
        }

        setDownloadText(downloadText); // Save text for manual download

        // Create downloadable file (automatic)
        const blob = new Blob([downloadText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userOrder.CustomerName}_order-details.txt`;
        link.click();

        // Send confirmation email
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
        setTimeout(() => navigate("/"), 9000);
      } catch (err) {
        console.error("🚫 Error:", err.message);
        setStatus("⚠️ Payment was successful, but an error occurred while processing your order.");
      }
    };

    saveOrder();
  }, [searchParams, navigate]);

  const handleManualDownload = () => {
    const blob = new Blob([downloadText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${order.CustomerName}_order-details.txt`;
    link.click();
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
          backgroundColor: "black",
          padding: "1.5rem",
          borderRadius: "10px",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "left",
        }}>
          <h3 style={{ marginBottom: "1rem", color: "white" }}>✅ Order Details</h3>
          <p><strong>Order Number:</strong> {order.orderNumber}</p>
          <p><strong>Customer Name:</strong> {order.CustomerName}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Product:</strong> {order.product}</p>
          <p><strong>Amount Paid:</strong> MWK {order.price}</p>
          <p><strong>Purchase Date:</strong> {new Date(order.purchaseDate).toDateString()}</p>
          {order.EndDate && (
            <p><strong>End Date:</strong> {new Date(order.EndDate).toDateString()}</p>
          )}
          <button 
            onClick={handleManualDownload}
            style={{
              marginTop: "1rem",
              padding: "0.5rem 1rem",
              backgroundColor: "#4caf50",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            📥 Download Order Details
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
