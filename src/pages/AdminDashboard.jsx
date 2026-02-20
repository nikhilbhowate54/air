// import React, { useContext } from "react";
// import "./admin.css";
// import { Link } from "react-router-dom";
// import { Space, Table, Tag } from "antd";
// import Sidebar from "../components/Sidebar";
// import { AbilityContext } from "../casl/AbilityContext";
// import { Can } from "@casl/react";

// const AdminDashboard = () => {
//   const ability = useContext(AbilityContext);

//   if (!ability) return <p>Loading permissions...</p>;
//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       render: (text) => <a>{text}</a>,
//     },
//     {
//       title: "Age",
//       dataIndex: "age",
//       key: "age",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },
//     {
//       title: "Tags",
//       key: "tags",
//       dataIndex: "tags",
//       render: (_, { tags }) => (
//         <>
//           {tags?.map((tag) => {
//             let color = tag?.length > 5 ? "geekblue" : "green";
//             if (tag === "loser") {
//               color = "volcano";
//             }
//             return (
//               <Tag color={color} key={tag}>
//                 {tag?.toUpperCase()}
//               </Tag>
//             );
//           })}
//         </>
//       ),
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <Space size="middle">
//           <a>Invite {record.name}</a>
//           <Can I={"delete"} a={"User"} ability={ability}>
//             {" "}
//             <a>Delete</a>
//           </Can>
//         </Space>
//       ),
//     },
//   ];
//   const data = [
//     {
//       key: "1",
//       name: "John Brown",
//       age: 32,
//       address: "New York No. 1 Lake Park",
//       tags: ["nice", "developer"],
//     },
//     {
//       key: "2",
//       name: "Jim Green",
//       age: 42,
//       address: "London No. 1 Lake Park",
//       tags: ["loser"],
//     },
//     {
//       key: "3",
//       name: "Joe Black",
//       age: 32,
//       address: "Sydney No. 1 Lake Park",
//       tags: ["cool", "teacher"],
//     },
//   ];
//   console.log("can read Property?", ability.can("read", "Property"));
//   if (!ability) return <p>Loading permissions...</p>;
//   return (
//     <div>
      
//       <div className="admin-container">
//         <Sidebar />

//         <main className="main-content">
//           <header className="topbar">
//             <h1>Dashboard</h1>
//           </header>

//           <section className="widgets">
//             <div className="widget">Total Users: 120</div>
//             <div className="widget">Total Listings: 45</div>
//             <div className="widget">Total Bookings: 150</div>
//             <div className="widget">Monthly Earnings: ₹85,000</div>
//           </section>

//           <section className="table-section">
//             <h2>Recent Bookings</h2>
//             {/* <table>
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>User</th>
//                 <th>Property</th>
//                 <th>Status</th>
//                 <th>Date</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>#001</td>
//                 <td>Ravi</td>
//                 <td>Sea View Apartment</td>
//                 <td>Confirmed</td>
//                 <td>12 July 2025</td>
//               </tr>
//               <tr>
//                 <td>#002</td>
//                 <td>Priya</td>
//                 <td>Hilltop Villa</td>
//                 <td>Pending</td>
//                 <td>13 July 2025</td>
//               </tr>
//             </tbody>
//           </table> */}
//             {ability.can("read", "User") && <p> You can read users!</p>}
//             {!ability.can("read", "User") && <p>You can't read users.</p>}
//             <Can I="read" a="User" ability={ability}>
//               <Table columns={columns} dataSource={data} />
//             </Can>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useContext } from "react";
import "./admin.css";
import { Space, Table, Tag, Card, Row, Col } from "antd";
import Sidebar from "../components/Sidebar";
import { AbilityContext } from "../casl/AbilityContext";
import { Can } from "@casl/react";

const AdminDashboard = () => {
  const ability = useContext(AbilityContext);

  if (!ability) return <p>Loading permissions...</p>;

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { tags }) => (
        <>
          {tags?.map((tag) => {
            let color = tag?.length > 5 ? "geekblue" : "green";
            if (tag === "loser") color = "volcano";
            return (
              <Tag color={color} key={tag}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <Can I={"delete"} a={"User"} ability={ability}>
            <a style={{ color: "red" }}>Delete</a>
          </Can>
        </Space>
      ),
    },
  ];

  // Dummy data
  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <div className="admin-container">
      <Sidebar />

      <main className="main-content">
        {/* Topbar */}
        <header className="topbar">
          <h1>Admin Dashboard</h1>
        </header>

{/* Widgets */}
<section className="widgets">
  <Row gutter={[16, 16]}>
    <Col xs={12} sm={12} md={6}>
      <Card
        bordered={false}
        style={{
          textAlign: "center",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h6>Total Users</h6>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>120</p>
      </Card>
    </Col>
    <Col xs={12} sm={12} md={6}>
      <Card
        bordered={false}
        style={{
          textAlign: "center",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h6>Total Listings</h6>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>45</p>
      </Card>
    </Col>
    <Col xs={12} sm={12} md={6}>
      <Card
        bordered={false}
        style={{
          textAlign: "center",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h6>Total Bookings</h6>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>150</p>
      </Card>
    </Col>
    <Col xs={12} sm={12} md={6}>
      <Card
        bordered={false}
        style={{
          textAlign: "center",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <h6>Monthly Earnings</h6>
        <p style={{ fontSize: "22px", fontWeight: "bold" }}>₹85,000</p>
      </Card>
    </Col>
  </Row>
</section>


        {/* Recent Bookings Table */}
        <section className="table-section" style={{ marginTop: "20px" }}>
          <h2>Recent Bookings</h2>

          {ability.can("read", "User") && <p>You can read users!</p>}
          {!ability.can("read", "User") && <p>You can't read users.</p>}

          <Can I="read" a="User" ability={ability}>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 5 }}
              bordered
            />
          </Can>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
