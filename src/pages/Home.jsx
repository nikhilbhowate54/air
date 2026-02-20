// import React from "react";
// import "../app.css";
// import Image from "../assets/room.webp";
// import { Dropdown, Card, Button } from "antd";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Link, useNavigate } from "react-router-dom";
// import { logout } from "../feature/auth/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// const { Meta } = Card;

// const Home = () => {
//   const dispatch =useDispatch()
//   const {isAuth} =useSelector((state)=>state.auth)
//   const navigate =useNavigate()
//   const items = [
//     {
//       label: <a>Help Center</a>,
//       key: "0",
//     },
//     { type: "divider" },
//     {
//       label: <a>Refer a host</a>,
//       key: "1",
//     },
//     {
//       label: isAuth? <Button onClick={() =>{ dispatch(logout());navigate('/login')}}>logout</Button>: <Link to={'/login'}>login</Link>,
//       key: "2",
//     },
//   ];
//   const cards = [
//     {
//       id: 1,
//       title: "guest house in Bhopal",
//       subtitle: "₹2,283 ₹2,283 for 2 nights for 2 nights",
//       img: Image,
//     },
//     {
//       id: 2,
//       title: "guest house in Bhopal",
//       subtitle: "₹2,283 ₹2,283 for 2 nights for 2 nights",
//       img: Image,
//     },
//     {
//       id: 3,
//       title: "guest house in Bhopal",
//       subtitle: "₹2,283 ₹2,283 for 2 nights for 2 nights",
//       img: Image,
//     },
//     {
//       id: 4,
//       title: "guest house in Bhopal",
//       subtitle: "₹2,283 ₹2,283 for 2 nights for 2 nights",
//       img: Image,
//     },
//     {
//       id: 5,
//       title: "guest house in Bhopal",
//       subtitle: "₹2,283 ₹2,283 for 2 nights for 2 nights",
//       img: Image,
//     },
//   ];
//   return (
//     <>
//       <nav className="navbar white-gradient">
//         <img
//           width={"90"}
//           src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
//         />
//         <ul className="mt-1" style={{position:'relative', top:'10px'}}>
//           <li>home</li>
//           <li>experience</li>
//           <li>service</li>
//         </ul>
//         <div className="leftBar">
//           <button>Become a host</button>
//           <div>
//             <svg
//               style={{ width: "40px" }}
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               strokeWidth={1.5}
//               stroke="currentColor"
//               className="size-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
//               />
//             </svg>
//           </div>
//           <Dropdown menu={{ items }} trigger={["click"]}>
//             <div>
//               <svg
//                 style={{ width: "40px" }}
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth={1.5}
//                 stroke="currentColor"
//                 className="size-6"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
//                 />
//               </svg>
//             </div>
//           </Dropdown>
//         </div>
//       </nav>
//       {/* searchbar */}
//       <section className="searchbar " style={{display:'none'}}>
//         <div className="bar"  >
//           <div className="mainBar mt-1" >
//             <div>
//               <h6>Where</h6>
//               <p>searchy</p>
//             </div>
//             <div>
//               <h6>Check in</h6>
//               <p>Add Dates</p>
//             </div>
//             <div>
//               <h6>Check Out</h6>
//               <p>searchy</p>
//             </div>
//             <div>
//               <h6>Who</h6>
//               <p>searchy</p>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* homes */}

