import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { notification } from "antd";

const Createrole = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, text) => {
    api[type]({
      message: text,
    });
  };
  const fetchApi = async (e) => {
    e.preventDefault();
    console.log(input);
    if (!input) {
      setError("role is requried");
      return;
    }
    // return
    try {
      let token = localStorage.getItem("token");
      let role = await axios.post(
        "http://localhost:5000/protected/admin/roles",
        { name: input, permissions: [] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(role);
      setInput("");
      openNotificationWithIcon("success", "role created");
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", error?.response?.data?.error);
      setError(error?.response?.data?.error);
    }
  };

  return (
    <>
      <div className="admin-container">
        <Sidebar />
        {contextHolder}
        <main className="main-content">
          {" "}
          <header className="topbar">
            <h1>Roles</h1>
          </header>
          <section className="table-section">
            <h2>create roles</h2>
            <form onSubmit={fetchApi}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexDirection: "column",
                }}
              >
                <label htmlFor="role">Role Name</label>
                <input
                  style={{ padding: "10px 20px", borderRadius: "10px" ,border:'1px solid gray'}}
                  type="text"
                  name="role"
                  placeholder="enter role"
                  id="role"
                  value={input}
                  onChange={(e) => {
                    setInput(e?.target?.value);
                    setError("");
                  }}
                />
                <span style={{ color: "red" }}>{error}</span>
              </div>
              <br />
              <button
                style={{
                  backgroundColor: "#1e293b",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  color: "whitesmoke",
                }}
              >
                Submit
              </button>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Createrole;
