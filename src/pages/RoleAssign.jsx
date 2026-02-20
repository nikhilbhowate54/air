// import React, { useEffect, useState } from "react";
// import Sidebar from "../components/Sidebar";
// import axios from "axios";
// import { notification } from "antd";
// // http://localhost:5000/api/protected/admin/roles
// const RoleAssign = () => {
//   const [api, contextHolder] = notification.useNotification();

//   const openNotificationWithIcon = (type, text) => {
//     api[type]({
//       message: text,
//     });
//   };
//   const [users, setUser] = useState([]);
//   const [roles, setRoles] = useState([]);
//   const [input, setInput] = useState({
//     _id: "",
//     rolename: "",
//   });
//   const getUser = async () => {
//     try {
//       let apiuser = "http://localhost:5000/protected/admin/user";
//       let apiroles = "http://localhost:5000/protected/admin/user/roles";
//       let token = localStorage.getItem("token");

//       let [resultOne, resultTwo] = await Promise.all([
//         axios.get(apiuser, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//         axios.get(apiroles, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }),
//       ]);
//       // console.log(resultTwo);

//       setUser(resultOne?.data);
//       setRoles(resultTwo?.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUser();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(input);
//     if (!input._id) {
//       return;
//     }
//     try {
//       let api = "http://localhost:5000/protected/admin/user/";
//       let token = localStorage.getItem("token");
//       let result = await axios.put(
//         `${api}${input._id}`,
//         { rolename: input.rolename },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       openNotificationWithIcon("success", result.data.message);
//       console.log(result);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <div>
//       {contextHolder}
//       <div className="admin-container">
//         <Sidebar />
//         <main className="main-content">
//           {" "}
//           <header className="topbar">
//             <h1>Roles</h1>
//           </header>
//           <section className="table-section">
//             <h2>Assign roles</h2>
//             <form onSubmit={handleSubmit}>
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   flexDirection: "column",
//                 }}
//               >
//                 <label htmlFor="role">User Name</label>
//                 <select
//                   style={{ padding: "10px 20px", borderRadius: "10px" }}
//                   type="text"
//                   name="_id"
//                   id="id"
//                   onChange={(e) =>
//                     setInput((prev) => ({
//                       ...prev,
//                       [e.target.name]: e.target.value,
//                     }))
//                   }
//                 >
//                   {users?.map((it) => (
//                     <option value={it._id}>{it.email}</option>
//                   ))}
//                 </select>
//               </div>
//               <br />
//               <div
//                 style={{
//                   display: "flex",
//                   gap: "10px",
//                   flexDirection: "column",
//                 }}
//               >
//                 <label htmlFor="role">User Roles</label>
//                 <select
//                   style={{ padding: "10px 20px", borderRadius: "10px" }}
//                   type="text"
//                   name="rolename"
//                   id="rolename"
//                   onChange={(e) =>
//                     setInput((prev) => ({
//                       ...prev,
//                       [e.target.name]: e.target.value,
//                     }))
//                   }
//                 >
//                   {roles?.map((it) => (
//                     <option value={it.name}>{it.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <br />
//               <button
//                 style={{
//                   backgroundColor: "#1e293b",
//                   border: "none",
//                   padding: "10px 20px",
//                   borderRadius: "10px",
//                   color: "whitesmoke",
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

// export default RoleAssign;
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import {
  notification,
  Card,
  Typography,
  Form,
  Select,
  Button,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const RoleAssign = () => {
  const [api, contextHolder] = notification.useNotification();
  const [users, setUser] = useState([]);
  const [roles, setRoles] = useState([]);
  const [input, setInput] = useState({
    _id: "",
    rolename: "",
  });
  const [loading, setLoading] = useState(false);

  const openNotificationWithIcon = (type, text) => {
    api[type]({
      message: text,
    });
  };

  const getUser = async () => {
    try {
      let apiuser = "http://localhost:5000/protected/admin/user";
      let apiroles = "http://localhost:5000/protected/admin/user/roles";
      let token = localStorage.getItem("token");

      let [resultOne, resultTwo] = await Promise.all([
        axios.get(apiuser, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        axios.get(apiroles, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setUser(resultOne?.data);
      setRoles(resultTwo?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async () => {
    if (!input._id || !input.rolename) {
      openNotificationWithIcon("error", "Please select both user and role");
      return;
    }

    try {
      setLoading(true);
      let api = "http://localhost:5000/protected/admin/user/";
      let token = localStorage.getItem("token");
      let result = await axios.put(
        `${api}${input._id}`,
        { rolename: input.rolename },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      openNotificationWithIcon("success", result.data.message);
      setInput({ _id: "", rolename: "" });
    } catch (error) {
      console.log(error);
      openNotificationWithIcon("error", "Failed to assign role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh" }}>
      {contextHolder}
      <Sidebar />

      <main className="main-content" style={{ flex: 1, padding: "24px" }}>
        <header className="topbar">
          <Title level={2}>Roles</Title>
        </header>

        <Card style={{ marginTop: 24, maxWidth: 1200 }}>
          <Title level={4}>Assign Role to User</Title>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Select User" required>
              <Select
                placeholder="Choose a user"
                value={input._id || undefined}
                onChange={(value) =>
                  setInput((prev) => ({ ...prev, _id: value }))
                }
              >
                {users?.map((it) => (
                  <Option key={it._id} value={it._id}>
                    {it.email}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Select Role" required>
              <Select
                placeholder="Choose a role"
                value={input.rolename || undefined}
                onChange={(value) =>
                  setInput((prev) => ({ ...prev, rolename: value }))
                }
              >
                {roles?.map((it) => (
                  <Option key={it._id} value={it.name}>
                    {it.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
              >
                Assign Role
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default RoleAssign;
