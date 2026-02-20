import { notification } from "antd";
import { useState } from "react";
import "./Login.css"; // or create a new Register.css if needed
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../feature/auth/authSlice"; // you must define this

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, text) => {
    api[type]({
      message: text,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors = {};
    console.log(formData);

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // console.log(formData);

      const resultAction = await dispatch(register(formData));
      console.log(resultAction);

      if (register.fulfilled.match(resultAction)) {
        openNotificationWithIcon("success", "Registration successful");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        openNotificationWithIcon("error", "Registration failed");
      }
    } catch (error) {
      console.error("Register error:", error);
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  return (
    <>
      {contextHolder}

      <form onSubmit={handleSubmit} noValidate>
        <div className="login">
          {/* <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}
          </div> */}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && (
              <span style={{ color: "red" }}>{errors.email}</span>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span style={{ color: "red" }}>{errors.password}</span>
            )}
          </div>
          {/* <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span style={{ color: "red" }}>{errors.confirmPassword}</span>
            )}
          </div> */}
          <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};

export default Register;
