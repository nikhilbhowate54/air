import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Space, Table, Button, message } from "antd";
import { Can } from "@casl/react";
import { AbilityContext } from "../casl/AbilityContext";

const Property = () => {
  const [data, setData] = useState([]);
  const [maxProperties, setMaxProperties] = useState(1); // default = free plan
  const [isFreePlan, setIsFreePlan] = useState(true); // free plan flag
  const [loading, setLoading] = useState(true); // loading state
  const ability = useContext(AbilityContext);

  // Fetch properties + subscription info
  const fetchApi = async () => {
    try {
      let token = localStorage.getItem("token");

      // Step 1: Get user info (role + subscription)
      const resUser = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = resUser.data;
      const role = localStorage.getItem("role");

      //  FIXED subscription logic
      if (user?.subscription?.isActive) {
        if (user.subscription.plan && typeof user.subscription.plan === "object") {
          // backend populated plan
          setMaxProperties(user.subscription.plan.maxProperties || 1);
        } else {
          // fallback if only planId returned
          setMaxProperties(999); // assume high limit
        }
        setIsFreePlan(false);
      } else {
        setMaxProperties(1); // free user
        setIsFreePlan(true);
      }

      // Step 2: Fetch properties based on role
      let resProps;
      if (role === "admin") {
        resProps = await axios.get("http://localhost:5000/list/properties", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (role === "host") {
        resProps = await axios.get("http://localhost:5000/list/properties/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      const cleanedData = Array.isArray(resProps?.data)
        ? resProps?.data.map((item) => ({
            ...item,
            title: item?.title || "",
            description: item?.description || "", //  FIXED spelling
            price: item?.price || "",
            location: item?.location || "",
          }))
        : [];

      setData(cleanedData);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();

    // detect if user just returned from payment success page
    if (window.location.search.includes("paymentSuccess=true")) {
      fetchApi(); // refresh subscription info again
      window.history.replaceState({}, document.title, "/property"); // clean URL
    }
  }, []);

  const handleAddProperty = () => {
    if (data.length >= maxProperties) {
      if (isFreePlan) {
        message.warning(
          "You can only add 1 property with the Free Plan. Upgrade to add more!"
        );
        window.location.href = "/plans"; // redirect to subscription page
      } else {
        message.warning(
          "You have reached the maximum properties allowed for your plan."
        );
      }
      return;
    }
    // allowed to add
    window.location.href = "/add-property";
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Title", dataIndex: "title", key: "title" },
    // { title: "Description", dataIndex: "description", key: "description" }, 
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <h1>Property</h1>
        </header>

        <section className="table-section">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>List</h2>
            <Button type="primary" onClick={handleAddProperty} disabled={loading}>
              Add Property
            </Button>
          </div>

          {/* CASL permission check */}
          <Can I="read" a="User" ability={ability}>
            <Table
              columns={columns}
              dataSource={data}
              rowKey="_id"
              pagination={{ pageSize: 5 }}
              loading={loading}
            />
          </Can>
        </section>
      </main>
    </div>
  );
};

export default Property;
