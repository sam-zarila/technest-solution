
import React from "react";
import { useEffect, useState } from "react";

declare global {
    interface Window {
        PaychanguCheckout?: (options: any) => void;
    }
}


const shopspotify = {
    title:"Spotify",
    price:"Mwk 4000"
};

const shopspotifyPage =() =>{
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        amount: "",
        date: "",
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadScript = (src) => 
            new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = src;
                script.onload = resolve;
                script.onerror= reject;
                document.body.appendChild(script);
            });
            loadScript("https://code.jquery.com/jquery-3.6.0.min.js")
            .then(() => loadScript("https://in.paychangu.com/js/popup.js"))
            .catch((err) => console.error("Script loading failed:", err));

            return () => {
                document
                .querySelectorAll("script[src*='jquery'], script[src*='paychangu']")
                .forEach((script) => document.body.removeChild(script));
            };
    }, []);

    const handlechange = (e) => {
       const { name, value } = e.target;
         setFormData((prev) => ({
                ...prev,
                [name]: value,
                error: name=== "amount" && value ! == "20,000" ? " amount must be exact  20,000" : "",
          }));
    };

const handlesubmit=(e)=>{
    e.preventDefault();

    if (formData.amount !== "20,000") {
        setFormData((prev) => ({
            ...prev,
            error: "Amount must be exactly 20,000",
        }));
    }
    if (!window.PaychanguCheckout) {
        setFormData((prev) => ({ ...prev, error: "Payment gateway is still loading. Please wait." }));
        return;
      }
  
      setLoading(true);
  
      window.PaychanguCheckout({
        public_key: "PUB-TEST-PjxBxGsX32OVbBJbRJHFhwXwOOa9snAC", // replace this
        tx_ref: "" + Math.floor(Math.random() * 1000000000 + 1),
        amount: formData.amount,
        currency: "MWK",
        callback_url: "https://technestsystems.netlify.app/", // replace this
        customer: {
          email: formData.email,
          first_name: formData.name.split(" ")[0],
          last_name: formData.name.split(" ").slice(1).join(" "),
        },
        customization: {
          title: "Course Payment",
          description: formData.name,
        },
        meta: {
          spotify: formData.amount,
        },
      });
  
  setLoading(false);

}

return(

    <div className="p-6">
        <h1 className="text-center">Shop Spotify</h1>
    </div>
)


}
