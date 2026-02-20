// import React, { useState } from "react";
// import "./admin.css";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { notification } from "antd";

// const Subscription = () => {
//   const [form, setForm] = useState({
//     name: "",
//     durationType: "monthly",
//     price: "",
//     maxProperties: "",
//     features: "",
//   });
//   const [error, setError] = useState("");
//   const [api, contextHolder] = notification.useNotification();

//   const openNotificationWithIcon = (type, text) => {
//     api[type]({ message: text });
//   };

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//     setError("");
//   };

//   const fetchApi = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.durationType || !form.price || !form.maxProperties) {
//       setError("All fields except features are required");
//       return;
//     }

//     try {
//       let token = localStorage.getItem("token");

//       await axios.post(
//         "http://localhost:5000/subscription/plans",
//         {
//           ...form,
//           features: form.features
//             ? form.features.split(",").map((f) => f.trim())
//             : [],
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setForm({
//         name: "",
//         durationType: "monthly",
//         price: "",
//         maxProperties: "",
//         features: "",
//       });
//       openNotificationWithIcon("success", "Subscription plan created");
//     } catch (error) {
//       console.log(error);
//       openNotificationWithIcon("error", error?.response?.data?.error || "Error creating plan");
//       setError(error?.response?.data?.error || "Something went wrong");
//     }
//   };

//   return (
//     <div className="admin-container">
//       <Sidebar />
//       {contextHolder}
//       <main className="main-content">
//         <header className="topbar">
//           <h1>Subscription Plans</h1>
//         </header>

//         <section className="table-section">
//           <h2>Create Subscription Plan</h2>
//           <form onSubmit={fetchApi}>
//             <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
//               <label>Plan Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter plan name"
//                 value={form.name}
//                 onChange={handleChange}
//                 style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid gray" }}
//               />

//               <label>Duration Type</label>
//               <select
//                 name="durationType"
//                 value={form.durationType}
//                 onChange={handleChange}
//                 style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid gray" }}
//               >
//                 <option value="monthly">Monthly</option>
//                 <option value="yearly">Yearly</option>
//               </select>

//               <label>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 placeholder="Enter price"
//                 value={form.price}
//                 onChange={handleChange}
//                 style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid gray" }}
//               />

//               <label>Max Properties</label>
//               <input
//                 type="number"
//                 name="maxProperties"
//                 placeholder="Enter max properties"
//                 value={form.maxProperties}
//                 onChange={handleChange}
//                 style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid gray" }}
//               />

//               <label>Features (comma separated)</label>
//               <input
//                 type="text"
//                 name="features"
//                 placeholder="e.g. Feature 1, Feature 2"
//                 value={form.features}
//                 onChange={handleChange}
//                 style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid gray" }}
//               />

//               <span style={{ color: "red" }}>{error}</span>
//             </div>
//             <br />
//             <button
//               style={{
//                 backgroundColor: "#1e293b",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 color: "whitesmoke",
//               }}
//             >
//               Submit
//             </button>
//           </form>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Subscription;
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { Form, Input, Select, Button, Card, notification } from "antd";

const { Option } = Select;

const Subscription = () => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (type, text) => {
    api[type]({ message: text });
  };

  const fetchApi = async (values) => {
    try {
      setLoading(true);
      let token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/subscription/plans",
        {
          ...values,
          features: values.features
            ? values.features.split(",").map((f) => f.trim())
            : [],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      form.resetFields();
      openNotificationWithIcon("success", "Subscription plan created");
    } catch (error) {
      console.log(error);
      openNotificationWithIcon(
        "error",
        error?.response?.data?.error || "Error creating plan"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container" style={{ height: "90vh" }}>
      <Sidebar />
      {contextHolder}
      <main
        className="main-content"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <header className="topbar">
          <h1>Subscription Plans</h1>
        </header>

        <section
          className="table-section"
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card
            title="Create Subscription Plan"
            style={{ width: "100%", maxWidth: 1200 }}
          >
            <Form
              form={form}
              layout="vertical"
              onFinish={fetchApi}
              initialValues={{ durationType: "monthly" }}
            >
              <Form.Item
                label="Plan Name"
                name="name"
                rules={[{ required: true, message: "Please enter plan name" }]}
              >
                <Input placeholder="Enter plan name" />
              </Form.Item>

              <Form.Item
                label="Duration Type"
                name="durationType"
                rules={[{ required: true, message: "Please select duration" }]}
              >
                <Select>
                  <Option value="monthly">Monthly</Option>
                  <Option value="yearly">Yearly</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: "Please enter price" }]}
              >
                <Input type="number" placeholder="Enter price" />
              </Form.Item>

              <Form.Item
                label="Max Properties"
                name="maxProperties"
                rules={[
                  { required: true, message: "Please enter max properties" },
                ]}
              >
                <Input type="number" placeholder="Enter max properties" />
              </Form.Item>

              <Form.Item label="Features (comma separated)" name="features">
                <Input placeholder="e.g. Feature 1, Feature 2" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Subscription;
