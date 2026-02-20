import React, { useState } from "react";
import { Dropdown, Card, Button, Row, Col } from "antd";
import { useSelector } from "react-redux";
import { DatePicker, Space, Divider } from "antd";
import axios from "axios";
import { DownOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import "./Rooms.css";
import { message } from "antd";
import { useLocation } from "react-router-dom";
const Rooms = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [count, setCount] = useState(0);
  const [dates, setDates] = useState([]);
  // const handleIncrement = () => setCount(count + 1);
  // const handleDecrement = () => count > 0 && setCount(count - 1);
  const location = useLocation();
  const receivedState = location?.state; // This will be the object passed in 'state'

  if (!receivedState) {
    return <p>No state received.</p>;
  }
  console.log(receivedState);

  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  // total guest count

  const totalGuests = guests.adults + guests.children + guests.infants;

  const handleReserve = async () => {
  if (!dates || dates.length !== 2) {
    return message.error("Select Check-in & Check-out dates");
  }

  const checkIn = dates[0].format("YYYY-MM-DD");
  const checkOut = dates[1].format("YYYY-MM-DD");

  const totalPrice = 13775; // keep your price same — no UI change

  try {
    const { data } = await axios.post(
      `http://localhost:5000/properties/${receivedState._id}/book`,
      {
        checkIn,
        checkOut,
        guests: totalGuests,
        totalPrice,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    message.success("Booking successful!");
  } catch (error) {
    message.error("Booking failed!");
  }
};


  // handle increment/decrement
  const updateGuest = (type, change) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + change),
    }));
  };



  // dropdown content
  const dropdownContent = (
    <div
      style={{
        padding: 15,
        width: 350, // 👈 increase width here
        minHeight: 200, // 👈 optional: increase height
        background: "white",
      }}
    >
      {Object.entries({
        adults: "Adults",
        children: "Children",
        infants: "Infants",
      }).map(([key, label]) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <div>
            <div style={{ fontWeight: 500 }}>{label}</div>
            <div style={{ fontSize: 12, color: "#888" }}>
              {key === "adults"
                ? "Ages 13 or above"
                : key === "children"
                ? "Ages 2–12"
                : "Under 2"}
            </div>
          </div>

          <Space>
            <Button
              shape="circle"
              icon={<MinusOutlined />}
              size="small"
              onClick={() => updateGuest(key, -1)}
              disabled={guests[key] === 0}
            />
            <span style={{ width: 20, textAlign: "center" }}>
              {guests[key]}
            </span>
            <Button
              shape="circle"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => updateGuest(key, 1)}
            />
          </Space>
        </div>
      ))}

      <Divider style={{ margin: "10px 0" }} />
      <div style={{ textAlign: "right" }}>
        <Button type="link" size="small">
          Clear
        </Button>
        <Button type="primary" size="small">
          Done
        </Button>
      </div>
    </div>
  );

  const { RangePicker } = DatePicker;
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
  return (
    <div>
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
          <Dropdown
            dropdownRender={() => dropdownContent}
            trigger={["click"]}
            style={{ width: "500px" }}
            placement="bottomLeft"
          >
            <Button>
              Guests: {totalGuests} <DownOutlined />
            </Button>
          </Dropdown>
        </div>
      </nav>
      {/* rooms details */}
      <div className="rooms">
        <div className="rooms_details">
          {/* room info */}
          <div className="room_info">
            <div className="room_head">
              {receivedState?.title || "Aashraya - 1Bhk with Pool View"}{" "}
            </div>
            <div className="room_icon">
              <div className="icon_text">
                🛒 <span style={{ fontWeight: "500" }}>share</span>
              </div>
              <div className="icon_text">
                ♥ <span style={{ fontWeight: "500" }}>like</span>
              </div>
            </div>
          </div>
          {/* room images */}
          <div className="room_images">
            {/* <div className="room_large_img">
                
            </div> */}
            <img
              src="https://a0.muscache.com/im/pictures/hosting/Hosting-1490444299455495607/original/4591d225-9eb6-4da5-b6d0-649ea0f9a263.jpeg?im_w=960"
              alt=""
              className="room_large_img"
            />
            <div className="room_small_img">
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-1490444299455495607/original/209e37de-60c8-4712-aa67-b6be57b2f087.jpeg?im_w=720"
                className="small_img"
                alt=""
              />
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-1490444299455495607/original/209e37de-60c8-4712-aa67-b6be57b2f087.jpeg?im_w=720"
                className="small_img1"
                alt=""
              />
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-1490444299455495607/original/209e37de-60c8-4712-aa67-b6be57b2f087.jpeg?im_w=720"
                className="small_img"
                alt=""
              />
              <img
                src="https://a0.muscache.com/im/pictures/hosting/Hosting-1490444299455495607/original/209e37de-60c8-4712-aa67-b6be57b2f087.jpeg?im_w=720"
                className="small_img"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* host part */}
      <div className="host">
        <div className="rental">
          <div className="rental_detail">
            <div className="rental_head">
              Lorem ipsum dolor sit amet consectetur.
            </div>
            <div className="rental_para">Lorem ipsum dolor sit amet.</div>
          </div>
          <div className="offering">🧩 This host is offering a discount</div>
        </div>
      </div>
      {/* Reserve */}
      <div className="reserve">
        <div className="rental">
          <div className="guest_review">
            <div className="guest_fav">
              🔰{" "}
              <div style={{ padding: "10px" }} className="guest_rate">
                {" "}
                <div className="guest_head">guest</div>{" "}
                <div className="guest_head">favourite</div>
              </div>{" "}
              🔰
            </div>
            <div className="line"></div>
            <div className="guest_rate">
              <div style={{ fontWeight: "900" }}>5.0</div>
              <div>⭐⭐⭐</div>
            </div>
            <div className="line"></div>
            <div className="guest_rate">
              <div style={{ fontWeight: "900" }}>8</div>
              <div style={{ fontWeight: "900" }}>Reviews</div>
            </div>
          </div>
          {/* fee part */}
          <div className="fee_guest">
            <div className="rate_guest">
              <div className="price">
                ₹{receivedState?.price || "13,775"} for 3 nights
              </div>
              <div className="check">
                <RangePicker
                  style={{
                    width: 342, //  increase width
                    height: 50, //  increase height
                    fontSize: 16, //  increase font size
                    borderRadius: 12, //  rounded corners
                    padding: "8px 15px", //  internal spacing
                    border: "1px solid #ccc",
                    overflow: "hidden",
                  }}
                  onChange={(value) => setDates(value)}
                />
                <Dropdown
                  dropdownRender={() => dropdownContent}
                  trigger={["click"]}
                >
                  <Button
                    style={{
                      maxWidth: 50,
                      minWidth: 342,

                      height: 50,
                      border: "1px solid #ccc",
                      borderRadius: 12,
                      padding: "0 15px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      background: "#fff",
                    }}
                  >
                    Quantity: {count} <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
              <button className="reserve_btn" onClick={handleReserve}>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
