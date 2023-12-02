import React, { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Styles from './styles/login.module.css'

function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  // Check for the user_id cookie on component mount
  useEffect(() => {
    const user_id = getCookie("user_id");
    if (user_id) {
      navigate("/Dashboard/Home");
    }
  }, []);

  const onFinish = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);

        // Set user_id as a session cookie if "Remember me" is not checked
        // Set token with expiration if "Remember me" is checked
        const rememberMe = document.getElementById("rememberMe").checked;
        const expires = rememberMe ? `expires=${getExpirationDate()};` : "";
        document.cookie = `user_id=${data.user_id}; path=/;${expires}`;
        document.cookie = `token=${data.token}; path=/;${
          rememberMe ? `expires=${getExpirationDate()};` : ""
        }`;

        // Navigate to /Dashboard
        navigate("/Dashboard/Home");
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

  const getCookie = (name) => {
    const cookieArray = document.cookie.split("; ");
    for (let i = 0; i < cookieArray.length; i++) {
      const cookiePair = cookieArray[i].split("=");
      if (cookiePair[0] === name) {
        return cookiePair[1];
      }
    }
    return null;
  };

  // Helper function to get the expiration date for the token cookie
  const getExpirationDate = () => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7); // Set to expire in 7 days
    return expirationDate.toUTCString();
  };

  return (
    <div>
      <div className="maindiv" style={{width:'100vw', height:'100vh', backgroundImage: 'url(https://unbounce.com/photos/Gradient-Background.png)'}}>
        <div
          id="loginForm"
          className="loginForm"
          style={{
            padding: "150px 150px 150px 150px",
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            // border: "1px solid black",

          }}
        >
        <div style={{
            // border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding:'20px',
            backgroundColor:'white',
            borderRadius:'15px',
            boxShadow:'10px 10px 10px 0px rgba(1,0.5,0,0.2)'
        }}>
          <h1 style={{ color:'#474747'}}>Login</h1>
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
              // border: "1px solid #000000",
              marginRight: "80px",
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
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
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
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
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox id="rememberMe" style={{ marginLeft: "20px" }}>
                Remember me
              </Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <div style={{ marginBottom: "10px", paddingBottom:'10px'}}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "31px" }}
                >
                  Submit
                </Button>
                <Link to="/Register" style={{ marginLeft: "43px" }}>
                  Register
                </Link>
              </div>
            </Form.Item>
          </Form>
        </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Login;
