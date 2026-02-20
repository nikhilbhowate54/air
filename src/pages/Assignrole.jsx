// import React, { useEffect, useState } from "react";
// import "./admin.css";
// import axios from "axios";
// import Sidebar from "../components/Sidebar";
// import { notification } from "antd";

// const Assignrole = () => {
//   const [roles, setRoles] = useState([]);
//   const [users, setUser] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("");
//   const [selectpermission, setSelectpermission] = useState({});
//   const [modules] = useState(["user", "property"]);
//   const [action] = useState(["access", "add", "read", "edit", "delete"]);
//      const [api, contextHolder] = notification.useNotification();
//    const openNotificationWithIcon = (type, text) => {
//     api[type]({
//       message: text,
//     });
//   };
//   const getUser = async () => {
//     try {
//       let token = localStorage.getItem("token");

//       const [resultOne, resultTwo] = await Promise.all([
//         axios.get("http://localhost:5000/protected/admin/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//         axios.get("http://localhost:5000/protected/admin/user/roles", {
//           headers: { Authorization: `Bearer ${token}` },
//         }),
//       ]);

//       setUser(resultOne?.data || []);
//       setRoles(resultTwo?.data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

  
//   useEffect(() => {
//     if (roles.length > 0) {
//       setSelectedRole(roles[0].name);
//     }
//   }, [roles]);

//   // Fetch role permissions on role change
//   useEffect(() => {
//     const fetchPermissions = async () => {
//       if (!selectedRole) return;

//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get(
//           `http://localhost:5000/protected/admin/user/roles/${selectedRole}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         const permissionList = res?.data?.permissions || [];

//         const updated = {};
//         modules.forEach((mod) => {
//           updated[mod] = {};
//           action.forEach((act) => {
//             const key = `${mod}_${act}`;
//             updated[mod][act] = permissionList.includes(key);
//           });
//         });

//         setSelectpermission(updated);
           
//       } catch (err) {
//         console.log("Error fetching permissions:", err);
//       }
//     };

//     fetchPermissions();
//   }, [selectedRole, modules, action]);

//   // Handle checkbox change
//   const handleCheckboxChange = (mod, act) => {
//     setSelectpermission((prev) => ({
//       ...prev,
//       [mod]: {
//         ...prev[mod],
//         [act]: !prev[mod]?.[act],
//       },
//     }));
//   };

 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const api = "http://localhost:5000/protected/admin/roles/permissions/";

//     const permissionsArray = [];
//     for (const mod in selectpermission) {
//       for (const act in selectpermission[mod]) {
//         if (selectpermission[mod][act]) {
//           permissionsArray.push(`${mod}_${act}`);
//         }
//       }
//     }

//     try {
//       const result = await axios.put(
//         `${api}${selectedRole}`,
//         { permissions: permissionsArray },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       openNotificationWithIcon("success", result.data.message);
//       console.log("Submitted successfully:", result.data);
//     } catch (error) {
//       console.log("Error submitting permissions:", error);
//     }
//   };

//   return (
//     <div className="admin-container">
//            {contextHolder}
//       <Sidebar />
//       <main className="main-content">
//         <header className="topbar">
//           <h1>Role</h1>
//         </header>

//         <section className="table-section">
//           <h2>Assign Permission To Roles</h2>
//           <form onSubmit={handleSubmit}>
//             <div
//               style={{ display: "flex", gap: "10px", flexDirection: "column" }}
//             >
//               <label htmlFor="role">Role Name</label>
//               <select
//                 style={{ padding: "10px 20px", borderRadius: "10px" }}
//                 name="role"
//                 id="role"
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//               >
//                 {roles.map((op) => (
//                   <option key={op._id} value={op.name}>
//                     {op.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <br />

//             <table>
//               <thead>
//                 <tr>
//                   <th>Permissions</th>
//                   {action.map((act) => (
//                     <th key={act}>{act}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {modules.map((mod) => (
//                   <tr key={mod}>
//                     <td>{mod}</td>
//                     {action.map((act) => (
//                       <td key={act}>
//                         <input
//                           type="checkbox"
//                           checked={selectpermission[mod]?.[act] || false}
//                           onChange={() => handleCheckboxChange(mod, act)}
//                         />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             <br />
//             <button
//               style={{
//                 backgroundColor: "#1e293b",
//                 border: "none",
//                 padding: "10px 20px",
//                 borderRadius: "10px",
//                 color: "whitesmoke",
//               }}
//               type="submit"
//             >
//               Submit
//             </button>
//           </form>
//         </section>
//       </main>
//     </div>
//   );
// };

