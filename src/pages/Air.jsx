import React from "react";
import "./Air.css";
import Image from "../assets/room.webp";
const Air = () => {
  return (
    <>
      <header className="white-gradient">
        <nav className="navbar navbar-expand-sm">
          <div className="container-fluid">
            <img
              width="90"
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg"
              alt="logo"
            />
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav me-auto">
                <li className="nav-item mx-3">
                  <a className="nav-link" href="#">
                    home
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="#">
                    experience
                  </a>
                </li>
                <li className="nav-item mx-3">
                  <a className="nav-link" href="#">
                    service
                  </a>
                </li>
              </ul>
              <form className="d-flex">
                <button className="btn btn-secondary" type="button">
                  <span className="navbar-toggler-icon"></span>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Air;
