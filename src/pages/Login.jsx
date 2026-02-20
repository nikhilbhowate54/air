import { Form, Input, Button, Typography, Card, notification, Divider } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, googleLogin } from "../feature/auth/authSlice";
import { useState } from "react";

const { Title, Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();

  const openNotificationWithIcon = (type, text) => {
    api[type]({
      message: text,
    });
  };

  // Handle email/password login
  const handleSubmit = async (values) => {
    try {
      const resultAction = await dispatch(login(values));

      if (login.fulfilled.match(resultAction)) {
        const { role } = resultAction.payload;
        openNotificationWithIcon("success", "Login successful");

        if (role === "admin" || role === "host") {
          navigate("/dash");
        } else {
          navigate("/");
        }
      } else {
        openNotificationWithIcon("error", "Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  // Handle Google login
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const resultAction = await dispatch(googleLogin(token));

      if (googleLogin.fulfilled.match(resultAction)) {
        const { role } = resultAction.payload;
        openNotificationWithIcon("success", "Google login successful");

        if (role === "admin" || role === "host") {
          navigate("/dash");
        } else {
          navigate("/");
        }
      } else {
        openNotificationWithIcon("error", "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      openNotificationWithIcon("error", "Something went wrong");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f0f2f5",
      }}
    >
      {contextHolder}
      <Card style={{ width: 400, borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={2}>Login</Title>
          <Text type="secondary">Welcome back! Please log in to continue.</Text>
        </div>

        {/* Email / Password Form */}
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter your password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{ borderRadius: 6 }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Form.Item>
        </Form>

        <Divider>Or</Divider>

        {/* Google Login Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => openNotificationWithIcon("error", "Google login failed")}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Text>
            Don’t have an account?{" "}
            <Link to="/register">
              <b>Register here</b>
            </Link>
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
