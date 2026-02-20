// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import axios from "axios";
// import { notification } from "antd";

// const AddProperty = () => {
//   const [api, contextHolder] = notification.useNotification();

//   const openNotificationWithIcon = (type, text) => {
//     api[type]({
//       message: text,
//     });
//   };

//   const [input, setInput] = useState({
//     title: "",
//     description: "", // ✅ fixed spelling
//     price: "",
//     location: "",
//   });
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     setInput((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     setImages(e.target.files);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!input.title || !input.price || !input.location || images.length === 0) {
//       openNotificationWithIcon("error", "All fields and at least one image are required");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("title", input.title);
//       formData.append("description", input.description); // ✅ fixed spelling
//       formData.append("price", input.price);
//       formData.append("location", input.location);

//       for (let i = 0; i < images.length; i++) {
//         formData.append("images", images[i]);
//       }

//       let result = await axios.post("http://localhost:5000/list/properties", formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       openNotificationWithIcon("success", "Property added successfully!");
//       console.log(result.data);

//       // ✅ reset form
//       setInput({ title: "", description: "", price: "", location: "" });
//       setImages([]);
//       document.querySelector('input[type="file"]').value = null; // reset file input
//     } catch (error) {
//       console.error(error.response ? error.response.data : error);

//       // ✅ check backend response
//       if (error.response && error.response.data) {
//         const msg = error.response.data.message || error.response.data.error;

//         if (msg === "No subscription plan found for this user.") {
//           openNotificationWithIcon("error", "You need to upgrade your plan before adding more properties.");
//           setTimeout(() => {
//             window.location.href = "/plans";
//           }, 1500);
//         } else {
//           openNotificationWithIcon("error", msg || "Error creating property");
//         }
//       } else {
//         openNotificationWithIcon("error", "Error creating property");
//       }
//     }
//   };

//   return (
//     <div>
//       {contextHolder}
//       <div className="admin-container">
//         <Sidebar />
//         <main className="main-content">
//           <header className="topbar">
//             <h1>Add Property</h1>
//           </header>

//           <section className="form-section" style={{ maxWidth: "1200px", width: "100%" }}>
//             <form
//               onSubmit={handleSubmit}
//               style={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: "15px",
//                 width: "100%",
//               }}
//             >
//               <label>Title</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={input.title}
//                 onChange={handleChange}
//                 style={{ padding: "10px", borderRadius: "8px", width: "100%" }}
//               />

//               <label>Description</label>
//               <textarea
//                 name="description" // ✅ fixed spelling
//                 value={input.description}
//                 onChange={handleChange}
//                 style={{ padding: "10px", borderRadius: "8px", width: "100%" }}
//               />

//               <label>Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={input.price}
//                 onChange={handleChange}
//                 style={{ padding: "10px", borderRadius: "8px", width: "100%" }}
//               />

//               <label>Location</label>
//               <input
//                 type="text"
//                 name="location"
//                 value={input.location}
//                 onChange={handleChange}
//                 style={{ padding: "10px", borderRadius: "8px", width: "100%" }}
//               />

//               <label>Upload Images (max 5)</label>
//               <input
//                 type="file"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 style={{ width: "100%" }}
//               />

//               <button
//                 type="submit"
//                 style={{
//                   backgroundColor: "#1e293b",
//                   border: "none",
//                   padding: "12px 20px",
//                   borderRadius: "10px",
//                   color: "whitesmoke",
//                   marginTop: "15px",
//                   width: "100%",
//                 }}
//               >
//                 Submit
//               </button>
//             </form>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AddProperty;
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { notification, Card, Upload, Button, Input } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const AddProperty = () => {
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (type, text) => {
    api[type]({ message: text });
  };

  const [input, setInput] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = ({ fileList }) => {
    setImages(fileList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.title || !input.price || !input.location || images.length === 0) {
      openNotificationWithIcon("error", "All fields and at least one image are required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", input.title);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("location", input.location);

      images.forEach((file) => {
        formData.append("images", file.originFileObj);
      });

      let result = await axios.post("http://localhost:5000/list/properties", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      openNotificationWithIcon("success", "Property added successfully!");
      console.log(result.data);

      setInput({ title: "", description: "", price: "", location: "" });
      setImages([]);
    } catch (error) {
      console.error(error.response ? error.response.data : error);

      const msg = error.response?.data?.message || error.response?.data?.error;
      if (msg === "No subscription plan found for this user.") {
        openNotificationWithIcon("error", "Upgrade your plan to add more properties.");
        setTimeout(() => {
          window.location.href = "/plans";
        }, 1500);
      } else {
        openNotificationWithIcon("error", msg || "Error creating property");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      {contextHolder}
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <h1>Add Property</h1>
        </header>

        <section style={{ maxWidth: "800px", margin: "0 auto", marginTop: "10px" }}>
          <Card title="Property Details" bordered={false} style={{ borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              
              <Input
                name="title"
                placeholder="Property Title"
                value={input.title}
                onChange={handleChange}
                size="large"
              />

              <TextArea
                rows={4}
                name="description"
                placeholder="Property Description"
                value={input.description}
                onChange={handleChange}
              />

              <Input
                type="number"
                name="price"
                placeholder="Price"
                value={input.price}
                onChange={handleChange}
                size="large"
              />

              <Input
                name="location"
                placeholder="Location"
                value={input.location}
                onChange={handleChange}
                size="large"
              />

              <Upload
                listType="picture-card"
                multiple
                maxCount={5}
                fileList={images}
                onChange={handleImageChange}
                beforeUpload={() => false} // prevent auto upload
              >
                {images.length >= 5 ? null : (
                  <div>
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{ borderRadius: "8px" }}
              >
                Submit Property
              </Button>
            </form>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default AddProperty;
