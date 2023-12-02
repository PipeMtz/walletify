import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("Success:", values);

    try {
      const response = await fetch("http://127.0.0.1:5000/auth/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // If registration is successful, navigate to login or another page
        navigate("/");
      } else {
        console.error("Failed to fetch:", response.statusText);
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        border: "1px solid #ccc",
        backgroundImage:
          "url(https://unbounce.com/photos/Gradient-Background.png)",
      }}
    >
      <div
        style={{
          marginLeft: "500px",
          marginRight: "500px",
          marginTop: "100px",
          // border: "1px solid #ccc",
          padding: "50px",
          paddingRight: "100px",

          backgroundColor: "white",
          borderRadius: "15px",
          boxShadow: "10px 10px 10px 0px rgba(1,0.5,0,0.2)",
        }}
      >
        <div style={{}}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last name"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input your address!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone_number"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            ></Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "50px" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