//      <section className="roomCotainer mt-3">
//   <h3 className="p-1">Popular homes in Bhopal</h3>
//   <div className="cards">
//     {[1, 2, 3, 4,5,6].map((_, index) => (
//       <div className="card" key={index}>
//         <img src={Image} alt="Room" />
//         <span className="heart">
//           <svg
//             style={{ width: "20px", color: "crimson" }}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//             />
//           </svg>
//         </span>
//         <div className="container mt-1">
//           <h6>Guest house in Bhopal</h6>
//           <p>₹2,283 for 2 nights</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>
//    <section className="roomCotainer mt-3">
//   <h3 className="p-1">Popular homes in Bhopal</h3>
//   <div className="cards">
//     {[1, 2, 3, 4,5,6].map((_, index) => (
//       <div className="card" key={index}>
//         <img src={Image} alt="Room" />
//         <span className="heart">
//           <svg
//             style={{ width: "20px", color: "crimson" }}
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             strokeWidth={1.5}
//             stroke="currentColor"
//             className="size-6"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
//             />
//           </svg>
//         </span>
//         <div className="container mt-1" style={{border:'none'}}>
//           <h6>Guest house in Bhopal</h6>
//           <p>₹2,283 for 2 nights</p>
//         </div>
//       </div>
//     ))}
//   </div>
// </section>
//       {/* footer */}
//       {/* <section className="footer">
//         <ul>
//           <h2> Support</h2>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//         </ul>
//         <ul>
//           <h2> Hosting</h2>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//         </ul>
//         <ul>
//           <h2>Airbnb</h2>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//           <li>Help Centre</li>
//         </ul>
//       </section> */}
//       <br />
//       <footer className="bg-dark text-white text-center py-4 mt-auto " >
//         <div>
//           <div className="mb-0">© 2025 Airbnb, Inc.·PrivacyTermsSitemapCompany details</div>
//         </div>
//       </footer>
//     </>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import "../app.css";
import Image from "../assets/room.webp";
import { Dropdown, Card, Button, Row, Col } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../feature/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const Home = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const items = [
    { label: <a>Help Center</a>, key: "0" },
    { type: "divider" },
    { label: <a>Refer a host</a>, key: "1" },
    {
      label: isAuth ? (
        <Button
          type="link"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          Logout
        </Button>
      ) : (
        <Link to={"/login"}>Login</Link>
      ),
      key: "2",
    },
  ];
  const handleCard = (item) => {
    console.log(item);
    navigate("rooms", { state: item });
  };
  // ------------------- FETCH PROPERTIES -------------------
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token"); // get token from localStorage
        const res = await fetch("http://localhost:5000/list/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch properties");

        const data = await res.json();
        setProperties(data); // assuming API returns an array
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const cards = [
    {
      id: 1,
      title: "Guest house in Bhopal",
      subtitle: "₹2,283 for 2 nights",
      img: Image,
    },
    {
      id: 2,
      title: "Cozy stay in Indore",
      subtitle: "₹3,000 for 3 nights",
      img: Image,
    },
    { id: 3, title: "Luxury Villa", subtitle: "₹5,500 per night", img: Image },
    {
      id: 4,
      title: "Studio Apartment",
      subtitle: "₹1,800 per night",
      img: Image,
    },
    {
      id: 5,
      title: "Lake View Resort",
      subtitle: "₹7,200 for 2 nights",
      img: Image,
    },
    {
      id: 6,
      title: "Family House",
      subtitle: "₹4,000 for 2 nights",
      img: Image,
    },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="navbar white-gradient">
        <img
          width="90"
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
          alt="Airbnb Logo"
        />
        <ul className="mt-1 nav-links">
          <li>Home</li>
          <li>Experience</li>
          <li>Service</li>
        </ul>
        <div className="leftBar">
          <Button type="text">Become a host</Button>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <Button
              type="text"
              icon={<span style={{ fontSize: "20px" }}>☰</span>}
            />
          </Dropdown>
        </div>
      </nav>

      {/* Section - Popular Homes */}
      <section className="roomContainer mt-3">
        <h3 className="p-1">Popular Homes</h3>
        <Row gutter={[12, 12]}>
          {cards.map((item) => (
            <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
              <Card
                hoverable
                style={{ width: 180, borderRadius: "12px" }}
                cover={
                  <img
                    alt={item.title}
                    src={item.img}
                    style={{
                      height: 120,
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                }
              >
                <Meta
                  title={<span style={{ fontSize: "14px" }}>{item.title}</span>}
                  description={
                    <span style={{ fontSize: "12px" }}>{item.subtitle}</span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* Section - Popular Homes */}
      <section className="roomContainer mt-3">
        <h3 className="p-1">Popular Homes</h3>
        <Row gutter={[12, 12]}>
          {cards.map((item) => (
            <Col xs={12} sm={8} md={6} lg={4} key={item.id}>
              <Card
                hoverable
                style={{ width: 180, borderRadius: "12px" }}
                cover={
                  <img
                    alt={item.title}
                    src={item.img}
                    style={{
                      height: 120,
                      objectFit: "cover",
                      borderRadius: "12px 12px 0 0",
                    }}
                  />
                }
              >
                <Meta
                  title={<span style={{ fontSize: "14px" }}>{item.title}</span>}
                  description={
                    <span style={{ fontSize: "12px" }}>{item.subtitle}</span>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>
      {/* Section - Popular Homes */}
      <section className="roomContainer mt-3">
        <h3 className="p-1">Popular Homes</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Row gutter={[12, 12]}>
            {properties.map((item) => (
              <Col xs={12} sm={8} md={6} lg={4} key={item._id}>
                <Card
                  hoverable
                  onClick={() => handleCard(item)}
                  style={{ width: 180, borderRadius: "12px" }}
                  cover={
                    <img
                      alt={item.title}
                      src={`http://localhost:5000${
                        item.images[0] || "/default.jpg"
                      }`}
                      style={{
                        height: 120,
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                  }
                >
                  <Meta
                    title={
                      <span style={{ fontSize: "14px" }}>{item.title}</span>
                    }
                    description={
                      <span style={{ fontSize: "12px" }}>₹{item.price}</span>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </section>
      {/* Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-auto">
        <div>
          © 2025 Airbnb, Inc. · Privacy · Terms · Sitemap · Company details
        </div>
      </footer>
    </>
  );
};

export default Home;
