import { useState, useEffect } from "react";
import { Image, List, Upload, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { uploadImage } from "./firebase";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);

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

  const user_id = getCookie("user_id");

  useEffect(() => {
    const token = getCookie("token");

    if (!token) {
      // Redirect to login or handle unauthorized access
      navigate("/");
    } else {
      fetchUserData();
    }

    async function fetchUserData() {
      try {
        const user_id = getCookie("user_id");

        if (!user_id) {
          console.error("User ID not found in cookies");
          return;
        }

        const response = await fetch(
          `http://127.0.0.1:5000/auth/get_user/${user_id}`
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error("Error fetching user data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);


  // function handleUploadImage () {
  //   uploadImage('File', 'Images/')
  // }
  const handleUploadImage = async (file) => {
    try {
      setUploading(true);
      const imageUrl = await uploadImage({ file, folder: 'Images/' });

      // Post the image URL to the backend
      const response = await fetch(`http://127.0.0.1:5000/auth/image/${user_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });

      if (response.ok) {
        message.success('Image uploaded successfully');
      } else {
        console.error('Error updating image URL on the server:', response.statusText);
        message.error('Failed to update image URL');
      }

      // Update user data with the new image URL
      setUserData((prevUserData) => ({
        ...prevUserData,
        imageUrl,
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      message.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };


  return (
    <div style={{width:'100vw',backgroundImage: 'url(https://unbounce.com/photos/Gradient-Background.png)'}}>
    <div
      style={{
        marginLeft: "30px",
        color:'black',
      }}
    >
      <h1>Profile</h1>
      {userData && (
        <>
          <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
              <Upload
                showUploadList={false}
                beforeUpload={(file) => handleUploadImage(file)}
              >
              <Button icon={<UploadOutlined />} loading={uploading}>
                {uploading ? "Uploading" : "Change Image"}
              </Button>
            </Upload>

            <Image width={200} src={userData.imageUrl} />
          </div>
          <List
            itemLayout="horizontal"
            dataSource={[
              { title: `Name: ${userData.name}` },
              { title: `Last Name: ${userData.lastname}` },
              { title: `Email: ${userData.email}` },
              { title: `Phone Number: ${userData.phone_number}` },
              { title: `Address: ${userData.address}` },
            ]}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta title={<span>{item.title}</span>} />
              </List.Item>
            )}
          />
        </>
      )}
    </div>
    </div>
  );
};

export default Profile;
