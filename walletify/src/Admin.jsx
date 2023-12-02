import React, { useState } from 'react';
import { Button, message } from 'antd';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Admin() {

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

    useEffect(() => {
        const user = getCookie("user_id");
    
        if (user !== "4") {
          // Redirect to login or handle unauthorized access
          navigate("/Dashboard/Home");
        } 
      });

    const user_id = parseInt(getCookie("user_id"), 10); // Parse the user_id as an integer

    const handleDeleteWallets = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/delete_wallets', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getCookie('user_id')}`, // Include the token in headers if needed
                },
            });

            if (response.ok) {
                message.success('All wallets deleted successfully');
            } else {
                const data = await response.json();
                message.error(data.message || 'Failed to delete wallets');
            }
        } catch (error) {
            console.error('Error deleting wallets:', error);
            message.error('Failed to delete wallets');
        }
    };

    if (user_id === 4) {
        return (
            <div>
                <h1>Admin</h1>
                <Button type="primary" onClick={handleDeleteWallets}>
                    Delete All Wallets
                </Button>
            </div>
        );
    } else {
        return (
            <div>
                <h1>You do not have permission to access this site.</h1>
            </div>
        );
    }
}

export default Admin;
