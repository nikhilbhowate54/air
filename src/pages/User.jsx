import React, { useEffect, useState } from "react";
import "./admin.css";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { Space, Table, Tag } from "antd";
const User = () => {
  const [data, setData] = useState([]);
  const fetchApi = async () => {
    try {
      let token = localStorage.getItem("token");
      let users = await axios.get(
        "http://localhost:5000/protected/admin/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(users);
      setData(users.data);
    } catch (error) {}
  };

  useEffect(() => fetchApi(), []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "_id",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: 'Tags',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'loser') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //     tags: ['nice', 'developer'],
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //     tags: ['loser'],
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //     tags: ['cool', 'teacher'],
  //   },
  // ];
  return (
    <>
      <div className="admin-container">
        <Sidebar />
        <main className="main-content">
          {" "}
          <header className="topbar">
            <h1>User</h1>
          </header>
          <section className="table-section">
            <h2>Users</h2>
            <Table columns={columns} dataSource={data} />
          </section>
        </main>
      </div>
    </>
  );
};

export default User;
