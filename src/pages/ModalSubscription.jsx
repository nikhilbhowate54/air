import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Tabs, Card, Button, Spin } from "antd";

export default function ModalSubscription() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/subscription/plans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlans(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch plans");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // ✅ Payment Flow with Razorpay
  const subscribe = async (plan) => {
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      // Create order in backend
      const orderRes = await axios.post(
        "http://localhost:5000/payment/create-order",
        { planId: plan._id, amount: plan.price },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = orderRes.data;

      // Razorpay Checkout
      const options = {
        key: "rzp_test_R9wriB86pxzvKl", // ⚠️ Replace with LIVE key in production
        amount: order.amount,
        currency: order.currency,
        name: "Subscription Payment",
        description: `Subscribe to ${plan.name || "Plan"}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "http://localhost:5000/payment/verify",
              {
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                planId: plan._id,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              // Call your /subscription/buy route
              await axios.post(
                "http://localhost:5000/subscription/buy",
                { planId: plan._id },
                { headers: { Authorization: `Bearer ${token}` } }
              );

              // 🔄 Refresh user info (optional but recommended)
              const userRes = await axios.get("http://localhost:5000/auth/me", {
                headers: { Authorization: `Bearer ${token}` },
              });
              localStorage.setItem("user", JSON.stringify(userRes.data));

              setSelectedPlan(plan);
              setShowModal(true);
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error(error);
            alert("Error completing subscription.");
          }
        },
        prefill: {
          email: "user@example.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);

      // ✅ Handle payment failure
      rzp.on("payment.failed", function (response) {
        alert("Payment Failed: " + response.error.description);
      });

      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Payment failed, please try again.");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spin size="large" />
        <h4>Loading Plans...</h4>
      </div>
    );
  }

  const monthlyPlans = plans.filter((p) => p.durationType === "monthly");
  const yearlyPlans = plans.filter((p) => p.durationType === "yearly");

  const renderPlans = (plansList) => (
    <div className="row">
      {plansList.map((plan) => (
        <div className="col-md-4 mb-4" key={plan._id}>
          <Card title={plan.name || "Unnamed Plan"} bordered hoverable>
            <p>Max Properties: {plan.maxProperties || 1}</p>
            <h3 className="text-primary">₹{plan.price || 0}</h3>
            <Button
              type="primary"
              className="w-100 mt-3"
              onClick={() => subscribe(plan)}
            >
              Subscribe
            </Button>
          </Card>
        </div>
      ))}
    </div>
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Choose a Subscription Plan</h2>

      <Tabs defaultActiveKey="1" centered>
        <Tabs.TabPane tab="Monthly Plans" key="1">
          {monthlyPlans.length > 0 ? (
            renderPlans(monthlyPlans)
          ) : (
            <p>No Monthly Plans available</p>
          )}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Yearly Plans" key="2">
          {yearlyPlans.length > 0 ? (
            renderPlans(yearlyPlans)
          ) : (
            <p>No Yearly Plans available</p>
          )}
        </Tabs.TabPane>
      </Tabs>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        onOk={() => setShowModal(false)}
        title="Subscription Successful"
      >
        {selectedPlan && (
          <div>
            <p>
              <b>Plan Name:</b> {selectedPlan.name}
            </p>
            <p>
              <b>Max Properties:</b> {selectedPlan.maxProperties}
            </p>
            <p>
              <b>Status:</b> Active
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}
