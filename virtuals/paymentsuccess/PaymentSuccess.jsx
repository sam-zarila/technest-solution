import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";  // Import EmailJS

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
        const password = "techn3St@2635chatPr3m"; // Common password for all products (can be customized per product)

        // Customizing the download text based on the product purchased
        let downloadText = "";

        switch (userOrder.product.toLowerCase()) {
          case "spotify premium":
            downloadText = `
🎧 Spotify Premium  Access

Order Confirmation for ${userOrder.CustomerName}
------------------------------------------------
Customer Name: ${userOrder.CustomerName}
Product: ${userOrder.product}
Order Number: ${userOrder.orderNumber}
Amount Paid: MWK ${userOrder.price}
Email Used: ${userOrder.email}
Purchase Date: ${userOrder.Date}

✅ How to Join:
1. Click this link: https://www.spotify.com/mw/family/join/invite/A8cZ0X1bxCyYYab/
2. Log in with your personal Spotify account (or create one).
3. Enter this _________ address if prompted.
4. Accept the invitation to join Spotify Premium.

Enjoy your music! TechNest 🎶
`;
            break;
            case "Apple Music":
              downloadText = `
  🎧 Apple Music Premium  Access
  
  Order Confirmation for ${userOrder.CustomerName}
  ------------------------------------------------
  Customer Name: ${userOrder.CustomerName}
  Product: ${userOrder.product}
  Order Number: ${userOrder.orderNumber}
  Amount Paid: MWK ${userOrder.price}
  Email Used: ${userOrder.email}
  Purchase Date: ${userOrder.Date}
  
  ✅ How to Join:
  1. Click this link: " "
  2. Log in with your personal Apple Music account (or create one).
  3. Enter this _________ address if prompted.
  4. Accept the invitation to join Apple Music Premium.
  
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
Purchase Date: ${userOrder.Date}

✅ How to Use:
1. Visit https://www.netflix.com
2. Log in using the access email and password above.
3. Start streaming!

Enjoy your shows and movies! TechNest🍿
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
Purchase Date: ${userOrder.Date}

✅ How to Use:
1. Visit https://chat.openai.com
2. Log in using the access email and password above.
3. Enjoy full access to ChatGPT Plus features!

Ask away!  TechNest🧠
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
Access Email: patsondamascus@gmail.com
Access Password: ${password}
Purchase Date: ${userOrder.Date}

✅ Please check your product-specific instructions in your email or contact support.
`;
            break;
        }

        // 👉 Download the file with the order details
        const blob = new Blob([downloadText], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${userOrder.CustomerName} order-details.txt`;
        link.click();

        // Send email notification using EmailJS
        emailjs.send(
          "service_s1fphcd", // Replace with your EmailJS service ID
          "template_sg0uioo", // Replace with your EmailJS template ID
          {
            customer_name: userOrder.CustomerName,
            customer_email: userOrder.email,
            product: userOrder.product,
            order_number: userOrder.orderNumber,
            amount_paid: userOrder.price,
            purchase_date: userOrder.Date,
          },
          "HlMFIQVluZ-Bfo1qv" // Replace with your EmailJS public key
        ).then(
          () => console.log("Email sent successfully"),
          (error) => console.error("Failed to send email:", error)
        );

        setStatus("✅ Payment successful! Order saved, download ready, and email sent.");
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
