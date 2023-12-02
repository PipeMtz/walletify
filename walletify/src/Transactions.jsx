import React, { useState, useEffect } from "react";
import { Card, Space, Button, Modal, Upload, message } from "antd";
import { UploadOutlined, FilePdfOutlined, FileExcelOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Styles from "./styles/transactions.module.css";

const { confirm } = Modal;

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
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
      fetchTransactions();
    }
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${user_id}/transactions`
      );
      const data = await response.json();

      if (response.ok) {
        setTransactions(data.history);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleImportWalletCSV = async (file) => {
    // Handle the logic to import the wallet from the CSV file
    console.log("File uploaded:", file);
    // You can send the file to the server for processing if needed
    setModalVisible(false);
    // Optionally, you can fetch user wallets again to update the state
    // fetchUserWallets(); // Make sure to add fetchUserWallets function or modify accordingly
  };

  const uploadProps = {
    action: `http://127.0.0.1:5000/api/${user_id}/wallet/import_csv`,
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        handleImportWalletCSV(info.file);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handlePrintHistory = async (format) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${user_id}/history/${format}`
      );
      const blob = await response.blob();

      // Create a Blob URL for the file
      const blobUrl = URL.createObjectURL(blob);

      // Open the file in a new tab or window
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error(`Error fetching ${format.toUpperCase()}:`, error);
    }
  };
  const handleExportWalletCSV = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/${user_id}/wallet/export_csv`
      );
      const blob = await response.blob();

      // Create a Blob URL for the file
      const blobUrl = URL.createObjectURL(blob);

      // Open the file in a new tab or window
      window.open(blobUrl, "_blank");
    } catch (error) {
      console.error("Error exporting wallets to CSV:", error);
    }
  };

  return (
    <div
      className={Styles.container}
      style={{
        backgroundImage:
          "url(https://unbounce.com/photos/Gradient-Background.png)",
          width:'100vw',
      }}
    >
      <h1>Transactions</h1>
      <section className={Styles.containerCards}>
        {Array.isArray(transactions) ? (
          <div
            style={{
              width: "100%",
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            {transactions.map((transaction) => (
              <Card
                key={transaction.id}
                title={`Wallet: ${transaction.wallet_name}`}
                style={{
                  width: 250,
                  marginBottom: "16px",
                  boxShadow: "10px 10px 15px 0px rgba(1,0.5,1,0.1)",
                }}
              >
                <p>Amount: {transaction.amount}</p>
                <p>
                  Operation:{" "}
                  {transaction.operation === "sum"
                    ? "Deposit"
                    : transaction.operation === "sub"
                    ? "Withdrawal"
                    : "Rename"}
                </p>

                <p>Date: {transaction.date}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p>No transactions available.</p>
        )}
      </section>

      <Space style={{ marginTop: "16px" }}>
        <Button
          type="primary"
          icon={<FilePdfOutlined />}
          onClick={() => handlePrintHistory("pdf")}
        >
          Print PDF
        </Button>
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={() => handlePrintHistory("csv")}
        >
          Print CSV
        </Button>
        <Button
          type="primary"
          icon={<UploadOutlined />}
          onClick={showModal}
        >
          Import CSV
        </Button>
        <Button
          type="primary"
          icon={<FileExcelOutlined />}
          onClick={handleExportWalletCSV}
        >
          Export Wallets to CSV
        </Button>
      </Space>

      <Modal
        title="Import Wallet CSV"
        visible={modalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Space direction="vertical">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload CSV</Button>
          </Upload>
        </Space>
      </Modal>
    </div>
  );
};

export default Transactions;
