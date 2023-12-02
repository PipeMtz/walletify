import React, { useState, useEffect } from "react";
import { Modal, Button, Input, Space, message, Menu, Upload } from "antd";
import {
  ExclamationCircleOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
  DollarOutlined,
  ToTopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./DashboardPage.css";

const { confirm } = Modal;

const WalletButton = ({ type, onClick, walletId }) => {
  const icons = {
    deposit: <ToTopOutlined />,
    withdraw: <DollarOutlined />,
    delete: <DeleteOutlined />,
    rename: <EditOutlined />,
  };

  const labels = {
    deposit: "Deposit",
    withdraw: "Withdraw",
    delete: "Delete",
    rename: "Rename",
  };

  const buttonStyle = {
    deposit: { backgroundColor: "green", borderColor: "green", color: "white" },
    delete: { backgroundColor: "red", borderColor: "red", color: "white" },
  };

  return (
    <>
      <Button
        type="primary"
        style={
          type === "deposit"
            ? buttonStyle.deposit
            : type === "delete"
            ? buttonStyle.delete
            : null
        }
        onClick={() => onClick(type, walletId)}
      >
        {icons[type]} {labels[type]}
      </Button>
      {/* <p style={{ fontSize: "12px" }}>{labels[type]}</p> */}
    </>
  );
};

const DashboardPage = () => {
  const [wallets, setWallets] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

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
      fetchUserWallets();
    }
  }, [modalVisible]);

  const fetchUserWallets = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/wallet/${user_id}`
      );
      const data = await response.json();

      if (response.ok) {
        setWallets(data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user wallets:", error);
    }
  };

  const showModal = (type, data) => {
    setModalType(type);
    setModalData(data);
    setModalVisible(true);
  };

  const handleModalOk = async () => {
    // Handle modal confirmation
    // Implement the logic based on the modal type and data
    if (modalType === "sum" || modalType === "sub" || modalType === "rename") {
      const inputValue = document.getElementById("modal-input").value;
  
      if (!inputValue.trim()) {
        message.error("Invalid input. Please enter a valid value.");
        return;
      }
  
      try {
        let bodyData = {
          operation: modalType,
          amount:
            modalType === "sum" || modalType === "sub"
              ? parseFloat(inputValue)
              : null,
        };
  
        if (modalType === "rename") {
          bodyData.new_name = inputValue;
        }
  
        const response = await fetch(
          `http://127.0.0.1:5000/api/wallet/${user_id}/${modalData.walletId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
          }
        );
  
        const responseData = await response.json();
  
        if (response.ok) {
          console.log(responseData.message);
          setModalVisible(false); // Close the modal after success
        } else {
          console.error(responseData.message);
  
          // Check if the error message indicates insufficient funds
          if (responseData.message.includes("insufficient funds")) {
            // You can raise an alert here or display a specific error message
            message.error("Insufficient funds. Unable to complete the operation.");
          }
        }
      } catch (error) {
        console.error(`Error ${modalType} operation:`, error);
      }
    }
  
    setModalVisible(false);
  };
  

  const handleCreateWallet = async () => {
    const nameInputValue = document.getElementById("create-name-input").value;

    if (!nameInputValue.trim()) {
      message.error("Invalid input. Please enter a valid name.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/wallet/${user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: nameInputValue,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        setModalVisible(false); // Close the modal after success
        // Optionally, you can fetch user wallets again to update the state
        fetchUserWallets();
      } else {
        console.error(responseData.message);
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
    }
  };

  const handleModalCancel = () => {
    // Handle modal cancellation
    setModalVisible(false);
  };

  const showConfirm = (type, walletId) => {
    let actionType;

    switch (type) {
      case "deposit":
        actionType = "sum";
        break;
      case "withdraw":
        actionType = "sub";
        break;
      case "delete":
        actionType = "delete";
        break;
      case "rename":
        actionType = "rename";
        break;
      default:
        break;
    }

    confirm({
      title: `Are you sure you want to ${type}?`,
      icon: <ExclamationCircleOutlined />,
      content: `Please confirm the ${type}.`,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        showModal(actionType, { walletId });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleRename = async () => {
    const newName = document.getElementById("modal-input").value;

    if (!newName.trim()) {
      message.error("Invalid input. Please enter a valid name.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/wallet/${user_id}/${modalData.walletId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`, // Include the authorization token
          },
          body: JSON.stringify({
            name: newName,
            amount: 0,
            operation: "rename",
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        setModalVisible(false); // Close the modal after success
        fetchUserWallets();
      } else {
        const errorData = await response.json();
        console.error(errorData.message);
      }
    } catch (error) {
      console.error("Error renaming wallet:", error);
    }
  };

  const handleDeleteWallet = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/wallet/${user_id}/${modalData.walletId}`,
        {
          method: "DELETE",
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        console.log(responseData.message);
        setModalVisible(false); // Close the modal after success
        // Optionally, you can fetch user wallets again to update the state
        fetchUserWallets();
      } else {
        console.error(responseData.message);
      }
    } catch (error) {
      console.error("Error deleting wallet:", error);
    }
  };

  return (
    <div style={{backgroundImage: 'url(https://unbounce.com/photos/Gradient-Background.png)', width:'100%'}} >
      <div style={{
        display: "flex",
        flexFlow:"column",
        gap: "10px",
        marginTop: "20px",
        marginBottom: "20px",
        marginLeft:"20px",
        color:'black',
        width:'100vw'
      }}>
        <h1>Dashboard</h1>
        <Button type="primary" style={{width:"522px"}} onClick={() => showModal("create")}>
          Create Wallet
        </Button>
      </div>
      {wallets.map((wallet) => (
        <div
          key={wallet.id}
          className="wallet-item"
          style={{display: "flex", flexDirection:"column", padding: "10px", paddingLeft: "10px", margin: "10px", marginLeft: "20px" , backgroundColor: "white", boxShadow:'10px 10px 10px 0px rgba(0,0.5,0,0.1)', borderRadius: "10px"}}
        >
          <div style={{display: "flex",margin:"10px",padding:"10px",gap:"30px",justifyContent:"center",alignItems:"center",color:'black'}}>
            <h3>{wallet.name}</h3>
            <p>Balance: {wallet.balance}</p>
          </div>
          <div style={{display: "flex",alignItems: "center",justifyContent:"center",gap: "10px"}}>
          <WalletButton
            type="deposit"
            onClick={showConfirm}
            walletId={wallet.id}
          />
          <WalletButton
            type="withdraw"
            onClick={showConfirm}
            walletId={wallet.id}
          />
          <WalletButton
            type="rename"
            onClick={showConfirm}
            walletId={wallet.id}
          />
          <WalletButton
            type="delete"
            onClick={showConfirm}
            walletId={wallet.id}
          />
          </div>
        </div>
      ))}

      <Modal
        title={`Confirm ${
          modalType === "create"
            ? "Create Wallet"
            : modalType === "sum"
            ? "Deposit"
            : modalType === "sub"
            ? "Withdrawal"
            : modalType === "delete"
            ? "Delete Wallet"
            : "Rename"
        }`}
        visible={modalVisible}
        onOk={
          modalType === "create"
            ? handleCreateWallet
            : modalType === "delete"
            ? handleDeleteWallet
            : modalType === "rename"
            ? handleRename
            : handleModalOk
        }
        onCancel={handleModalCancel}
      >
        {modalType === "create" ? (
          <Space direction="vertical">
            <Input id="create-name-input" placeholder="Enter new wallet name" />
          </Space>
        ) : modalType !== "delete" && modalType !== "rename" ? (
          <Space direction="vertical">
            <Input
              id="modal-input"
              type={modalType === "create" ? "text" : "number"}
              placeholder={`Enter the ${
                modalType === "create" ? "name and " : ""
              }amount`}
            />
          </Space>
        ) : modalType === "rename" ? (
          <Space direction="vertical">
            <Input
              id="modal-input"
              type="text"
              placeholder="Enter the new name"
            />
          </Space>
        ) : null}
      </Modal>
    </div>
  );
};

export default DashboardPage;