// export default Assignrole;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import {
  notification,
  Card,
  Typography,
  Form,
  Select,
  Table,
  Checkbox,
  Button,
} from "antd";

const { Title } = Typography;
const { Option } = Select;

const Assignrole = () => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectpermission, setSelectpermission] = useState({});
  const [modules] = useState(["user", "property"]);
  const [action] = useState(["access", "add", "read", "edit", "delete"]);
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, text) => {
    api[type]({
      message: text,
    });
  };

  const getUser = async () => {
    try {
      let token = localStorage.getItem("token");

      const [, resultTwo] = await Promise.all([
        axios.get("http://localhost:5000/protected/admin/user", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("http://localhost:5000/protected/admin/user/roles", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setRoles(resultTwo?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (roles.length > 0) {
      setSelectedRole(roles[0].name);
    }
  }, [roles]);

  // Fetch role permissions on role change
  useEffect(() => {
    const fetchPermissions = async () => {
      if (!selectedRole) return;

      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/protected/admin/user/roles/${selectedRole}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const permissionList = res?.data?.permissions || [];

        const updated = {};
        modules.forEach((mod) => {
          updated[mod] = {};
          action.forEach((act) => {
            const key = `${mod}_${act}`;
            updated[mod][act] = permissionList.includes(key);
          });
        });

        setSelectpermission(updated);
      } catch (err) {
        console.log("Error fetching permissions:", err);
      }
    };

    fetchPermissions();
  }, [selectedRole, modules, action]);

  // Handle checkbox change
  const handleCheckboxChange = (mod, act) => {
    setSelectpermission((prev) => ({
      ...prev,
      [mod]: {
        ...prev[mod],
        [act]: !prev[mod]?.[act],
      },
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const apiUrl = "http://localhost:5000/protected/admin/roles/permissions/";

    const permissionsArray = [];
    for (const mod in selectpermission) {
      for (const act in selectpermission[mod]) {
        if (selectpermission[mod][act]) {
          permissionsArray.push(`${mod}_${act}`);
        }
      }
    }

    try {
      setLoading(true);
      const result = await axios.put(
        `${apiUrl}${selectedRole}`,
        { permissions: permissionsArray },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      openNotificationWithIcon("success", result.data.message);
    } catch (error) {
      console.log("Error submitting permissions:", error);
      openNotificationWithIcon("error", "Failed to update permissions");
    } finally {
      setLoading(false);
    }
  };

  // Build AntD table columns dynamically
  const columns = [
    {
      title: "Module",
      dataIndex: "module",
      key: "module",
    },
    ...action.map((act) => ({
      title: act.toUpperCase(),
      dataIndex: act,
      key: act,
      render: (_, record) => (
        <Checkbox
          checked={selectpermission[record.module]?.[act] || false}
          onChange={() => handleCheckboxChange(record.module, act)}
        />
      ),
    })),
  ];

  const dataSource = modules.map((mod) => ({
    key: mod,
    module: mod,
  }));

  return (
    <div className="admin-container" style={{ display: "flex", minHeight: "100vh" }}>
      {contextHolder}
      <Sidebar />

      <main className="main-content" style={{ flex: 1, padding: "24px" }}>
        <header className="topbar">
          <Title level={2}>Roles</Title>
        </header>

        <Card style={{ marginTop: 24 }}>
          <Title level={4}>Assign Permissions to Roles</Title>

          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item label="Select Role">
              <Select
                value={selectedRole}
                onChange={setSelectedRole}
                style={{ width: 300 }}
              >
                {roles.map((op) => (
                  <Option key={op._id} value={op.name}>
                    {op.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Table
              columns={columns}
              dataSource={dataSource}
              pagination={false}
              bordered
              style={{ marginTop: 16 }}
            />

            <Form.Item style={{ marginTop: 24 }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Permissions
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </main>
    </div>
  );
};

export default Assignrole;
