import React from "react";
import "./App.css";
import Image from "../src/assets/room.webp";
const App = () => {
  return (
    <>
      <nav className="navbar">
        <img
          width={"90"}
          src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
        />
        <ul>
          <li>home</li>
          <li>experience</li>
          <li>service</li>
        </ul>
        <div className="leftBar">
          <button>Become a host</button>
          <div>
            <svg
              style={{ width: "40px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>
          </div>
          <div>
            <svg
              style={{ width: "40px" }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </div>
      </nav>
      {/* searchbar */}
      <section className="searchbar">
        <div className="bar">
          <div className="mainBar">
            <div>
              <h4>Where</h4>
              <p>searchy</p>
            </div>
            <div>
              <h4>Check in</h4>
              <p>Add Dates</p>
            </div>
            <div>
              <h4>Check Out</h4>
              <p>searchy</p>
            </div>
            <div>
              <h4>Who</h4>
              <p>searchy</p>
            </div>
          </div>
        </div>
      </section>
      {/* homes */}
      <section className="roomCotainer">
        <h2>Popular homes in Bhopal {">"}</h2>
        <div className="cards">
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
        </div>
      </section>
          <section className="roomCotainer">
        <h2>Popular homes in Bhopal {">"}</h2>
        <div className="cards">
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
          <div className="card">
            <img src={Image} alt="" />
            <span className="heart">
              <svg
                style={{ width: "30px", color: "crimson" }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </span>
            <h3>guest house in Bhopal</h3>
            <p>₹2,283 ₹2,283 for 2 nights for 2 nights</p>
          </div>
        </div>
      </section>
      {/* footer */}
      <section className="footer">
        <ul>
          <h2> Support</h2>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
        </ul>
        <ul>
          <h2> Hosting</h2>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
        </ul>
        <ul>
          <h2>Airbnb</h2>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
          <li>Help Centre</li>
        </ul>
      </section>
    </>
  );
};

export default App;
