import React, { useContext, useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Space, Table, Button, message } from "antd";
import { Can } from "@casl/react";
import { AbilityContext } from "../casl/AbilityContext";

const AddProperty = () => {
  const [data, setData] = useState([]);
  const [maxProperties, setMaxProperties] = useState(1); // default = free plan
  const [isFreePlan, setIsFreePlan] = useState(true); // free plan flag
  const ability = useContext(AbilityContext);

  // Fetch properties + subscription info
  const fetchApi = async () => {
    try {
      let token = localStorage.getItem("token");

      // Get properties
      const resProps = await axios.get("http://localhost:5000/list/properties", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Properties:", resProps.data);

      const cleanedData = Array.isArray(resProps?.data)
        ? resProps.data.map((item) => ({
            ...item,
            title: item?.title || "",
            descripation: item?.descripation || "",
            price: item?.price || "",
            location: item?.location || "",
          }))
        : [];

      setData(cleanedData);

      // Get user subscription info
      const resUser = await axios.get("http://localhost:5000/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (resUser?.data?.subscription?.isActive && resUser?.data?.subscriptionPlan) {
        setMaxProperties(resUser.data.subscriptionPlan.maxProperties);
        setIsFreePlan(false);
      } else {
        setMaxProperties(1); // free user
        setIsFreePlan(true);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleAddProperty = () => {
    if (data.length >= maxProperties) {
      if (isFreePlan) {
        message.warning("You can only add 1 property with the Free Plan. Upgrade to add more!");
        window.location.href = "/plans"; // redirect to subscription page
      } else {
        message.warning("You have reached the maximum properties allowed for your plan.");
      }
      return;
    }
    // allowed to add
    window.location.href = "/add-property";
  };

  const columns = [
    { title: "ID", dataIndex: "_id", key: "_id" },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "descripation", key: "descripation" },
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
            <Button type="primary" onClick={handleAddProperty}>
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
            />
          </Can>
        </section>
      </main>
    </div>
  );
};

export default AddProperty;
